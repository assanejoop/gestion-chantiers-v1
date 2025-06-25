import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UniteMesure {
  id: string;
  libelle: string;
  symbole: string;
}

@Injectable({
  providedIn: 'root'
})
export class UniteService {
  private unites: UniteMesure[] = [
    { id: '1', libelle: 'Kilogrammes', symbole: 'kg' },
    { id: '2', libelle: 'Tonnes', symbole: 't' },
    { id: '3', libelle: 'Grammes', symbole: 'g' },
    { id: '4', libelle: 'Mètres cubes', symbole: 'm³' }
  ];

  private unitesSubject = new BehaviorSubject<UniteMesure[]>(this.unites);
  public unites$ = this.unitesSubject.asObservable();

  constructor() { }

  // Récupérer toutes les unités
  getUnites(): Observable<UniteMesure[]> {
    return this.unites$;
  }

  // Ajouter une nouvelle unité
  ajouterUnite(unite: Omit<UniteMesure, 'id'>): void {
    const nouvelleUnite: UniteMesure = {
      id: this.generateId(),
      ...unite
    };
    this.unites.push(nouvelleUnite);
    this.unitesSubject.next([...this.unites]);
  }

  // Modifier une unité existante
  modifierUnite(id: string, unite: Partial<UniteMesure>): boolean {
    const index = this.unites.findIndex(u => u.id === id);
    if (index !== -1) {
      this.unites[index] = { ...this.unites[index], ...unite };
      this.unitesSubject.next([...this.unites]);
      return true;
    }
    return false;
  }

  // Supprimer une unité
  supprimerUnite(id: string): boolean {
    const index = this.unites.findIndex(u => u.id === id);
    if (index !== -1) {
      this.unites.splice(index, 1);
      this.unitesSubject.next([...this.unites]);
      return true;
    }
    return false;
  }

  // Récupérer une unité par ID
  getUniteById(id: string): UniteMesure | undefined {
    return this.unites.find(u => u.id === id);
  }

  // Générer un ID unique
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}