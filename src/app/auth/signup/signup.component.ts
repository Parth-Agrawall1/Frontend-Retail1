import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  roles = ['Admin', 'Manager', 'Seller', 'Finance'];

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.register(this.signupForm.value).subscribe({
      next: (res) => {
        console.log("User registered:", res);
        alert("User registered successfully");
        this.signupForm.reset();
      },
      error: (err) => {
        console.error("Registration error:", err);
        alert(err.error || "Registration failed");
      }
    });
  }
}
