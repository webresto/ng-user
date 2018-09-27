import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export declare class AuthInterceptor implements HttpInterceptor {
    private userService;
    constructor(userService: NgRestoUserService);
    intercept(req: HttpRequest<any>, next: HttpHandler): import("../../../../../../../../../../Users/user/projects/gfcafe/node_modules/rxjs/internal/Observable").Observable<import("../../../../../../../../../../Users/user/projects/gfcafe/node_modules/@angular/common/http/src/response").HttpEvent<any>>;
}
