import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cetagorey } from '../Services/cetagorey';
import { UpdateCetogreyRequest } from '../models/Update-Cetgory-Request.model'; // Add this import if the type exists

import { Categorey } from '../models/Cetagorey.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-edit-cetagorey',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-cetagorey.html',
  styleUrl: './edit-cetagorey.css'
})
export class EditCetagorey implements OnInit, OnDestroy {

   
  id: string | null = null;
  paramSubscription?: Subscription;
  EditCetogreySubscription?: Subscription;
  category?: Categorey;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private categoryService: Cetagorey, private cdr: ChangeDetectorRef, private router: Router) {
    // Initialize any necessary properties or services here
  }
  
  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        this.id = id;

        if (id) {
          this.errorMessage = null;
          
          this.categoryService.GetCategoreyById(id).subscribe({
            next: (response: Categorey) => {
              this.category = response;
              this.cdr.detectChanges();
            },
            error: (error: any) => {
              console.error('Error fetching category by ID:', error);
              this.errorMessage = 'Failed to load category. Please try again.';
              this.cdr.detectChanges();
            }
          });
        } else {
          this.errorMessage = 'Category ID is required.';
        }
      }
    });
  }

onSubmit() {

const UpdateCetogreyRequest : UpdateCetogreyRequest = {
  name: this.category?.name || '',
  urlHandle: this.category?.urlHandle || ''

}
// pass this object to the service method
if (this.id){
   this.EditCetogreySubscription = this.categoryService.UpdateCetogrey(this.id, UpdateCetogreyRequest)
.subscribe({
  next:(response)=>{
    this.router.navigateByUrl('/admin/category');
  }
}

);
}

}


deleteCategory():void{
  if (this.id){
    this.categoryService.DeleteCetogrey(this.id).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/admin/category');
      }
    })
  }
}


  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.EditCetogreySubscription?.unsubscribe();
  }

 

}
