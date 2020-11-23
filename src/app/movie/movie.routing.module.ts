import { MovieDetailResolver } from './movie.resolve';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieComponent } from '@app/movie/movie.component';
import { MovieDetailComponent } from '@app/movie/movie-detail/movie-detail.component';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class EmptyComponent {}

const routes: Routes = [
  {
    path: 'movie',
    component: EmptyComponent,
    children: [
      {
        path: '',
        component: MovieComponent
      },
      {
        path: ':id',
        component: EmptyComponent,
        resolve: {
          entity: MovieDetailResolver
        },
        children: [
          {
            path: '',
            component: MovieDetailComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [EmptyComponent],
  providers: [MovieDetailResolver]
})
export class MovieRoutingModule {}
