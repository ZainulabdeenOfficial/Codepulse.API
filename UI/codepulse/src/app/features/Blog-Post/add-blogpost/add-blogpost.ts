import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../models/add-blog-post.model';
import { BlogPosts } from '../models/blog-post.model';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../Services/blog-post';
import { MarkdownComponent } from 'ngx-markdown';
import { Cetagorey } from '../../Cetagorey/Services/cetagorey';
import { Observable } from 'rxjs';
import { Categorey } from '../../Cetagorey/models/Cetagorey.model';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule, MarkdownComponent, AsyncPipe],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css'
})
export class AddBlogpost implements OnInit {

  model : BlogPost;
  Cetagories$ ? : Observable<Categorey[]>;
  
  constructor (private blogPostService: BlogPostService, 
    private router: Router, private CetogreyService : Cetagorey
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      author: '',
      publishedDate: new Date().toISOString().split('T')[0],
      isVisible: true,
      urlHandle: '',
      featuredImageUrl: '',
      Categoires: []
    }
  }
  ngOnInit(): void {
     this.Cetagories$   = this.CetogreyService.GetAllCategorey()
  }

  onSubmit(): void {
    console.log('📤 Submitting blog post data:', this.model);
    console.log('📅 Published Date type:', typeof this.model.publishedDate);
    console.log('📅 Published Date value:', this.model.publishedDate);
    
    this.blogPostService.CreateBlogPost(this.model).subscribe({
      next: (response: BlogPosts) => {
        console.log('✅ Blog post created successfully:', response);
        this.router.navigateByUrl('/admin/Blogpost');
      },
      error: (error) => {
        console.error('❌ Error creating blog post:', error);
        if (error.error && error.error.errors) {
          console.error('🔍 Validation errors:', error.error.errors);
        }
      }
    });
  }

}
