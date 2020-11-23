import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  private loadPage = () => {
    this.movieEntity = new Movie();
    let launch = new Date();

    if (!this.isNew()) {
      this.movieEntity = this.activatedRoute.snapshot.data.entity[0] as Movie;
      launch = new Date(this.movieEntity.launch);
    }

    this.movieFormGroup = new FormGroup({
      id: new FormControl(this.movieEntity.id, Validators.required),
      productType: new FormControl(this.movieEntity.productType, Validators.required),
      movieType: new FormControl(this.movieEntity.movieType, Validators.required),
      gender: new FormControl(this.movieEntity.gender, Validators.required),
      title: new FormControl(this.movieEntity.title, Validators.required),
      mainActors: new FormControl(this.movieEntity.mainActors, Validators.required),
      mainDirectors: new FormControl(this.movieEntity.mainDirectors, Validators.required),
      provider: new FormControl(this.movieEntity.provider, Validators.required),
      languageType: new FormControl(this.movieEntity.languageType, Validators.required),
      price: new FormControl(this.movieEntity.price, Validators.required),
      launch: new FormControl(launch, Validators.required),
      url: new FormControl(this.movieEntity.url, Validators.required),
      description: new FormControl(this.movieEntity.description, Validators.required)
    });
    this.spinner.hide();
  }

  private isNew = () => this.activatedRoute.snapshot.params.id === 'new';

  onSave = async () => {
    this.spinner.show();
    this.movieEntity = this.movieFormGroup.value;

    const teste = await this.movieService.get(this.movieEntity.id).toPromise();
    console.log(teste)
    if (false) {
      if (this.isNew()) {
        await this.movieService.save(this.movieEntity).toPromise();
      } else {
        await this.movieService.update(this.movieEntity).toPromise();
      }
    } else {
      alert('treta')
    }
    this.spinner.hide();
    this.toastr.success(
      'Recebimento atualizado!',
      'Sucesso'
    );
  }

  onImgError = event => {
    event.target.src = 'assets/img/no-image.png';
  }

  onLoadImage = () => {
    this.movieEntity.url = this.movieFormGroup.get('url').value;
  }
}
