import { Routes } from '@angular/router';
import { CetagoreyListComponent } from './features/Cetagorey/cetagorey-list/cetagorey-list';
import { AddCategorey } from './features/Cetagorey/add-categorey/add-categorey';

export const routes: Routes = [
  { path: '', redirectTo: '/admin/category', pathMatch: 'full' },
  { path: 'admin/category', component: CetagoreyListComponent },
  { path: 'admin/category/add', component: AddCategorey },
  
];


