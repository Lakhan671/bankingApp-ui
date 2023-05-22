import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let requestcopy = request.clone({
      responseType: 'json',
      setHeaders: {
         Authorization: 'Bearer  '+token,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(requestcopy);
  }

}



