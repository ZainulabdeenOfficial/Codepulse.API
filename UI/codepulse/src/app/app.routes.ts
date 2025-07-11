import { Routes } from '@angular/router';
import { CetagoreyList } from './features/Cetagorey/cetagorey-list/cetagorey-list';

export const routes: Routes = [
  { path: '', redirectTo: '/admin/category', pathMatch: 'full' },
  { path: 'admin/category', component: CetagoreyList },
  { path: '**', redirectTo: '/admin/category' }
];


