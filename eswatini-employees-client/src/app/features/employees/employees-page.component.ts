import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Company, Employee, EmployeeInput } from '../../core/api/api.service';

type EmployeeSort = 'name' | 'age' | 'position';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss'
})
export class EmployeesPageComponent {
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  company: Company | null = null;
  employees: Employee[] = [];
  query = '';
  positionFilter = '';
  minAge: number | null = null;
  maxAge: number | null = null;
  sortBy: EmployeeSort = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  readonly pageSize = 5;
  currentPage = 1;
  draft: EmployeeInput = this.emptyDraft();
  editingId = '';
  loading = true;
  saving = false;
  error = '';
  notice = '';

  constructor() {
    const companyId = this.route.snapshot.paramMap.get('id') ?? '';
    this.api.getCompany(companyId).subscribe({
      next: (company) => { this.company = company; this.loadEmployees(company.id); },
      error: () => { this.error = 'The company could not be loaded.'; this.loading = false; }
    });
  }

  get positions(): string[] {
    return [...new Set(this.employees.map((employee) => employee.position))].sort();
  }

  get filteredEmployees(): Employee[] {
    const query = this.query.trim().toLowerCase();
    return this.employees
      .filter((employee) => !query || `${employee.name} ${employee.position}`.toLowerCase().includes(query))
      .filter((employee) => !this.positionFilter || employee.position === this.positionFilter)
      .filter((employee) => this.minAge === null || employee.age >= this.minAge)
      .filter((employee) => this.maxAge === null || employee.age <= this.maxAge)
      .sort((left, right) => {
        const a = String(left[this.sortBy]).toLowerCase();
        const b = String(right[this.sortBy]).toLowerCase();
        const result = this.sortBy === 'age' ? left.age - right.age : a.localeCompare(b);
        return this.sortDirection === 'asc' ? result : -result;
      });
  }

  get visibleEmployees(): Employee[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredEmployees.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredEmployees.length / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  loadEmployees(companyId = this.company?.id ?? ''): void {
    this.loading = true;
    this.api.getEmployees(companyId).subscribe({
      next: (employees) => { this.employees = employees; this.currentPage = 1; this.loading = false; },
      error: () => { this.error = 'Employees could not be loaded.'; this.loading = false; }
    });
  }

  changeSort(sortBy: EmployeeSort): void {
    if (this.sortBy === sortBy) this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    else { this.sortBy = sortBy; this.sortDirection = 'asc'; }
    this.currentPage = 1;
  }

  resetPage(): void { this.currentPage = 1; }

  goToPage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
  }

  startEdit(employee: Employee): void {
    this.editingId = employee.id;
    this.draft = { name: employee.name, age: employee.age, position: employee.position };
  }

  save(): void {
    if (!this.company) return;
    this.saving = true;
    const complete = (message: string) => {
      this.notice = message;
      this.saving = false;
      this.cancelEdit();
      this.loadEmployees();
    };
    if (this.editingId) {
      this.api.updateEmployee(this.company.id, this.editingId, this.draft).subscribe({
        next: () => complete('Employee updated.'),
        error: () => this.fail('The employee could not be updated.')
      });
    } else {
      this.api.createEmployee(this.company.id, this.draft).subscribe({
        next: () => complete('Employee created.'),
        error: () => this.fail('The employee could not be created.')
      });
    }
  }

  patch(): void {
    if (!this.company || !this.editingId) return;
    this.saving = true;
    this.api.patchEmployee(this.company.id, this.editingId, this.draft).subscribe({
      next: () => { this.notice = 'Employee patched.'; this.saving = false; this.cancelEdit(); this.loadEmployees(); },
      error: () => this.fail('The employee patch could not be applied.')
    });
  }

  delete(employee: Employee): void {
    if (!this.company || !window.confirm(`Delete ${employee.name}?`)) return;
    this.saving = true;
    this.api.deleteEmployee(this.company.id, employee.id).subscribe({
      next: () => { this.notice = 'Employee deleted.'; this.saving = false; this.loadEmployees(); },
      error: () => this.fail('The employee could not be deleted.')
    });
  }

  cancelEdit(): void { this.editingId = ''; this.draft = this.emptyDraft(); }
  private fail(message: string): void { this.error = message; this.saving = false; }
  private emptyDraft(): EmployeeInput { return { name: '', age: 18, position: '' }; }
}
