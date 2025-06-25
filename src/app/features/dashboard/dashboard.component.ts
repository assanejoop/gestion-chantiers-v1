// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
// import { Chart } from 'chart.js/auto';
// import { CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, DoughnutController, Tooltip } from 'chart.js';

// // Register Chart.js components
// Chart.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement, 
//   PointElement,
//   ArcElement,
//   DoughnutController,
//   Tooltip
// );

// // Import core components
// import { HeaderComponent } from "../../core/components/header/header.component";
// import { SidebarComponent } from "../../sidebar/sidebar.component";

// // Import custom components
// import { CriticalTaskComponent, CriticalTask } from '../components/dashboard/critical-task/critical-task.component';
// import { ProgessReportComponent } from '../components/dashboard/progess-report/progess-report.component';
// import { IncidentsChartComponent } from '../components/dashboard/incidents-chart/incidents-chart.component';
// import { PhotoProjectComponent, ProjectPhoto } from '../components/dashboard/photo-project/photo-project.component';
// import { MaterialStockAlertComponent } from '../components/dashboard/material-stock-alert/material-stock-alert.component';
// import { ProjectOviewComponent } from '../components/dashboard/project-oview/project-oview.component';
// import { AvaragerateAvancementComponent } from '../components/dashboard/avaragerate-avancement/avaragerate-avancement.component';
// import { PerformanceSummary } from '../../models/PerformanceSummary';
// import { OverallBudgetComponent } from "../components/dashboard/overall-budget/overall-budget.component";

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterOutlet,
//     HeaderComponent,
//     SidebarComponent,
//     CriticalTaskComponent,
//     MaterialStockAlertComponent,
//     ProgessReportComponent,
//     IncidentsChartComponent,
//     PhotoProjectComponent,
//     ProjectOviewComponent,
//     AvaragerateAvancementComponent,
//     OverallBudgetComponent
//   ],
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit, AfterViewInit {
  
//   // Données du dashboard
//   chantiersSummary = {
//     enCours: 12,
//     enRetard: 8,
//     enAttente: 5,
//     termines: 8
//   };

//   tauxMoyenAvancement = 60;
  
//   budgetData = {
//     consomme: 42000000,
//     total: 60000000,
//     pourcentage: 70
//   };
  
//   stockMateriaux = [
//     { 
//       nom: 'Ciment (Chantier A)', 
//       quantite: 20, 
//       seuil: 25, 
//       pourcentage: 30, 
//       status: 'Faible' 
//     },
//     { 
//       nom: 'Fer à béton (Chantier A)', 
//       quantite: 40, 
//       seuil: 40, 
//       pourcentage: 65, 
//       status: 'Normal' 
//     },
//     { 
//       nom: 'Carrelage (Chantier B)', 
//       quantite: 12, 
//       seuil: 30, 
//       pourcentage: 15, 
//       status: 'Critique atteint' 
//     }
//   ];
  
//   etatAvancement = [
//     { phase: 'Gros œuvre', avancement: 90 },
//     { phase: 'Second œuvre', avancement: 60 },
//     { phase: 'Finition', avancement: 15 }
//   ];
  
//   incidents7Jours = [
//     { jour: 'J-6', nombre: 3 },
//     { jour: 'J-5', nombre: 2 },
//     { jour: 'J-4', nombre: 1 },
//     { jour: 'J-3', nombre: 4 },
//     { jour: 'J-2', nombre: 2 },
//     { jour: 'J-1', nombre: 3 },
//     { jour: 'Aujourd\'hui', nombre: 5 }
//   ];
  
//   tachesCritiques: CriticalTask[] = [
//     { nom: 'Clôture du chantier A', echeance: '01/05/2025', status: 'En retard', jours: 0 },
//     { nom: 'Livraison matériel chantier B', echeance: '10/05/2025', status: 'Urgent', jours: 0 },
//     { nom: 'Inspection sécurité chantier C', echeance: '15/05/2025', status: 'À jour', jours: 7 },
//     { nom: 'Réunion suivi client', echeance: '25/05/2025', status: 'À jour', jours: 17 }
//   ];
  
//   photosRecentes: ProjectPhoto[] = [
//     { url: '/api/placeholder/180/120', titre: 'Chantier A', date: '02/05/2025' },
//     { url: '/api/placeholder/180/120', titre: '', date: '' },
//     { url: '/api/placeholder/180/120', titre: '', date: '' },
//     { url: '/api/placeholder/180/120', titre: '', date: '' }
//   ];
  
//   performancesSummary: PerformanceSummary = {
//     averageProgress: 68,
//     budgetConsumed: 70,
//     incidents: 12,
//     averagePresence: 89,
//     delayedTasks: 7,
//     materialsAlerted: 17
//   };

//   constructor() { }

//   ngOnInit(): void {
//     // Initialisation des données si nécessaire
//   }

//   ngAfterViewInit(): void {
//     this.initCharts();
//   }

//   initCharts(): void {
//     // Les charts sont maintenant initialisés dans leurs composants respectifs
//     // Cette méthode reste pour d'éventuelles initialisations futures
//   }

//   // Méthodes utilitaires
//   formatCurrency(amount: number): string {
//     return amount.toLocaleString('fr-FR') + ' FCFA';
//   }
// }

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, DoughnutController, Tooltip } from 'chart.js';

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement, 
  PointElement,
  ArcElement,
  DoughnutController,
  Tooltip
);

