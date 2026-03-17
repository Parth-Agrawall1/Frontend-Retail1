import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private baseUrl = 'http://localhost:5195/api/reports';

  constructor(private http: HttpClient) {}

  // PR LIFECYCLE REPORT
  getPrLifecycle(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pr-lifecycle`);
  }

  // STOCK BATCH-WISE REPORT
  getStockSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/stock-summary`);
  }

  getStockBatchWise(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/stock-batch`);
  }
}
