export interface Budget {
    id: number;
    name: string;
    amount: number;
    propertyId: number;
    createdAt?: string;
    updatedAt?: string;
    // Ajoutez d'autres propriétés selon votre modèle
  }
  
  export interface BudgetExpense {
    id: number;
    budgetId: number;
    amount: number;
    description: string;
    date: string;
    category?: string;
    // Ajoutez d'autres propriétés selon votre modèle
  }
  
  export interface CreateBudgetRequest {
    name: string;
    amount: number;
    propertyId: number;
    description?: string;
  }
  
  export interface UpdateBudgetRequest {
    name?: string;
    amount?: number;
    description?: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
  }
  
  export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
    hasNext: boolean;
  }