import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '@model/movie';
import { LanguageEnum } from '@model/language-enum';
import { ProviderEnum } from '@model/provider-enum';
import { GenderEnum } from '@model/gender-enum';
import { MovieTypeEnum } from '@model/movie-type-enum';
import { ProductTypeEnum } from '@model/product-type-enum';
import { MovieService } from '@service/movie/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movieEntity: Movie;
  movieFormGroup: FormGroup;

  productTypes = Object.keys(ProductTypeEnum).map(key => ({ label: ProductTypeEnum[key], value: key }));
  movieTypes = Object.keys(MovieTypeEnum).map(key => ({ label: MovieTypeEnum[key], value: key }));
  genderTypes = Object.keys(GenderEnum).map(key => ({ label: GenderEnum[key], value: key }));
  providers = Object.keys(ProviderEnum).map(key => ({ label: ProviderEnum[key], value: key }));
  languages = Object.keys(LanguageEnum).map(key => ({ label: LanguageEnum[key], value: key }));

  constructor(private movieService: MovieService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadPage();
  }

  movie: Movie = {
    number: 1,
    productType: ProductTypeEnum.DVD,
    movieType: MovieTypeEnum.HOURS_12,
    gender: GenderEnum.ACAO,
    title: "V&F",
    mainActors: "Paul",
    mainDirectors: "Steven",
    provider: ProviderEnum.GLOBOSAT,
    languageType: LanguageEnum.PT_BR,
    price: 12,
    launch: new Date(),
    url: "www."
  };

  private loadPage = () => {
    this.movieEntity = this.movie;

    if (!this.isNew()) {
      this.movieEntity = this.activatedRoute.snapshot.data.entity as Movie;
    }

    this.movieFormGroup = new FormGroup({
      number: new FormControl(this.movieEntity.number, Validators.required),
      productType: new FormControl(this.movieEntity.productType, Validators.required),
      movieType: new FormControl(this.movieEntity.movieType, Validators.required),
      gender: new FormControl(this.movieEntity.gender, Validators.required),
      title: new FormControl(this.movieEntity.title, Validators.required),
      mainActors: new FormControl(this.movieEntity.mainActors, Validators.required),
      mainDirectors: new FormControl(this.movieEntity.mainDirectors, Validators.required),
      provider: new FormControl(this.movieEntity.provider, Validators.required),
      languageType: new FormControl(this.movieEntity.languageType, Validators.required),
      price: new FormControl(this.movieEntity.price, Validators.required),
      launch: new FormControl(new Date(this.movieEntity.launch), Validators.required),
      url: new FormControl(this.movieEntity.url, Validators.required)
    });
  }

  private isNew = () => this.activatedRoute.snapshot.params.id === 'new';

  onSave = () => {
    this.movieEntity = this.movieFormGroup.value;
    if (this.isNew()) {
      try {
        this.movieService.save(this.movieEntity);
      } catch (error) {

      }
    }
  }

  onLoadImage = () => {
    this.movieEntity.url = this.movieFormGroup.get('url').value;
  }
}
