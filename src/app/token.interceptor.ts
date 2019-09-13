import {Injectable} from '@angular/core';
import {SessionService} from './session.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.sessionService.getItem('x-api-token')) {
      req = req.clone({
        setHeaders: {
          'x-api-token': this.sessionService.getItem('x-api-token')
        }
      });
    }
    return next.handle(req);
  }
}
