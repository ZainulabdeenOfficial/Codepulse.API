import { Component, NgModule } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { response } from 'express';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  model : LoginRequest;

  constructor(private authService:Auth){
    this.model = {
      email: '',
      password: ''
    }

  }

  onSubmit(){
    this.authService.login(this.model).subscribe({
      next:(response)=>{
        console.log('Login successful',response);
      }
    })
   
  }

}
