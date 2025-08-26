import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image';
import { Observable } from 'rxjs';
import { BlogImage } from './models/blog-images.model';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-image-selector',
  imports: [CommonModule, FormsModule, ToastModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './image-selector.html',
  styleUrls: ['./image-selector.css']
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

  show(): void {
    // placeholder for p-button click handler used in template
    // implement any behavior if needed
    console.log('p-button clicked');
  }

  private getImages() {
    this.image$ = this.imageService.getAllImages();
    
  }

  trackById(index: number, item: BlogImage) {
    return item?.id;
  }
}
