import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Image } from './image';
import { response } from 'express';


@Component({
  selector: 'app-image-selector',
  imports: [FormsModule],
  templateUrl: './image-selector.html',
  styleUrl: './image-selector.css'
})
export class ImageSelector {
  

  private file ?: File ;
  filename ? : string = '';
  title ? : string = '';

  constructor(private imageService:Image) 
  {}


OnFileUploadChnage($event:Event) : void
{

  const element = event?.currentTarget as HTMLInputElement;
  this.file = element.files?.[0];
}
UploadImage() : void
{
 if (this.file && this.filename!=='' &&  this.title!=='')
{
  // Image service to Upload Image
  this.imageService.UploadImage(this.file!, this.filename!, this.title!).subscribe({
    next : (response) => {
      console.log(response);
    }
  })
}
}

}