// Import core components


// Import custom components
import { CriticalTaskComponent, CriticalTask } from '../components/dashboard/critical-task/critical-task.component';

import { IncidentsChartComponent } from '../components/dashboard/incidents-chart/incidents-chart.component';
import { PhotoProjectComponent, ProjectPhoto } from '../components/dashboard/photo-project/photo-project.component';
import { MaterialStockAlertComponent, MaterialStockItem } from '../components/dashboard/material-stock-alert/material-stock-alert.component';
import { ProjectOviewComponent } from '../components/dashboard/project-oview/project-oview.component';
import { AvaragerateAvancementComponent } from '../components/dashboard/avaragerate-avancement/avaragerate-avancement.component';
import { PerformanceSummary } from '../../models/PerformanceSummary';
import { OverallBudgetComponent } from "../components/dashboard/overall-budget/overall-budget.component";
import { ProgressReportComponent } from '../components/dashboard/progess-report/progess-report.component';
import { AuthService } from '../auth/services/auth.service';
import { DahsboardService } from '../../core/services/dahsboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CriticalTaskComponent,
    MaterialStockAlertComponent,
    ProgressReportComponent,
    IncidentsChartComponent,
    PhotoProjectComponent,
    ProjectOviewComponent,
    AvaragerateAvancementComponent,
    OverallBudgetComponent,
    
],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  currentUserId!: number;


  currentUser: any = null;
  selectedPropertyId: number = 1; // ID par défaut ou récupéré dynamiquement
  isUserLoaded: boolean = false;
  // Données du dashboard
  chantiersSummary = {
    enCours: 12,
    enRetard: 8,
    enAttente: 5,
    termines: 8
  };

  tauxMoyenAvancement = 60;
  
  budgetData = {
    consomme: 42000000,
    total: 60000000,
    pourcentage: 70
  };
  
  stockMateriaux: MaterialStockItem[] = [
    { 
      nom: 'Ciment (Chantier A)', 
      quantite: 20, 
      seuil: 25, 
      pourcentage: 30, 
      status: 'Faible' 
    },
    { 
      nom: 'Fer à béton (Chantier A)', 
      quantite: 40, 
      seuil: 40, 
      pourcentage: 65, 
      status: 'Normal' 
    },
    { 
      nom: 'Carrelage (Chantier B)', 
      quantite: 12, 
      seuil: 30, 
      pourcentage: 15, 
      status: 'Critique atteint' 
    }
  ];
  
  etatAvancement = [
    { phase: 'Gros œuvre', avancement: 90 },
    { phase: 'Second œuvre', avancement: 60 },
    { phase: 'Finition', avancement: 15 }
  ];
  
  incidents7Jours = [
    { jour: 'J-6', nombre: 3 },
    { jour: 'J-5', nombre: 2 },
    { jour: 'J-4', nombre: 1 },
    { jour: 'J-3', nombre: 4 },
    { jour: 'J-2', nombre: 2 },
    { jour: 'J-1', nombre: 3 },
    { jour: 'Aujourd\'hui', nombre: 5 }
  ];
  
  tachesCritiques: CriticalTask[] = [
    { nom: 'Clôture du chantier A', echeance: '01/05/2025', status: 'En retard', jours: 0 },
    { nom: 'Livraison matériel chantier B', echeance: '10/05/2025', status: 'Urgent', jours: 0 },
    { nom: 'Inspection sécurité chantier C', echeance: '15/05/2025', status: 'À jour', jours: 7 },
    { nom: 'Réunion suivi client', echeance: '25/05/2025', status: 'À jour', jours: 17 }
  ];
  
  photosRecentes: ProjectPhoto[] = [
    // { url: '/api/placeholder/180/120', titre: 'Chantier A', date: '02/05/2025' },
    // { url: '/api/placeholder/180/120', titre: '', date: '' },
    // { url: '/api/placeholder/180/120', titre: '', date: '' },
    // { url: '/api/placeholder/180/120', titre: '', date: '' }

    // {
    //   url: 'assets/images/photoRecents/photo1.png',
    //   titre: 'Chantier A',
    //   date: '12/03/2025'
    // },
    // {
    //   url: 'assets/images/photoRecents/photo2.png',
    //   titre: 'Structure',
    //   date: '25/03/2025'
    // },
    // {
    //   url: 'assets/images/photoRecents/photo3.png',
    //   titre: 'Toiture',
    //   date: '10/04/2025'
    // },
    // {
    //   url: 'assets/images/photoRecents/photo3.png',
    //   titre: '',
    //   date: ''
    // },
    // {
    //   url: 'assets/images/photoRecents/photo3.png',
    //   titre: '',
    //   date: ''
    // },
   
  ];
  
  performancesSummary: PerformanceSummary = {
    averageProgress: 68,
    budgetConsumed: 70,
    incidents: 12,
    averagePresence: 89,
    delayedTasks: 7,
    materialsAlerted: 17
  };

  progressRate: number = 60;
