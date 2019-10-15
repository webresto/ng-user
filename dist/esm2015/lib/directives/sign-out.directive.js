/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export class SignOutDirective {
    /**
     * @param {?} ngRestoUserService
     */
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
    }
    /**
     * @return {?}
     */
    onClick() {
        this.ngRestoUserService.signOut();
    }
}
SignOutDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appSignOut]'
            },] },
];
/** @nocollapse */
SignOutDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
SignOutDirective.propDecorators = {
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    SignOutDirective.prototype.ngRestoUserService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1vdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9zaWduLW91dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBT3ZFLE1BQU07Ozs7SUFFSixZQUNVO1FBQUEsdUJBQWtCLEdBQWxCLGtCQUFrQjtLQUN2Qjs7OztJQUdMLE9BQU87UUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDbkM7OztZQVpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYzthQUN6Qjs7OztZQU5RLGtCQUFrQjs7O3NCQWF4QixZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgU2lnbkluUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24taW4tcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFNpZ25PdXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBTaWduT3V0RGlyZWN0aXZlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlLnNpZ25PdXQoKTtcbiAgfVxuXG59XG4iXX0=