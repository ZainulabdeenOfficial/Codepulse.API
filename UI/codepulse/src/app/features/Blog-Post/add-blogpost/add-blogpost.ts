import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { BlogPost } from '../models/add-blog-post.model';
import { BlogPosts } from '../models/blog-post.model';
import { Route, Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { BlogPostService } from '../Services/blog-post';
import { MarkdownComponent } from 'ngx-markdown';
import { Cetagorey } from '../../Cetagorey/Services/cetagorey';
import { Observable, Subscription } from 'rxjs';
import { Categorey } from '../../Cetagorey/models/Cetagorey.model';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ImageSelector } from '../../../Shared_/Components/image-selector/image-selector';
import { ImageService } from '../../../Shared_/Components/image-selector/image';



@Component({
  selector: 'app-add-blogpost',
  imports: [CommonModule, FormsModule, MarkdownComponent, AsyncPipe, ImageSelector],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css'
})
export class AddBlogpost implements OnInit, OnDestroy {

  model : BlogPost;
  Cetagories$ ? : Observable<Categorey[]>;
  IsImageSelectorOpen: boolean = false;
  ImageSelectorSubscripton? : Subscription;
  
  
  constructor (private blogPostService: BlogPostService, 
    private router: Router, private CetogreyService : Cetagorey, private imageService : ImageService
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
     this.imageService.onSelectImage().subscribe({
      next : (selectedimage) => {
  this.model.featuredImageUrl = selectedimage.Url;
        this.IsImageSelectorOpen = false;
      }
     })
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
  OpenImageSelector() : void
  {
    this.IsImageSelectorOpen = true;
  }

  CloseImageSelector()
  : void{
    this.IsImageSelectorOpen = false;
  }

  ngOnDestroy(): void {
    this.ImageSelectorSubscripton?.unsubscribe();
  }

}
