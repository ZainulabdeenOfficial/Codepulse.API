import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  }
  
  ngOnInit(): void {
    console.log('ngOnInit called - loading categories...');
    this.CetogreyServices.GetAllCategorey().subscribe({
      next: (response) => {
        console.log('Categories loaded:', response);
        this.cetagories = response || [];
        console.log('Categories array length:', this.cetagories.length);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.cetagories = [];
      }
    });
  }




}