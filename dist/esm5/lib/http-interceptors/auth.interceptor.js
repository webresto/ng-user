/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        // Get the auth token from the service.
        /** @type {?} */
        var authToken = this.userService.getAuthToken();
        if (authToken) {
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
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
    AuthInterceptor.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    return AuthInterceptor;
}());
export { AuthInterceptor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthInterceptor.prototype.userService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B3ZWJyZXN0by9uZy11c2VyLyIsInNvdXJjZXMiOlsibGliL2h0dHAtaW50ZXJjZXB0b3JzL2F1dGguaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFdkU7SUFHRSx5QkFBb0IsV0FBK0I7UUFBL0IsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO0lBQUcsQ0FBQzs7Ozs7O0lBRXZELG1DQUFTOzs7OztJQUFULFVBQVUsR0FBcUIsRUFBRSxJQUFpQjtRQUVoRCxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7WUFHL0IsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFO1FBRWpELElBQUcsU0FBUyxFQUFFOzs7O2dCQUdOLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUN4QixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQU8sU0FBVyxDQUFDO2FBQzlELENBQUM7WUFFRix1REFBdUQ7WUFDdkQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBRTdCO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7O2dCQXpCRixVQUFVOzs7Z0JBRkYsa0JBQWtCOztJQTRCM0Isc0JBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXpCWSxlQUFlOzs7Ozs7SUFFZCxzQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBIdHRwSW50ZXJjZXB0b3IsXG4gIEh0dHBIYW5kbGVyLFxuICBIdHRwUmVxdWVzdCxcbiAgSHR0cEVycm9yUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2UpIHt9XG5cbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpIHtcblxuICAgIGNvbnNvbGUuaW5mbygnQXV0aEludGVyY2VwdG9yJywgcmVxKTtcblxuICAgIC8vIEdldCB0aGUgYXV0aCB0b2tlbiBmcm9tIHRoZSBzZXJ2aWNlLlxuICAgIGNvbnN0IGF1dGhUb2tlbiA9IHRoaXMudXNlclNlcnZpY2UuZ2V0QXV0aFRva2VuKCk7XG5cbiAgICBpZihhdXRoVG9rZW4pIHtcbiAgICAgIC8vIENsb25lIHRoZSByZXF1ZXN0IGFuZCByZXBsYWNlIHRoZSBvcmlnaW5hbCBoZWFkZXJzIHdpdGhcbiAgICAgIC8vIGNsb25lZCBoZWFkZXJzLCB1cGRhdGVkIHdpdGggdGhlIGF1dGhvcml6YXRpb24uXG4gICAgICBjb25zdCBhdXRoUmVxID0gcmVxLmNsb25lKHtcbiAgICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgYEpXVCAke2F1dGhUb2tlbn1gKVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHNlbmQgY2xvbmVkIHJlcXVlc3Qgd2l0aCBoZWFkZXIgdG8gdGhlIG5leHQgaGFuZGxlci5cbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShhdXRoUmVxKTtcblxuICAgIH1cblxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICB9XG59Il19