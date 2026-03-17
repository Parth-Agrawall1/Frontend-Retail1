import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
   private api = 'http://localhost:5195/api/PurchaseRequest';
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post('http://localhost:5195/api/auth/register', data);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const t = this.getToken();
    if (!t) return null;
    try {
      const dec: any = jwtDecode(t);
      return (
        dec.role ||
        dec.roles ||
        dec['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        null
      );
    } catch {
      return null;
    }
  }
}
