/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
var DeleteAddressDirective = /** @class */ (function () {
    function DeleteAddressDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    DeleteAddressDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngRestoUserService
            .deleteAddress(this.address)
            .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
    };
    DeleteAddressDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appDeleteAddress]'
                },] },
    ];
    DeleteAddressDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    DeleteAddressDirective.propDecorators = {
        address: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return DeleteAddressDirective;
}());
export { DeleteAddressDirective };
if (false) {
    /** @type {?} */
    DeleteAddressDirective.prototype.address;
    /** @type {?} */
    DeleteAddressDirective.prototype.success;
    /** @type {?} */
    DeleteAddressDirective.prototype.error;
    /** @type {?} */
    DeleteAddressDirective.prototype.ngRestoUserService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9kZWxldGUtYWRkcmVzcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBS3ZFO0lBVUUsZ0NBQ1Usa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFKdEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFJekMsQ0FBQzs7OztJQUdMLHdDQUFPOzs7SUFEUDtRQUFBLGlCQVFDO1FBTkMsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUMzQixTQUFTLENBQ1IsY0FBTSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUF2QixDQUF1QixFQUM3QixVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF0QixDQUFzQixDQUNoQyxDQUFDO0lBQ04sQ0FBQzs7Z0JBdEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2lCQUMvQjs7O2dCQVBRLGtCQUFrQjs7OzBCQVV4QixLQUFLOzBCQUVMLE1BQU07d0JBQ04sTUFBTTswQkFNTixZQUFZLFNBQUMsT0FBTzs7SUFTdkIsNkJBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQXBCWSxzQkFBc0I7OztJQUVqQyx5Q0FBeUI7O0lBRXpCLHlDQUFnRDs7SUFDaEQsdUNBQTZDOztJQUczQyxvREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2FkZHJlc3NcIjtcblxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBEZWxldGVBZGRyZXNzXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVsZXRlQWRkcmVzc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgYWRkcmVzczpBZGRyZXNzO1xuXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuZGVsZXRlQWRkcmVzcyh0aGlzLmFkZHJlc3MpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxufVxuIl19