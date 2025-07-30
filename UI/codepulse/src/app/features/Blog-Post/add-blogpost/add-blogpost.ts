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
      Title :'',
      ShortDescription :'',
      Content : '',
      Author :'',
      PublishedDate: new Date(),
      IsVisible : true,
      UrlHandle : '',
      FeaturedImageUrl : '',
      Cetagories: []
    }
  }
  ngOnInit(): void {
     this.Cetagories$   = this.CetogreyService.GetAllCategorey()
    
  }

  get publishedDateString(): string {
    return this.model.PublishedDate ? this.model.PublishedDate.toISOString().split('T')[0] : '';
  }

  set publishedDateString(value: string) {
    this.model.PublishedDate = new Date(value);
  }

  onSubmit(): void {
    this.blogPostService.CreateBlogPost(this.model).subscribe({
      next: (response: BlogPosts) => {
        console.log('Blog post created successfully:', response);
        this.router.navigateByUrl('/admin/Blogpost');
      },
      error: (error) => {
        console.error('Error creating blog post:', error);
        // You can add user-friendly error handling here
        alert('Error creating blog post. Please ensure the API server is running.');
      }
    });
  }

}
