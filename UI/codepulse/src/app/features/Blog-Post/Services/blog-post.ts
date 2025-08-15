import { Injectable } from '@angular/core';
import { BlogPost as BlogPostModel } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPosts } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UpdateBlogPost } from '../models/update-Blog-Post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  // Blog post service for CRUD operations

  constructor(private http: HttpClient) { }

  CreateBlogPost(data:BlogPostModel):Observable<BlogPosts>{
    return this.http.post<BlogPosts>(`${environment.ApiBaseUrl}/api/BlogPost`, data);
  }
  GetAllBlogPosts(): Observable<BlogPosts[]> {
    return this.http.get<BlogPosts[]>(`${environment.ApiBaseUrl}/api/BlogPost`);
  }

getblogpostByID(id: string): Observable<BlogPosts> {
  return this.http.get<BlogPosts>(`${environment.ApiBaseUrl}/api/BlogPost/${id}`);
}

UpdateBlogPost(id: string, UpdateBlogPost: UpdateBlogPost): Observable<BlogPosts> {
  return this.http.put<BlogPosts>(`${environment.ApiBaseUrl}/api/BlogPost/${id}`, UpdateBlogPost);

}
}

