import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgModule, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(public toastr: ToastrService,
              public spinner: NgxSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const dupReq = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json')
    });
    return next.handle(dupReq).pipe(
      tap(
        () => {},
        (err) => {
          console.log(this.handleErrors(err));
        }
      )
    );
  }

  handleErrors = error => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      switch (error.status) {
        case 0:
          this.toastr.error(
            'Erro de conexão com o servidor.',
            'Erro'
          );
          break;
        case 400:
        case 403:
          this.toastr.error(
            error.error.message,
            'Erro'
          );
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      this.spinner.hide();
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})
export class InterceptorModule {}
