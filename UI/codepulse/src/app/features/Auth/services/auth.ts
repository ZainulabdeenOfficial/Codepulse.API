import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http:HttpClient){}

  login(request:LoginRequest):Observable<LoginResponse>
  {

   return this.http.post<LoginResponse>(`${environment.ApiBaseUrl}/api/Auth/login`,{
      email: request.email,
      password: request.password
    });
  }
  
}
