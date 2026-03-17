import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = 'http://localhost:5195/api/admin';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(`${this.api}/users`);
  }

  changeRole(data: { userId: number; newRole: string }) {
    return this.http.put(`${this.api}/change-role`, data);
  }
}
