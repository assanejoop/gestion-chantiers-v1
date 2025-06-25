import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProjectDetailHeaderComponent } from './features/project-detail-header/project-detail-header.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { SubcontractorComponent } from './features/subcontractor/subcontractor.component';
import { SupplierComponent } from './features/supplier/supplier.component';
import { UnitComponent } from './features/components/settings/unit/unit.component';
import { DocumentComponent } from './features/components/settings/document/document.component';
import { MaterialCategoryComponent } from './features/components/settings/material-category/material-category.component';
import { PropertyTypeComponent } from './features/components/settings/property-type/property-type.component';
import { NewProjectComponent } from './features/components/project/new-project/new-project.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Tableau de Bord' }
      },
      {
        path: 'humanresources',
        loadChildren: () => import('./features/humanresources/humanresource.routes')
          .then(m => m.HUMANRESOURCES_ROUTES)
        // ⚠️ Gère les breadcrumbs dans le fichier humanresource.routes
      },
      {
        path: 'subcontractor',
        component: SubcontractorComponent,
        data: { breadcrumb: 'Sous-traitants' }
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/projects.routes')
          .then(m => m.PROJECTS_ROUTES)
        // ⚠️ Gère les breadcrumbs dans le fichier projects.routes
      },
      {
        path: 'detailprojet/:id',
        component: ProjectDetailHeaderComponent,
        data: { breadcrumb: 'Détail Projet' }
      },
      {
        path: 'nouveau-projet',
        component: NewProjectComponent,
        data: { breadcrumb: 'Nouveau Projet' }
      },
      {
        path: 'communication',
        loadChildren: () => import('./features/communication/communication.routes')
          .then(m => m.COMMUNICATION_ROUTES)
        // ⚠️ Gère les breadcrumbs dans le fichier communication.routes
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.routes')
          .then(m => m.SETTINGS_ROUTES)
        // ⚠️ Gère les breadcrumbs dans le fichier settings.routes
      },
      {
        path: 'parametres/unite-mesure',
        component: UnitComponent,
        data: { breadcrumb: 'Unités de Mesure' }
      },
      {
        path: 'parametres/documents',
        component: DocumentComponent,
        data: { breadcrumb: 'Documents' }
      },
      {
        path: 'parametres/categories',
        component: MaterialCategoryComponent,
        data: { breadcrumb: 'Catégories de Matériaux' }
      },
      {
        path: 'parametres/typebien',
        component: PropertyTypeComponent,
        data: { breadcrumb: 'Types de Bien' }
      },
      {
        path: 'fournisseur',
        component: SupplierComponent,
        data: { breadcrumb: 'Fournisseurs' }
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
