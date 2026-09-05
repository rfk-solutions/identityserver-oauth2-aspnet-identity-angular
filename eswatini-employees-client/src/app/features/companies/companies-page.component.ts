import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, Company, CompanyInput, Employee, EmployeeInput } from '../../core/api/api.service';

@Component({
  selector: 'app-companies-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './companies-page.component.html',
  styleUrl: './companies-page.component.scss'
})
export class CompaniesPageComponent {
  private readonly api = inject(ApiService);
  companies: Company[] = [];
  employees: Employee[] = [];
  selectedCompany: Company | null = null;
  editingCompanyId = '';
  editingEmployeeId = '';
  companyDraft: CompanyInput = this.emptyCompany();
  employeeDraft: EmployeeInput = this.emptyEmployee();
  error = '';
  notice = '';
  loading = true;
  loadingEmployees = false;
  saving = false;

  constructor() { this.loadCompanies(); }

  loadCompanies(): void {
    this.loading = true;
    this.error = '';
    this.api.getCompanies().subscribe({
      next: (companies) => { this.companies = companies; this.loading = false; },
      error: () => {
        this.error = 'The companies could not be loaded. Check that the API is running.';
        this.loading = false;
      }
    });
  }

  selectCompany(company: Company): void {
    this.selectedCompany = company;
    this.cancelCompanyEdit();
    this.cancelEmployeeEdit();
    this.loadEmployees(company.id);
  }

  startCompanyEdit(company: Company): void {
    this.selectedCompany = company;
    this.editingCompanyId = company.id;
    this.companyDraft = { name: company.name, address: company.address, country: company.country };
  }

  saveCompany(): void {
    this.saving = true;
    if (this.editingCompanyId) {
      this.api.updateCompany(this.editingCompanyId, this.companyDraft).subscribe({
        next: () => this.finishCompanySave('Company updated.'),
        error: () => this.handleError('The company could not be saved.')
      });
      return;
    }

    this.api.createCompany(this.companyDraft).subscribe({
      next: () => this.finishCompanySave('Company created.'),
      error: () => this.handleError('The company could not be saved.')
    });
  }

  deleteCompany(company: Company): void {
    if (!window.confirm(`Delete ${company.name} and all of its employees?`)) return;
    this.saving = true;
    this.api.deleteCompany(company.id).subscribe({
      next: () => {
        this.notice = 'Company deleted.';
        this.saving = false;
        this.selectedCompany = null;
        this.employees = [];
        this.loadCompanies();
      },
      error: () => this.handleError('The company could not be deleted.')
    });
  }

  cancelCompanyEdit(): void {
    this.editingCompanyId = '';
    this.companyDraft = this.emptyCompany();
  }

  loadEmployees(companyId: string): void {
    this.loadingEmployees = true;
    this.api.getEmployees(companyId).subscribe({
      next: (employees) => { this.employees = employees; this.loadingEmployees = false; },
      error: () => this.handleError('The employees could not be loaded.')
    });
  }

  startEmployeeEdit(employee: Employee): void {
    this.editingEmployeeId = employee.id;
    this.employeeDraft = { name: employee.name, age: employee.age, position: employee.position };
  }

  saveEmployee(): void {
    if (!this.selectedCompany) return;
    this.saving = true;
    if (this.editingEmployeeId) {
      this.api.updateEmployee(this.selectedCompany.id, this.editingEmployeeId, this.employeeDraft).subscribe({
        next: () => this.finishEmployeeSave('Employee updated.'),
        error: () => this.handleError('The employee could not be saved.')
      });
      return;
    }

    this.api.createEmployee(this.selectedCompany.id, this.employeeDraft).subscribe({
      next: () => this.finishEmployeeSave('Employee created.'),
      error: () => this.handleError('The employee could not be saved.')
    });
  }

  patchEmployee(): void {
    if (!this.selectedCompany || !this.editingEmployeeId) return;
    this.saving = true;
    this.api.patchEmployee(this.selectedCompany.id, this.editingEmployeeId, this.employeeDraft).subscribe({
      next: () => this.finishEmployeeSave('Employee patched.'),
      error: () => this.handleError('The employee patch could not be applied.')
    });
  }

  deleteEmployee(employee: Employee): void {
    if (!this.selectedCompany || !window.confirm(`Delete ${employee.name}?`)) return;
    this.saving = true;
    this.api.deleteEmployee(this.selectedCompany.id, employee.id).subscribe({
      next: () => {
        this.notice = 'Employee deleted.';
        this.saving = false;
        this.loadEmployees(this.selectedCompany!.id);
      },
      error: () => this.handleError('The employee could not be deleted.')
    });
  }

  cancelEmployeeEdit(): void {
    this.editingEmployeeId = '';
    this.employeeDraft = this.emptyEmployee();
  }

  private finishCompanySave(message: string): void {
    this.notice = message;
    this.saving = false;
    this.cancelCompanyEdit();
    this.loadCompanies();
  }

  private finishEmployeeSave(message: string): void {
    this.notice = message;
    this.saving = false;
    const companyId = this.selectedCompany!.id;
    this.cancelEmployeeEdit();
    this.loadEmployees(companyId);
  }

  private handleError(message: string): void {
    this.error = message;
    this.saving = false;
    this.loading = false;
    this.loadingEmployees = false;
  }

  private emptyCompany(): CompanyInput { return { name: '', address: '', country: 'Eswatini' }; }
  private emptyEmployee(): EmployeeInput { return { name: '', age: 18, position: '' }; }
}
