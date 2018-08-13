import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { NgRestoUserService } from '../services/ng-resto-user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: NgRestoUserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.info('AuthInterceptor', req);

    // Get the auth token from the service.
    const authToken = this.userService.getAuthToken();

    if(authToken) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }

    return next.handle(req);
  }

}