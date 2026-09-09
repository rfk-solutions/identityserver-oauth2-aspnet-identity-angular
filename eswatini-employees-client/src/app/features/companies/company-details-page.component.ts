import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Company, CompanyInput, Employee } from '../../core/api/api.service';
import { ModalService } from '../../core/modal/modal.service';

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
  private readonly modal = inject(ModalService);
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

  async save(): Promise<void> {
    if (!this.company) return;
    const confirmed = await this.modal.confirm({
      title: 'Update company details?',
      message: 'The current company information will be replaced with these changes.',
      confirmLabel: 'Update company'
    });
    if (!confirmed) return;
    this.saving = true;
    this.api.updateCompany(this.company.id, this.draft).subscribe({
      next: () => {
        this.company = { ...this.company!, ...this.draft, fullAddress: `${this.draft.address} ${this.draft.country}`.trim() };
        this.editing = false;
        this.saving = false;
        this.notice = 'Company details updated.';
        void this.modal.success('The company details were updated successfully.');
      },
      error: () => { this.error = 'The company could not be updated.'; this.saving = false; }
    });
  }

  async delete(): Promise<void> {
    if (!this.company) return;
    const confirmed = await this.modal.confirm({
      title: `Delete ${this.company.name}?`,
      message: 'This will permanently delete the company and all employees assigned to it.',
      confirmLabel: 'Delete company'
    });
    if (!confirmed) return;
    this.saving = true;
    this.api.deleteCompany(this.company.id).subscribe({
      next: () => window.location.assign('/companies'),
      error: () => { this.error = 'The company could not be deleted.'; this.saving = false; }
    });
  }
}
