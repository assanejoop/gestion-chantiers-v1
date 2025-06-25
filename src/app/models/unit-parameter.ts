
export interface UnitParameter {
    id?: string;
    label: string;
    code: string;
    hasStartDate: boolean;
    hasEndDate: boolean;
    type: 'DOCUMENT' | 'UNIT' | 'MATERIAL_CATEGORY';
  }

  export interface Unit {
    id?: string;
    label: string;
    code: string;
    hasStartDate: boolean;
    hasEndDate: boolean;
    type: 'UNIT' ;
  }
  
  
  export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
  }
  
  export interface PaginationParams {
    page: number;
    size: number;
  }