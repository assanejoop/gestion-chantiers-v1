// 1. Interface pour le modèle Material
export interface Material {
  id: number;
  unit: any;
  category: string;
  label: string;
  quantity: number;
  criticalThreshold: number;
  unitId: number;
  propertyId: number;
}

// 2. Interface pour la réponse paginée
export interface MaterialResponse {
  content: Material[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

export interface UnitParameter {
  id?: number;           // présent dans les réponses (optionnel si c’est à la création)
  label: string;
  code: string;
  hasStartDate: boolean;
  hasEndDate: boolean;
  type: 'UNIT';          // litéral (car tu récupères uniquement les types 'UNIT')
}
