import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseRequestService {
  private api = 'http://localhost:5195/api/PurchaseRequest';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    };
  }

  createPR(data: any) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.api}/create`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getPRs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/list`, this.getAuthHeaders());
  }

  submitPR(id: number): Observable<any> {
    return this.http.post(`${this.api}/submit/${id}`, {}, this.getAuthHeaders());
  }

  deletePR(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`, this.getAuthHeaders());
  }

  approvePR(id: number, comment: string): Observable<any> {
    return this.http.post(`${this.api}/approve/${id}`, { comment }, this.getAuthHeaders());
  }

  rejectPR(id: number, comment: string): Observable<any> {
    return this.http.post(`${this.api}/reject/${id}`, { comment }, this.getAuthHeaders());
  }

  markAsPaid(id: number): Observable<any> {
    return this.http.post<any>(`${this.api}/${id}/mark-paid`, {}, this.getAuthHeaders());
  }
}
