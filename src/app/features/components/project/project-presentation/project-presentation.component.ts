import { Component, inject, OnInit } from '@angular/core';
import { Projet } from '../../../../models/projet';
import { CommonModule } from '@angular/common';
import { StatusReportComponent } from '../status-report/status-report.component';
import { ProjectBudgetComponent } from '../project-budget/project-budget.component';
import { ActivatedRoute } from '@angular/router';
import { RealEstateProject, RealestateService } from '../../../../core/services/realestate.service';
// import { AvaragerateAvancementComponent } from "../../dashboard/avaragerate-avancement/avaragerate-avancement.component";


@Component({
  selector: 'app-project-presentation',
  standalone: true,
  imports: [CommonModule, StatusReportComponent, ProjectBudgetComponent],
  templateUrl: './project-presentation.component.html',
  styleUrl: './project-presentation.component.css'
})
export class ProjectPresentationComponent implements OnInit {
  
  // Propriété pour gérer l'onglet actif
//   activeTab: string = 'general';

//   projet: Projet = {
//     titre: 'Construction d\'un Immeuble Résidentiel de 10 Étages',
//     description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
//     montant: 1553076000,
//     surface: 200,
//     emplacement: 'Dakar, Médina Rue 21',
//     nombreLots: 20,
//     dateEcheance: new Date('2026-03-28'),
//     progression: 40,
//     progressBudgetaire: 87,
//     statut: 'En cours',
//     dateDebut: new Date('2025-01-01'),
//     dateFin: new Date('2027-01-01'),
//     budgetUtilise: 1553076000,
//     budgetTotal: 1500000000,
//     equipementsCommuns: []
//   };

//   // Données pour l'onglet État d'avancement
//   avancementData = {
//     phases: [
//       { nom: 'Études préliminaires', progression: 100, statut: 'Terminé' },
//       { nom: 'Fondations', progression: 85, statut: 'En cours' },
//       { nom: 'Structure', progression: 45, statut: 'En cours' },
//       { nom: 'Couverture', progression: 20, statut: 'En attente' },
//       { nom: 'Finitions', progression: 0, statut: 'En attente' }
//     ],
//     dernieresActivites: [
//       { date: new Date('2025-05-20'), description: 'Coulage du béton niveau 3' },
//       { date: new Date('2025-05-18'), description: 'Installation des armatures niveau 4' },
//       { date: new Date('2025-05-15'), description: 'Inspection technique niveau 2' }
//     ]
//   };

//   // Données pour l'onglet Budget
//   // budgetData = {
//   //   categories: [
//   //     { nom: 'Matériaux', budgetAlloue: 600000000, depense: 520000000 },
//   //     { nom: 'Main d\'œuvre', budgetAlloue: 400000000, depense: 350000000 },
//   //     { nom: 'Équipements', budgetAlloue: 300000000, depense: 280000000 },
//   //     { nom: 'Autres', budgetAlloue: 200000000, depense: 150000000 }
//   //   ],
//   //   dernieresDepenses: [
//   //     { date: new Date('2025-05-22'), description: 'Achat ciment', montant: 2500000 },
//   //     { date: new Date('2025-05-20'), description: 'Salaires équipe', montant: 5000000 },
//   //     { date: new Date('2025-05-18'), description: 'Location grue', montant: 1200000 }
//   //   ]
//   // };

//   constructor() { }

//   ngOnInit(): void { }

//   // Méthode pour changer d'onglet
//   setActiveTab(tab: string): void {
//     this.activeTab = tab;
//   }

//   // Méthode pour vérifier si un onglet est actif
//   isActiveTab(tab: string): boolean {
//     return this.activeTab === tab;
//   }

//   getColorStatus(statut: string): string {
//     switch (statut) {
//       case 'En cours':
//         return '#F39C12'; // Orange
//       case 'En pause':
//         return '#FF5C02'; // Red
//       case 'Terminé':
//         return '#2ECC71'; // Green
//       default:
//         return '#000000'; // Default color (black)
//     }
//   }

//   getGradientBackgroundDetail(progress: number): string {
//     return 'linear-gradient(90deg, #F39C12 0%, #FF5C02 100%)';
//   }

//   // Méthode pour obtenir la couleur selon le statut des phases
//   getPhaseStatusColor(statut: string): string {
//     switch (statut) {
//       case 'Terminé':
//         return 'bg-green-100 text-green-800';
//       case 'En cours':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'En attente':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   }

//   // Méthode pour calculer le pourcentage d'utilisation du budget par catégorie
//   getBudgetPercentage(budgetAlloue: number, depense: number): number {
//     return Math.round((depense / budgetAlloue) * 100);
//   }
// }

private route = inject(ActivatedRoute);
  private realEstateService = inject(RealestateService);

