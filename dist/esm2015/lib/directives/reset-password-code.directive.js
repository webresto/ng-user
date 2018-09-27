/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export class ResetPasswordCodeDirective {
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
            userId: this.userId,
            code: this.code,
            password: this.password
        };
        this.ngRestoUserService
            .resetPasswordCode(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
ResetPasswordCodeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appResetPasswordCode]'
            },] },
];
/** @nocollapse */
ResetPasswordCodeDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
ResetPasswordCodeDirective.propDecorators = {
    userId: [{ type: Input }],
    code: [{ type: Input }],
    password: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    ResetPasswordCodeDirective.prototype.userId;
    /** @type {?} */
    ResetPasswordCodeDirective.prototype.code;
    /** @type {?} */
    ResetPasswordCodeDirective.prototype.password;
    /** @type {?} */
    ResetPasswordCodeDirective.prototype.success;
    /** @type {?} */
    ResetPasswordCodeDirective.prototype.error;
    /** @type {?} */
    ResetPasswordCodeDirective.prototype.ngRestoUserService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQtY29kZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2FpbHMtcmVzdG8vbmctdXNlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLWNvZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQVF2RSxNQUFNOzs7O0lBUUosWUFDVTtRQUFBLHVCQUFrQixHQUFsQixrQkFBa0I7dUJBSlIsSUFBSSxZQUFZLEVBQVc7cUJBQzdCLElBQUksWUFBWSxFQUFVO0tBSXZDOzs7O0lBR0wsT0FBTzs7UUFDTCxJQUFJLElBQUksR0FBZ0M7WUFDdEMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixpQkFBaUIsQ0FBQyxJQUFJLENBQUM7YUFDdkIsU0FBUyxDQUNSLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM3QixLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNoQyxDQUFDO0tBQ0w7OztZQTVCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjthQUNuQzs7OztZQVBRLGtCQUFrQjs7O3FCQVV4QixLQUFLO21CQUNMLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxNQUFNO29CQUNOLE1BQU07c0JBTU4sWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlcXVlc3QtZGF0YSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFJlc2V0UGFzc3dvcmRDb2RlXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVzZXRQYXNzd29yZENvZGVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHVzZXJJZDpzdHJpbmc7XG4gIEBJbnB1dCgpIGNvZGU6c3RyaW5nO1xuICBASW5wdXQoKSBwYXNzd29yZDpzdHJpbmc7XG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGxldCBkYXRhOlJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEgPSB7XG4gICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcbiAgICB9O1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAucmVzZXRQYXNzd29yZENvZGUoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG5cbn1cbiJdfQ==