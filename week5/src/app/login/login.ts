import { Component, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { User } from '../model/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private httpService = inject(HttpService);
  constructor(private router: Router) {}

  user: User | null = null;
  email = '';
  password = '';
  loginError: string | null = null;

  onLogin() {
    this.loginError = null;

    this.httpService.login(this.email, this.password).subscribe({
      next: (data) => {
        if ('valid' in data && !data.valid) {
          this.loginError = 'Invalid email or password.';
          return;
        }
        this.user = data as User;

        // turn User object into string and save
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/account']);
      },
      error: (e) => {
        console.log('Error found!', e);
        this.loginError = 'Something went wrong. Please try again.';
      },
      complete: () => {
        console.log('Login request complete!');
      },
    });
  }
}
