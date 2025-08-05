import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../Services/blog-post';
import { response } from 'express';
import { BlogPost } from '../models/add-blog-post.model';
import { BlogPosts } from '../models/blog-post.model';
import { Categorey } from '../../Cetagorey/models/Cetagorey.model';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { Cetagorey } from '../../Cetagorey/Services/cetagorey';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule,MarkdownComponent,AsyncPipe,JsonPipe],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css'
})
export class EditBlogpost implements OnInit, OnDestroy {
  
  id : string | null = null;
  model: BlogPost = {
    title: '',
    shortDescription: '',
    content: '',
    author: '',
    publishedDate: '',
    isVisible: false,
    urlHandle: '',
    featuredImageUrl: '',
    Categoires: []
  };
  Cetagories$ ? : Observable<Categorey[]>;
  routeSubcription ? : Subscription
  selectedCetagories: string[] = []
  
  constructor (private route : ActivatedRoute,
                private blogPostService : BlogPostService,
                private CetagoreyService : Cetagorey
  ){

  }
  
  
  ngOnInit(): void {
      this.Cetagories$ = this.CetagoreyService.GetAllCategorey()



    this.routeSubcription = this.route.params.subscribe({
      next:(params)=>{
      this.id = params['id'];

    // Get Blog Post by ID
    if (this.id) {
      this.blogPostService.getblogpostByID(this.id).subscribe({
       next: (response: BlogPosts) => {
             console.log('🔍 API Response:', response);
             console.log('📂 Raw Categories:', response.cetagories);
             
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
               Categoires: response.cetagories?.map((x=>x.id)) || []
             };
             
             // Ensure all IDs are strings for proper matching with option values
             this.selectedCetagories = response.cetagories?.map((x => String(x.id))) || [];
             
             console.log('✅ Mapped Model:', this.model);
             console.log('📋 Selected Categories (as strings):', this.selectedCetagories);
             console.log('🔍 Category data types:', response.cetagories?.map(x => ({id: x.id, type: typeof x.id})));
       },
       error: (error) => {
         console.error('❌ Error fetching blog post:', error);
       }
      });
    }
    }
    });

  }
  onSubmit() {
    if (this.id && this.model) {
      // Update the categories in the model before submitting
      this.model.Categoires = this.selectedCetagories || [];
      
      console.log('📤 Submitting updated blog post:', this.model);
      console.log('🆔 Blog Post ID:', this.id);
      
      // TODO: Implement update functionality
      // this.blogPostService.updateBlogPost(this.id, this.model).subscribe({
      //   next: (response) => {
      //     console.log('✅ Blog post updated successfully:', response);
      //     // Navigate back to blog list or show success message
      //   },
      //   error: (error) => {
      //     console.error('❌ Error updating blog post:', error);
      //   }
      // });
      console.log('⚠️ Update functionality to be implemented');
    }
  }
  ngOnDestroy(): void {
    this.routeSubcription?.unsubscribe();
  }

}
