import { Injectable } from '@angular/core';
import { AddCetagoryRequest } from '../models/add-cetagory-request.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categorey } from '../models/Cetagorey.model';
import { environment } from '../../../../environments/environment';
import { tap, catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Cetagorey {

  constructor(private http: HttpClient) { }

AddCategorey(model: AddCetagoryRequest): Observable<void> {
  return this.http.post<void>(`${environment.ApiBaseUrl}/api/Categories`, model);
}

GetAllCategorey(): Observable<Categorey[]> {
  console.log('🔍 Fetching all categories...');
  console.log('🌐 API URL:', `${environment.ApiBaseUrl}/api/Categories`);
  
  return this.http.get<Categorey[]>(`${environment.ApiBaseUrl}/api/Categories`)
    .pipe(
      timeout(15000), // 15 second timeout
      tap((response: Categorey[]) => console.log('✅ All Categories API Response:', response)),
      catchError((error: any) => {
        console.error('❌ All Categories API Error:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          url: error.url
        });
        throw error;
      })
    );
}

GetCategoreyById(id: string): Observable<Categorey> {
  console.log('🔍 Fetching category with ID:', id);
  console.log('🌐 API URL:', `${environment.ApiBaseUrl}/api/Categories/${id}`);
  
  return this.http.get<Categorey>(`${environment.ApiBaseUrl}/api/Categories/${id}`)
    .pipe(
      timeout(15000), // 15 second timeout
      tap((response: Categorey) => console.log('✅ Category API Response:', response)),
      catchError((error: any) => {
        console.error('❌ Category API Error:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          url: error.url
        });
        throw error;
      })
    );
}

UpdateCategorey(id: string, model: Categorey): Observable<void> {
  console.log('🔍 Updating category with ID:', id);
  console.log('🌐 API URL:', `${environment.ApiBaseUrl}/api/Categories`);
  console.log('📝 Update data:', model);
  
  // Try using the same endpoint as add but with the ID included in the model
  const updateModel = { ...model, id: id };
  
  return this.http.post<void>(`${environment.ApiBaseUrl}/api/Categories`, updateModel)
    .pipe(
      timeout(15000), // 15 second timeout
      tap(() => console.log('✅ Category updated successfully')),
      catchError((error: any) => {
        console.error('❌ Update Category API Error:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          url: error.url
        });
        throw error;
      })
    );
}

}