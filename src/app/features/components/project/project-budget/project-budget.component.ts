// // import { CommonModule } from '@angular/common';
// // import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// // import { Chart, ChartConfiguration, registerables } from 'chart.js';
// // import { FormsModule } from '@angular/forms';
// // import { Budget, CreateExpenseRequest, ExpenseResponse, ProjectService } from '../../../../core/services/project.service';
// // import{Projects}

// // Chart.register(...registerables);


// // @Component({
// //   selector: 'app-project-budget',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './project-budget.component.html',
// //   styleUrl: './project-budget.component.css'
// // })
// // export class ProjectBudgetComponent implements OnInit, AfterViewInit {
// //   @ViewChild('budgetChart', { static: false }) budgetChart!: ElementRef<HTMLCanvasElement>;
  
// //   budgetPrevu = 1553076000;
// //   budgetUtilise = 1500000000;
// //   budgetRestant = 53076000;

// //   budgets: Budget[] = [];
  
// //   private chart: Chart | null = null;
// //   budgetId: number = 1; // Tu peux le définir dynamiquement (via la route par exemple)
  
// //   // Modal state
// //   showExpenseModal = false;
  
// //   // Objet pour le nouveau expense
// //  newExpense: NewExpense = {
// //     description: '',
// //     date: '',
// //     amount: 0,
// //     budgetId: 0 // Tu dois définir ce budgetId selon ton contexte
// //   };

 
// //   activeTab = 'budget';
// //   error: null;

// //   constructor(private projectService: ProjectService) { }

// //   ngOnInit(): void {
// //     this.loadExpensesByBudget();
// //     this.initializeNewExpense();
    
// //   }

// //   ngAfterViewInit(): void {
// //     this.createChart();
// //   }

// //   ngOnDestroy(): void {
// //     if (this.chart) {
// //       this.chart.destroy();
// //     }
// //   }

// //   /**
// //    * Initialiser le nouvel expense avec les valeurs par défaut
// //    */
// //   private initializeNewExpense(): void {
// //     const today = new Date();
// //     const formattedDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD pour input date
    
// //     this.newExpense = {
// //       description: '',
// //       date: formattedDate,
// //       amount: 0,
// //       budgetId: this.budgetId
// //     };
// //   }


// //   // loadBudgets() {
// //   //   this.projectService.getAllBudgets().subscribe({
// //   //     next: (budgets) => {
// //   //       this.budgets = budgets;
// //   //     },
// //   //     error: (error) => {
// //   //       console.error('Erreur lors du chargement des budgets:', error);
// //   //     }
// //   //   });
// //   // }

// //   /**
// //    * Charger les dépenses par budget
// //    */
// //   // loadExpensesByBudget(): void {
// //   //   this.loading = true;
// //   //   this.error = null;
  
// //   //   const page = 0;
// //   //   const size = 10;
  
// //   //   this.projectService.getExpensesByBudgetId(this.budgetId, page, size).subscribe({
// //   //     next: (response) => {
// //   //       this.expenses = response.content;
// //   //       this.calculateBudgetValues(); // Recalculer les valeurs du budget
// //   //       this.updateChart(); // Mettre à jour le graphique
// //   //       this.loading = false;
// //   //     },
// //   //     error: (error) => {
// //   //       console.error('Erreur lors du chargement des dépenses par budget:', error);
// //   //       this.error = 'Erreur lors du chargement des dépenses';
// //   //       this.loading = false;
// //   //     }
// //   //   });
// //   // }

// //   /**
// //    * Calculer les valeurs du budget basées sur les dépenses
// //    */
// //   private calculateBudgetValues(): void {
// //     const totalUtilise = this.expenses.reduce((total, expense) => total + expense.amount, 0);
// //     this.budgetUtilise = totalUtilise;
// //     this.budgetRestant = this.budgetPrevu - this.budgetUtilise;
// //   }

// //   /**
// //    * Ouvrir le modal d'ajout de dépense
// //    */
// //   onAddExpense(): void {
// //     this.initializeNewExpense();
// //     this.showExpenseModal = true;
// //   }

// //   /**
// //    * Créer une nouvelle dépense depuis le modal
// //    */
// //   // onSaveExpense(): void {
// //   //   // Validation des données
// //   //   if (!this.newExpense.description.trim()) {
// //   //     this.error = 'La description est obligatoire';
// //   //     return;
// //   //   }
    
// //   //   if (this.newExpense.amount <= 0) {
// //   //     this.error = 'Le montant doit être supérieur à 0';
// //   //     return;
// //   //   }

