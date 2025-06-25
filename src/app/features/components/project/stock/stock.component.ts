import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MaterialsService } from '../../../../core/services/materials.service.';
import { Material,CreateMaterial,MaterialsResponse } from '../../../../models/material.model';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { UnitParameterService } from '../../../../core/services/unite-parametre.service';
import { UnitParameter,PaginatedResponse } from '../../../../models/unit-parameter';
import { PropertyTypeService } from '../../../../core/services/property-type.service';
import { PropertyType } from '../../../../models/property-type';
import { StatistitqueComponent } from "../../statistique/statistique.component";
// import { StatistiqueComponent } from '../../statistique/statistique.component';

interface StockAlert {
  id: number;
  message: string;
  createdAt: Date;
  materialId: number;
}

interface Movement {
  id: number;
  type: 'ENTRY' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  reference: string;
  comment?: string;
  date: string;
  time: string;
  description: string;
  location: string;
  materialId: number;
}

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, StatistitqueComponent],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  units: UnitParameter[] = [];
  
  properties: PropertyType[] = [];

  pageSize = 10;

  activeTab: string = 'inventaires';
  loading: boolean = false;
  showNewMaterialModal: boolean = false;
  showMovementModal: boolean = false;
  openDropdownIndex: number | null = null;

  materials: Material[] = [];
  filteredMaterials: Material[] = [];
  paginatedMaterials: Material[] = [];
  stockAlerts: StockAlert[] = [];
  recentMovements: Movement[] = [];
  selectedMaterial: Material | null = null;

  searchTerm: string = '';
  selectedCategory: string = '';
  selectedStockStatus: string = '';

  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;

  materialForm: FormGroup;
  movementForm: FormGroup;
  currentSortField: string = 'label';
  currentSortDirection: 'asc' | 'desc' = 'asc';
