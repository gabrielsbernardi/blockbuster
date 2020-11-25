import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';

import { Movie } from '@model/movie';
import { LanguageEnum } from '@model/language-enum';
import { ProviderEnum } from '@model/provider-enum';
import { GenderEnum } from '@model/gender-enum';
import { MovieTypeEnum } from '@model/movie-type-enum';
import { ProductTypeEnum } from '@model/product-type-enum';
import { MovieService } from '@service/movie/movie.service';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movieEntity: Movie;
  movieFormGroup: FormGroup;

  productTypes = Object.keys(ProductTypeEnum).map(key =>
    ({ label: this.translate.instant(`enum.product-type.${ProductTypeEnum[key]}`), value: key }));
  movieTypes = Object.keys(MovieTypeEnum).map(key =>
    ({ label: this.translate.instant(`enum.movie-type.${MovieTypeEnum[key]}`), value: key }));
  genderTypes = Object.keys(GenderEnum).map(key =>
    ({ label: this.translate.instant(`enum.gender-type.${GenderEnum[key]}`), value: key }));
  providers = Object.keys(ProviderEnum).map(key =>
    ({ label: this.translate.instant(`enum.provider.${ProviderEnum[key]}`), value: key }));
  languages = Object.keys(LanguageEnum).map(key =>
    ({ label: this.translate.instant(`enum.language-type.${LanguageEnum[key]}`), value: key }));

  constructor(private movieService: MovieService,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private translate: TranslateService,
              private router: Router,
              private toastService: ToastService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  private loadPage = () => {
    this.movieEntity = new Movie();
    let launch = null;

    if (!this.isNew()) {
      this.movieEntity = this.activatedRoute.snapshot.data.entity[0] as Movie;
      launch = this.movieEntity.launch ? new Date(this.movieEntity.launch) : null;
    }

    this.movieFormGroup = new FormGroup({
      id: new FormControl({value: this.movieEntity.id, disabled: !this.isNew()}, Validators.required),
      productType: new FormControl(this.movieEntity.productType, Validators.required),
      movieType: new FormControl(this.movieEntity.movieType, Validators.required),
      gender: new FormControl(this.movieEntity.gender, Validators.required),
      title: new FormControl(this.movieEntity.title, Validators.required),
      mainActors: new FormControl(this.movieEntity.mainActors),
      mainDirectors: new FormControl(this.movieEntity.mainDirectors),
      provider: new FormControl(this.movieEntity.provider, Validators.required),
      languageType: new FormControl(this.movieEntity.languageType, Validators.required),
      price: new FormControl(this.movieEntity.price, Validators.required),
      launch: new FormControl(launch),
      url: new FormControl(this.movieEntity.url),
      description: new FormControl(this.movieEntity.description),
      evaluation: new FormControl(this.movieEntity.evaluation)
    });
  }

  isNew = () => this.activatedRoute.snapshot.params.id === 'new';

  private validNew = async () => {
    const movie = (await this.movieService.get(this.movieEntity.id).toPromise())[0];
    if (movie) {
      this.toastService.error('Erro', `Filme com o número ${movie.id} já existe com o nome ${movie.title}`);
      this.spinner.hide();
      return false;
    }
    return true;
  }

  onSave = async () => {
    this.spinner.show();

    this.movieEntity = this.movieFormGroup.value;
    if (this.isNew()) {
      if (await this.validNew()) {
        this.movieService.save(this.movieEntity).toPromise()
          .then((movieResponse: Movie) => {
            this.toastService.success('Filme salvo com sucesso', 'Sucesso');
            this.router.navigate(['../', movieResponse.id], {
              relativeTo: this.activatedRoute.parent
            });
            this.spinner.hide();
          });
      }
    } else {
      this.movieService.update(this.activatedRoute.snapshot.params.id, this.movieEntity).toPromise()
        .then((movieResponse: Movie) => {
          this.toastService.success('Filme salvo com sucesso', 'Sucesso');
          this.router.navigate(['../', movieResponse.id], {
            relativeTo: this.activatedRoute.parent
          });
          this.spinner.hide();
        });
    }
  }

  onConfirmRemove = () => {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do filme?',
      header: 'Confirmação',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
          this.onRemove();
      }
    });
  }

  onRemove = () => {
    this.movieService.delete(this.activatedRoute.snapshot.params.id).toPromise()
      .then(() => {
        this.toastService.success(
          'Filme excluido com sucesso',
          'Sucesso'
        );
        this.goBack();
      });
  }

  onImgError = event => {
    event.target.src = 'assets/img/no-image.png';
  }

  onLoadImage = () => {
    this.movieEntity.url = this.movieFormGroup.get('url').value;
  }

  goBack = () => {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute.parent });
  }
}
