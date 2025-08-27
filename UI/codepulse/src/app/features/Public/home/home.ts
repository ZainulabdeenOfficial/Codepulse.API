import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../Blog-Post/Services/blog-post';
import { Observable } from 'rxjs';
import { BlogPost } from '../../Blog-Post/models/add-blog-post.model';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [AsyncPipe,RouterModule,],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  blogs$?: Observable<BlogPost[]>;

  constructor( private BlogpostService: BlogPostService)
  {}
  ngOnInit(): void {
  
   this.blogs$ =  this.BlogpostService.GetAllBlogPosts();
  }

}
