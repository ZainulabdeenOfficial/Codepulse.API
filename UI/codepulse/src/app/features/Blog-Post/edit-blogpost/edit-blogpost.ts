import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { UpdateBlogPost } from '../models/update-Blog-Post.model';

@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule,MarkdownComponent,AsyncPipe],
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
  
  constructor (private route : ActivatedRoute,
                private blogPostService : BlogPostService,
                private CetagoreyService : Cetagorey,
                private router: Router
  ){

  }
  
  
  ngOnInit(): void {
      this.Cetagories$ = this.CetagoreyService.GetAllCategorey()



    this.routeSubcription = this.route.params.subscribe({
      next:(params)=>{
      this.id = params['id'];

    // Get Blog Post by ID
    if (this.id) {

   this.getblogPostByIDSubscription  =   this.blogPostService.getblogpostByID(this.id).subscribe({
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
  }

}
