import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { UnitParameter,PaginatedResponse } from '../../../../models/unit-parameter';
import { UnitParameterService } from '../../../../core/services/unite-parametre.service';

@Component({
  selector: 'app-material-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './material-category.component.html',
  styleUrls: ['./material-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialCategoryComponent implements OnInit, OnDestroy {
  // Data properties
  categories: UnitParameter[] = [];
  paginationInfo: PaginatedResponse<UnitParameter> | null = null;
  
  // Loading states
  isLoading = false;
  isLoadingMore = false;
  isSubmitting = false;
  
  // Search
  searchTerm = '';
  private searchSubject = new Subject<string>();
  
  // Error handling
  error: string | null = null;
  
  // Form properties
  nouvelleCategorie = {
    label: '',
    code: '',
    hasStartDate: false,
    hasEndDate: false
  };
  
  // Validation
  formErrors: { [key: string]: string } = {};
  
  // Edit mode
  editingCategory: UnitParameter | null = null;
  editForm = {
    label: '',
    code: '',
    hasStartDate: false,
    hasEndDate: false
  };
  
  // Destroy subject for cleanup
  private destroy$ = new Subject<void>();
  
  constructor(
    private unitParameterService: UnitParameterService,
    private cdr: ChangeDetectorRef
  ) {
    this.setupSearch();
  }
  
  ngOnInit(): void {
    this.loadCategories();
    this.setupSubscriptions();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // ========== SETUP METHODS ==========
  
  private setupSubscriptions(): void {
    // Subscribe to material categories changes
    this.unitParameterService.materialCategories$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (paginatedData) => {
          if (paginatedData) {
            this.paginationInfo = paginatedData;
            this.categories = paginatedData.content;
            this.error = null;
          }
          this.isLoading = false;
          this.isLoadingMore = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.handleError('Erreur lors du chargement des catégories', error);
          this.isLoading = false;
          this.isLoadingMore = false;
          this.cdr.markForCheck();
        }
      });
  }
  
  private setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        if (searchTerm.trim()) {
          this.performSearch(searchTerm);
        } else {
          this.loadCategories();
        }
      });
  }
  
  // ========== DATA LOADING METHODS ==========
  
  loadCategories(page: number = 0, size: number = 10): void {
    this.isLoading = page === 0;
    this.error = null;
    this.unitParameterService.getMaterialCategories({ page, size });
  }
  
  loadMoreCategories(): void {
    if (this.paginationInfo && !this.paginationInfo.last && !this.isLoadingMore) {
      this.isLoadingMore = true;
      this.unitParameterService.loadMoreMaterialCategories();
    }
  }
  
  refreshCategories(): void {
    this.loadCategories();
  }
  
  // ========== SEARCH METHODS ==========
  
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchSubject.next(this.searchTerm);
  }
  
  private performSearch(searchTerm: string): void {
    this.isLoading = true;
    this.unitParameterService.searchByType('MATERIAL_CATEGORY', searchTerm)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (paginatedData) => {
          this.paginationInfo = paginatedData;
          this.categories = paginatedData.content;
          this.isLoading = false;
          this.error = null;
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.handleError('Erreur lors de la recherche', error);
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }
  
  clearSearch(): void {
    this.searchTerm = '';
    this.searchSubject.next('');
  }
  
  // ========== CRUD METHODS ==========
  
  ajouterCategorie(): void {
    if (!this.validateForm(this.nouvelleCategorie)) {
      return;
    }
    
    this.isSubmitting = true;
    this.error = null;
    
    const categoryData = {
      label: this.nouvelleCategorie.label.trim(),
      code: this.nouvelleCategorie.code.trim().toUpperCase(),
      hasStartDate: this.nouvelleCategorie.hasStartDate,
      hasEndDate: this.nouvelleCategorie.hasEndDate
    };
    
    this.unitParameterService.addMaterialCategory(categoryData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newCategory) => {
          this.resetForm();
          this.isSubmitting = false;
          this.showSuccess('Catégorie ajoutée avec succès');
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.handleError('Erreur lors de l\'ajout de la catégorie', error);
          this.isSubmitting = false;
          this.cdr.markForCheck();
        }
      });
  }
  
  supprimerCategorie(id: string): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      return;
    }
    
    this.unitParameterService.deleteMaterialCategory(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showSuccess('Catégorie supprimée avec succès');
        },
        error: (error) => {
          this.handleError('Erreur lors de la suppression', error);
        }
      });
  }
  
  modifierCategorie(category: UnitParameter): void {
    this.editingCategory = category;
    this.editForm = {
      label: category.label,
      code: category.code,
      hasStartDate: category.hasStartDate,
      hasEndDate: category.hasEndDate
    };
    this.formErrors = {};
  }
  
  sauvegarderModification(): void {
    if (!this.editingCategory || !this.validateForm(this.editForm)) {
      return;
    }
    
    const updateData = {
      label: this.editForm.label.trim(),
      code: this.editForm.code.trim().toUpperCase(),
      hasStartDate: this.editForm.hasStartDate,
      hasEndDate: this.editForm.hasEndDate
    };
    
    this.unitParameterService.updateMaterialCategory(this.editingCategory.id!, updateData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.annulerModification();
          this.showSuccess('Catégorie mise à jour avec succès');
        },
        error: (error) => {
          this.handleError('Erreur lors de la mise à jour', error);
        }
      });
  }
  
  annulerModification(): void {
    this.editingCategory = null;
    this.editForm = {
      label: '',
      code: '',
      hasStartDate: false,
      hasEndDate: false
    };
    this.formErrors = {};
  }
  
  // ========== UTILITY METHODS ==========
  
  isEditing(category: UnitParameter): boolean {
    return this.editingCategory?.id === category.id;
  }
  
  canLoadMore(): boolean {
    return this.paginationInfo ? !this.paginationInfo.last : false;
  }
  
  getTotalElements(): number {
    return this.paginationInfo?.totalElements || 0;
  }
  
  getCurrentPage(): number {
    return this.paginationInfo ? this.paginationInfo.number + 1 : 1;
  }
  
  getTotalPages(): number {
    return this.paginationInfo?.totalPages || 1;
  }
  
  // ========== VALIDATION ==========
  
  private validateForm(formData: any): boolean {
    this.formErrors = {};
    let isValid = true;
    
    // Validation du label
    if (!formData.label?.trim()) {
      this.formErrors['label'] = 'Le libellé est requis';
      isValid = false;
    } else if (formData.label.trim().length < 2) {
      this.formErrors['label'] = 'Le libellé doit contenir au moins 2 caractères';
      isValid = false;
    }
    
    // Validation du code
    if (!formData.code?.trim()) {
      this.formErrors['code'] = 'Le code est requis';
      isValid = false;
    } else if (formData.code.trim().length < 2) {
      this.formErrors['code'] = 'Le code doit contenir au moins 2 caractères';
      isValid = false;
    } else if (!/^[A-Z0-9_]+$/.test(formData.code.trim().toUpperCase())) {
      this.formErrors['code'] = 'Le code ne peut contenir que des lettres, chiffres et underscores';
      isValid = false;
    }
    
    // Vérifier l'unicité du code (si pas en mode édition ou si le code a changé)
    if (formData.code?.trim()) {
      const codeExists = this.categories.some(cat => 
        cat.code.toUpperCase() === formData.code.trim().toUpperCase() &&
        (!this.editingCategory || cat.id !== this.editingCategory.id)
      );
      
      if (codeExists) {
        this.formErrors['code'] = 'Ce code existe déjà';
        isValid = false;
      }
    }
    
    this.cdr.markForCheck();
    return isValid;
  }
  
  hasError(field: string): boolean {
    return !!this.formErrors[field];
  }
  
  getError(field: string): string {
    return this.formErrors[field] || '';
  }
  
  // ========== FORM MANAGEMENT ==========
  
  private resetForm(): void {
    this.nouvelleCategorie = {
      label: '',
      code: '',
      hasStartDate: false,
      hasEndDate: false
    };
    this.formErrors = {};
  }
  
  onFormInput(field: string): void {
    // Clear error when user starts typing
    if (this.formErrors[field]) {
      delete this.formErrors[field];
      this.cdr.markForCheck();
    }
  }
  
  // ========== ERROR HANDLING ==========
  
  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.error = error?.message || message;
  }
  
  private showSuccess(message: string): void {
    // Vous pouvez implémenter un système de notifications ici
    console.log(message);
  }
  
  clearError(): void {
    this.error = null;
    this.cdr.markForCheck();
  }
  
  // ========== KEYBOARD EVENTS ==========
  
  onKeyDown(event: KeyboardEvent, action: 'save' | 'cancel' | 'add'): void {
    if (event.key === 'Enter' && action === 'save') {
      this.sauvegarderModification();
    } else if (event.key === 'Escape' && action === 'cancel') {
      this.annulerModification();
    } else if (event.key === 'Enter' && action === 'add') {
      this.ajouterCategorie();
    }
  }

  trackByCategory(index: number, category: UnitParameter): string {
    return category.id || index.toString();
  }
}