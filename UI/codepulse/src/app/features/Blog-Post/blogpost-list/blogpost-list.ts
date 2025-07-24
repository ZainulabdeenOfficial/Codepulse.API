import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogPostService } from '../Services/blog-post';
import { Observable } from 'rxjs';
import { BlogPosts } from '../models/blog-post.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterModule, AsyncPipe],
  standalone: true,
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css'
})
export class BlogpostList implements OnInit {

  blogposts$?: Observable<BlogPosts[]>;


  constructor(private blogpostService: BlogPostService) {}

  ngOnInit(): void {
    // Get all blog posts 
    this.blogposts$ = this.blogpostService.GetAllBlogPosts();
  }
    
}
