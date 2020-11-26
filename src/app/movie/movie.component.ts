import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup } from '@angular/forms';

import { Movie } from '@model/movie';
import { MovieService } from '@service/movie/movie.service';
import { GenderEnum } from '@model/gender-enum';
import { generatePDF } from '@shared/utils/utils';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {

  public movies: Movie[];
  public first = 0;
  public rows = 10;
  public movieFilterCollapsed = true;
  public hasData = false;

  public movieFilterFormGroup: FormGroup;
  public genderTypes = Object.keys(GenderEnum).map(key =>
    ({ label: this.translate.instant(`enum.gender-type.${GenderEnum[key]}`), value: key }));

  constructor(private movieService: MovieService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private translate: TranslateService,
              private datePipe: DatePipe) { }

  public ngOnInit(): void {
    this.loadPage();
  }

  private async loadPage(): Promise<void> {
    this.movieFilterFormGroup = new FormGroup({
      title: new FormControl(),
      mainDirectors: new FormControl(),
      initialDate: new FormControl(),
      finalDate: new FormControl(),
      initialPrice: new FormControl(),
      finalPrice: new FormControl(),
      gender: new FormControl(),
      evaluation: new FormControl()
    });
    this.movies = await this.movieService.getValeus().toPromise();
    this.hasData = this.movies.length > 0;
  }

  public onImgError(event): void {
    event.target.src = 'assets/img/no-image.png';
  }

  public onRowSelect(movie: Movie): void {
    this.router.navigate((movie === null ? ['new'] : [movie.id]), { relativeTo: this.activatedRoute });
  }

  public exportPDF(): void {
    const head =  [
      [
        this.translate.instant('movie.title'),
        this.translate.instant('movie.price'),
        this.translate.instant('movie.launch'),
        this.translate.instant('movie.evaluation'),
        this.translate.instant('movie.main-directors'),
        this.translate.instant('movie.gender'),
        this.translate.instant('movie.description')
      ]
    ];

    const body = [];
    this.movies.forEach((movie: Movie) => {
      const moviesBody = [];
      moviesBody.push(movie.title);
      moviesBody.push(`R$ ${movie.price}`);
      moviesBody.push(`${this.datePipe.transform(movie.launch, 'dd/MM/yyyy')}`);
      moviesBody.push(`${movie.evaluation} ${this.translate.instant('stars')}`);
      moviesBody.push(movie.mainDirectors);
      moviesBody.push(movie.gender);
      moviesBody.push(movie.description);
      body.push(moviesBody);
    });

    generatePDF(this.translate.instant('registered-movies'), head, body);
  }

  public async onSearch(): Promise<void> {
    this.spinner.show();
    this.movieFilterCollapsed = true;
    this.movies = await this.movieService.searchByFilter(this.movieFilterFormGroup.value).toPromise();
    this.spinner.hide();
  }

  public async onClear(): Promise<void> {
    this.spinner.show();
    this.movieFilterFormGroup.reset();
    this.movies = await this.movieService.getValeus().toPromise();
    this.spinner.hide();
  }
}
