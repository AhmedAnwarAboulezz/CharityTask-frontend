import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading/loading.service';
import { AlertService } from '../services/alert/alert.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { GlobalVars } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {

  private token: string | null = null;
  private basicToken: string | null = null;

  constructor(private loadingService: LoadingService, private alertService: AlertService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.token = localStorage.getItem('token');
    this.basicToken = localStorage.getItem('basic-token');

    if(request.url.includes('oppwa.com')){
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': GlobalVars.ApiGatewayToken
        }
      });
    }
    else{
      request = request.clone({
        setHeaders: {
          'Content-Type':  'application/json',
          //'Authorization': 'Basic ' + btoa('admin:Admin@123'),
          'Authorization': `Basic ${this.basicToken ? this.basicToken : ''}`
        }
      });
      // request = request.clone({
      //   setHeaders: {
      //     'Authorization': `Bearer ${this.token ? this.token : ''}`,
      //     'Content-Type': 'application/json',
      //     'Language': environment.defaultLang,
      //     'Cache-Control': 'max-age=31536000'
      //   }
      // });
    }


    if (request.url.includes(environment.hostAPI)) {
      this.loadingService.setLoading(true, request.url);

      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          // alertHandling
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.alertService.error('!Session Ended!');
              localStorage.clear();
              this.router.navigateByUrl('/account/login');
            }
            //  else if (error.status === 400 || error.status === 502 || error.status === 503) {
            //   this.alertService.error('!Technical Error!');
            // }
             else if (error.status === 405) {
              this.alertService.error('!NOT ALLOWED ERROR!');
            } else if (error.status === 500) {
              this.alertService.error('!SYSTEM ERROR!');
            }
          }

          return throwError(error);
        }),
        finalize(() => this.loadingService.setLoading(false, request.url))
      );
    } else {
      return next.handle(request);
    }
  }
}
