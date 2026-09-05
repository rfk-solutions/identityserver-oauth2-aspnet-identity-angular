import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService, Company, CompanyInput } from '../../core/api/api.service';

@Component({
  selector: 'app-companies-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './companies-page.component.html',
  styleUrl: './companies-page.component.scss'
})
export class CompaniesPageComponent {
  private readonly api = inject(ApiService);
  companies: Company[] = [];
  query = '';
  draft: CompanyInput = { name: '', address: '', country: 'Eswatini' };
  loading = true;
  saving = false;
  error = '';
  notice = '';

  constructor() { this.loadCompanies(); }

  get visibleCompanies(): Company[] {
    const query = this.query.trim().toLowerCase();
    return this.companies.filter((company) => !query || `${company.name} ${company.fullAddress}`.toLowerCase().includes(query));
  }

  loadCompanies(): void {
    this.loading = true;
    this.api.getCompanies().subscribe({
      next: (companies) => { this.companies = companies; this.loading = false; },
      error: () => { this.error = 'Companies could not be loaded. Check that the API is running.'; this.loading = false; }
    });
  }

  createCompany(): void {
    this.saving = true;
    this.api.createCompany(this.draft).subscribe({
      next: (company) => { this.companies = [...this.companies, company]; this.draft = { name: '', address: '', country: 'Eswatini' }; this.notice = 'Company created.'; this.saving = false; },
      error: () => { this.error = 'The company could not be created.'; this.saving = false; }
    });
  }
}
