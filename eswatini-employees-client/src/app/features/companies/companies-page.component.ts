import { Component, inject } from '@angular/core';
import { ApiService, Company } from '../../core/api/api.service';

@Component({
  selector: 'app-companies-page',
  standalone: true,
  templateUrl: './companies-page.component.html',
  styleUrl: './companies-page.component.scss'
})
export class CompaniesPageComponent {
  private readonly api = inject(ApiService);
  companies: Company[] = [];
  error = '';
  loading = true;

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
}
