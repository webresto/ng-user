import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
export class AuthInterceptor {
    constructor(userService) {
        this.userService = userService;
    }
    intercept(req, next) {
        console.info('AuthInterceptor', req);
        // Get the auth token from the service.
        const authToken = this.userService.getAuthToken();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9sYXJjaGVua292L2Zyb250ZW5kL3Byb2plY3RzL3dlYnJlc3RvL25nLXVzZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2h0dHAtaW50ZXJjZXB0b3JzL2F1dGguaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBVzNDLE1BQU0sT0FBTyxlQUFlO0lBRTFCLFlBQW9CLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtJQUFHLENBQUM7SUFFdkQsU0FBUyxDQUFDLEdBQXFCLEVBQUUsSUFBaUI7UUFFaEQsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVyQyx1Q0FBdUM7UUFDdkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVsRCxJQUFHLFNBQVMsRUFBRTtZQUNaLDBEQUEwRDtZQUMxRCxrREFBa0Q7WUFDbEQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDeEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxPQUFPLFNBQVMsRUFBRSxDQUFDO2FBQzlELENBQUMsQ0FBQztZQUVILHVEQUF1RDtZQUN2RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FFN0I7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7OEVBeEJVLGVBQWU7dURBQWYsZUFBZSxXQUFmLGVBQWU7a0RBQWYsZUFBZTtjQUQzQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBJbnRlcmNlcHRvcixcclxuICBIdHRwSGFuZGxlcixcclxuICBIdHRwUmVxdWVzdCxcclxuICBIdHRwRXJyb3JSZXNwb25zZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2UpIHt9XHJcblxyXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKSB7XHJcblxyXG4gICAgY29uc29sZS5pbmZvKCdBdXRoSW50ZXJjZXB0b3InLCByZXEpO1xyXG5cclxuICAgIC8vIEdldCB0aGUgYXV0aCB0b2tlbiBmcm9tIHRoZSBzZXJ2aWNlLlxyXG4gICAgY29uc3QgYXV0aFRva2VuID0gdGhpcy51c2VyU2VydmljZS5nZXRBdXRoVG9rZW4oKTtcclxuXHJcbiAgICBpZihhdXRoVG9rZW4pIHtcclxuICAgICAgLy8gQ2xvbmUgdGhlIHJlcXVlc3QgYW5kIHJlcGxhY2UgdGhlIG9yaWdpbmFsIGhlYWRlcnMgd2l0aFxyXG4gICAgICAvLyBjbG9uZWQgaGVhZGVycywgdXBkYXRlZCB3aXRoIHRoZSBhdXRob3JpemF0aW9uLlxyXG4gICAgICBjb25zdCBhdXRoUmVxID0gcmVxLmNsb25lKHtcclxuICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCBgSldUICR7YXV0aFRva2VufWApXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gc2VuZCBjbG9uZWQgcmVxdWVzdCB3aXRoIGhlYWRlciB0byB0aGUgbmV4dCBoYW5kbGVyLlxyXG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUoYXV0aFJlcSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xyXG4gIH1cclxufSJdfQ==