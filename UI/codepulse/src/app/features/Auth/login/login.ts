import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../shared/services/auth-state.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  model: LoginRequest;

  constructor(
    private authService: Auth,
    private authStateService: AuthStateService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onSubmit() {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        // Set auth token using auth state service
        this.authStateService.setUser(response.token);

        // Redirect back to Home page
        this.router.navigate(['/']);
      }
    })
  }

}
