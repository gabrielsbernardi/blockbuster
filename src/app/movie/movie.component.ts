import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from '@model/movie';
import { MovieService } from '@service/movie/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies: Movie[];
  first = 0;
  rows = 10;

  constructor(private movieService: MovieService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.movies = await this.movieService.getValeus().toPromise();
  }

  onRowSelect = (movie: Movie) => {
    this.router.navigate((movie === null ? ['new'] : [movie.number]), { relativeTo: this.activatedRoute });
  }
}
