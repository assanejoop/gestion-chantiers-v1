

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Lot {
  id: number;
  nom: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  statut: 'En cours' | 'En attente' | 'Planifié' | 'Terminé';
  progression: number;
  soustraitant?: {
    nom: string;
    societe: string;
    telephone: string;
  };
}

@Component({
  selector: 'app-lots-subcontractors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lots-subcontractors.component.html',
  styleUrls: ['./lots-subcontractors.component.css']
})
export class LotsSubcontractorsComponent implements OnInit {
  lots: Lot[] = [];
  filtreStatut: string = '';
  recherche: string = '';

  ngOnInit(): void {
    this.chargerLots();
  }

  chargerLots(): void {
    // Dans un vrai projet, ces données proviendraient probablement d'un service
    this.lots = [
      {
        id: 1,
        nom: 'Gros œuvre',
        description: 'Fondations, maçonnerie, béton armé, charpente',
        dateDebut: '01/03/2025',
        dateFin: '30/06/2025',
        statut: 'En cours',
        progression: 42,
        soustraitant: {
          nom: 'M. Diop',
          societe: 'BTP Solutions',
          telephone: '+221 77 123 45 67'
        }
      },
      {
        id: 2,
        nom: 'Second œuvre',
        description: 'Plomberie, électricité, menuiserie, isolation',
        dateDebut: '01/03/2025',
        dateFin: '30/06/2025',
        statut: 'En attente',
        progression: 0,
        soustraitant: {
          nom: 'Mme. Sarr',
          societe: 'Électricité Pro',
          telephone: '+221 76 234 56 78'
        }
      },
      {
        id: 3,
        nom: 'Finitions',
        description: 'Carrelage, peinture, revêtements, aménagements intérieurs',
        dateDebut: '01/03/2025',
        dateFin: '30/06/2025',
        statut: 'Planifié',
        progression: 15,
        soustraitant: {
          nom: 'Mme. Diallo',
          societe: 'Finitions',
          telephone: '+221 70 345 67 89'
        }
      },
      {
        id: 4,
        nom: 'VRD',
        description: 'Voirie, réseaux divers, aménagements extérieurs',
        dateDebut: '01/03/2025',
        dateFin: '30/06/2025',
        statut: 'Planifié',
        progression: 0
      }
    ];
  }

  filtrerLots(): Lot[] {
    return this.lots.filter(lot => {
      const matchRecherche = this.recherche === '' || 
        lot.nom.toLowerCase().includes(this.recherche.toLowerCase()) ||
        (lot.soustraitant && 
          (lot.soustraitant.nom.toLowerCase().includes(this.recherche.toLowerCase()) || 
           lot.soustraitant.societe.toLowerCase().includes(this.recherche.toLowerCase())));
      
      const matchStatut = this.filtreStatut === '' || lot.statut === this.filtreStatut;
      
      return matchRecherche && matchStatut;
    });
  }

  ajouterNouveauLot(): void {
    // Implémenter la logique pour ajouter un nouveau lot
    console.log('Ajouter un nouveau lot');
  }

  modifierLot(id: number): void {
    console.log(`Modifier le lot ${id}`);
  }

  voirDocuments(id: number): void {
    console.log(`Voir les documents du lot ${id}`);
  }

  voirCommentaires(id: number): void {
    console.log(`Voir les commentaires du lot ${id}`);
  }
}