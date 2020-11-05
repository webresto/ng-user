import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
const LS_TOKEN_NAME = 'gf:tkn:v2';
export class AuthInterceptor {
    constructor(userService) {
        this.userService = userService;
    }
    intercept(req, next) {
        console.info('AuthInterceptor', req);
        // Get the auth token from the service.
        const authToken = localStorage.getItem(LS_TOKEN_NAME);
        if (authToken) {
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `JWT ${authToken}`)
            });
            // send cloned request with header to the next handler.
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
AuthInterceptor.ɵfac = function AuthInterceptor_Factory(t) { return new (t || AuthInterceptor)(i0.ɵɵinject(i1.NgRestoUserService)); };
AuthInterceptor.ɵprov = i0.ɵɵdefineInjectable({ token: AuthInterceptor, factory: AuthInterceptor.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AuthInterceptor, [{
        type: Injectable
    }], function () { return [{ type: i1.NgRestoUserService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9sYXJjaGVua292L2Zyb250ZW5kL3Byb2plY3RzL3dlYnJlc3RvL25nLXVzZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2h0dHAtaW50ZXJjZXB0b3JzL2F1dGguaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSTNDLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQztBQUdsQyxNQUFNLE9BQU8sZUFBZTtJQUUxQixZQUFvQixXQUE4QjtRQUE5QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7SUFBSSxDQUFDO0lBRXZELFNBQVMsQ0FBQyxHQUFxQixFQUFFLElBQWlCO1FBRWhELE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFckMsdUNBQXVDO1FBQ3ZDLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdEQsSUFBSSxTQUFTLEVBQUU7WUFDYiwwREFBMEQ7WUFDMUQsa0RBQWtEO1lBQ2xELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxTQUFTLEVBQUUsQ0FBQzthQUM5RCxDQUFDLENBQUM7WUFFSCx1REFBdUQ7WUFDdkQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBRTdCO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7OzhFQXhCVSxlQUFlO3VEQUFmLGVBQWUsV0FBZixlQUFlO2tEQUFmLGVBQWU7Y0FEM0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yLCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XHJcblxyXG5jb25zdCBMU19UT0tFTl9OQU1FID0gJ2dmOnRrbjp2Mic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXJTZXJ2aWNlOk5nUmVzdG9Vc2VyU2VydmljZSkgeyB9XHJcblxyXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKSB7XHJcblxyXG4gICAgY29uc29sZS5pbmZvKCdBdXRoSW50ZXJjZXB0b3InLCByZXEpO1xyXG5cclxuICAgIC8vIEdldCB0aGUgYXV0aCB0b2tlbiBmcm9tIHRoZSBzZXJ2aWNlLlxyXG4gICAgY29uc3QgYXV0aFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTFNfVE9LRU5fTkFNRSk7XHJcblxyXG4gICAgaWYgKGF1dGhUb2tlbikge1xyXG4gICAgICAvLyBDbG9uZSB0aGUgcmVxdWVzdCBhbmQgcmVwbGFjZSB0aGUgb3JpZ2luYWwgaGVhZGVycyB3aXRoXHJcbiAgICAgIC8vIGNsb25lZCBoZWFkZXJzLCB1cGRhdGVkIHdpdGggdGhlIGF1dGhvcml6YXRpb24uXHJcbiAgICAgIGNvbnN0IGF1dGhSZXEgPSByZXEuY2xvbmUoe1xyXG4gICAgICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsIGBKV1QgJHthdXRoVG9rZW59YClcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBzZW5kIGNsb25lZCByZXF1ZXN0IHdpdGggaGVhZGVyIHRvIHRoZSBuZXh0IGhhbmRsZXIuXHJcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShhdXRoUmVxKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XHJcbiAgfVxyXG59Il19