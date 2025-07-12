import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AddCetagoryRequest } from '../models/add-cetagory-request.model';
import { Cetagorey } from '../Services/cetagorey';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-categorey',
  
  imports: [RouterModule, FormsModule],
  templateUrl: './add-categorey.html',
  styleUrl: './add-categorey.css'
})
export class AddCategorey implements OnDestroy {
  
  model : AddCetagoryRequest;

  AddCetagorySubscription ? : Subscription
  

   constructor(private CategoreyService: Cetagorey) {
    this.model = {
      name: '',
      urlHandle: '',
    };
   }
 
   onSubmit() {
       // Validate the model data directly
       if (!this.model.name || this.model.name.trim() === '') {
         console.warn('Category name is required');
         return;
       }
       
       if (!this.model.urlHandle || this.model.urlHandle.trim() === '') {
         console.warn('URL Handle is required');
         return;
       }
       
       // Submit the form
       this.AddCetagorySubscription = this.CategoreyService.AddCategorey(this.model).subscribe({
         next: () => {
           console.log('Category added successfully');
           // Reset the form
           this.model = { name: '', urlHandle: '' };
         },
         error: (error) => {
           console.error('Error adding category:', error);
         }
       });
   }

 ngOnDestroy(): void {
    this.AddCetagorySubscription?.unsubscribe();
  }

}
