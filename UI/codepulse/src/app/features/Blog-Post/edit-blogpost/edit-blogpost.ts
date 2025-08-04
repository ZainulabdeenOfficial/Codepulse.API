import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPostService } from '../Services/blog-post';
import { response } from 'express';
import { BlogPost } from '../models/add-blog-post.model';
import { BlogPosts } from '../models/blog-post.model';
import { Categorey } from '../../Cetagorey/models/Cetagorey.model';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule,MarkdownComponent],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css'
})
export class EditBlogpost implements OnInit, OnDestroy {
  
  id : string | null = null;
  model ? : BlogPost;
  routeSubcription ? : Subscription
  
  constructor (private route : ActivatedRoute,
                private blogPostService : BlogPostService
  ){

  }
  
  
  ngOnInit(): void {
    this.routeSubcription = this.route.params.subscribe({
      next:(params)=>{
      this.id = params['id'];

    // Get Blog Post by ID
    if (this.id) {
      this.blogPostService.getblogpostByID(this.id).subscribe({
       next: (response: BlogPosts) => {
             // Map BlogPosts response to BlogPost model
             this.model = {
               title: response.title,
               shortDescription: response.shortDescription,
               content: response.content,
               author: response.author,
               publishedDate: response.publishedDate,
               isVisible: response.isVisible,
               urlHandle: response.urlHandle,
               featuredImageUrl: response.featuredImageUrl,
               Categoires: response.cetagories?.map((cat: Categorey) => cat.id) || []
             };
       }
      });
    }
    }
    });

  }
  onSubmit() {
    if (this.id && this.model) {
      // TODO: Implement update functionality
      // this.blogPostService.updateBlogPost(this.id, this.model).subscribe({
      //   next: (response) => {
      //     console.log('Blog post updated successfully:', response);
      //     // Navigate back to blog list or show success message
      //   },
      //   error: (error) => {
      //     console.error('Error updating blog post:', error);
      //   }
      // });
      console.log('Update functionality to be implemented', this.model);
    }
  }
  ngOnDestroy(): void {
    this.routeSubcription?.unsubscribe();
  }

}
