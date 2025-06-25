  
  export interface MaterialStockAlert {
    material: string;
    chantier: string;
    current: number;
    threshold: number;
    status: 'Normal' | 'Faible' | 'Critique';
  }