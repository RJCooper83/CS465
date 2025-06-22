import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  formError: string = '';
  name: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onLogin(): void {
    this.formError = '';

    if (!this.email || !this.password) {
      this.formError = 'Email and password are required.';
      return;
    }

    const user: User = {
      name: this.name,
      email: this.email
    };

    this.authService.login(user, this.password).subscribe({
      next: () => {
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/']);
        } else {
          this.formError = 'Login failed. Please try again.';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.formError = 'Invalid login credentials.';
      }
    });
  }
}
