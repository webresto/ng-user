/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
var SignInDirective = /** @class */ (function () {
    function SignInDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    SignInDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = {
            phone: this.preparePhone(this.phone),
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signIn(data, this.rememberMe)
            .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
    };
    /**
     * @param {?} phone
     * @return {?}
     */
    SignInDirective.prototype.preparePhone = /**
     * @param {?} phone
     * @return {?}
     */
    function (phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
    };
    SignInDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appSignIn]'
                },] },
    ];
    SignInDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    SignInDirective.propDecorators = {
        phone: [{ type: Input }],
        password: [{ type: Input }],
        captcha: [{ type: Input }],
        rememberMe: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return SignInDirective;
}());
export { SignInDirective };
if (false) {
    /** @type {?} */
    SignInDirective.prototype.phone;
    /** @type {?} */
    SignInDirective.prototype.password;
    /** @type {?} */
    SignInDirective.prototype.captcha;
    /** @type {?} */
    SignInDirective.prototype.rememberMe;
    /** @type {?} */
    SignInDirective.prototype.success;
    /** @type {?} */
    SignInDirective.prototype.error;
    /** @type {?} */
    SignInDirective.prototype.ngRestoUserService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctdXNlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3NpZ24taW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUl2RTtJQVlFLHlCQUNVLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBSnRDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBSXpDLENBQUM7Ozs7SUFHTCxpQ0FBTzs7O0lBRFA7UUFBQSxpQkFhQzs7WUFYSyxJQUFJLEdBQXFCO1lBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QjtRQUNELElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQzdCLFNBQVMsQ0FDUixjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQXZCLENBQXVCLEVBQzdCLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXRCLENBQXNCLENBQ2hDLENBQUE7SUFDTCxDQUFDOzs7OztJQUVELHNDQUFZOzs7O0lBQVosVUFBYSxLQUFLO1FBQ2hCLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDOztnQkFsQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO2lCQUN4Qjs7O2dCQU5RLGtCQUFrQjs7O3dCQVN4QixLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzBCQUNMLE1BQU07d0JBQ04sTUFBTTswQkFNTixZQUFZLFNBQUMsT0FBTzs7SUFvQnZCLHNCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FqQ1ksZUFBZTs7O0lBRTFCLGdDQUFzQjs7SUFDdEIsbUNBQXlCOztJQUN6QixrQ0FBd0I7O0lBQ3hCLHFDQUE0Qjs7SUFDNUIsa0NBQWdEOztJQUNoRCxnQ0FBNkM7O0lBRzNDLDZDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFNpZ25JblJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLWluLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBTaWduSW5dJ1xufSlcbmV4cG9ydCBjbGFzcyBTaWduSW5EaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHBob25lOnN0cmluZztcbiAgQElucHV0KCkgcGFzc3dvcmQ6c3RyaW5nO1xuICBASW5wdXQoKSBjYXB0Y2hhOnN0cmluZztcbiAgQElucHV0KCkgcmVtZW1iZXJNZTpib29sZWFuO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpTaWduSW5SZXF1ZXN0RGF0YSA9IHtcbiAgICAgIHBob25lOiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKSxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxuICAgICAgY2FwdGNoYTogdGhpcy5jYXB0Y2hhXG4gICAgfTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnNpZ25JbihkYXRhLCB0aGlzLnJlbWVtYmVyTWUpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKVxuICB9XG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnJyk7XG4gIH1cblxufVxuIl19