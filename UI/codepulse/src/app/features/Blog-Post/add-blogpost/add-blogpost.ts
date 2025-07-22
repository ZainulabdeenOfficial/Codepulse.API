import { Component } from '@angular/core';
import { BlogPost } from '../models/add-blog-post.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css'
})
export class AddBlogpost {

  model : BlogPost;
  
  constructor (){
    this.model = {
      Title :'',
      ShortDescription :'',
      Content : '',
      Author :'',
      PublishedDate: new Date(),
      IsVisible : true,
      UrlHandle : '',
      FeaturedImageUrl : ''
    }
  }

  get publishedDateString(): string {
    return this.model.PublishedDate ? this.model.PublishedDate.toISOString().split('T')[0] : '';
  }

  set publishedDateString(value: string) {
    this.model.PublishedDate = new Date(value);
  }

  onSubmit(): void{
    console.log('Form submitted', this.model);
  }

}
