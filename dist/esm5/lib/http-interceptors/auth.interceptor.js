/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(userService) {
        this.userService = userService;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    AuthInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        console.info('AuthInterceptor', req);
        /** @type {?} */
        var authToken = this.userService.getAuthToken();
        if (authToken) {
            /** @type {?} */
            var authReq = req.clone({
                headers: req.headers.set('Authorization', "JWT " + authToken)
            });
            // send cloned request with header to the next handler.
            return next.handle(authReq);
        }
        return next.handle(req);
    };
    AuthInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthInterceptor.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    return AuthInterceptor;
}());
export { AuthInterceptor };
if (false) {
    /** @type {?} */
    AuthInterceptor.prototype.userService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzYWlscy1yZXN0by9uZy11c2VyLyIsInNvdXJjZXMiOlsibGliL2h0dHAtaW50ZXJjZXB0b3JzL2F1dGguaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0lBS3JFLHlCQUFvQixXQUErQjtRQUEvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7S0FBSTs7Ozs7O0lBRXZELG1DQUFTOzs7OztJQUFULFVBQVUsR0FBcUIsRUFBRSxJQUFpQjtRQUVoRCxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDOztRQUdyQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRWxELElBQUcsU0FBUyxFQUFFOztZQUdaLElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBTyxTQUFXLENBQUM7YUFDOUQsQ0FBQyxDQUFDOztZQUdILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUU3QjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6Qjs7Z0JBekJGLFVBQVU7Ozs7Z0JBRkYsa0JBQWtCOzswQkFSM0I7O1NBV2EsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBSZXF1ZXN0LFxuICBIdHRwRXJyb3JSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZSkge31cblxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcikge1xuXG4gICAgY29uc29sZS5pbmZvKCdBdXRoSW50ZXJjZXB0b3InLCByZXEpO1xuXG4gICAgLy8gR2V0IHRoZSBhdXRoIHRva2VuIGZyb20gdGhlIHNlcnZpY2UuXG4gICAgY29uc3QgYXV0aFRva2VuID0gdGhpcy51c2VyU2VydmljZS5nZXRBdXRoVG9rZW4oKTtcblxuICAgIGlmKGF1dGhUb2tlbikge1xuICAgICAgLy8gQ2xvbmUgdGhlIHJlcXVlc3QgYW5kIHJlcGxhY2UgdGhlIG9yaWdpbmFsIGhlYWRlcnMgd2l0aFxuICAgICAgLy8gY2xvbmVkIGhlYWRlcnMsIHVwZGF0ZWQgd2l0aCB0aGUgYXV0aG9yaXphdGlvbi5cbiAgICAgIGNvbnN0IGF1dGhSZXEgPSByZXEuY2xvbmUoe1xuICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCBgSldUICR7YXV0aFRva2VufWApXG4gICAgICB9KTtcblxuICAgICAgLy8gc2VuZCBjbG9uZWQgcmVxdWVzdCB3aXRoIGhlYWRlciB0byB0aGUgbmV4dCBoYW5kbGVyLlxuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKGF1dGhSZXEpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gIH1cbn0iXX0=