  projet: RealEstateProject | null = null;
  loading = true;
  error: string | null = null;
  activeTab = 'general';

  // Propriétés calculées pour l'affichage
  get progressionBudgetaire(): number {
    if (!this.projet || this.projet.price === 0) return 0;
    return Math.round((this.projet.price / this.projet.price) * 100);
  }

  get budgetUtilise(): number {
    return this.projet?.price || 0;
  }

  get budgetTotal(): number {
    return this.projet?.price || 0;
  }

  get statutFrancais(): string {
    if (!this.projet) return '';
    
    switch (this.projet.constructionStatus) {
      case 'IN_PROGRESS':
        return 'En cours';
      case 'COMPLETED':
        return 'Terminé';
      case 'PAUSED':
        return 'En pause';
      case 'PLANNED':
        return 'Planifié';
      default:
        return 'En cours';
    }
  }

  get dateDebut(): string {
    if (!this.projet?.startDate) return '01/01/25';
    
    // Convertir la string en Date
    const date = new Date(this.projet.startDate);
    
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      return '01/01/25'; // Date par défaut si invalide
    }
    
    return date.toLocaleDateString('fr-FR');
  }
  
  get dateFinPrevue(): string {
    if (!this.projet?.endDate) return '01/01/27';
    
    // Convertir la string en Date
    const date = new Date(this.projet.endDate);
    
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      return '01/01/27'; // Date par défaut si invalide
    }
    
    return date.toLocaleDateString('fr-FR');
  }
  get equipementsCommuns() {
    if (!this.projet) return [];
    
    const equipements = [];
    
    if (this.projet.hasHall) {
      equipements.push({
        icon: 'assets/images/project-icons/hall1.png',
        nom: 'Hall d\'entrée',
        description: 'Espace d\'accueil de l\'immeuble'
      });
    }
    
    if (this.projet.hasElevator) {
      equipements.push({
        icon: 'assets/images/project-icons/escalier.svg',
        nom: 'Escaliers et ascenseurs',
        description: 'Zones permettant d\'accéder aux différents niveaux'
      });
    }
    
    equipements.push({
      icon: 'assets/images/project-icons/couloir.png',
      nom: 'Couloirs',
      description: 'Espaces de circulation entre les différentes unités'
    });
    
    if (this.projet.hasGarden || this.projet.hasSharedTerrace) {
      equipements.push({
        icon: 'assets/images/project-icons/hall.png',
        nom: 'Jardins ou terrasses partagés',
        description: 'Espaces extérieurs accessibles à tous'
      });
    }
    
    if (this.projet.hasStorageRooms) {
      equipements.push({
        icon: 'assets/images/project-icons/locaux.png',
        nom: 'Locaux Techniques',
        description: 'Espaces dédiés aux installations'
      });
    }
    
    if (this.projet.hasParking) {
      equipements.push({
        icon: 'assets/images/project-icons/parking.png',
        nom: 'Parkings communs',
        description: 'Espaces de stationnement partagés'
      });
    }
    
    return equipements;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProjectDetails(+id);
    }
  }

  private loadProjectDetails(id: number): void {
    this.loading = true;
    this.error = null;

    this.realEstateService.getRealEstateDetails(id).subscribe({
      next: (response) => {
        this.projet = response.realEstateProperty;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du projet:', error);
        this.error = 'Erreur lors du chargement des détails du projet';
        this.loading = false;
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  isActiveTab(tab: string): boolean {
    return this.activeTab === tab;
  }

  getGradientBackgroundDetail(percentage: number): string {
    if (percentage <= 30) {
      return 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)'; // Rouge
    } else if (percentage <= 70) {
      return 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'; // Orange
    } else {
      return 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'; // Vert
    }
  }

  onModifier(): void {
    // Logique pour modifier le projet
    console.log('Modification du projet:', this.projet?.id);
  }
}