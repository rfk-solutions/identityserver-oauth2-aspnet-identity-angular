import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfig } from '../config/app-config';

export interface Company {
  id: string;
  name: string;
  address: string;
  country: string;
  fullAddress: string;
}

export interface CompanyInput {
  name: string;
  address: string;
  country: string;
}

export interface Employee {
  id: string;
  name: string;
  age: number;
  position: string;
}

export interface EmployeeInput {
  name: string;
  age: number;
  position: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = appConfig.apiBaseUrl;

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/companies`);
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/companies/${id}`);
  }

  getCompanyCollection(ids: string[]): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/companies/collection/(${ids.join(',')})`);
  }

  createCompany(company: CompanyInput): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}/companies`, company);
  }

  createCompanyCollection(companies: CompanyInput[]): Observable<Company[]> {
    return this.http.post<Company[]>(`${this.baseUrl}/companies/collection`, companies);
  }

  updateCompany(id: string, company: CompanyInput): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/companies/${id}`, company);
  }

  deleteCompany(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/companies/${id}`);
  }

  getEmployees(companyId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/companies/${companyId}/employees`);
  }

  getEmployee(companyId: string, employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/companies/${companyId}/employees/${employeeId}`);
  }

  createEmployee(companyId: string, employee: EmployeeInput): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/companies/${companyId}/employees`, employee);
  }

  updateEmployee(companyId: string, employeeId: string, employee: EmployeeInput): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/companies/${companyId}/employees/${employeeId}`, employee);
  }

  patchEmployee(companyId: string, employeeId: string, employee: Partial<EmployeeInput>): Observable<void> {
    const operations = Object.entries(employee).map(([path, value]) => ({
      op: 'replace',
      path: `/${path}`,
      value
    }));

    return this.http.patch<void>(
      `${this.baseUrl}/companies/${companyId}/employees/${employeeId}`,
      operations,
      { headers: { 'Content-Type': 'application/json-patch+json' } }
    );
  }

  deleteEmployee(companyId: string, employeeId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/companies/${companyId}/employees/${employeeId}`);
  }
}
