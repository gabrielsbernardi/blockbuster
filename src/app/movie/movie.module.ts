import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';

import { MovieRoutingModule } from '@app/movie/movie.routing.module';
import { MovieComponent } from '@app/movie/movie.component';
import { MovieDetailComponent } from '@app/movie/movie-detail/movie-detail.component';

@NgModule({
  declarations: [
    MovieComponent,
    MovieDetailComponent
  ],
  imports: [
    MovieRoutingModule,
    TableModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule,
    DropdownModule,
    CardModule,
    CalendarModule,
    TooltipModule,
    ToastModule,
    InputTextareaModule,
    TranslateModule,
    RatingModule,
    PanelModule,
    FieldsetModule
  ],
  providers: [
    DatePipe
  ]
})
export class MovieModule {}
