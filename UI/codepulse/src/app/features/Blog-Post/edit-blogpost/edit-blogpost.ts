import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../Services/blog-post';
import { response } from 'express';
import { BlogPost } from '../models/add-blog-post.model';
// Update the import path below to the correct location of blog-images.model.ts
// Update the import path below to the correct location of blog-image.model.ts
import { BlogImage } from '../../../Shared_/Components/image-selector/models/blog-images.model';
import { BlogPosts } from '../models/blog-post.model';
import { Categorey } from '../../Cetagorey/models/Cetagorey.model';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { Cetagorey } from '../../Cetagorey/Services/cetagorey';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { UpdateBlogPost } from '../models/update-Blog-Post.model';
import { ImageSelector } from "../../../Shared_/Components/image-selector/image-selector";
import { NgClass } from '@angular/common';
import { ImageService } from '../../../Shared_/Components/image-selector/image';


@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule, MarkdownComponent, AsyncPipe, ImageSelector,NgClass],
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

  UpdateBlogPostSubscription?: Subscription;
  getblogPostByIDSubscription?: Subscription;
   DeleteblogPostByIDSubscription?: Subscription;
   IsImageSelectorOpen: boolean = false;

   ImageSelectSubscription?: Subscription;
  
  constructor (private route : ActivatedRoute,
                private blogPostService : BlogPostService,
                private CetagoreyService : Cetagorey,
                private router: Router, private imageService : ImageService
  ){

  }
  
  
  ngOnInit(): void {
    this.Cetagories$ = this.CetagoreyService.GetAllCategorey();

    // Subscribe to image selection ONCE
    this.ImageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: (image: BlogImage) => {
        if (this.model) {
          this.model.featuredImageUrl = image.Url;
          this.IsImageSelectorOpen = false;
        }
      },
      error: (err) => {
        console.error('Error selecting image:', err);
      }
    });

    this.routeSubcription = this.route.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        // Get Blog Post by ID
        if (this.id) {
          this.getblogPostByIDSubscription = this.blogPostService.getblogpostByID(this.id).subscribe({
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
                Categoires: response.cetagories?.map((x => x.id)) || []
              };
              // Ensure all IDs are strings for proper matching with option values
              this.selectedCetagories = response.cetagories?.map((x => String(x.id))) || [];
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
   // Convert model to request  object

   if (this.model && this.id)
   {
      var UpdateBlogPost : UpdateBlogPost =
      {
        author: this.model.author,
        content: this.model.content,
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        urlHandle: this.model.urlHandle,
        publishedDate: this.model.publishedDate,
        isVisible: this.model.isVisible,
        Categoires: this.selectedCetagories ?? []
 };

 this.UpdateBlogPostSubscription = this.blogPostService.UpdateBlogPost(this.id,UpdateBlogPost).subscribe(
  {
    next:(response:BlogPost)=>{
      this.router.navigateByUrl('/admin/Blogpost');

    }
  }
 )

   }
      
     
  }


  OpenImageSelector() : void
  {
    this.IsImageSelectorOpen = true;
  }

  CloseImageSelector()
  : void{
    this.IsImageSelectorOpen = false;
  }

OnDelete() : void
{

   if(this.id)
  {
// Call the delete method from the service
  this.DeleteblogPostByIDSubscription  = this.blogPostService.DeleteBlogpost(this.id)
.subscribe({
  next: (response :BlogPosts)=>{
    this.router.navigateByUrl('/admin/Blogpost');
  }
})

  }
}





  ngOnDestroy(): void {
    this.routeSubcription?.unsubscribe();
    this.UpdateBlogPostSubscription?.unsubscribe();
    this.getblogPostByIDSubscription?.unsubscribe();
    this.DeleteblogPostByIDSubscription?.unsubscribe();
    this.ImageSelectSubscription?.unsubscribe();
  }

}
