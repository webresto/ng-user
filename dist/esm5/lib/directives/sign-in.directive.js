/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            phone: this.phone,
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signIn(data, this.rememberMe)
            .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
    };
    SignInDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appSignIn]'
                },] },
    ];
    /** @nocollapse */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2FpbHMtcmVzdG8vbmctdXNlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3NpZ24taW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7SUFnQnJFLHlCQUNVO1FBQUEsdUJBQWtCLEdBQWxCLGtCQUFrQjt1QkFKUixJQUFJLFlBQVksRUFBVztxQkFDN0IsSUFBSSxZQUFZLEVBQVU7S0FJdkM7Ozs7SUFHTCxpQ0FBTzs7O0lBRFA7UUFBQSxpQkFhQzs7UUFYQyxJQUFJLElBQUksR0FBcUI7WUFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQzdCLFNBQVMsQ0FDUixjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQXZCLENBQXVCLEVBQzdCLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXRCLENBQXNCLENBQ2hDLENBQUE7S0FDSjs7Z0JBN0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtpQkFDeEI7Ozs7Z0JBTlEsa0JBQWtCOzs7d0JBU3hCLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7MEJBQ0wsTUFBTTt3QkFDTixNQUFNOzBCQU1OLFlBQVksU0FBQyxPQUFPOzswQkFyQnZCOztTQVFhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwU2lnbkluXSdcbn0pXG5leHBvcnQgY2xhc3MgU2lnbkluRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIHBhc3N3b3JkOnN0cmluZztcbiAgQElucHV0KCkgY2FwdGNoYTpzdHJpbmc7XG4gIEBJbnB1dCgpIHJlbWVtYmVyTWU6Ym9vbGVhbjtcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgbGV0IGRhdGE6U2lnbkluUmVxdWVzdERhdGEgPSB7XG4gICAgICBwaG9uZTogdGhpcy5waG9uZSxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxuICAgICAgY2FwdGNoYTogdGhpcy5jYXB0Y2hhXG4gICAgfTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnNpZ25JbihkYXRhLCB0aGlzLnJlbWVtYmVyTWUpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKVxuICB9XG5cbn1cbiJdfQ==