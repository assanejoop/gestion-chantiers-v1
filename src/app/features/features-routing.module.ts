// src/app/features/features-routing.module.ts
import { Routes } from '@angular/router';
import { ProjectDetailHeaderComponent } from './project-detail-header/project-detail-header.component';

export const FEATURES_ROUTES: Routes = [
  { 
    path: 'dashboard', 
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) 
  },
  { 
    path: 'humanresources', 
    loadComponent: () => import('./humanresources/humanresources.component').then(m => m.HumanResourcesComponent) 
  },
  { 
    path: 'financial', 
    loadComponent: () => import('./sub-contractor/financial.component').then(m => m.FinancialComponent) 
  },
  { 
    path: 'communication', 
    loadComponent: () => import('./communication/communication.component').then(m => m.CommunicationComponent) 
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) 
   
  },
  { path: 'project-detail-header', component: ProjectDetailHeaderComponent },
  { 
    path: 'projects', 
    loadComponent: () => import('./projects/projects.component').then(m => m.ProjectsComponent) 

  },
  { 
    path: 'stocks', 
    loadComponent: () => import('./stocks/stocks.component').then(m => m.StocksComponent) 
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];