// //   //   if (!this.newExpense.date) {
// //   //     this.error = 'La date est obligatoire';
// //   //     return;
// //   //   }

// //   //   this.loading = true;
// //   //   this.error = null;

// //   //   // Convertir la date du format HTML (YYYY-MM-DD) au format API (DD-MM-YYYY)
// //   //   const expenseToCreate: CreateExpenseRequest = {
// //   //     ...this.newExpense,
// //   //     date: this.convertDateForApi(this.newExpense.date),
// //   //     budgetId: this.budgetId
// //   //   };

// //   //   this.projectService.createExpense(expenseToCreate).subscribe({
// //   //     next: (expense) => {
// //   //       console.log('Dépense créée avec succès:', expense);
// //   //       this.expenses.push(expense);
// //   //       this.calculateBudgetValues();
// //   //       this.updateChart();
// //   //       this.closeExpenseModal();
// //   //       this.loading = false;
// //   //     },
// //   //     error: (error) => {
// //   //       console.error('Erreur lors de la création de la dépense:', error);
// //   //       this.error = 'Erreur lors de la création de la dépense';
// //   //       this.loading = false;
// //   //     }
// //   //   });
// //   // }

// //   /**
// //    * Convertir la date du format HTML (YYYY-MM-DD) au format API (DD-MM-YYYY)
// //    */
// //   private convertDateForApi(dateStr: string): string {
// //     const date = new Date(dateStr);
// //     const day = date.getDate().toString().padStart(2, '0');
// //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
// //     const year = date.getFullYear();
// //     return `${day}-${month}-${year}`;
// //   }

// //   /**
// //    * Fermer le modal
// //    */
// //   closeExpenseModal(): void {
// //     this.showExpenseModal = false;
// //     this.error = null;
// //     this.initializeNewExpense();
// //   }

// //   /**
// //    * Supprimer une dépense
// //    */
// //   onDeleteExpense(expense: ExpenseResponse): void {
// //     if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
// //       this.deleteExpense(expense.id);
// //     }
// //   }

// //   /**
// //    * Supprimer une dépense
// //    */
// //   deleteExpense(id: number): void {
// //     this.loading = true;
// //     this.projectService.deleteExpense(id).subscribe({
// //       next: () => {
// //         console.log('Dépense supprimée');
// //         this.expenses = this.expenses.filter(expense => expense.id !== id);
// //         this.calculateBudgetValues();
// //         this.updateChart();
// //         this.loading = false;
// //       },
// //       error: (error) => {
// //         console.error('Erreur lors de la suppression:', error);
// //         this.error = 'Erreur lors de la suppression de la dépense';
// //         this.loading = false;
// //       }
// //     });
// //   }

// //   /**
// //    * Obtenir la date formatée pour l'affichage
// //    * Gère les deux formats : number[] (de l'API) et string (du formulaire)
// //    */
// //   getFormattedDate(apiDate: number[] | string): string {
// //     let date: Date;
    
// //     if (Array.isArray(apiDate)) {
// //       // Format API : [année, mois, jour]
// //       if (this.projectService.convertApiDateToDate) {
// //         date = this.projectService.convertApiDateToDate(apiDate);
// //       } else {
// //         // Fallback si la méthode n'existe pas
// //         date = this.convertArrayToDate(apiDate);
// //       }
// //     } else {
// //       // Format string : convertir en date
// //       date = new Date(apiDate);
// //     }
    
// //     return date.toLocaleDateString('fr-FR');
// //   }

// //   /**
// //    * Convertir un tableau de nombres en objet Date
// //    * Format attendu : [année, mois, jour] où mois commence à 1
// //    */
// //   private convertArrayToDate(dateArray: number[]): Date {
// //     if (dateArray.length >= 3) {
// //       // Les mois en JavaScript commencent à 0, donc on soustrait 1
// //       return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
// //     }
// //     return new Date();
// //   }

// //   // Calcul du pourcentage pour le graphique circulaire
// //   get pourcentageUtilise(): number {
// //     return Math.round((this.budgetUtilise / this.budgetPrevu) * 100);
// //   }

// //   get pourcentageRestant(): number {
// //     return Math.round((this.budgetRestant / this.budgetPrevu) * 100);
// //   }

