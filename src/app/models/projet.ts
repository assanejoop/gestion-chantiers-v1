// export interface Projet {
//     id: number;
//     titre: string;
//     progression: number;
//     type: 'immeuble' | 'complexe' | 'centre';
//     // dateDebut: string;
//     // dateFin: string;
//     image: string;
//     description:string;
   
//   }
    // src/app/models/projet.model.ts

export interface Projet {
  titre: string;
  description: string;
  montant: number;
  surface: number;
  emplacement: string;
  nombreLots: number;
  dateEcheance: Date;
  progression: number;
  progressBudgetaire: number;
  statut: 'En cours' | 'En pause' | 'Terminé';
  dateDebut: Date;
  dateFin: Date;
  budgetUtilise: number;
  budgetTotal: number;
  equipementsCommuns: EquipementCommun[];
}

export interface EquipementCommun {
  nom: string;
  description: string;
  icone: string;
}
  
  