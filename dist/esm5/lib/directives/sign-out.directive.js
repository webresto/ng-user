/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
var SignOutDirective = /** @class */ (function () {
    function SignOutDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
    }
    /**
     * @return {?}
     */
    SignOutDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.ngRestoUserService.signOut();
    };
    SignOutDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appSignOut]'
                },] },
    ];
    /** @nocollapse */
    SignOutDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    SignOutDirective.propDecorators = {
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return SignOutDirective;
}());
export { SignOutDirective };
if (false) {
    /** @type {?} */
    SignOutDirective.prototype.ngRestoUserService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1vdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9zaWduLW91dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztJQVNyRSwwQkFDVTtRQUFBLHVCQUFrQixHQUFsQixrQkFBa0I7S0FDdkI7Ozs7SUFHTCxrQ0FBTzs7O0lBRFA7UUFFRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDbkM7O2dCQVpGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztpQkFDekI7Ozs7Z0JBTlEsa0JBQWtCOzs7MEJBYXhCLFlBQVksU0FBQyxPQUFPOzsyQkFkdkI7O1NBUWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwU2lnbk91dF0nXG59KVxuZXhwb3J0IGNsYXNzIFNpZ25PdXREaXJlY3RpdmUge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2Uuc2lnbk91dCgpO1xuICB9XG5cbn1cbiJdfQ==