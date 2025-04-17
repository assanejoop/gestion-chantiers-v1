// models/dossier.model.ts
export interface Dossier {
    id: number;
    title: string;
    date: Date;
    type: 'projects' | 'status' | 'resources' | 'lots';
  }