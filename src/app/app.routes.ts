import { InitPageComponent } from './pages/init-page/init-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent:()=>
      import('./pages/init-page/init-page.component').then(m => m.InitPageComponent)
  },
  {
    path:'chat',
    loadComponent:()=>
      import('./pages/main-page/main-page.component').then(m=>m.MainPageComponent)
  },
  {
    path:'**',
    redirectTo: ''
  }
];
