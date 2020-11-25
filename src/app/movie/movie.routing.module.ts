import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieComponent } from '@app/movie/movie.component';
import { MovieDetailComponent } from '@app/movie/movie-detail/movie-detail.component';
import { MovieDetailResolver, MovieResolver } from '@app/movie/movie.resolve';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class EmptyComponent {}

const routes: Routes = [
  {
    path: 'movie',
    component: EmptyComponent,
    resolve: {
      movies: MovieResolver
    },
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
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [EmptyComponent],
  providers: [
    MovieResolver,
    MovieDetailResolver
  ]
})
export class MovieRoutingModule {}