// //   private createChart(): void {
// //     if (this.budgetChart) {
// //       const ctx = this.budgetChart.nativeElement.getContext('2d');
// //       if (ctx) {
// //         const config: ChartConfiguration<'doughnut'> = {
// //           type: 'doughnut',
// //           data: {
// //             labels: ['Budget utilisé', 'Budget restant'],
// //             datasets: [{
// //               data: [this.budgetUtilise, this.budgetRestant],
// //               backgroundColor: [
// //                 '#10b981', // green-500 pour budget utilisé
// //                 '#f97316'  // orange-500 pour budget restant
// //               ],
// //               borderWidth: 0
// //             }]
// //           },
// //           options: {
// //             responsive: true,
// //             maintainAspectRatio: true,
// //             cutout: '60%',
// //             plugins: {
// //               legend: {
// //                 display: false
// //               },
// //               tooltip: {
// //                 callbacks: {
// //                   label: (context) => {
// //                     const value = context.parsed;
// //                     const percentage = Math.round((value / this.budgetPrevu) * 100);
// //                     return `${context.label}: ${this.formatCurrency(value)} (${percentage}%)`;
// //                   }
// //                 }
// //               }
// //             },
// //             elements: {
// //               arc: {
// //                 borderWidth: 0
// //               }
// //             }
// //           }
// //         };

// //         this.chart = new Chart(ctx, config);
// //       }
// //     }
// //   }

// //   private updateChart(): void {
// //     if (this.chart) {
// //       this.chart.data.datasets[0].data = [this.budgetUtilise, this.budgetRestant];
// //       this.chart.update();
// //     }
// //   }

// //   formatCurrency(amount: number): string {
// //     return new Intl.NumberFormat('fr-FR').format(amount) + ' F';
// //   }

// //   setActiveTab(tab: string): void {
// //     this.activeTab = tab;
// //   }

// //   onModify(): void {
// //     console.log('Modifier le budget');
// //     // Logique de modification
// //   }

// //   onEditExpense(expense: ExpenseResponse): void {
// //     console.log('Modifier la dépense:', expense);
// //     // Logique de modification
// //   }

// //   // Méthodes de test (à supprimer en production)
// //   createNewExpense(): void {
// //     const newExpense: CreateExpenseRequest = {
// //       description: "frais de service",
// //       date: "01-10-2024",
// //       amount: 2,
// //       budgetId: 1
// //     };

// //     this.loading = true;
// //     this.error = null;


// //     this.projectService.createExpense(newExpense).subscribe({
// //       next: (expense) => {
// //         console.log('Dépense créée avec succès:', expense);
// //         this.expenses.push(expense);
// //         this.calculateBudgetValues();
// //         this.updateChart();
// //         this.loading = false;
// //       },
// //       error: (error) => {
// //         console.error('Erreur lors de la création de la dépense:', error);
// //         this.error = 'Erreur lors de la création de la dépense';
// //         this.loading = false;
// //       }
// //     });
// //   }
// // }

// import { CommonModule } from '@angular/common';
// import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
// import { Chart, ChartConfiguration, registerables } from 'chart.js';
// import { FormsModule } from '@angular/forms';
// // import { Budget, CreateExpenseRequest, ExpenseResponse, ProjectService } from '../../../../core/services/project.service';
// import{ProjectsERV}

// Chart.register(...registerables);

// @Component({
//   selector: 'app-project-budget',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './project-budget.component.html',
//   styleUrl: './project-budget.component.css'
// })
// export class ProjectBudgetComponent implements OnInit, AfterViewInit, OnDestroy {
//   @ViewChild('budgetChart', { static: false }) budgetChart!: ElementRef<HTMLCanvasElement>;
  
//   budgetPrevu = 1553076000;
//   budgetUtilise = 1500000000;
//   budgetRestant = 53076000;

//   budgets: Budget[] = [];
  
//   private chart: Chart | null = null;
//   budgetId: number = 1; // Tu peux le définir dynamiquement (via la route par exemple)
  
//   // Modal state
//   showExpenseModal = false;
//   isEditMode = false;
//   editingExpenseId: number | null = null;
  
//   // Objet pour le nouveau expense
//   newExpense: CreateExpenseRequest = {
//     description: '',
//     date: '',
//     amount: 0,
//     budgetId: 0
//   };

//   expenses: ExpenseResponse[] = [];
//   loading = false;
//   error: string | null = null;
//   modalError: string | null = null; // Erreur spécifique au modal
//   activeTab = 'budget';

//   constructor(private projectService: ProjectService) { }

//   ngOnInit(): void {
//     this.loadBudgets();
//     this.loadExpensesByBudget();
//     this.initializeNewExpense();
//   }

//   ngAfterViewInit(): void {
//     this.createChart();
//   }

//   ngOnDestroy(): void {
//     if (this.chart) {
//       this.chart.destroy();
//     }
//   }

