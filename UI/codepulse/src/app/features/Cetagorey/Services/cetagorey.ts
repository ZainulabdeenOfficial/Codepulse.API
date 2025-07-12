import { Injectable } from '@angular/core';
import { AddCetagoryRequest } from '../models/add-cetagory-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categorey } from '../models/Cetagorey.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cetagorey {

  constructor(private htpp:HttpClient ) { }

AddCategorey(model : AddCetagoryRequest):Observable<void> {

  return this.htpp.post<void>(`${environment.ApiBaseUrl}/api/Categories`, model);

}

 GetAllCategorey() : Observable<Categorey[] > {
return this.htpp.get<Categorey[]>(`${environment.ApiBaseUrl}/api/Categories`);
}
}
