export interface CriticalTask {
    title: string;
    chantier: string;
    dueDate: Date;
    status: 'En retard' | 'Urgent' | 'A jour';
  }