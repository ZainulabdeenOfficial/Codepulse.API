import { Injectable } from '@angular/core';
import { AddCetagoryRequest } from '../models/add-cetagory-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cetagorey {

  constructor(private htpp:HttpClient ) { }

AddCategorey(model : AddCetagoryRequest):Observable<void> {

  return this.htpp.post<void>('https://localhost:7061/api/Categories', model);

}

}
