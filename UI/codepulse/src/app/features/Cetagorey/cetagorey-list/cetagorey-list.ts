import { Component, OnInit, ChangeDetectorRef, afterNextRender } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { Categorey } from '../models/Cetagorey.model';
import { Cetagorey } from '../Services/cetagorey';

@Component({
  selector: 'app-cetagorey-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cetagorey-list.html',
  styleUrl: './cetagorey-list.css'
})
export class CetagoreyListComponent implements OnInit {

  cetagories: Categorey[] = [];

  constructor(private CetogreyServices: Cetagorey, private cdr: ChangeDetectorRef) {
    // Handle hydration properly
    afterNextRender(() => {
      this.loadCategories();
    });
  }
  
  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.CetogreyServices.GetAllCategorey().subscribe({
      next: (response) => {
        this.cetagories = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
}