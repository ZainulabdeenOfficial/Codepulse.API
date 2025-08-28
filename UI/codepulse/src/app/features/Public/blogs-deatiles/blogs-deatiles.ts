import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../Blog-Post/Services/blog-post';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { BlogPost } from '../../Blog-Post/models/add-blog-post.model';
import { AsyncPipe, DatePipe, CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blogs-deatiles',
  imports: [CommonModule, AsyncPipe, ProgressSpinnerModule, MarkdownModule],
  templateUrl: './blogs-deatiles.html',
  styleUrls: ['./blogs-deatiles.css']
})
export class BlogsDeatiles implements OnInit {
  urlHandle: string | null = null;
  blogpost$ ? : Observable<BlogPost>;

  constructor(private route: ActivatedRoute,private blogPostService: BlogPostService )
  {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.urlHandle = params.get('urlHandle');
        if (this.urlHandle) {
          this.blogpost$ = this.blogPostService
            .getblogpostByUrlHandle(this.urlHandle)
            .pipe(
              catchError((err) => {
                console.error('Error loading blog post by urlHandle', this.urlHandle, err);
                // Return an observable that emits null to keep template safe
                return of(null as any);
              })
            );
        }
      }
    });

  }
}
