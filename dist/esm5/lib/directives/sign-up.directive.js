/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
var SignUpDirective = /** @class */ (function () {
    function SignUpDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    SignUpDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = {
            name: this.name,
            phone: this.preparePhone(this.phone),
            email: this.email,
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signUp(data)
            .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
    };
    /**
     * @param {?} phone
     * @return {?}
     */
    SignUpDirective.prototype.preparePhone = /**
     * @param {?} phone
     * @return {?}
     */
    function (phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
    };
    SignUpDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appSignUp]'
                },] },
    ];
    /** @nocollapse */
    SignUpDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    SignUpDirective.propDecorators = {
        name: [{ type: Input }],
        phone: [{ type: Input }],
        email: [{ type: Input }],
        password: [{ type: Input }],
        captcha: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return SignUpDirective;
}());
export { SignUpDirective };
if (false) {
    /** @type {?} */
    SignUpDirective.prototype.name;
    /** @type {?} */
    SignUpDirective.prototype.phone;
    /** @type {?} */
    SignUpDirective.prototype.email;
    /** @type {?} */
    SignUpDirective.prototype.password;
    /** @type {?} */
    SignUpDirective.prototype.captcha;
    /** @type {?} */
    SignUpDirective.prototype.success;
    /** @type {?} */
    SignUpDirective.prototype.error;
    /** @type {?} */
    SignUpDirective.prototype.ngRestoUserService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2FpbHMtcmVzdG8vbmctdXNlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3NpZ24tdXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7SUFpQnJFLHlCQUNVO1FBQUEsdUJBQWtCLEdBQWxCLGtCQUFrQjt1QkFKUixJQUFJLFlBQVksRUFBVztxQkFDN0IsSUFBSSxZQUFZLEVBQVU7S0FJdkM7Ozs7SUFHTCxpQ0FBTzs7O0lBRFA7UUFBQSxpQkFlQzs7UUFiQyxJQUFJLElBQUksR0FBcUI7WUFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ1osU0FBUyxDQUNSLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBdkIsQ0FBdUIsRUFDN0IsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBdEIsQ0FBc0IsQ0FDaEMsQ0FBQztLQUNMOzs7OztJQUVELHNDQUFZOzs7O0lBQVosVUFBYSxLQUFLO1FBQ2hCLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNoQzs7Z0JBckNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtpQkFDeEI7Ozs7Z0JBTlEsa0JBQWtCOzs7dUJBU3hCLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxNQUFNO3dCQUNOLE1BQU07MEJBTU4sWUFBWSxTQUFDLE9BQU87OzBCQXRCdkI7O1NBUWEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFNpZ25VcFJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLXVwLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBTaWduVXBdJ1xufSlcbmV4cG9ydCBjbGFzcyBTaWduVXBEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGVtYWlsOnN0cmluZztcbiAgQElucHV0KCkgcGFzc3dvcmQ6c3RyaW5nO1xuICBASW5wdXQoKSBjYXB0Y2hhOnN0cmluZztcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgbGV0IGRhdGE6U2lnblVwUmVxdWVzdERhdGEgPSB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBwaG9uZTogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICBlbWFpbDogdGhpcy5lbWFpbCxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxuICAgICAgY2FwdGNoYTogdGhpcy5jYXB0Y2hhXG4gICAgfTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnNpZ25VcChkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cblxuICBwcmVwYXJlUGhvbmUocGhvbmUpIHtcbiAgICBwaG9uZSA9ICcrJyArIHBob25lLnJlcGxhY2UoL1teMC05XS9naW0sJycpO1xuICAgIHJldHVybiBwaG9uZS5yZXBsYWNlKCcrOCcsICcnKTtcbiAgfVxufVxuIl19