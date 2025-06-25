import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UnitParameterService } from '../../../../core/services/unite-parametre.service';
import { UnitParameter,PaginatedResponse } from '../../../../models/unit-parameter';


@Component({
  selector: 'app-document',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy {
  // Data properties
  documents: UnitParameter[] = [];
  paginatedDocuments: PaginatedResponse<UnitParameter> | null = null;
  private subscription: Subscription = new Subscription();
  
  // Loading and UI states
  isLoading = false;
  isSubmitting = false;
  isLoadingMore = false;
  
  // Search functionality
  searchTerm = '';
  isSearching = false;

  // Form properties
  documentForm = {
    label: '',
    code: '',
    hasStartDate: false,
    hasEndDate: false
  };

  // Edit mode
  editingDocument: UnitParameter | null = null;
  editForm = {
    label: '',
    code: '',
    hasStartDate: false,
    hasEndDate: false
  };

  // Pagination
  currentPage = 0;
  pageSize = 10;

  constructor(private unitParameterService: UnitParameterService) {}

  ngOnInit(): void {
    this.loadDocuments();
    this.subscribeToDocuments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ========== DATA LOADING ==========
  
  private loadDocuments(): void {
    this.isLoading = true;
    this.unitParameterService.getDocuments({ 
      page: this.currentPage, 
      size: this.pageSize 
    });
  }

  private subscribeToDocuments(): void {
    this.subscription.add(
      this.unitParameterService.documents$.subscribe({
        next: (paginatedData) => {
          if (paginatedData) {
            this.paginatedDocuments = paginatedData;
            
            // Pour la pagination, on accumule les résultats
            if (this.currentPage === 0) {
              this.documents = paginatedData.content;
            } else {
              this.documents = [...this.documents, ...paginatedData.content];
            }
          }
          this.isLoading = false;
          this.isLoadingMore = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des documents:', error);
          this.isLoading = false;
          this.isLoadingMore = false;
        }
      })
    );
  }

  // ========== CRUD OPERATIONS ==========

  ajouterDocument(): void {
    if (!this.isFormValid() || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    
    const newDocument = {
      label: this.documentForm.label.trim(),
      code: this.documentForm.code.trim(),
      hasStartDate: this.documentForm.hasStartDate,
      hasEndDate: this.documentForm.hasEndDate
    };

    this.subscription.add(
      this.unitParameterService.addDocument(newDocument).subscribe({
        next: (document) => {
          this.resetForm();
          this.showSuccessMessage('Document ajouté avec succès');
          this.isSubmitting = false;
          // Recharger la première page pour voir le nouveau document
          this.refreshDocuments();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du document:', error);
          this.showErrorMessage('Erreur lors de l\'ajout du document');
          this.isSubmitting = false;
        }
      })
    );
  }

  modifierDocument(document: UnitParameter): void {
    this.editingDocument = document;
    this.editForm = {
      label: document.label,
      code: document.code,
      hasStartDate: document.hasStartDate,
      hasEndDate: document.hasEndDate
    };
  }

  sauvegarderModification(): void {
    if (!this.editingDocument || !this.isEditFormValid()) {
      return;
    }

    const updatedDocument = {
      label: this.editForm.label.trim(),
      code: this.editForm.code.trim(),
      hasStartDate: this.editForm.hasStartDate,
      hasEndDate: this.editForm.hasEndDate
    };

    this.subscription.add(
      this.unitParameterService.updateDocument(this.editingDocument.id!, updatedDocument).subscribe({
        next: () => {
          this.showSuccessMessage('Document modifié avec succès');
          this.annulerModification();
        },
        error: (error) => {
          console.error('Erreur lors de la modification:', error);
          this.showErrorMessage('Erreur lors de la modification du document');
        }
      })
    );
  }

  supprimerDocument(document: UnitParameter): void {
    if (!document.id || !confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      return;
    }

    this.subscription.add(
      this.unitParameterService.deleteDocument(document.id).subscribe({
        next: () => {
          this.showSuccessMessage('Document supprimé avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.showErrorMessage('Erreur lors de la suppression du document');
        }
      })
    );
  }

  // ========== SEARCH FUNCTIONALITY ==========

  onSearch(): void {
    if (this.searchTerm.trim().length < 2) {
      this.refreshDocuments();
      return;
    }

    this.isSearching = true;
    this.subscription.add(
      this.unitParameterService.searchByType('DOCUMENT', this.searchTerm, { 
        page: 0, 
        size: this.pageSize 
      }).subscribe({
        next: (searchResults) => {
          this.documents = searchResults.content;
          this.paginatedDocuments = searchResults;
          this.currentPage = 0;
          this.isSearching = false;
        },
        error: (error) => {
          console.error('Erreur lors de la recherche:', error);
          this.isSearching = false;
        }
      })
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.refreshDocuments();
  }

  // ========== PAGINATION ==========

  loadMore(): void {
    if (!this.paginatedDocuments || this.paginatedDocuments.last || this.isLoadingMore) {
      return;
    }

    this.isLoadingMore = true;
    this.currentPage++;
    this.unitParameterService.getDocuments({ 
      page: this.currentPage, 
      size: this.pageSize 
    });
  }

  refreshDocuments(): void {
    this.currentPage = 0;
    this.documents = [];
    this.loadDocuments();
  }

  // ========== FORM HELPERS ==========

  private isFormValid(): boolean {
    return this.documentForm.label.trim().length > 0 && 
           this.documentForm.code.trim().length > 0;
  }

  private isEditFormValid(): boolean {
    return this.editForm.label.trim().length > 0 && 
           this.editForm.code.trim().length > 0;
  }

  private resetForm(): void {
    this.documentForm = {
      label: '',
      code: '',
      hasStartDate: false,
      hasEndDate: false
    };
  }

  annulerModification(): void {
    this.editingDocument = null;
    this.editForm = {
      label: '',
      code: '',
      hasStartDate: false,
      hasEndDate: false
    };
  }

  // ========== UI HELPERS ==========

  isEditing(document: UnitParameter): boolean {
    return this.editingDocument?.id === document.id;
  }

  getStatusIcon(hasDate: boolean, isRequired: boolean): 'check' | 'x' | null {
    if (isRequired) {
      return hasDate ? 'check' : 'x';
    }
    return hasDate ? 'check' : null;
  }

  getStatusColor(hasDate: boolean, isRequired: boolean): string {
    if (isRequired) {
      return hasDate ? 'text-green-500' : 'text-red-500';
    }
    return hasDate ? 'text-green-500' : 'text-gray-400';
  }

  // ========== MESSAGES ==========

  private showSuccessMessage(message: string): void {
    // Ici vous pouvez implémenter votre système de notification
    // Par exemple avec un service de toast ou une notification
    console.log('✅', message);
    // Exemple: this.notificationService.showSuccess(message);
  }

  private showErrorMessage(message: string): void {
    // Ici vous pouvez implémenter votre système de notification d'erreur
    console.error('❌', message);
    // Exemple: this.notificationService.showError(message);
  }

  // ========== GETTERS FOR TEMPLATE ==========

  get canLoadMore(): boolean {
    return this.paginatedDocuments ? !this.paginatedDocuments.last : false;
  }

  get totalDocuments(): number {
    return this.paginatedDocuments ? this.paginatedDocuments.totalElements : 0;
  }

  get hasDocuments(): boolean {
    return this.documents.length > 0;
  }
}