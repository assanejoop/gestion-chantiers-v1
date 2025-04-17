import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DossiersComponent } from "../dossiers/dossiers.component";
import { ProjectDetailHeaderComponent } from "../project-detail-header/project-detail-header.component";
import { TaskBoardComponent } from "../task-board/task-board.component";
import { TeamListComponent } from "../team-list/team-list.component";
import { DocumentsComponent } from "../documents/documents.component";
import { Router } from '@angular/router';

interface FolderCard {
  title: string;
  date: string;
  isTwoLines: boolean;
  line1?: string;
  line2?: string;
}

interface Projet {
  id: number;
  titre: string;
  description: string;
  image: string;
  progression: number;
  participants: number;
  dateDebut: string;
  dateFin: string;
  type: 'residentiel' | 'sportif' | 'commercial';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, DossiersComponent, ProjectDetailHeaderComponent, TaskBoardComponent, TeamListComponent, DocumentsComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  
  olderCards: FolderCard[] = [
    {
      title: 'Tous les projets',
      date: '02 Avril 2025',
      isTwoLines: false
    },
    {
      title: 'Dossiers par statut/catégorie',
      date: '02 Avril 2025',
      isTwoLines: true,
      line1: 'Dossiers par statut/',
      line2: 'catégorie'
    },
    {
      title: 'Ressources partagées',
      date: '02 Avril 2025',
      isTwoLines: false
    },
    {
      title: 'Gestion des lots et sous-traitans',
      date: '02 Avril 2025',
      isTwoLines: true,
      line1: 'Gestion des lots et',
      line2: 'sous-traitans'
    }
  ];

  
  
  projets: Projet[] = [
    {
      id: 1,
      titre: 'Construction d\'un Immeuble Résidentiel de 10 Étages',
      description: 'Un projet ambitieux qui redéfinit l\'urbanisme moderne, alliant confort, élégance et innovation pour offrir un cadre de vie exceptionnel.',
      image: 'assets/images/construction.png',
      progression: 50,
      participants: 10,
      dateDebut: '01.07.25',
      dateFin: '01.01.27',
      type: 'residentiel'
    },
    {
      id: 2,
      titre: 'Construction d\'un Complexe Sportif Multifonctionnel',
      description: 'Un espace moderne et polyvalent dédié au sport et aux loisirs, pour le bien-être de la communauté.',
      image: 'assets/images/plan.png',
      progression: 80,
      participants: 10,
      dateDebut: '01.04.25',
      dateFin: '30.09.26',
      type: 'sportif'
    },
    {
      id: 3,
      titre: 'Construction d\'un Centre Commercial Moderne',
      description: 'Un projet ambitieux visant à offrir un espace commercial dynamique et contemporain, alliant design architectural innovant et fonctionnalité optimale.',
      image: 'assets/images/bat.png',
      progression: 40,
      participants: 10,
      dateDebut: '01.05.25',
      dateFin: '01.02.26',
      type: 'commercial'
    },
    {
      id: 4,
      titre: 'Construction d\'un Immeuble Résidentiel de 10 Étages',
      description: 'Un projet ambitieux qui redéfinit l\'urbanisme moderne, alliant confort, élégance et innovation pour offrir un cadre de vie exceptionnel.',
      image: 'assets/images/fondation.png',
      progression: 50,
      participants: 10,
      dateDebut: '',
      dateFin: '02.08.22',
      type: 'residentiel'
    },
    {
      id: 5,
      titre: 'Construction d\'un Complexe Sportif Multifonctionnel',
      description: 'Un espace moderne et polyvalent dédié au sport et aux loisirs, pour le bien-être de la communauté.',
      image: 'assets/images/plan-sportif.png',
      progression: 80,
      participants: 10,
      dateDebut: '',
      dateFin: '02.08.22',
      type: 'sportif'
    },
    {
      id: 6,
      titre: 'Construction d\'un Centre Commercial Moderne',
      description: 'Un projet ambitieux visant à offrir un espace commercial dynamique et contemporain, alliant design architectural innovant et fonctionnalité optimale.',
      image: 'assets/images/plan1.png',
      progression: 40,
      participants: 10,
      dateDebut: '',
      dateFin: '02.08.22',
      type: 'commercial'
    },
    {
      id: 7,
      titre: 'Construction d\'un Immeuble Résidentiel de 10 Étages',
      description: 'Un projet ambitieux qui redéfinit l\'urbanisme moderne, alliant confort, élégance et innovation pour offrir un cadre de vie exceptionnel.',
      image: 'assets/images/construction.png',
      progression: 50,
      participants: 10,
      dateDebut: '',
      dateFin: '02.08.22',
      type: 'residentiel'
    },
    {
      id: 8,
      titre: 'Construction d\'un Complexe Sportif Multifonctionnel',
      description: 'Un espace moderne et polyvalent dédié au sport et aux loisirs, pour le bien-être de la communauté.',
      image: 'assets/images/plan.png',
      progression: 80,
      participants: 10,
      dateDebut: '',
      dateFin: '02.08.22',
      type: 'sportif'
    },
    {
      id: 9,
      titre: 'Construction d\'un Centre Commercial Moderne',
      description: 'Un projet ambitieux visant à offrir un espace commercial dynamique et contemporain, alliant design architectural innovant et fonctionnalité optimale.',
      image: 'assets/images/bat.png',
      progression: 40,
      participants: 10,
      dateDebut: '',
      dateFin: '02.08.22',
      type: 'commercial'
    }
  ];


  constructor(private router: Router) { }

  ngOnInit() {
    // Initialisation du composant
  }

  // Méthode pour calculer la valeur du stroke-dasharray pour l'indicateur de progression circulaire
  calculateCircleProgress(percentage: number): string {
    const circumference = 2 * Math.PI * 45;
    const progressValue = (percentage / 100) * circumference;
    return `${progressValue} ${circumference}`;
  }


  filtres = {
    periode: '',
    statut: ''
  };

  toggleFiltre(type: 'periode' | 'statut'): void {
    // Logique pour gérer les filtres
  }

 
  voirDetails(projetId: number): void {
    // Logique pour afficher les détails d'un projet
  }

  // Méthode pour déterminer la couleur en fonction de la progression
  getProgressColor(progression: number): string {
    if (progression <= 40) {
      return '#f97316'; // orange pour 40%
    } else if (progression <= 60) {
      return '#f97316'; // ambre pour 50-60%
    } else {
      return '#f97316'; // vert pour 80%+
    }
  }
  
  // Méthode pour ajouter un nouveau projet
  ajouterProjet() {
    // Logique pour ajouter un nouveau projet
    console.log('Ajout d\'un nouveau projet');
  }

  onSubmit(): void {
    
    
    // Redirection vers la page detail projet  
    this.router.navigate(['/dashboard/project-detail-header']);
  }
}