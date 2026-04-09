import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface DashboardData {
  approvedPRThisMonth: number;
  pendingPRs: number;
  totalPurchaseCostThisMonth: number;
  lowStockItems: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'http://localhost:5195/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardData() {
    return this.http.get<any>(this.baseUrl);
  }
}
