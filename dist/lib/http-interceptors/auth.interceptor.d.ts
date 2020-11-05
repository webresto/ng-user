import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
export declare class AuthInterceptor implements HttpInterceptor {
    private userService;
    constructor(userService: NgRestoUserService);
    intercept(req: HttpRequest<any>, next: HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDef<AuthInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDef<AuthInterceptor>;
}
//# sourceMappingURL=auth.interceptor.d.ts.map