import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ManagerGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getRole() === 'Manager' || this.auth.getRole() === 'Admin') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
