import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Extract role from token
  get userRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const dec: any = jwtDecode(token);
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