//   /**
//    * Initialiser le nouvel expense avec les valeurs par défaut
//    */
//   private initializeNewExpense(): void {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD pour input date
    
//     this.newExpense = {
//       description: '',
//       date: formattedDate,
//       amount: 0,
//       budgetId: this.budgetId
//     };
//   }

//   /**
//    * Charger tous les budgets disponibles
//    */
//   loadBudgets(): void {
//     this.loading = true;
//     this.projectService.getAllBudgets().subscribe({
//       next: (budgets) => {
//         this.budgets = budgets;
//         console.log('Budgets chargés:', budgets);
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Erreur lors du chargement des budgets:', error);
//         this.error = 'Erreur lors du chargement des budgets';
//         this.loading = false;
//       }
//     });
//   }

//   /**
//    * Charger les dépenses par budget
//    */
//   loadExpensesByBudget(): void {
//     this.loading = true;
//     this.error = null;
  
//     const page = 0;
//     const size = 10;
  
//     this.projectService.getExpensesByBudgetId(this.budgetId, page, size).subscribe({
//       next: (response) => {
//         this.expenses = response.content || [];
//         this.calculateBudgetValues();
//         this.updateChart();
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Erreur lors du chargement des dépenses par budget:', error);
//         this.error = 'Erreur lors du chargement des dépenses';
//         this.loading = false;
//       }
//     });
//   }

//   /**
//    * Calculer les valeurs du budget basées sur les dépenses
//    */
//   private calculateBudgetValues(): void {
//     const totalUtilise = this.expenses.reduce((total, expense) => total + expense.amount, 0);
//     this.budgetUtilise = totalUtilise;
//     this.budgetRestant = this.budgetPrevu - this.budgetUtilise;
//   }

//   /**
//    * Ouvrir le modal d'ajout de dépense
//    */
//   onAddExpense(): void {
//     this.isEditMode = false;
//     this.editingExpenseId = null;
//     this.initializeNewExpense();
//     this.modalError = null;
//     this.showExpenseModal = true;
//   }

//   /**
//    * Ouvrir le modal de modification de dépense
//    */
//   onEditExpense(expense: ExpenseResponse): void {
//     this.isEditMode = true;
//     this.editingExpenseId = expense.id;
//     this.modalError = null;
    
//     // Convertir la date de l'API vers le format HTML
//     let dateForInput = '';
//     if (Array.isArray(expense.date)) {
//       // Format API : [année, mois, jour]
//       const year = expense.date[0];
//       const month = expense.date[1].toString().padStart(2, '0');
//       const day = expense.date[2].toString().padStart(2, '0');
//       dateForInput = `${year}-${month}-${day}`;
//     } else {
//       // Si c'est déjà une string, on l'utilise telle quelle
//       dateForInput = expense.date;
//     }
    
//     this.newExpense = {
//       description: expense.description,
//       date: dateForInput,
//       amount: expense.amount,
//       budgetId: expense.budgetId
//     };
    
//     this.showExpenseModal = true;
//   }

//   /**
//    * Créer ou modifier une dépense depuis le modal
//    */
//   onSaveExpense(): void {
//     // Validation des données
//     if (!this.newExpense.description.trim()) {
//       this.modalError = 'La description est obligatoire';
//       return;
//     }
    
//     if (this.newExpense.amount <= 0) {
//       this.modalError = 'Le montant doit être supérieur à 0';
//       return;
//     }

//     if (!this.newExpense.date) {
//       this.modalError = 'La date est obligatoire';
//       return;
//     }

//     if (!this.newExpense.budgetId) {
//       this.modalError = 'Veuillez sélectionner un budget';
//       return;
//     }

//     this.loading = true;
//     this.modalError = null;

//     // Convertir la date du format HTML (YYYY-MM-DD) au format API (DD-MM-YYYY)
//     const expenseData: CreateExpenseRequest = {
//       ...this.newExpense,
//       date: this.convertDateForApi(this.newExpense.date)
//     };

//     if (this.isEditMode && this.editingExpenseId) {
//       // Mode modification
//       this.projectService.updateExpense(this.editingExpenseId, expenseData).subscribe({
//         next: (updatedExpense) => {
//           console.log('Dépense modifiée avec succès:', updatedExpense);
          
//           // Mettre à jour la dépense dans la liste
//           const index = this.expenses.findIndex(exp => exp.id === this.editingExpenseId);
//           if (index !== -1) {
//             this.expenses[index] = updatedExpense;
//           }
          
