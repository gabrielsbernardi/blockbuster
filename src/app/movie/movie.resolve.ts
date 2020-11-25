import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Movie } from '@model/movie';
import { MovieService } from '@service/movie/movie.service';

@Injectable()
export class MovieDetailResolver implements Resolve<Movie> {

  constructor(private movieService: MovieService) { }

  resolve = (route: ActivatedRouteSnapshot) => {
    if (route.params.id === 'new') {
      return;
    }
    return this.movieService.get(route.params.id).toPromise();
  }
}
