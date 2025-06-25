import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UnitParameterService } from '../../../../core/services/unite-parametre.service';
import { UnitParameter,PaginatedResponse,PaginationParams } from '../../../../models/unit-parameter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unites-mesure',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit, OnDestroy {
  // Formulaire avec gestion du disabled state optimisée
  uniteForm: FormGroup;
  
  // État de l'application
  unites: UnitParameter[] = [];
  uniteEnEdition: UnitParameter | null = null;
  modeEdition = false;
  loading = false;
  error: string | null = null;
  
  // Propriétés pour la pagination
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  isLastPage = false;
  isFirstPage = true;
  
  // Options pour le sélecteur de taille de page
  readonly pageSizeOptions = [5, 10, 20, 50];
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private unitParameterService: UnitParameterService
  ) {
    this.uniteForm = this.createForm();
  }

  ngOnInit(): void {
    this.chargerUnites();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Création du formulaire avec gestion optimisée du disabled state
   * Le disabled state est géré au niveau du FormControl, pas dans le template
   */
  private createForm(): FormGroup {
    return this.fb.group({
      label: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(2)]),
      code: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(1)]),
      hasStartDate: new FormControl({value: false, disabled: false}),
      hasEndDate: new FormControl({value: false, disabled: false})
    });
  }

  /**
   * Gestion optimisée de l'état disabled des contrôles
   * Utilise les méthodes enable/disable d'Angular plutôt que l'attribut template
   */
  private setFormDisabledState(disabled: boolean): void {
    if (disabled) {
      this.uniteForm.disable();
    } else {
      this.uniteForm.enable();
    }
  }

  /**
   * Chargement des unités avec gestion d'état optimisée
   */
  chargerUnites(): void {
    this.setLoadingState(true);
    
    this.unitParameterService.units$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PaginatedResponse<UnitParameter> | null) => {
          this.setLoadingState(false);
          if (response) {
            this.updatePaginationState(response);
          }
        },
        error: (error) => {
          this.setLoadingState(false);
          this.handleError('Erreur lors du chargement des unités', error);
        }
      });
    
    this.unitParameterService.getUnits({ page: 0, size: this.pageSize });
  }

  /**
   * Soumission du formulaire
   */
  onSubmit(): void {
    if (this.uniteForm.valid && !this.loading) {
      const formValue = this.uniteForm.value;
      this.setLoadingState(true);

      if (this.modeEdition && this.uniteEnEdition) {
        this.modifierUnite(formValue);
      } else {
        this.ajouterUnite(formValue);
      }
    }
  }

  /**
   * Ajout d'une nouvelle unité
   */
  private ajouterUnite(unite: Omit<UnitParameter, 'id' | 'type'>): void {
    this.unitParameterService.addUnit(unite)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.setLoadingState(false);
          this.resetForm();
          this.unitParameterService.getUnits({ page: 0, size: this.pageSize });
        },
        error: (error) => {
          this.setLoadingState(false);
          this.handleError('Erreur lors de l\'ajout de l\'unité', error);
        }
      });
  }

  /**
   * Modification d'une unité existante
   */
  private modifierUnite(unite: Partial<UnitParameter>): void {
    if (this.uniteEnEdition?.id) {
      this.unitParameterService.updateUnit(this.uniteEnEdition.id, unite)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.setLoadingState(false);
            this.resetForm();
          },
          error: (error) => {
            this.setLoadingState(false);
            this.handleError('Erreur lors de la modification de l\'unité', error);
          }
        });
    }
  }

  /**
   * Commencer l'édition d'une unité
   */
  commencerEdition(unite: UnitParameter): void {
    this.uniteEnEdition = unite;
    this.modeEdition = true;
    
    // Patch des valeurs avec gestion du disabled state
    this.uniteForm.patchValue({
      label: unite.label,
      code: unite.code,
      hasStartDate: unite.hasStartDate,
      hasEndDate: unite.hasEndDate
    });
  }

  /**
   * Suppression d'une unité avec confirmation
   */
  supprimerUnite(id: string): void {
    if (this.confirmDeletion() && !this.loading) {
      this.setLoadingState(true);
      
      this.unitParameterService.deleteUnit(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.setLoadingState(false);
            if (this.uniteEnEdition?.id === id) {
              this.resetForm();
            }
          },
          error: (error) => {
            this.setLoadingState(false);
            this.handleError('Erreur lors de la suppression de l\'unité', error);
          }
        });
    }
  }

  /**
   * Annuler l'édition
   */
  annulerEdition(): void {
    this.resetForm();
  }

  /**
   * Gestion du changement de taille de page
   */
  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newSize = parseInt(target.value, 10);
    if (!isNaN(newSize) && newSize > 0) {
      this.pageSize = newSize;
      this.unitParameterService.getUnits({ page: 0, size: this.pageSize });
    }
  }

  /**
   * Navigation de pagination
   */
  changerPage(page: number): void {
    if (page >= 0 && page < this.totalPages && !this.loading) {
      this.unitParameterService.getUnits({ page, size: this.pageSize });
    }
  }

  pagePrecedente(): void {
    if (!this.isFirstPage) {
      this.changerPage(this.currentPage - 1);
    }
  }

  pageSuivante(): void {
    if (!this.isLastPage) {
      this.changerPage(this.currentPage + 1);
    }
  }

  /**
   * Rafraîchir les données
   */
  rafraichir(): void {
    if (!this.loading) {
      this.chargerUnites();
    }
  }

  // === MÉTHODES UTILITAIRES ===

  /**
   * Réinitialisation du formulaire et de l'état
   */
  private resetForm(): void {
    // Reset avec les valeurs par défaut et état enabled
    this.uniteForm.reset({
      label: '',
      code: '',
      hasStartDate: false,
      hasEndDate: false
    });
    
    // S'assurer que le formulaire est activé après le reset
    this.uniteForm.enable();
    
    this.uniteEnEdition = null;
    this.modeEdition = false;
    this.error = null;
  }

  /**
   * Gestion centralisée de l'état de chargement
   */
  private setLoadingState(loading: boolean): void {
    this.loading = loading;
    this.setFormDisabledState(loading);
    if (loading) {
      this.error = null;
    }
  }

  /**
   * Mise à jour de l'état de pagination
   */
  private updatePaginationState(response: PaginatedResponse<UnitParameter>): void {
    this.unites = response.content;
    this.currentPage = response.number;
    this.pageSize = response.size;
    this.totalElements = response.totalElements;
    this.totalPages = response.totalPages;
    this.isFirstPage = response.first;
    this.isLastPage = response.last;
  }

  /**
   * Gestion centralisée des erreurs
   */
  private handleError(message: string, error: any): void {
    this.error = message;
    console.error('Erreur:', error);
  }

  /**
   * Confirmation de suppression
   */
  private confirmDeletion(): boolean {
    return confirm('Êtes-vous sûr de vouloir supprimer cette unité de mesure ?');
  }

  // === GETTERS POUR LE TEMPLATE ===

  get label() { return this.uniteForm.get('label'); }
  get code() { return this.uniteForm.get('code'); }
  get hasStartDate() { return this.uniteForm.get('hasStartDate'); }
  get hasEndDate() { return this.uniteForm.get('hasEndDate'); }

  get paginationInfo(): string {
    if (this.totalElements === 0) return '0 éléments';
    const debut = this.currentPage * this.pageSize + 1;
    const fin = Math.min((this.currentPage + 1) * this.pageSize, this.totalElements);
    return `${debut}-${fin} sur ${this.totalElements}`;
  }

  get pagesDisponibles(): number[] {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(0, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages - 1, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  get isFormValid(): boolean {
    return this.uniteForm.valid && !this.loading;
  }

  get submitButtonText(): string {
    if (this.loading) {
      return this.modeEdition ? 'Modification...' : 'Ajout...';
    }
    return this.modeEdition ? 'Modifier' : 'Ajouter';
  }

  /**
   * Getter pour vérifier si un contrôle spécifique est désactivé
   * Utile pour le template
   */
  get isFormDisabled(): boolean {
    return this.uniteForm.disabled;
  }

  /**
   * TrackBy function pour optimiser la performance du ngFor
   */
  trackByFn(index: number, item: UnitParameter): string {
    return item.id || index.toString();
  }
}