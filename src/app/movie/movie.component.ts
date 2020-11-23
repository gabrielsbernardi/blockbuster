import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.spinner.show();
    this.movies = await this.movieService.getValeus().toPromise();
    this.spinner.hide();
  }

  onImgError = event => {
    event.target.src = 'assets/img/no-image.png';
  }

  onRowSelect = (movie: Movie) => {
    this.spinner.show();
    this.router.navigate((movie === null ? ['new'] : [movie.id]), { relativeTo: this.activatedRoute });
  }
}
