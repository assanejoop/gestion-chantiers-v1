export interface Projet {
    id: number;
    titre: string;
    progression: number;
    type: 'immeuble' | 'complexe' | 'centre';
    dateDebut: string;
    dateFin: string;
    image: string;
    description:string;
   
  }
  
  
  