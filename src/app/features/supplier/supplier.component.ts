import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface TeamMember {
  id: number;
  name: string;
  phone: string;
  email: string;
  position: string;
  status: 'affecté' | 'non-affecté' | 'en mission' | 'inactive';
  selected: boolean;
}


@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})



export class SupplierComponent {

  nouveauFournisseur = {
    raisonSociale: '',
    nomContact: '',
    telephone: '',
    email: ''
  };

  allTeamMembers: TeamMember[] = [];
  displayedMembers: TeamMember[] = [];
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;
  selectAll = false;
  totalMembers = 0;
  startIndex = 1;
  endIndex = 10;
  searchQuery: string = '';
 
  selectedPeriod: string = '';
  selectedStatus: string = '';
  
  showModal = false;
  searchTerm = '';

  ngOnInit() {
    this.loadTeamMembers();
    this.paginateData();
  }

  loadTeamMembers() {
    this.allTeamMembers = [
      { id: 1, name: 'Aziz Ndiaye', phone: '+221-70-986-45-43', email: 'azizndiaye@gmail.com', position: 'Gestionnaire de Projet', status: 'affecté', selected: true },
      { id: 2, name: 'Abdoul Cisse', phone: '+221-70-986-45-43', email: 'abdoulcisse@gmail.com', position: 'Ouvrier', status: 'affecté', selected: true },
      { id: 3, name: 'Ndeye Sine', phone: '+221-70-986-45-43', email: 'ndeyesine@gmail.com', position: 'Ouvrier', status: 'non-affecté', selected: true },
      { id: 4, name: 'Ndeye Seck', phone: '+221-70-986-45-43', email: 'ndeyeseck@gmail.com', position: 'Ouvrier', status: 'affecté', selected: true },
      { id: 5, name: 'Aboulaye Kane', phone: '+221-70-986-45-43', email: 'aboulayekane@gmail.com', position: 'Responsable Financier', status: 'non-affecté', selected: true },
      { id: 6, name: 'Maïmouna Sarr', phone: '+221-70-986-45-43', email: 'maïmounasarr@gmail.com', position: 'Responsable Financier', status: 'affecté', selected: true },
      { id: 7, name: 'Salimata Soumaré', phone: '+221-70-986-45-43', email: 'salisoumaré@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 8, name: 'Assane Gueye', phone: '+221-70-986-45-43', email: 'assanegueye@gmail.com', position: 'Ouvrier', status: 'en mission', selected: false },
      { id: 9, name: 'Omar Leye', phone: '+221-70-986-45-43', email: 'omarleye@gmail.com', position: 'Chef de chantier', status: 'affecté', selected: false },
      { id: 10, name: 'Cheikh Ndoye', phone: '+221-70-986-45-43', email: 'cheikhndoye@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 11, name: 'Papis A.M Camara', phone: '+221-70-986-45-43', email: 'papis.camara @gmail.com', position: 'Ouvrier', status: 'inactive', selected: false },
      { id: 12, name: 'Astou Sy', phone: '+221-70-986-45-43', email: 'astousy@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 13, name: 'Mame marie Ndoye', phone: '+221-70-986-45-43', email: 'mamemariendoye@gmail.com', position: 'Ouvrier', status: 'non-affecté', selected: false },
      { id: 14, name: 'Ousmane Ndiaye', phone: '+221-70-986-45-43', email: 'ousmanendiaye@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 15, name: 'Saliou Diop', phone: '+221-70-986-45-43', email: 'salioudiop@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 16, name: 'Aminata Diallo', phone: '+221-70-986-45-43', email: 'aminatadiallo@gmail.com', position: 'Responsable RH', status: 'affecté', selected: false },
      { id: 17, name: 'Ibrahima Sow', phone: '+221-70-986-45-43', email: 'ibrahimasow@gmail.com', position: 'Ouvrier', status: 'non-affecté', selected: false },
      { id: 18, name: 'Fatou Fall', phone: '+221-70-986-45-43', email: 'fatoufall@gmail.com', position: 'Secrétaire', status: 'affecté', selected: false },
      { id: 19, name: 'Moussa Diagne', phone: '+221-70-986-45-43', email: 'moussadiagne@gmail.com', position: 'Ouvrier', status: 'en mission', selected: false },
      { id: 20, name: 'Aida Mbaye', phone: '+221-70-986-45-43', email: 'aidambaye@gmail.com', position: 'Comptable', status: 'affecté', selected: false },
      // On peut ajouter d'autres membres pour tester avec plus de données
      { id: 21, name: 'Modou Faye', phone: '+221-70-986-45-43', email: 'modoufaye@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 22, name: 'Sokhna Diop', phone: '+221-70-986-45-43', email: 'sokhnadiop@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 23, name: 'Amadou Ba', phone: '+221-70-986-45-43', email: 'amadouba@gmail.com', position: 'Ouvrier', status: 'non-affecté', selected: false },
      { id: 24, name: 'Dieynaba Seck', phone: '+221-70-986-45-43', email: 'dieynabaseck@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 25, name: 'Babacar Ndiaye', phone: '+221-70-986-45-43', email: 'babacarndiaye@gmail.com', position: 'Ingénieur', status: 'affecté', selected: false },
      { id: 26, name: 'Coumba Gueye', phone: '+221-70-986-45-43', email: 'coumbagueye@gmail.com', position: 'Ouvrier', status: 'inactive', selected: false },
      { id: 27, name: 'Oumar Sall', phone: '+221-70-986-45-43', email: 'oumarsall@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 28, name: 'Awa Thiam', phone: '+221-70-986-45-43', email: 'awathiam@gmail.com', position: 'Responsable Logistique', status: 'affecté', selected: false },
      { id: 29, name: 'Lamine Diallo', phone: '+221-70-986-45-43', email: 'laminediallo@gmail.com', position: 'Ouvrier', status: 'en mission', selected: false },
      { id: 30, name: 'Maty Gueye', phone: '+221-70-986-45-43', email: 'matygueye@gmail.com', position: 'Ouvrier', status: 'non-affecté', selected: false },
      { id: 31, name: 'Djibril Kane', phone: '+221-70-986-45-43', email: 'djibrilkane@gmail.com', position: 'Gestionnaire de Stock', status: 'affecté', selected: false },
      { id: 32, name: 'Ndeye Diop', phone: '+221-70-986-45-43', email: 'ndeyediop@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 33, name: 'Cheikh Fall', phone: '+221-70-986-45-43', email: 'cheikhfall@gmail.com', position: 'Ouvrier', status: 'non-affecté', selected: false },
      { id: 34, name: 'Khady Sow', phone: '+221-70-986-45-43', email: 'khadysow@gmail.com', position: 'Secrétaire', status: 'affecté', selected: false },
      { id: 35, name: 'Mamadou Diouf', phone: '+221-70-986-45-43', email: 'mamadoudiouf@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 36, name: 'Penda Ndoye', phone: '+221-70-986-45-43', email: 'pendandoye@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
      { id: 37, name: 'Serigne Mbaye', phone: '+221-70-986-45-43', email: 'serignembaye@gmail.com', position: 'Chef d\'équipe', status: 'affecté', selected: false },
      { id: 38, name: 'Sokhna Niang', phone: '+221-70-986-45-43', email: 'sokhnaniang@gmail.com', position: 'Ouvrier', status: 'inactive', selected: false },
      { id: 39, name: 'Idrissa Gueye', phone: '+221-70-986-45-43', email: 'idrissagueye@gmail.com', position: 'Ouvrier', status: 'non-affecté', selected: false },
      { id: 40, name: 'Maimouna Diallo', phone: '+221-70-986-45-43', email: 'maimounadiallo@gmail.com', position: 'Ouvrier', status: 'affecté', selected: false },
    ];
    
    this.totalMembers = this.allTeamMembers.length;
    this.calculateTotalPages();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.allTeamMembers.length / this.itemsPerPage);
  }

  paginateData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    
    this.displayedMembers = this.allTeamMembers.slice(start, end);
    
    this.startIndex = start + 1;
    this.endIndex = Math.min(end, this.totalMembers);
    
    // Reset select all checkbox when changing pages
    this.updateSelectAllState();
  }

  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    this.displayedMembers.forEach(member => member.selected = this.selectAll);
    
    // Update the selection state in the main array too
    const start = (this.currentPage - 1) * this.itemsPerPage;
    for (let i = 0; i < this.displayedMembers.length; i++) {
      this.allTeamMembers[start + i].selected = this.selectAll;
    }
  }

  toggleMemberSelection(member: TeamMember) {
    // Toggle in displayed array
    const displayedIndex = this.displayedMembers.findIndex(m => m.id === member.id);
    if (displayedIndex >= 0) {
      this.displayedMembers[displayedIndex].selected = !this.displayedMembers[displayedIndex].selected;
    }
    
    // Toggle in main array
    const mainIndex = this.allTeamMembers.findIndex(m => m.id === member.id);
    if (mainIndex >= 0) {
      this.allTeamMembers[mainIndex].selected = !this.allTeamMembers[mainIndex].selected;
    }
    
    this.updateSelectAllState();
  }

  updateSelectAllState() {
    this.selectAll = this.displayedMembers.length > 0 && this.displayedMembers.every(member => member.selected);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'affecté': return 'text-green-500';
      case 'non-affecté': return 'text-red-500';
      case 'en mission': return 'text-blue-500';
      case 'inactive': return 'text-gray-500';
      default: return '';
    }
  }

  getStatusDot(status: string): string {
    return status === 'affecté' ? 'bg-green-500' : 
           status === 'non-affecté' ? 'bg-red-500' : 
           status === 'en mission' ? 'bg-blue-500' : 
           'bg-gray-500';
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateData();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      // If total pages is less than maxVisiblePages, show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;
      
      // Adjust if endPage exceeds totalPages
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  // Filtre par Periode 
  filterByPeriod(period: string): void {
    this.selectedPeriod = period;
    // Implémenter la logique de filtrage
  }

  // Filtre par Status
  filterByStatus(status: string): void {
    this.selectedStatus = status;
    // Implémenter la logique de filtrage
  }

  // Recherche 
  searchProjects(): void {
    // Implémenter la logique de recherche
    console.log('Recherche:', this.searchQuery);
  }
//Methode pour le modal 
// Ouvrir le modal
openModal() {
  this.showModal = true;
  // Réinitialiser le formulaire
  this.nouveauFournisseur = {
    raisonSociale: '',
    nomContact: '',
    telephone: '',
    email: ''
  };
}

// Fermer le modal
closeModal() {
  this.showModal = false;
}


}







