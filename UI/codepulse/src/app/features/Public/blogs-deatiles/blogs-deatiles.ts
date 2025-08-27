import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogs-deatiles',
  imports: [],
  templateUrl: './blogs-deatiles.html',
  styleUrl: './blogs-deatiles.css'
})
export class BlogsDeatiles implements OnInit {
  urlHandle: string | null = null;

  constructor(private route: ActivatedRoute)
  {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        params.get('urlHandle');
      }
    })
  }
  // Fetch Blog Deatiles using Url handler

}
