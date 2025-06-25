// src/app/models/dashboard.model.ts

export interface ProjectOverview {
    inProgress: number;
    delayed: number;
    pending: number;
    completed: number;
  }
  
  export interface MaterialStockAlert {
    material: string;
    chantier: string;
    current: number;
    threshold: number;
    status: 'Normal' | 'Faible' | 'Critique';
  }
  
  export interface CriticalTask {
    title: string;
    chantier: string;
    dueDate: Date;
    status: 'En retard' | 'Urgent' | 'A jour';
  }
  
  export interface ProgressStage {
    stage: string;
    percentage: number;
  }
  
  export interface IncidentData {
    date: string;
    count: number;
  }
  
  export interface ProjectPhoto {
    chantier: string;
    date: string;
    imageUrl: string;
  }
  
  export interface PerformanceSummary {
    averageProgress: number;
    budgetConsumed: number;
    incidents: number;
    averagePresence: number;
    delayedTasks: number;
    materialsAlerted: number;
  }