import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddCetagoryRequest } from '../models/add-cetagory-request.model';
import { Cetagorey } from '../Services/cetagorey';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-categorey',
  standalone: true,
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
      UrlHandle : '',
    };
   }
 
   onSubmit() {
       this.AddCetagorySubscription=  this.CategoreyService.AddCategorey(this.model).subscribe({
      next: () => {
        console.log('Categorey added successfully');
        // Optionally, you can reset the form or navigate to another page
        this.model = { name: '', UrlHandle: '' };
      },
      error: (error) => {
        console.error('Error adding categorey:', error);
      }
    })

   }

 ngOnDestroy(): void {
    this.AddCetagorySubscription?.unsubscribe();
  }

}
