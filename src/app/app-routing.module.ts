import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';

import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movie',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('@app/movie/movie.module').then((m) => m.MovieModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
