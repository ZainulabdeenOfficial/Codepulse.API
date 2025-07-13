import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cetagorey } from '../Services/cetagorey';

import { Categorey } from '../models/Cetagorey.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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


 onSubmit(): void {
    if (this.category && this.id) {
      console.log('Form submitted with category:', this.category);
      
      this.categoryService.UpdateCategorey(this.id, this.category).subscribe({
        next: () => {
          console.log('Category updated successfully');
          alert('Category updated successfully!');
          this.router.navigate(['/admin/category']);
        },
        error: (error) => {
          console.error('Error updating category:', error);
          alert('Failed to update category. Please try again.');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }

 

}
