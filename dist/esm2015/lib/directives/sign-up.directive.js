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
            phone: this.preparePhone(this.phone),
            email: this.email,
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signUp(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
    /**
     * @param {?} phone
     * @return {?}
     */
    preparePhone(phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2FpbHMtcmVzdG8vbmctdXNlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3NpZ24tdXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQU92RSxNQUFNOzs7O0lBVUosWUFDVTtRQUFBLHVCQUFrQixHQUFsQixrQkFBa0I7dUJBSlIsSUFBSSxZQUFZLEVBQVc7cUJBQzdCLElBQUksWUFBWSxFQUFVO0tBSXZDOzs7O0lBR0wsT0FBTzs7UUFDTCxJQUFJLElBQUksR0FBcUI7WUFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ1osU0FBUyxDQUNSLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM3QixLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNoQyxDQUFDO0tBQ0w7Ozs7O0lBRUQsWUFBWSxDQUFDLEtBQUs7UUFDaEIsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ2hDOzs7WUFyQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2FBQ3hCOzs7O1lBTlEsa0JBQWtCOzs7bUJBU3hCLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxNQUFNO29CQUNOLE1BQU07c0JBTU4sWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTaWduVXBSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi11cC1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwU2lnblVwXSdcbn0pXG5leHBvcnQgY2xhc3MgU2lnblVwRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcbiAgQElucHV0KCkgcGhvbmU6c3RyaW5nO1xuICBASW5wdXQoKSBlbWFpbDpzdHJpbmc7XG4gIEBJbnB1dCgpIHBhc3N3b3JkOnN0cmluZztcbiAgQElucHV0KCkgY2FwdGNoYTpzdHJpbmc7XG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGxldCBkYXRhOlNpZ25VcFJlcXVlc3REYXRhID0ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgcGhvbmU6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgZW1haWw6IHRoaXMuZW1haWwsXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgIGNhcHRjaGE6IHRoaXMuY2FwdGNoYVxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5zaWduVXAoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnJyk7XG4gIH1cbn1cbiJdfQ==