//           this.calculateBudgetValues();
//           this.updateChart();
//           this.closeExpenseModal();
//           this.loading = false;
//         },
//         error: (error) => {
//           console.error('Erreur lors de la modification de la dépense:', error);
//           this.modalError = 'Erreur lors de la modification de la dépense';
//           this.loading = false;
//         }
//       });
//     } else {
//       // Mode création
//       this.projectService.createExpense(expenseData).subscribe({
//         next: (expense) => {
//           console.log('Dépense créée avec succès:', expense);
//           this.expenses.push(expense);
//           this.calculateBudgetValues();
//           this.updateChart();
//           this.closeExpenseModal();
//           this.loading = false;
//         },
//         error: (error) => {
//           console.error('Erreur lors de la création de la dépense:', error);
//           this.modalError = 'Erreur lors de la création de la dépense';
//           this.loading = false;
//         }
//       });
//     }
//   }

//   /**
//    * Convertir la date du format HTML (YYYY-MM-DD) au format API (DD-MM-YYYY)
//    */
//   private convertDateForApi(dateStr: string): string {
//     const date = new Date(dateStr);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   }

//   /**
//    * Fermer le modal
//    */
//   closeExpenseModal(): void {
//     this.showExpenseModal = false;
//     this.isEditMode = false;
//     this.editingExpenseId = null;
//     this.modalError = null;
//     this.initializeNewExpense();
//   }

//   /**
//    * Supprimer une dépense
//    */
//   onDeleteExpense(expense: ExpenseResponse): void {
//     if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
//       this.deleteExpense(expense.id);
//     }
//   }

//   /**
//    * Supprimer une dépense
//    */
//   private deleteExpense(id: number): void {
//     this.loading = true;
//     this.projectService.deleteExpense(id).subscribe({
//       next: () => {
//         console.log('Dépense supprimée');
//         this.expenses = this.expenses.filter(expense => expense.id !== id);
//         this.calculateBudgetValues();
//         this.updateChart();
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Erreur lors de la suppression:', error);
//         this.error = 'Erreur lors de la suppression de la dépense';
//         this.loading = false;
//       }
//     });
//   }

//   /**
//    * Obtenir la date formatée pour l'affichage
//    * Gère les deux formats : number[] (de l'API) et string (du formulaire)
//    */
//   getFormattedDate(apiDate: number[] | string): string {
//     let date: Date;
    
//     if (Array.isArray(apiDate)) {
//       // Format API : [année, mois, jour]
//       date = this.convertArrayToDate(apiDate);
//     } else {
//       // Format string : convertir en date
//       date = new Date(apiDate);
//     }
    
//     return date.toLocaleDateString('fr-FR');
//   }

//   /**
//    * Convertir un tableau de nombres en objet Date
//    * Format attendu : [année, mois, jour] où mois commence à 1
//    */
//   private convertArrayToDate(dateArray: number[]): Date {
//     if (dateArray.length >= 3) {
//       // Les mois en JavaScript commencent à 0, donc on soustrait 1
//       return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
//     }
//     return new Date();
//   }

//   // Calcul du pourcentage pour le graphique circulaire
//   get pourcentageUtilise(): number {
//     return Math.round((this.budgetUtilise / this.budgetPrevu) * 100);
//   }

//   get pourcentageRestant(): number {
//     return Math.round((this.budgetRestant / this.budgetPrevu) * 100);
//   }

//   private createChart(): void {
//     if (this.budgetChart) {
//       const ctx = this.budgetChart.nativeElement.getContext('2d');
//       if (ctx) {
//         const config: ChartConfiguration<'doughnut'> = {
//           type: 'doughnut',
//           data: {
//             labels: ['Budget utilisé', 'Budget restant'],
//             datasets: [{
//               data: [this.budgetUtilise, this.budgetRestant],
//               backgroundColor: [
//                 '#10b981', // green-500 pour budget utilisé
//                 '#f97316'  // orange-500 pour budget restant
//               ],
//               borderWidth: 0
//             }]
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: true,
//             cutout: '60%',
//             plugins: {
//               legend: {
//                 display: false
//               },
//               tooltip: {
//                 callbacks: {
//                   label: (context) => {
//                     const value = context.parsed;
//                     const percentage = Math.round((value / this.budgetPrevu) * 100);
//                     return `${context.label}: ${this.formatCurrency(value)} (${percentage}%)`;
//                   }
//                 }
//               }
//             },
//             elements: {
//               arc: {
//                 borderWidth: 0
//               }
//             }
//           }
//         };

//         this.chart = new Chart(ctx, config);
//       }
//     }
//   }

//   private updateChart(): void {
//     if (this.chart) {
//       this.chart.data.datasets[0].data = [this.budgetUtilise, this.budgetRestant];
//       this.chart.update();
//     }
//   }

