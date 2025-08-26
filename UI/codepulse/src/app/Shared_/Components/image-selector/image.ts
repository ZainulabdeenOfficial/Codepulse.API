import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from './models/blog-images.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  SelectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    filename: '',
    title: '',
    fileExtension: '',
    Url: ''
  });

  constructor( private http:HttpClient) { } 


  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.ApiBaseUrl}/api/images`);
  }

  UploadImage(file:File, filename:string,title:string) : Observable<BlogImage>
  {

    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("filename", filename);
    formdata.append("title", title);
    
     return  this.http.post<BlogImage>(`${environment.ApiBaseUrl}/api/images`, formdata);
  }

  SelectImage(image:BlogImage) : void {
    this.SelectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.SelectedImage.asObservable();
  }





}
