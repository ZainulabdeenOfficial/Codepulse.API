import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginResponse } from '../features/Auth/models/login-response.model';
import { AuthStateService } from '../shared/services/auth-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  user?: LoginResponse;

  constructor(
    private authStateService: AuthStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authStateService.user$.subscribe(user => {
      this.user = user;
    });
  }

  onLogout(): void {
    this.authStateService.logout();
    this.router.navigate(['/']);
  }
}
