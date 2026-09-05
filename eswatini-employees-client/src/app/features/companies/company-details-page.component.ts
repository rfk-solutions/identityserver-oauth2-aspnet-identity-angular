import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Company, CompanyInput, Employee } from '../../core/api/api.service';

@Component({
  selector: 'app-company-details-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './company-details-page.component.html',
  styleUrl: './company-details-page.component.scss'
})
export class CompanyDetailsPageComponent {
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  company: Company | null = null;
  employees: Employee[] = [];
  draft: CompanyInput = { name: '', address: '', country: 'Eswatini' };
  editing = false;
  loading = true;
  saving = false;
  error = '';
  notice = '';

  constructor() {
    this.loadCompany(this.route.snapshot.paramMap.get('id') ?? '');
  }

  loadCompany(id: string): void {
    if (!id) { this.error = 'A company id is required.'; this.loading = false; return; }
    this.api.getCompany(id).subscribe({
      next: (company) => {
        this.company = company;
        this.draft = { name: company.name, address: company.address, country: company.country };
        this.loading = false;
        this.api.getEmployees(company.id).subscribe({
          next: (employees) => this.employees = employees,
          error: () => this.error = 'The company loaded, but its employees could not be retrieved.'
        });
      },
      error: () => { this.error = 'The company could not be loaded.'; this.loading = false; }
    });
  }

  save(): void {
    if (!this.company) return;
    this.saving = true;
    this.api.updateCompany(this.company.id, this.draft).subscribe({
      next: () => {
        this.company = { ...this.company!, ...this.draft, fullAddress: `${this.draft.address} ${this.draft.country}`.trim() };
        this.editing = false;
        this.saving = false;
        this.notice = 'Company details updated.';
      },
      error: () => { this.error = 'The company could not be updated.'; this.saving = false; }
    });
  }

  delete(): void {
    if (!this.company || !window.confirm(`Delete ${this.company.name} and all employees?`)) return;
    this.saving = true;
    this.api.deleteCompany(this.company.id).subscribe({
      next: () => window.location.assign('/companies'),
      error: () => { this.error = 'The company could not be deleted.'; this.saving = false; }
    });
  }
}
