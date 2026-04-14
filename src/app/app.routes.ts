import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PrListComponent } from './auth/pr-list/pr-list.component';
import { PrCreateComponent } from './auth/pr-create/pr-create.component';
import { AdminDashboardComponent } from './auth/admin/admin-dashboard.component';
import { StockListComponent } from './auth/stock-list/stock-list.component';
import { AdminGuard } from './guard/admin';
import { ManagerGuard } from './guard/manager';
import { ReportsComponent } from './auth/report/reports.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'PurchaseRequest', component: PrListComponent },
  { path: 'pr-create', component: PrCreateComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stock', component: StockListComponent, canActivate: [ManagerGuard] },
  { path: 'reports', component: ReportsComponent, runGuardsAndResolvers: 'always' },
  { path: '**', redirectTo: 'login' },
];
