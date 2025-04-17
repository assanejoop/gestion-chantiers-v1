// services/dossier.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Dossier} from '../../models/dossier';

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  // Mock data to match the image
  private mockDossiers: Dossier[] = [
    {
      id: 1,
      title: 'Tous les projets',
      date: new Date('2025-04-02'),
      type: 'projects'
    },
    {
      id: 2,
      title: 'Dossiers par statut/catégorie',
      date: new Date('2025-04-02'),
      type: 'status'
    },
    {
      id: 3,
      title: 'Ressources partagées',
      date: new Date('2025-04-02'),
      type: 'resources'
    },
    {
      id: 4,
      title: 'Gestion des lots et sous-traitans',
      date: new Date('2025-04-02'),
      type: 'lots'
    }
  ];

  constructor(private http: HttpClient) {}

  getDossiers(): Observable<Dossier[]> {
    // Return mock data (in a real app, you'd use the HTTP client to fetch from an API)
    return of(this.mockDossiers);
  }

  getDossierById(id: number): Observable<Dossier | undefined> {
    return of(this.mockDossiers.find(dossier => dossier.id === id));
  }
}