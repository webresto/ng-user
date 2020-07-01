/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQtY29kZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctdXNlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLWNvZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQVF2RSxNQUFNOzs7O0lBUUosWUFDVSxrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUp0QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUl6QyxDQUFDOzs7O0lBR0wsT0FBTzs7WUFDRCxJQUFJLEdBQWdDO1lBQ3RDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEI7UUFDRCxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGlCQUFpQixDQUFDLElBQUksQ0FBQzthQUN2QixTQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7SUFDTixDQUFDOzs7WUE1QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7YUFDbkM7OztZQVBRLGtCQUFrQjs7O3FCQVV4QixLQUFLO21CQUNMLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxNQUFNO29CQUNOLE1BQU07c0JBTU4sWUFBWSxTQUFDLE9BQU87Ozs7SUFWckIsNENBQXVCOztJQUN2QiwwQ0FBcUI7O0lBQ3JCLDhDQUF5Qjs7SUFDekIsNkNBQWdEOztJQUNoRCwyQ0FBNkM7O0lBRzNDLHdEQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLWNvZGUtcmVxdWVzdC1kYXRhJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwUmVzZXRQYXNzd29yZENvZGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZXNldFBhc3N3b3JkQ29kZURpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgdXNlcklkOnN0cmluZztcbiAgQElucHV0KCkgY29kZTpzdHJpbmc7XG4gIEBJbnB1dCgpIHBhc3N3b3JkOnN0cmluZztcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgbGV0IGRhdGE6UmVzZXRQYXNzd29yZENvZGVSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZFxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5yZXNldFBhc3N3b3JkQ29kZShkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cblxufVxuIl19