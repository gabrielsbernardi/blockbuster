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

  public movieEntity: Movie;
  public movieFormGroup: FormGroup;

  public productTypes = Object.keys(ProductTypeEnum).map(key =>
    ({ label: this.translate.instant(`enum.product-type.${ProductTypeEnum[key]}`), value: key }));
  public movieTypes = Object.keys(MovieTypeEnum).map(key =>
    ({ label: this.translate.instant(`enum.movie-type.${MovieTypeEnum[key]}`), value: key }));
  public genderTypes = Object.keys(GenderEnum).map(key =>
    ({ label: this.translate.instant(`enum.gender-type.${GenderEnum[key]}`), value: key }));
  public providers = Object.keys(ProviderEnum).map(key =>
    ({ label: this.translate.instant(`enum.provider.${ProviderEnum[key]}`), value: key }));
  public languages = Object.keys(LanguageEnum).map(key =>
    ({ label: this.translate.instant(`enum.language-type.${LanguageEnum[key]}`), value: key }));

  constructor(private movieService: MovieService,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private translate: TranslateService,
              private router: Router,
              private toastService: ToastService,
              private confirmationService: ConfirmationService) { }

  public ngOnInit(): void {
    this.loadPage();
  }

  private loadPage(): void {
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

  public isNew(): boolean {
    return this.activatedRoute.snapshot.params.id === 'new';
  }

  private async validNew(): Promise<boolean> {
    const movie = (await this.movieService.get(this.movieEntity.id).toPromise())[0];
    if (movie) {
      this.toastService.error(this.translate.instant('error.title'),
                              this.translate.instant('error.movie.already-exists', {id: movie.id, title: movie.title}));
      this.spinner.hide();
      return false;
    }
    return true;
  }

  public async onSave(): Promise<void> {
    this.spinner.show();

    this.movieEntity = this.movieFormGroup.value;
    if (this.isNew()) {
      if (await this.validNew()) {
        this.movieService.save(this.movieEntity).toPromise()
          .then((movieResponse: Movie) => {
            this.toastService.success(this.translate.instant('success.title'),
                                      this.translate.instant('success.message',
                                                             {entity: this.translate.instant('movie.entity')}));
            this.router.navigate(['../', movieResponse.id], {
              relativeTo: this.activatedRoute.parent
            });
            this.movieFormGroup.get('id').disable();
            this.spinner.hide();
          });
      }
    } else {
      this.movieService.update(this.activatedRoute.snapshot.params.id, this.movieEntity).toPromise()
        .then(() => {
          this.toastService.success(this.translate.instant('success.title'),
                                    this.translate.instant('success.message',
                                                           {entity: this.translate.instant('movie.entity')}));
          this.goBack();
          this.spinner.hide();
        });
    }
  }

  public onConfirmRemove(): void {
    this.confirmationService.confirm({
      message:  this.translate.instant('confirm.message', {entity: this.translate.instant('movie.entity')}),
      header: this.translate.instant('confirm.title'),
      acceptLabel: this.translate.instant('yes'),
      rejectLabel: this.translate.instant('no'),
      accept: () => {
          this.onRemove();
      }
    });
  }

  public onRemove(): void {
    this.movieService.delete(this.activatedRoute.snapshot.params.id).toPromise()
      .then(() => {
        this.toastService.success(
          this.translate.instant('delete.success'),
          this.translate.instant('delete.message', {entity: this.translate.instant('movie.entity')})
        );
        this.goBack();
      });
  }

  public onImgError(event): void {
    event.target.src = 'assets/img/no-image.png';
  }

  public onLoadImage(): void {
    this.movieEntity.url = this.movieFormGroup.get('url').value;
  }

  public goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute.parent });
  }
}
