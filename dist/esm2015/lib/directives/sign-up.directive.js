/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export class SignUpDirective {
    /**
     * @param {?} ngRestoUserService
     */
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onClick() {
        /** @type {?} */
        let data = {
            name: this.name,
            phone: this.phone,
            email: this.email,
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signUp(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
SignUpDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appSignUp]'
            },] },
];
/** @nocollapse */
SignUpDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2FpbHMtcmVzdG8vbmctdXNlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3NpZ24tdXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQU92RSxNQUFNOzs7O0lBVUosWUFDVTtRQUFBLHVCQUFrQixHQUFsQixrQkFBa0I7dUJBSlIsSUFBSSxZQUFZLEVBQVc7cUJBQzdCLElBQUksWUFBWSxFQUFVO0tBSXZDOzs7O0lBR0wsT0FBTzs7UUFDTCxJQUFJLElBQUksR0FBcUI7WUFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDWixTQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7S0FDTDs7O1lBaENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTthQUN4Qjs7OztZQU5RLGtCQUFrQjs7O21CQVN4QixLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsTUFBTTtvQkFDTixNQUFNO3NCQU1OLFlBQVksU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgU2lnblVwUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFNpZ25VcF0nXG59KVxuZXhwb3J0IGNsYXNzIFNpZ25VcERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgbmFtZTpzdHJpbmc7XG4gIEBJbnB1dCgpIHBob25lOnN0cmluZztcbiAgQElucHV0KCkgZW1haWw6c3RyaW5nO1xuICBASW5wdXQoKSBwYXNzd29yZDpzdHJpbmc7XG4gIEBJbnB1dCgpIGNhcHRjaGE6c3RyaW5nO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpTaWduVXBSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIHBob25lOiB0aGlzLnBob25lLFxuICAgICAgZW1haWw6IHRoaXMuZW1haWwsXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgIGNhcHRjaGE6IHRoaXMuY2FwdGNoYVxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5zaWduVXAoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG59XG4iXX0=