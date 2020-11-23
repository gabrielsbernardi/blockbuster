import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';

import { Movie } from '@model/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private urlToJson = 'assets/data/movies.json';

  constructor(public http: HttpClient) { }

  getValeus = (): Observable<Movie[]> => {
    return this.http.get<Movie[]>(this.urlToJson);
  };

  get = (id: number): Movie => {
    const movies = this.http.get<Movie[]>(this.urlToJson).toPromise();
    // return movies.find(movie => movie.number == id);
    return null
  }

  save(movie: Movie) {
    this.http.post<Movie>(this.urlToJson, movie);
    // movies.push(movie);
    // if (this.get(movie.number) === null) {
    //   movies.push(movie);
    // } else {
    //   throw EvalError(`Já existe um filme cadastrado com o número: ${movie.number}`);
    // }
  }
}
