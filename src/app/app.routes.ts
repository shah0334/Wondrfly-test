import { Routes } from '@angular/router';
import { Task1Component } from './components/task1/task1.component';
import { Task2Component } from './components/task2/task2.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'task1',
    component: Task1Component,
  },

  {
    path: 'task2',
    children: [
      { path: ':city/:program/:category', component: Task2Component },
      { path: ':city/:program', component: Task2Component },
      { path: ':city', component: Task2Component },
      { path: '**', redirectTo: '404' }, // Catch-all for invalid routes
    ],
  },

  {
    path: '404',
    component: PageNotFoundComponent,
  },
];
