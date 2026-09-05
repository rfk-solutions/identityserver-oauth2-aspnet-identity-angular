import { Routes } from '@angular/router';
import { AuthCallbackComponent } from './core/auth/auth-callback.component';
import { authGuard } from './core/auth/auth.guard';
import { CompaniesPageComponent } from './features/companies/companies-page.component';
import { CompanyDetailsPageComponent } from './features/companies/company-details-page.component';
import { EmployeesPageComponent } from './features/employees/employees-page.component';
import { HomePageComponent } from './features/home/home-page.component';

export const routes: Routes = [
	{ path: '', component: HomePageComponent },
	{ path: 'companies', component: CompaniesPageComponent, canActivate: [authGuard] },
		{ path: 'companies/:id', component: CompanyDetailsPageComponent, canActivate: [authGuard] },
		{ path: 'companies/:id/employees', component: EmployeesPageComponent, canActivate: [authGuard] },
	{ path: 'auth/callback', component: AuthCallbackComponent },
	{ path: '**', redirectTo: '' }
];
