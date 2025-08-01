import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-blogpost',
  imports: [],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css'
})
export class EditBlogpost implements OnInit, OnDestroy {
  
  id : string | null = null;
  routeSubcription ? : Subscription
  
  constructor (private route : ActivatedRoute){

  }
  
  
  ngOnInit(): void {
    this.route.params.subscribe({
      next:(params)=>{
      this.id = params['id'];
      }
    })
  }
  ngOnDestroy(): void {
    this.routeSubcription?.unsubscribe();
  }

}
