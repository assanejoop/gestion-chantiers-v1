
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RealestateService, PropertyType, Promoter } from '../../../../core/services/realestate.service';
// import { CfaFormatPipe } from '../../../../cfa-format.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  projectForm!: FormGroup;
  planFile?: File;
  legalStatusFile?: File;
  isSubmitting = false;
  
  // Types de propriétés et promoteurs (chargés depuis l'API)
  propertyTypes: any[] = [];
  promoters: Promoter[] = [];
  isLoadingData = false;
  loadingError = '';

  selectedFiles = {
    plan: null as string | null,
    legalStatus: null as string | null
  };
    form: any;

  constructor(
    private fb: FormBuilder,
    private realestateService: RealestateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.isLoadingData = true;
    this.loadingError = '';

    // Charger les types de propriétés avec gestion d'erreur améliorée
    this.realestateService.getPropertyTypes().subscribe({
      next: (types) => {
        this.propertyTypes = types;
        console.log('Types de propriétés chargés:', types);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des types de propriétés:', error);
        this.loadingError = 'Erreur de chargement des types de propriétés';
        // Fallback avec des données par défaut
        this.propertyTypes = [
          { id: 1, typename: 'Appartement' },
          { id: 2, typename: 'Villa' },
          { id: 3, typename: 'Bureau' },
          { id: 4, typename: 'Local commercial' }
        ];
      }
    });

    // Charger les promoteurs avec gestion d'erreur améliorée
    this.realestateService.getPromoters().subscribe({
      next: (promoters) => {
        this.promoters = promoters;
        this.isLoadingData = false;
        console.log('Promoteurs chargés:', promoters);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des promoteurs:', error);
        this.loadingError = 'Erreur de chargement des promoteurs';
        // Fallback avec des données par défaut
        this.promoters = [
          { id: 1, name: 'Promoteur par défaut', email: 'default@example.com' }
        ];
        this.isLoadingData = false;
      }
    });
  }

  private initializeForm(): void {
    this.projectForm = this.fb.group({
      // Informations générales
      name: ['', [Validators.required, Validators.minLength(3)]],
      number: [null, [Validators.required, Validators.min(1)]],
      // Type de propriété
      
      propertyTypeId: [null, Validators.required],
      area: [null, [Validators.required, Validators.min(1)]],
      // price: [null, [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]],
      numberOfLots: [null, [Validators.required, Validators.min(1)]],
      numberOfRooms: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.maxLength(1000)],
      latitude: [null],
      longitude: [null],
      promoterId: [null, Validators.required],
      
      // Équipements communs
      hasHall: [false],
      hasParking: [false],
      hasElevator: [false],
      hasSharedTerrace: [false],
      hasGym: [false],
      hasPlayground: [false],
      hasSwimmingPool: [false],
      hasSecurityService: [false],
      hasGarden: [false],
      hasBicycleStorage: [false],
      hasLaundryRoom: [false],
      hasStorageRooms: [false],
      hasWasteDisposalArea: [false],
      mezzanine: [false]
    }, { validators: this.dateRangeValidator });
  }

  // Validateur personnalisé pour vérifier que la date de fin est après la date de début
  private dateRangeValidator(form: FormGroup) {
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('endDate')?.value;
    
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return { dateRange: true };
    }
    return null;
  }

  onFileChange(event: any, type: 'plan' | 'legal'): void {
    const file = event.target.files[0];
    if (!file) return;

    // Validation du fichier
    const fileType = type === 'plan' ? 'image' : 'pdf';
    const validation = this.realestateService.validateFile(file, fileType);
    
    if (!validation.valid) {
      alert(validation.error);
      event.target.value = ''; // Reset input
      return;
    }

    if (type === 'plan') {
      this.planFile = file;
      this.selectedFiles.plan = file.name;
    } else {
      this.legalStatusFile = file;
      this.selectedFiles.legalStatus = file.name;
    }
  }

  onPriceFormattedChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
    const numericValue = parseInt(cleaned, 10);
    if (!isNaN(numericValue)) {
      this.form.get('price')?.setValue(numericValue);
    } else {
      this.form.get('price')?.setValue(null);
    }
  }
  

  onSubmit(): void {
    // Validation du formulaire
    if (this.projectForm.invalid) {
      this.markFormGroupTouched();
      this.showValidationErrors();
      return;
    }

    // Validation des fichiers
    if (!this.planFile) {
      alert('Veuillez sélectionner un plan (image)');
      return;
    }

    this.isSubmitting = true;
    
    try {
      // Préparer les données pour l'API
      const projectData = this.realestateService.prepareProjectData(this.projectForm.value);
      
      console.log('Données du projet à envoyer:', projectData);

      this.realestateService.createProject(projectData, this.planFile)
        .subscribe({
          next: (response) => {
            console.log('Projet créé avec succès', response);
            alert('Projet créé avec succès !');
            this.resetForm();
            // Redirection optionnelle
            // this.router.navigate(['/projects']);
          },
          error: (error) => {
            console.error('Erreur lors de la création du projet:', error);
            
            // Message d'erreur plus convivial
            let errorMessage = 'Erreur lors de la création du projet';
            if (error && error.message) {
              errorMessage = error.message;
            }
            
            alert(errorMessage);
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
    } catch (error) {
      console.error('Erreur lors de la préparation des données:', error);
      alert('Erreur lors de la préparation des données du projet');
      this.isSubmitting = false;
    }
  }

  private showValidationErrors(): void {
    const errors = [];
    
    if (this.nameControl?.hasError('required')) {
      errors.push('Le nom du projet est requis');
    }
    if (this.numberControl?.hasError('required')) {
      errors.push('Le nom du projet est requis');
    }
    if (this.propertyTypeControl?.hasError('required')) {
      errors.push('Le type de propriété est requis');
    }
    if (this.areaControl?.hasError('required')) {
      errors.push('La surface est requise');
    }
    if (this.priceControl?.hasError('required')) {
      errors.push('Le prix est requis');
    }
    if (this.startDateControl?.hasError('required')) {
      errors.push('La date de début est requise');
    }
    if (this.endDateControl?.hasError('required')) {
      errors.push('La date de fin est requise');
    }
    if (this.projectForm.hasError('dateRange')) {
      errors.push('La date de fin doit être après la date de début');
    }
    
    if (errors.length > 0) {
      alert('Veuillez corriger les erreurs suivantes:\n' + errors.join('\n'));
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.projectForm.controls).forEach(key => {
      const control = this.projectForm.get(key);
      control?.markAsTouched();
    });
  }

  private resetForm(): void {
    this.projectForm.reset();
    this.planFile = undefined;
    this.legalStatusFile = undefined;
    this.selectedFiles = {
      plan: null,
      legalStatus: null
    };
    
    // Réinitialiser les checkboxes à false
    Object.keys(this.projectForm.controls).forEach(key => {
      const control = this.projectForm.get(key);
      if (typeof control?.value === 'boolean') {
        control.setValue(false);
      }
    });
  }

  onCancel(): void {
    if (confirm('Êtes-vous sûr de vouloir annuler ? Toutes les données saisies seront perdues.')) {
      this.resetForm();
      // Redirection optionnelle
      // this.router.navigate(['/projects']);
    }
  }

  // Méthode pour recharger les données en cas d'erreur
  retryLoadData(): void {
    this.loadInitialData();
  }

  // Getters pour la validation dans le template
  get nameControl() { return this.projectForm.get('name'); }
  get numberControl() { return this.projectForm.get('number'); }
  get propertyTypeControl() { return this.projectForm.get('propertyTypeId'); }
  get areaControl() { return this.projectForm.get('area'); }
  get priceControl() { return this.projectForm.get('price'); }
  get startDateControl() { return this.projectForm.get('startDate'); }
  get endDateControl() { return this.projectForm.get('endDate'); }
  get addressControl() { return this.projectForm.get('address'); }
  get numberOfLotsControl() { return this.projectForm.get('numberOfLots'); }
  get numberOfRoomsControl() { return this.projectForm.get('numberOfRooms'); }
  get promoterControl() { return this.projectForm.get('promoterId'); }

  // Helper pour vérifier si un champ a une erreur
  hasError(controlName: string, errorType: string): boolean {
    const control = this.projectForm.get(controlName);
    return !!(control?.hasError(errorType) && control?.touched);
  }

  // Helper pour obtenir le message d'erreur
  getErrorMessage(controlName: string): string {
    const control = this.projectForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (control?.hasError('minlength')) {
      return `Minimum ${control.errors?.['minlength'].requiredLength} caractères`;
    }
    if (control?.hasError('min')) {
      return `La valeur doit être supérieure à ${control.errors?.['min'].min}`;
    }
    if (this.projectForm.hasError('dateRange')) {
      return 'La date de fin doit être après la date de début';
    }
    return '';
  }

  trackByTypeId(index: number, type: PropertyType): number {
    return type.id;
  }
  
}