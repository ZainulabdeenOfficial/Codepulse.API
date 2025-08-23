import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogImage } from './models/blog-images.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Image {

  constructor( private http:HttpClient) { }

  UploadImage(file:File, filename:string, title:string) : Observable<BlogImage>
  {

    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("filename", filename);
    formdata.append("title", title);
    
     return  this.http.post<BlogImage>(`${environment.ApiBaseUrl}/api/images`, formdata);
  }

}