data: any;


  constructor(
    private fb: FormBuilder,
    private materialsService: MaterialsService,
    private unitParameterService: UnitParameterService,
    private propertyService: PropertyTypeService
  ) {
    this.materialForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(2)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      criticalThreshold: [0, [Validators.required, Validators.min(0)]],
      unitId: [1, [Validators.required, Validators.min(1)]],
      propertyId: [1, [Validators.required, Validators.min(1)]]
    });

    this.movementForm = this.fb.group({
      type: ['ENTRY', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      reference: ['', Validators.required],
      comment: ['']
    });
  }

  ngOnInit(): void {
    this.loadMaterials();
    this.loadRecentMovements();
    this.loadUnits();
    this.loadProperties(); 
  }




  /**
   * Chargement des unités depuis le service
   * Utilise un Subject pour gérer la destruction du composant
   */
  loadUnits(): void {
    this.unitParameterService.units$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: PaginatedResponse<UnitParameter> | null) => {
          if (res) {
            this.units = res.content;
          }
        },
        error: (err) => {
          console.error('Erreur lors du chargement des unités', err);
        }
      });

    this.unitParameterService.getUnits({ page: 0, size: this.pageSize });
  }
  
  loadProperties(): void {
    this.propertyService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PropertyType[]) => {
          this.properties = response;
          console.log('Propriétés récupérées:', this.properties);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des propriétés:', err);
        }
      });
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  loadMaterials() {
    this.materialsService.getMaterials().subscribe({
      next: (data) => {
        // this.materials = data.content || data;
        console.log("response api",data);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des matériaux :', error);
      }
    })
  }
  generateStockAlerts(): void {
    this.stockAlerts = [];

    this.materials.forEach(material => {
      const status = this.getMaterialStatus(material);
      if (status === 'CRITICAL' || status === 'LOW') {
        const alert: StockAlert = {
          id: material.id || 0,
          message: `${status === 'CRITICAL' ? 'Stock critique' : 'Stock faible'}: ${this.getMaterialName(material)} (${this.getMaterialStock(material)} ${this.getMaterialUnit(material)})`,
          createdAt: new Date(),
          materialId: material.id || 0
        };
        this.stockAlerts.push(alert);
      }
    });
  }

  showErrorMessage(message: string): void {
    console.error(message);
  }

  filterMaterials(): void {
    this.filteredMaterials = this.materials.filter(material => {
      const matchesSearch = !this.searchTerm || this.getMaterialName(material).toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.selectedStockStatus || this.getMaterialStatus(material) === this.selectedStockStatus;
      return matchesSearch && matchesStatus;
    });
    this.updateLocalPagination();
  }

  updateLocalPagination(): void {
    this.paginatedMaterials = this.filteredMaterials.slice(0, this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadMaterials();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadMaterials();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMaterials();
    }
  }

  loadRecentMovements(): void {
    this.recentMovements = [];
  }

  getMaterialName(material: Material): string {
    return material.label || 'N/A';
  }

  getMaterialStock(material: Material): number {
    return material.quantity || 0;
  }

  getMaterialUnit(material: Material): string {
    return material.unit?.code || material.unit?.label || 'N/A';
  }

  getMaterialThreshold(material: Material): number {
    return material.criticalThreshold || 0;
  }

  getMaterialStatus(material: Material): string {
    const stock = this.getMaterialStock(material);
    const threshold = this.getMaterialThreshold(material);

    if (stock <= threshold) {
      return 'CRITICAL';
    } else if (stock <= threshold * 1.5) {
      return 'LOW';
    }
    return 'NORMAL';
  }

  getStatusClass(status: string): string {
    const classes = {
      'NORMAL': 'bg-green-100 text-green-800',
      'LOW': 'bg-yellow-100 text-yellow-800',
      'CRITICAL': 'bg-red-100 text-red-800'
    };
    return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }

  getMovementTypeClass(type: string): string {
    const classes = {
      'ENTRY': 'text-green-600',
      'OUT': 'text-red-600',
      'ADJUSTMENT': 'text-blue-600'
    };
    return classes[type as keyof typeof classes] || 'text-gray-600';
  }

  toggleDropdown(index: number, event: Event): void {
    event.stopPropagation();
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }

  closeDropdown(): void {
    this.openDropdownIndex = null;
  }

  onAction(action: string, material: Material, event: Event): void {
    event.stopPropagation();
    this.closeDropdown();

    switch (action) {
      case 'modifier':
        this.editMaterial(material);
        break;
      case 'commander':
        this.orderMaterial(material);
        break;
      case 'historique':
        this.showMaterialHistory(material);
        break;
      case 'supprimer':
        this.deleteMaterial(material);
        break;
    }
  }

  openNewMaterialModal(): void {
    this.showNewMaterialModal = true;
    this.resetMaterialForm();
  }

  closeNewMaterialModal(): void {
    this.showNewMaterialModal = false;
    this.resetMaterialForm();
  }

  openMovementModal(material: Material): void {
    this.selectedMaterial = material;
    this.showMovementModal = true;
    this.resetMovementForm();
  }

  closeMovementModal(): void {
    this.showMovementModal = false;
    this.selectedMaterial = null;
    this.resetMovementForm();
  }

  resetMaterialForm(): void {
    this.materialForm.reset({
      label: '',
      quantity: 0,
      criticalThreshold: 0,
      unitId: 1,
      propertyId: 1
    });
  }

  resetMovementForm(): void {
    this.movementForm.reset({
      type: 'ENTRY',
      quantity: 0,
      reference: '',
      comment: ''
    });
  }

  isFormValid(): boolean {
    return this.materialForm.valid;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.materialForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.materialForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Ce champ est requis';
      }
      if (field.errors['minlength']) {
        return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
      }
      if (field.errors['min']) {
        return `La valeur doit être supérieure ou égale à ${field.errors['min'].min}`;
      }
    }
    return '';
  }

  onSaveNewMaterial(): void {
    if (this.materialForm.valid && !this.loading) {
      this.loading = true;
  
      const newMaterial: CreateMaterial = {
        label: this.materialForm.value.label,
        quantity: this.materialForm.value.quantity,
        criticalThreshold: this.materialForm.value.criticalThreshold,
        unitId: this.materialForm.value.unitId,
        propertyId: this.materialForm.value.propertyId,
       
      };
  
      console.log('🔧 Matériau à créer :', newMaterial);
  
      this.materialsService.createMaterial(newMaterial)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loading = false;
            this.closeNewMaterialModal();
            this.loadMaterials();
            this.showSuccessMessage('Matériau ajouté avec succès !');
          },
          error: (error) => {
            this.loading = false;
            this.showErrorMessage('Erreur lors de l\'ajout du matériau.');
          }
        });
    }
  }
  
  

  showSuccessMessage(message: string): void {
    console.log('✅', message);
  }

  onSubmit(): void {
    // this.onSaveNewMaterial();
  }

  editMaterial(material: Material): void {
    console.log('Modifier', material);
  }

  orderMaterial(material: Material): void {
    console.log('Commander', material);
  }

  showMaterialHistory(material: Material): void {
    console.log('Historique', material);
  }

  deleteMaterial(material: Material): void {
    if (confirm(`Supprimer "${material.label}" ?`)) {
      console.log('Supprimer', material);
    }
  }

  get displayCurrentPage(): number {
    return this.currentPage + 1;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