//   formatCurrency(amount: number): string {
//     return new Intl.NumberFormat('fr-FR').format(amount) + ' F';
//   }

//   setActiveTab(tab: string): void {
//     this.activeTab = tab;
//   }

//   onModify(): void {
//     console.log('Modifier le budget');
//     // Logique de modification
//   }
// }

// import { CommonModule } from '@angular/common';
// import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import { Chart, ChartConfiguration, registerables } from 'chart.js';
// import { FormsModule } from '@angular/forms';
// import { CreateExpenseRequest, ExpenseResponse, ProjectService } from '../../../../core/services/expenses.service';

// Chart.register(...registerables);

// interface Expense {
//   date: string;
//   libelle: string;
//   montant: number;
// }

// @Component({
//   selector: 'app-project-budget',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './project-budget.component.html',
//   styleUrl: './project-budget.component.css'
// })
// export class ProjectBudgetComponent implements OnInit, AfterViewInit {
//   @ViewChild('budgetChart', { static: false }) budgetChart!: ElementRef<HTMLCanvasElement>;
  
//   budgetPrevu = 1553076000;
//   budgetUtilise = 1500000000;
//   budgetRestant = 53076000;
  
//   private chart: Chart | null = null;
//   budgetId: number = 1; // Tu peux le définir dynamiquement (via la route par exemple)
  
//   // Modal state
//   showExpenseModal = false;
  
//   // Objet pour le nouveau expense
//   newExpense: CreateExpenseRequest = {
//     description: '',
//     date: '',
//     amount: 0,
//     budgetId: 1
//   };

//   expenses: ExpenseResponse[] = [];
//   loading = false;
//   error: string | null = null;
//   activeTab = 'budget';

//   constructor(private projectService: ProjectService) { }

//   ngOnInit(): void {
//     this.loadExpensesByBudget();
//     this.initializeNewExpense();
//   }

//   ngAfterViewInit(): void {
//     this.createChart();
//   }

//   ngOnDestroy(): void {
//     if (this.chart) {
//       this.chart.destroy();
//     }
//   }

//   /**
//    * Initialiser le nouvel expense avec les valeurs par défaut
//    */
//   private initializeNewExpense(): void {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD pour input date
    
//     this.newExpense = {
//       description: '',
//       date: formattedDate,
//       amount: 0,
//       budgetId: this.budgetId
//     };
//   }

//   /**
//    * Charger les dépenses par budget
//    */
//   loadExpensesByBudget(): void {
//     this.loading = true;
//     this.error = null;
  
//     const page = 0;
//     const size = 10;
  
//     this.projectService.getExpensesByBudgetId(this.budgetId, page, size).subscribe({
//       next: (response) => {
//         this.expenses = response.content;
//         this.calculateBudgetValues(); // Recalculer les valeurs du budget
//         this.updateChart(); // Mettre à jour le graphique
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Erreur lors du chargement des dépenses par budget:', error);
//         this.error = 'Erreur lors du chargement des dépenses';
//         this.loading = false;
//       }
//     });
//   }

//   /**
//    * Calculer les valeurs du budget basées sur les dépenses
//    */
//   private calculateBudgetValues(): void {
//     const totalUtilise = this.expenses.reduce((total, expense) => total + expense.amount, 0);
//     this.budgetUtilise = totalUtilise;
//     this.budgetRestant = this.budgetPrevu - this.budgetUtilise;
//   }

//   /**
//    * Ouvrir le modal d'ajout de dépense
//    */
//   onAddExpense(): void {
//     this.initializeNewExpense();
//     this.showExpenseModal = true;
//   }

//   /**
//    * Créer une nouvelle dépense depuis le modal
//    */
//   onSaveExpense(): void {
//     // Validation des données
//     if (!this.newExpense.description.trim()) {
//       this.error = 'La description est obligatoire';
//       return;
//     }
    
//     if (this.newExpense.amount <= 0) {
//       this.error = 'Le montant doit être supérieur à 0';
//       return;
//     }

//     if (!this.newExpense.date) {
//       this.error = 'La date est obligatoire';
//       return;
//     }

//     this.loading = true;
//     this.error = null;

//     // Convertir la date du format HTML (YYYY-MM-DD) au format API (DD-MM-YYYY)
//     const expenseToCreate: CreateExpenseRequest = {
//       ...this.newExpense,
//       date: this.convertDateForApi(this.newExpense.date),
//       budgetId: this.budgetId
//     };

