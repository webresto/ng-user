/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
var ResetPasswordCodeDirective = /** @class */ (function () {
    function ResetPasswordCodeDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ResetPasswordCodeDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = {
            userId: this.userId,
            code: this.code,
            password: this.password
        };
        this.ngRestoUserService
            .resetPasswordCode(data)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.success.emit(true); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    ResetPasswordCodeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appResetPasswordCode]'
                },] },
    ];
    ResetPasswordCodeDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    ResetPasswordCodeDirective.propDecorators = {
        userId: [{ type: Input }],
        code: [{ type: Input }],
        password: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return ResetPasswordCodeDirective;
}());
export { ResetPasswordCodeDirective };
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
    /**
     * @type {?}
     * @private
     */
    ResetPasswordCodeDirective.prototype.ngRestoUserService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQtY29kZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctdXNlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLWNvZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUt2RTtJQVdFLG9DQUNVLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBSnRDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBSXpDLENBQUM7Ozs7SUFHTCw0Q0FBTzs7O0lBRFA7UUFBQSxpQkFhQzs7WUFYSyxJQUFJLEdBQWdDO1lBQ3RDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEI7UUFDRCxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGlCQUFpQixDQUFDLElBQUksQ0FBQzthQUN2QixTQUFTOzs7UUFDUixjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQXZCLENBQXVCOzs7O1FBQzdCLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXRCLENBQXNCLEVBQ2hDLENBQUM7SUFDTixDQUFDOztnQkE1QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7aUJBQ25DOzs7Z0JBUFEsa0JBQWtCOzs7eUJBVXhCLEtBQUs7dUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLE1BQU07d0JBQ04sTUFBTTswQkFNTixZQUFZLFNBQUMsT0FBTzs7SUFldkIsaUNBQUM7Q0FBQSxBQTlCRCxJQThCQztTQTNCWSwwQkFBMEI7OztJQUVyQyw0Q0FBdUI7O0lBQ3ZCLDBDQUFxQjs7SUFDckIsOENBQXlCOztJQUN6Qiw2Q0FBZ0Q7O0lBQ2hELDJDQUE2Qzs7Ozs7SUFHM0Msd0RBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvZGVSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtY29kZS1yZXF1ZXN0LWRhdGEnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBSZXNldFBhc3N3b3JkQ29kZV0nXG59KVxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmRDb2RlRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSB1c2VySWQ6c3RyaW5nO1xuICBASW5wdXQoKSBjb2RlOnN0cmluZztcbiAgQElucHV0KCkgcGFzc3dvcmQ6c3RyaW5nO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhID0ge1xuICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXG4gICAgfTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnJlc2V0UGFzc3dvcmRDb2RlKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG59XG4iXX0=