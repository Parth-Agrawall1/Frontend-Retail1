import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  showPassword = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const body = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:5195/api/auth/login', body).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        this.router.navigate(['/PurchaseRequest']);
      },
      error: (_) => {
        this.errorMessage = 'Invalid email or password';
      },
    });
  }
}
