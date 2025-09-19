import { Routes } from '@angular/router';
import { CetagoreyListComponent } from './features/Cetagorey/cetagorey-list/cetagorey-list';
import { AddCategorey } from './features/Cetagorey/add-categorey/add-categorey';
import { EditCetagorey } from './features/Cetagorey/edit-cetagorey/edit-cetagorey';
import { BlogpostList } from './features/Blog-Post/blogpost-list/blogpost-list';
import { AddBlogpost } from './features/Blog-Post/add-blogpost/add-blogpost';
import { EditBlogpost } from './features/Blog-Post/edit-blogpost/edit-blogpost';
import { Home } from './features/Public/home/home';
import { BlogsDeatiles } from './features/Public/blogs-deatiles/blogs-deatiles';
import { Login } from './features/Auth/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  // Redirect removed: use the empty path component above instead of redirecting to a file path
  { path: 'blog/:urlHandle', component: BlogsDeatiles },
  { path: 'admin/category', component: CetagoreyListComponent },
  { path: 'admin/category/add', component: AddCategorey },
  {path :'admin/category/:id', component: EditCetagorey},
  {path:'admin/Blogpost',component:BlogpostList},
  {path : 'login',component:Login},

  {path:'admin/Blogpost/add',component:AddBlogpost},

  {path: 'admin/Blogpost/:id', component: EditBlogpost},
  
  
];


