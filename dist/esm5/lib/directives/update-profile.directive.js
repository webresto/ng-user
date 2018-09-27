/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
var UpdateProfileDirective = /** @class */ (function () {
    function UpdateProfileDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    UpdateProfileDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = {
            name: this.name,
            phone: this.phone,
            email: this.email
        };
        this.ngRestoUserService
            .updateProfile(data)
            .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
    };
    UpdateProfileDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appUpdateProfile]'
                },] },
    ];
    /** @nocollapse */
    UpdateProfileDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    UpdateProfileDirective.propDecorators = {
        name: [{ type: Input }],
        phone: [{ type: Input }],
        email: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return UpdateProfileDirective;
}());
export { UpdateProfileDirective };
if (false) {
    /** @type {?} */
    UpdateProfileDirective.prototype.name;
    /** @type {?} */
    UpdateProfileDirective.prototype.phone;
    /** @type {?} */
    UpdateProfileDirective.prototype.email;
    /** @type {?} */
    UpdateProfileDirective.prototype.success;
    /** @type {?} */
    UpdateProfileDirective.prototype.error;
    /** @type {?} */
    UpdateProfileDirective.prototype.ngRestoUserService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXByb2ZpbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNhaWxzLXJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy91cGRhdGUtcHJvZmlsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztJQWdCckUsZ0NBQ1U7UUFBQSx1QkFBa0IsR0FBbEIsa0JBQWtCO3VCQUpSLElBQUksWUFBWSxFQUFXO3FCQUM3QixJQUFJLFlBQVksRUFBVTtLQUl2Qzs7OztJQUdMLHdDQUFPOzs7SUFEUDtRQUFBLGlCQWFDOztRQVhDLElBQUksSUFBSSxHQUE0QjtZQUNsQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGFBQWEsQ0FBQyxJQUFJLENBQUM7YUFDbkIsU0FBUyxDQUNSLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBdkIsQ0FBdUIsRUFDN0IsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBdEIsQ0FBc0IsQ0FDaEMsQ0FBQztLQUNMOztnQkE3QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7aUJBQy9COzs7O2dCQU5RLGtCQUFrQjs7O3VCQVN4QixLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzswQkFFTCxNQUFNO3dCQUNOLE1BQU07MEJBTU4sWUFBWSxTQUFDLE9BQU87O2lDQXJCdkI7O1NBUWEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy91cGRhdGUtcHJvZmlsZS1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwVXBkYXRlUHJvZmlsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGVtYWlsOnN0cmluZztcblxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEgPSB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBwaG9uZTogdGhpcy5waG9uZSxcbiAgICAgIGVtYWlsOiB0aGlzLmVtYWlsXG4gICAgfTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnVwZGF0ZVByb2ZpbGUoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG59XG4iXX0=