//     this.projectService.createExpense(expenseToCreate).subscribe({
//       next: (expense) => {
//         console.log('Dépense créée avec succès:', expense);
//         this.expenses.push(expense);
//         this.calculateBudgetValues();
//         this.updateChart();
//         this.closeExpenseModal();
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Erreur lors de la création de la dépense:', error);
//         this.error = 'Erreur lors de la création de la dépense';
//         this.loading = false;
//       }
//     });
//   }

//   /**
//    * Convertir la date du format HTML (YYYY-MM-DD) au format API (DD-MM-YYYY)
//    */
//   private convertDateForApi(dateStr: string): string {
//     const date = new Date(dateStr);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   }

//   /**
//    * Fermer le modal
//    */
//   closeExpenseModal(): void {
//     this.showExpenseModal = false;
//     this.error = null;
//     this.initializeNewExpense();
//   }

//   /**
//    * Supprimer une dépense
//    */
//   onDeleteExpense(expense: ExpenseResponse): void {
//     if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
//       this.deleteExpense(expense.id);
//     }
//   }

//   /**
//    * Supprimer une dépense
//    */
//   deleteExpense(id: number): void {
//     this.loading = true;
//     this.projectService.deleteExpense(id).subscribe({
//       next: () => {
//         console.log('Dépense supprimée');
//         this.expenses = this.expenses.filter(expense => expense.id !== id);
//         this.calculateBudgetValues();
//         this.updateChart();
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Erreur lors de la suppression:', error);
//         this.error = 'Erreur lors de la suppression de la dépense';
//         this.loading = false;
//       }
//     });
//   }

//   /**
//    * Obtenir la date formatée pour l'affichage
//    */
//   getFormattedDate(apiDate: number[]): string {
//     const date = this.projectService.convertApiDateToDate(apiDate);
//     return date.toLocaleDateString('fr-FR');
//   }

//   // Calcul du pourcentage pour le graphique circulaire
//   get pourcentageUtilise(): number {
//     return Math.round((this.budgetUtilise / this.budgetPrevu) * 100);
//   }

//   get pourcentageRestant(): number {
//     return Math.round((this.budgetRestant / this.budgetPrevu) * 100);
//   }

//   private createChart(): void {
//     if (this.budgetChart) {
//       const ctx = this.budgetChart.nativeElement.getContext('2d');
//       if (ctx) {
//         const config: ChartConfiguration<'doughnut'> = {
//           type: 'doughnut',
//           data: {
//             labels: ['Budget utilisé', 'Budget restant'],
//             datasets: [{
//               data: [this.budgetUtilise, this.budgetRestant],
//               backgroundColor: [
//                 '#10b981', // green-500 pour budget utilisé
//                 '#f97316'  // orange-500 pour budget restant
//               ],
//               borderWidth: 0
//             }]
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: true,
//             cutout: '60%',
//             plugins: {
//               legend: {
//                 display: false
//               },
//               tooltip: {
//                 callbacks: {
//                   label: (context) => {
//                     const value = context.parsed;
//                     const percentage = Math.round((value / this.budgetPrevu) * 100);
//                     return `${context.label}: ${this.formatCurrency(value)} (${percentage}%)`;
//                   }
//                 }
//               }
//             },
//             elements: {
//               arc: {
//                 borderWidth: 0
//               }
//             }
//           }
//         };

//         this.chart = new Chart(ctx, config);
//       }
//     }
//   }

//   private updateChart(): void {
//     if (this.chart) {
//       this.chart.data.datasets[0].data = [this.budgetUtilise, this.budgetRestant];
//       this.chart.update();
//     }
//   }

//   formatCurrency(amount: number): string {
//     return new Intl.NumberFormat('fr-FR').format(amount) + ' F';
//   }

//   setActiveTab(tab: string): void {
//     this.activeTab = tab;
//   }

//   onModify(): void {
//     console.log('Modifier le budget');
//     // Logique de modification
//   }

//   onEditExpense(expense: ExpenseResponse): void {
//     console.log('Modifier la dépense:', expense);
//     // Logique de modification
//   }

//   // Méthodes de test (à supprimer en production)
//   createNewExpense(): void {
//     const newExpense: CreateExpenseRequest = {
//       description: "frais de service",
//       date: "01-10-2024",
//       amount: 2,
//       budgetId: 1
//     };

//     this.loading = true;
//     this.error = null;

