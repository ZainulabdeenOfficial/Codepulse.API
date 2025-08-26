import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogImage } from './models/blog-images.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { url } from 'inspector';

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
    return this.http.get<BlogImage[]>(`${environment.ApiBaseUrl}/api/images`)
      .pipe(
        map(images => images.map(img => ({
          ...img,
          Url: (img as any).Url ?? (img as any).url ?? ''
        })))
      );
  }

  UploadImage(file:File, filename:string,title:string,) : Observable<BlogImage>
  {

    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("filename", filename);
    formdata.append("title", title);
    
    
     return  this.http.post<BlogImage>(`${environment.ApiBaseUrl}/api/images`, formdata)
       .pipe(
         map(img => ({ ...img, Url: (img as any).Url ?? (img as any).url ?? '' }))
       );
  }

  SelectImage(image:BlogImage) : void {
    // Normalize property name before emitting so consumers always receive `Url`.
    const normalized: BlogImage = { ...image, Url: (image as any).Url ?? (image as any).url ?? '' };
    this.SelectedImage.next(normalized);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.SelectedImage.asObservable();
  }





}
