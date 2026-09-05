import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfig } from '../config/app-config';

export interface Company {
  id: string;
  name: string;
  fullAddress: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = appConfig.apiBaseUrl;

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/companies`);
  }
}
