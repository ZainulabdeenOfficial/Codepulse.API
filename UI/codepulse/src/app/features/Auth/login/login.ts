import { Component, NgModule } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { response } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule,],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  model : LoginRequest;

  constructor(private authService:Auth, private CookiesService:CookieService , private router:Router) {
    this.model = {
      email: '',
      password: ''
    }

  }

  onSubmit(){
    this.authService.login(this.model).subscribe({
      next:(response)=>{
        // set auth cookies 

        this.CookiesService.set('authorization',`Bearer ${response.token}`,undefined,'/',undefined,true,'Strict');

        // Reddirect back to Home page
        this.router.navigate(['/ ']);

      }
    })
   
  }

}
