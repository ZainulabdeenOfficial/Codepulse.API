import { Component, NgModule } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  model : LoginRequest;

  constructor(){
    this.model = {
      email: '',
      password: ''
    }

  }

  onSubmit(){
    console.log(this.model);
  }

}
