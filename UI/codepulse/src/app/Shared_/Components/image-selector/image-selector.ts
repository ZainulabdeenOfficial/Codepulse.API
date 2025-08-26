import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image';
import { response } from 'express';
import { Observable } from 'rxjs';
import { BlogImage } from './models/blog-images.model';
import { AsyncPipe } from '@angular/common';
import { Console } from 'console';

@Component({
  selector: 'app-image-selector',
  imports: [FormsModule,AsyncPipe],
  templateUrl: './image-selector.html',
  styleUrl: './image-selector.css'
})
export class ImageSelector implements OnInit {
  private file?: File;
  filename?: string = '';
  title?: string = '';
  Url ? : string = '';
  
  image$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) uploadImageForm?: NgForm;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.getImages();
  }

  OnFileUploadChnage($event: Event): void {
    const element = $event?.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  UploadImage(): void {
    if (this.file && this.filename !== '' && this.title !== '') {
      this.imageService.UploadImage(this.file!, this.filename!, this.title!).subscribe({
        next: (response) => {
          this.uploadImageForm?.resetForm();
          this.getImages();
        }
      });
    }
  }

  SelectImage(image: BlogImage): void {
    this.imageService.SelectImage(image);
  console.log('Selected Image Url',image.Url);
   
    
  }

  private getImages() {
    this.image$ = this.imageService.getAllImages();
    
  }
}
