import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '@model/movie';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = environment.url;
  private movieUrl = `${this.baseUrl}/movie`;
  private getMovieByIdUrl = (id: number) => `${this.movieUrl}?id=${id}`;

  constructor(public http: HttpClient) { }

  getValeus = (): Observable<Movie[]> => this.http.get<Movie[]>(this.movieUrl);

  get = (id: number): Observable<Movie> => this.http.get<Movie>(this.getMovieByIdUrl(id));

  save = (movie: Movie) => this.http.post<Movie>(this.movieUrl, movie);

  update = (movie: Movie) => this.http.put<Movie>(this.movieUrl, movie);
}
