import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProjectDetailHeaderComponent } from './features/project-detail-header/project-detail-header.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'humanresources',
        loadChildren: () => import('./features//humanresources/humanresource.routes')
          .then(m => m.HUMANRESOURCES_ROUTES)
      },
      {
        path: 'financial',
        loadChildren: () => import('./features/financial/financial.routes')
          .then(m => m.FINANCIAL_ROUTES)
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/projects.routes')
          .then(m => m.PROJECTS_ROUTES)
      },
      { path: 'project-detail-header', component: ProjectDetailHeaderComponent },
      {
        path: 'communication',
        loadChildren: () => import('./features/communication/communication.routes')
          .then(m => m.COMMUNICATION_ROUTES)
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.routes')
          .then(m => m.SETTINGS_ROUTES)
      },

      {
        path: 'stocks',
        loadChildren: () => import('./features/stocks/stocks.routes')
          .then(m => m.STOCKS_ROUTES)
      },
      { path: '', redirectTo: 'humanresources', pathMatch: 'full' }
    ]
  },
  // {
  //   path: 'features',
  //   // canActivate: const [authGuard],
  //   loadChildren: () => import('./features/features-routing.module').then(m => m.FEATURES_ROUTES)
  // },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];