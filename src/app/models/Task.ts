// models/task.model.ts
export interface Task {
    id?: number;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    startDate: string; // MM-DD-YYYY format
    endDate: string;   // MM-DD-YYYY format
    realEstatePropertyId: number;
    executorIds: number[];
    pictures?: File[] | string[]; // File[] for upload, string[] for display URLs
    createdAt?: string;
    updatedAt?: string;
  }
  
  export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
  }
  
  export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    REFECTION = 'REFECTION',
    DONE = 'DONE',
    FINITION = 'FINITION'
  }
  
  export interface TaskCreateRequest {
    title: string;
    description: string;
    priority: TaskPriority;
    startDate: string;
    endDate: string;
    realEstatePropertyId: number;
    executorIds: number[];
    pictures?: File[];
    status: TaskStatus;
  }
  
  export interface TaskUpdateRequest extends Partial<TaskCreateRequest> {
    id: number;
  }
  
  export interface Executor {
    id: number;
    name: string;
    avatar?: string;
  }
  
  export interface RealEstateProperty {
    id: number;
    name: string;
  }
  
  // API Response interfaces
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }

  export interface TaskDisplay extends Task {
    assignedUsers: Executor[];
    additionalUsers: Executor[];
    tag: string | null;
    comments: string[]; // ou un type spécifique si tu as un modèle Comment
  }
  