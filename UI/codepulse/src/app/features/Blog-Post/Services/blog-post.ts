import { Injectable } from '@angular/core';
import { BlogPost as BlogPostModel } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPosts } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  CreateBlogPost(data:BlogPostModel):Observable<BlogPosts>{
    return this.http.post<BlogPosts>(`${environment.ApiBaseUrl}/api/BlogPost`, data);
  }
}