//     this.projectService.createExpense(newExpense).subscribe({
//       next: (expense) => {
//         console.log('Dépense créée avec succès:', expense);
//         this.expenses.push(expense);
//         this.calculateBudgetValues();
//         this.updateChart();
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Erreur lors de la création de la dépense:', error);
//         this.error = 'Erreur lors de la création de la dépense';
//         this.loading = false;
//       }
//     });
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { ExpensesService } from '../../../../core/services/expenses.service';
// import { ExpenseResponse, Budget } from 'src/app/core/models/expense.model'; // adapte selon ton projet
import { Budget } from '../../../../models/budget.model';

Chart.register(...registerables);

@Component({
  selector: 'app-project-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-budget.component.html',
  styleUrl: './project-budget.component.css'
})
export class ProjectBudgetComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('budgetChart', { static: false }) budgetChart!: ElementRef<HTMLCanvasElement>;
  selectedPropertyId = 13;
  budgetPrevu = 0;
  budgetUtilise = 0;
  budgetRestant = 0;

  budgets: Budget[] = [];
  expenses: any[] = [];
  budgetId: number = 0;
  propertyId = 13; // à rendre dynamique si nécessaire

  showExpenseModal = false;
  newExpense = {
    description: '',
    date: '',
    amount: 0,
    budgetId: 0
  };

  private chart: Chart | null = null;
  error: string | null = null;
  loading = false;

  constructor(private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.loadBudgetsByProperty();
    this.initializeNewExpense();
    this.loadBudgets();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  initializeNewExpense(): void {
    const today = new Date();
    this.newExpense = {
      description: '',
      date: today.toISOString().split('T')[0],
      amount: 0,
      budgetId: this.budgetId
    };
  }

  loadBudgetsByProperty(): void {
    this.expensesService.getBudgetsByPropertyId(this.propertyId).subscribe({
      next: (budgets) => {
        this.budgets = budgets;
        if (budgets.length > 0) {
          this.budgetId = budgets[0].id;
          this.newExpense.budgetId = this.budgetId;
          this.budgetPrevu = budgets[0].plannedBudget || 0;
          this.budgetRestant = budgets[0].remainingBudget || 0;
        //   this.loadExpenses();
        }
      },
    //   error: (err) => {
    //     console.error('Erreur chargement budgets:', err);
    //     this.error = 'Erreur chargement des budgets';
    //   }
      error: (err) => {
        console.error('Erreur API:', err);
        this.error = 'Erreur serveur : impossible de charger les budgets.';
      }
    });
  }
  loadBudgets() {
    this.loading = true;
    this.expensesService.getBudgetsByPropertyId(this.selectedPropertyId).subscribe({
      next: (data: Budget[]) => {
        this.budgets = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Impossible de charger les budgets";
        this.loading = false;
      }
    });
  }

//   loadExpenses(): void {
//     const page = 0;
//     const size = 10;
//     this.expensesService.getExpensesByBudgetId(this.budgetId, page, size).subscribe({
//       next: (res) => {
//         this.expenses = res.content || [];
//         this.calculateBudgetValues();
//         this.updateChart();
//       },
//       error: (err) => {
//         console.error('Erreur chargement dépenses:', err);
//         this.error = 'Erreur chargement des dépenses';
//       }
//     });
//   }

  calculateBudgetValues(): void {
    this.budgetUtilise = this.expenses.reduce((sum, e) => sum + e.amount, 0);
    this.budgetRestant = this.budgetPrevu - this.budgetUtilise;
  }

  openModal(): void {
    this.initializeNewExpense();
    this.showExpenseModal = true;
  }

  closeModal(): void {
    this.showExpenseModal = false;
    this.error = null;
  }

  convertDateForApi(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  saveExpense(): void {
    if (!this.newExpense.description || this.newExpense.amount <= 0 || !this.newExpense.date) {
      this.error = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    const payload = {
      description: this.newExpense.description,
      date: this.convertDateForApi(this.newExpense.date),
      amount: this.newExpense.amount,
      budget: {
        id: this.newExpense.budgetId
      }
    };

    this.expensesService.addExpense(payload).subscribe({
      next: (expense) => {
        this.expenses.push(expense);
        this.calculateBudgetValues();
        this.updateChart();
        this.closeModal();
      },
      error: (err) => {
        console.error('Erreur création dépense:', err);
        this.error = 'Erreur lors de la création';
      }
    });
  }

  private createChart(): void {
    const ctx = this.budgetChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: ['Utilisé', 'Restant'],
        datasets: [{
          data: [this.budgetUtilise, this.budgetRestant],
          backgroundColor: ['#10b981', '#f97316'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        cutout: '60%'
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private updateChart(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = [this.budgetUtilise, this.budgetRestant];
      this.chart.update();
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' F';
  }
  getFormattedDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR');
  }
}
