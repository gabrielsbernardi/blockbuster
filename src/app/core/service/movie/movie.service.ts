import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '@model/movie';
import { environment } from '@environment/environment';
import { MovieFilter } from '@core/interface/movie-filter';
import { getSimpleFilter } from '@shared/utils/utils';
import { getRangeFilter } from '@shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private orderByTitleAsc = '_sort=title&_order=asc';

  private baseUrl = environment.url;
  private movieUrl = `${this.baseUrl}/movie?${this.orderByTitleAsc}`;
  private getMovieByIdUrl = (id: number) => `${this.movieUrl}?id=${id}`;

  constructor(public http: HttpClient) { }

  getValeus = (): Observable<Movie[]> => this.http.get<Movie[]>(this.movieUrl);

  get = (id: number): Observable<Movie> => this.http.get<Movie>(this.getMovieByIdUrl(id));

  save = (movie: Movie) => this.http.post<Movie>(this.movieUrl, movie);

  update = (id: number, movie: Movie) => this.http.put<Movie>(`${this.movieUrl}/${id}`, movie);

  delete = (id: number) => this.http.delete<Movie>(`${this.movieUrl}/${id}`);

  searchByFilter(filter: MovieFilter): Observable<Movie[]> {
    const filterTitle = getSimpleFilter('title', filter.title);
    const filterMainDirectors = getSimpleFilter('mainDirectors', filter.mainDirectors);
    const filterGender = getSimpleFilter('gender', filter.gender);
    const filterDate = getRangeFilter('launch',
                                      filter.initialDate ? filter.initialDate.toISOString() : null,
                                      filter.finalDate ? filter.finalDate.toISOString() : null);
    const filterPrice = getRangeFilter('price', filter.initialPrice, filter.finalPrice);
    const filterEvaluation = getSimpleFilter('evaluation', filter.evaluation, false);

    const url = `${this.movieUrl}?${filterTitle}${filterMainDirectors}${filterGender}${filterDate}${filterPrice}${filterEvaluation}`;
    return this.http.get<Movie[]>(url);
  }
}