// selectedPropertyId: number|undefined;
averageProgressPercentage: any;
propertyId: number|undefined;
mesProprietes: any;
  userProperties!: any[];
constructor(
  private authService: AuthService,
  private dashboardService: DahsboardService,
  private router: Router
) { }

ngOnInit(): void {
  this.initializeDashboard();
}

ngAfterViewInit(): void {
  this.initCharts();
}

/**
 * Initialise le dashboard en vérifiant d'abord l'authentification
 */
private initializeDashboard(): void {
  // Vérifier si l'utilisateur est connecté
  this.authService.getCurrentUser().subscribe({
    next: (user) => {
      if (user && user.id) {
        this.currentUser = user;
        this.isUserLoaded = true;
        this.currentUserId = user.id; // 
        console.log('Utilisateur connecté:', user);
        
        // Une fois l'utilisateur chargé, charger les données du dashboard
        this.loadDashboardData();
      } else {
        console.error('Utilisateur non connecté');
        // this.redirectToLogin();
      }
    },
    error: (error) => {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      // this.redirectToLogin();
    }
  });
}


// private initializeDashboard(): void {
//   this.authService.getCurrentUser().subscribe({
//     next: (user) => {
//       if (user && user.id) {
//         this.currentUser = user;
//         this.isUserLoaded = true;
//         this.currentUserId = user.id;
        
//         console.log('👤 Utilisateur connecté:', {
//           id: user.id,
//           nom: user.nom || user.name,
//           email: user.email
//         });
        
//         // 🔧 Debug: Vérifier les IDs utilisés
//         console.log('🔍 IDs utilisés pour les KPIs:', {
//           currentUserId: this.currentUserId,
//           selectedPropertyId: this.selectedPropertyId
//         });
        
