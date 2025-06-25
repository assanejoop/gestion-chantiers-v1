// src/app/services/expenses.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

   // ✅ Récupérer les budgets d'un bien immobilier par propertyId
   getBudgetsByPropertyId(propertyId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/budgets/property/${propertyId}`);
  }

  getExpensesByBudgetId(budgetId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/expenses/budget/${budgetId}?page=0&size=10`);
  }

  // ✅ Ajouter une dépense
  addExpense(expenseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/expenses`, expenseData);
  }

}
