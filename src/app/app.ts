import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './auth/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="container mt-3">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