//         // Charger les propriétés de l'utilisateur d'abord
//         this.loadUserProperties();
        
//       } else {
//         console.error('❌ Utilisateur non connecté');
//         this.redirectToLogin();
//       }
//     },
//     error: (error) => {
//       console.error('❌ Erreur lors de la récupération de l\'utilisateur:', error);
//       this.redirectToLogin();
//     }
//   });
// }

/**
 * Charge les propriétés de l'utilisateur
 */
private loadUserProperties(): void {
  this.dashboardService.getUserProperties(this.currentUserId).subscribe({
    next: (properties) => {
      console.log('🏠 Propriétés de l\'utilisateur:', properties);
      this.userProperties = properties;
      
      // Si l'utilisateur a des propriétés, prendre la première par défaut
      if (properties && properties.length > 0) {
        this.selectedPropertyId = properties[0].id;
        console.log('🏠 Propriété sélectionnée automatiquement:', this.selectedPropertyId);
      }
      
      // Maintenant charger les données du dashboard
      this.loadDashboardData();
    },
    error: (error) => {
      console.error('❌ Erreur lors du chargement des propriétés:', error);
      // Continuer avec la valeur par défaut
      this.loadDashboardData();
    }
  });
}

/**
 * Charge les KPIs des tâches avec debug
 */
private loadTasksKPIs(): void {
  if (!this.selectedPropertyId || !this.currentUserId) {
    console.warn('⚠️ Paramètres manquants pour les KPIs:', {
      selectedPropertyId: this.selectedPropertyId,
      currentUserId: this.currentUserId
    });
    return;
  }

  console.log('🚀 Chargement des KPIs avec:', {
    selectedPropertyId: this.selectedPropertyId,
    currentUserId: this.currentUserId
  });

  this.dashboardService.getTasksKPIs(this.selectedPropertyId, this.currentUserId).subscribe({
    next: (data) => {
      console.log('✅ KPIs des tâches chargés:', data);
      
      // Mettre à jour chantiersSummary avec les vraies données
      if (data) {
        this.chantiersSummary = {
          enCours: data.pendingTasks || 0,
          enRetard: data.overdueTasks || 0,
          enAttente: data.pendingTasks || 0, // Ajustez selon votre API
          termines: data.completedTasks || 0
        };
        
        console.log('📊 Données mises à jour:', this.chantiersSummary);
      }
    },
    error: (error) => {
      console.error('❌ Erreur lors du chargement des KPIs des tâches:', error);
    }
  });
}

// private loadPhotosRecentes(): void {
//   if (!this.selectedPropertyId) return;

//   this.dashboardService.getRecentProgressAlbums(this.selectedPropertyId).subscribe({
//     next: (data: string[]) => {
//       this.photosRecentes = data.map((filename, index) => ({
//         url: `https://wakana.online/repertoire_chantier/${filename}`,
//         titre: `Photo ${index + 1}`,
//         date: new Date().toLocaleDateString('fr-FR'), // ou la vraie date si tu l’as
//         photo: filename
//       }));

//       console.log('📸 Photos récentes formatées:', this.photosRecentes);
//     },
//     error: (err) => {
//       console.error('❌ Erreur lors du chargement des photos récentes:', err);
//     }
//   });
// }


// ... autres méthodes

/**
 * Test manuel des KPIs avec les valeurs qui fonctionnent dans Postman
 */
testKPIsWithWorkingValues(): void {
  console.log('🧪 Test avec les valeurs qui fonctionnent:');
  this.dashboardService.getTasksKPIs(17, 19).subscribe({
    next: (data) => {
      console.log('✅ Test réussi avec propertyId=17, promoterId=19:', data);
    },
    error: (error) => {
      console.error('❌ Test échoué:', error);
    }
  });
}
/**
 * Charge toutes les données du dashboard
 */
private loadDashboardData(): void {
  if (!this.currentUser || !this.currentUser.id) {
    console.error('Impossible de charger les données: utilisateur non authentifié');
    return;
  }


  
  // Charger les KPIs des tâches
  this.loadTasksKPIs();
  
  // Charger les indicateurs globaux
  this.loadGlobalIndicators();
  
  // Charger les données budget
  this.loadBudgetData();
  
  // Charger les matériaux critiques
  this.loadCriticalMaterials();
  
  // Charger les incidents
  this.loadIncidents();
  // charger les photos récentes
  // this.loadPhotosRecentes();
}

/**
 * Charge les KPIs des tâches
 */
// private loadTasksKPIs(): void {
//   if (!this.selectedPropertyId || !this.currentUserId) {
//     console.warn('ID de la propriété ou de l’utilisateur manquant');
//     return;
//   }

//   this.dashboardService.getTasksKPIs(this.selectedPropertyId, this.currentUserId).subscribe({
//     next: (data) => {
//       console.log('KPIs des tâches chargés:', data);
//       // this.updateTasksKPIs(data); // si tu as un traitement à faire ensuite
//     },
//     error: (error) => {
//       console.error('Erreur lors du chargement des KPIs des tâches:', error);
//     }
//   });
// }


/**
 * Charge les indicateurs globaux
 */
private loadGlobalIndicators(): void {
  this.dashboardService.getGlobalIndicators().subscribe({
    next: (data) => {
      console.log('Indicateurs globaux chargés:', data);
      // Mettre à jour vos données avec les données reçues
      // this.updateGlobalIndicators(data);
    },
    error: (error) => {
      console.error('Erreur lors du chargement des indicateurs globaux:', error);
    }
  });
}

/**
 * Charge les données budget
 */
private loadBudgetData(): void {
  const additionalParams = { period: 'monthly', year: 2024 };
  
  if (!this.selectedPropertyId || !this.currentUserId) {
    console.warn("Paramètres manquants");
    return;
  }

  this.dashboardService.getBudgetDashboardKpiWithParams(
    this.selectedPropertyId,
    this.currentUserId,
    { someParam: 'value' } // <-- si tu en as besoin
  ).subscribe({
    next: (data) => {
      console.log("Budget KPIs chargés:", data);
      // traitement ici
    },
    error: (err) => {
      console.error("Erreur lors du chargement des KPI:", err);
    }
  });
}

/**
 * Charge les matériaux critiques
 */
private loadCriticalMaterials(): void {
  if (!this.currentUserId) {
    console.warn('ID utilisateur manquant pour les matériaux critiques');
    return;
  }

  this.dashboardService.getCriticalMaterials(this.currentUserId).subscribe({
    next: (data) => {
      console.log('Matériaux critiques chargés:', data);
      // this.updateMaterialsStock(data); // si tu veux mettre à jour un tableau affiché
    },
    error: (error) => {
      console.error('Erreur lors du chargement des matériaux critiques:', error);
    }
  });
}

/**
 * Charge les incidents
 */
private loadIncidents(): void {
  if (!this.currentUserId) {
    console.warn('ID utilisateur manquant pour les incidents');
    return;
  }

  this.dashboardService.getIncidentsKpi(this.currentUserId).subscribe({
    next: (data) => {
      console.log('Incidents chargés:', data);
      // this.updateIncidents(data); // si tu veux mettre à jour un tableau ou une statistique
    },
    error: (error) => {
      console.error('Erreur lors de la récupération des incidents:', error);
    }
  });
}


/**
 * Redirige vers la page de connexion
 */
// private redirectToLogin(): void {
//   this.router.navigate(['/login']);
// }

initCharts(): void {
  // Les charts sont maintenant initialisés dans leurs composants respectifs
  // Cette méthode reste pour d'éventuelles initialisations futures
}

// Méthodes utilitaires
formatCurrency(amount: number): string {
  return amount.toLocaleString('fr-FR') + ' FCFA';
}

/**
 * Getter pour vérifier si les données peuvent être chargées
 */
get canLoadData(): boolean {
  return this.isUserLoaded && this.currentUser && this.currentUser.id;
}


 




}