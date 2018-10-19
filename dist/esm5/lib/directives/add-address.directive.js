/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
var AddAddressDirective = /** @class */ (function () {
    function AddAddressDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    AddAddressDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.street) {
            this.error.emit('Необходимо указать улицу');
            return;
        }
        if (!this.home) {
            this.error.emit('Необходимо указать номер дома');
            return;
        }
        /** @type {?} */
        var data = {
            street: this.street,
            home: this.home,
            name: this.name || '',
            housing: this.housing || '',
            index: this.index || '',
            entrance: this.entrance || '',
            floor: this.floor || '',
            apartment: this.apartment || '',
            doorphone: this.doorphone || ''
        };
        this.ngRestoUserService
            .addAddress(data)
            .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
    };
    AddAddressDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appAddAddress]'
                },] },
    ];
    /** @nocollapse */
    AddAddressDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    AddAddressDirective.propDecorators = {
        street: [{ type: Input }],
        home: [{ type: Input }],
        name: [{ type: Input }],
        housing: [{ type: Input }],
        index: [{ type: Input }],
        entrance: [{ type: Input }],
        floor: [{ type: Input }],
        apartment: [{ type: Input }],
        doorphone: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return AddAddressDirective;
}());
export { AddAddressDirective };
if (false) {
    /** @type {?} */
    AddAddressDirective.prototype.street;
    /** @type {?} */
    AddAddressDirective.prototype.home;
    /** @type {?} */
    AddAddressDirective.prototype.name;
    /** @type {?} */
    AddAddressDirective.prototype.housing;
    /** @type {?} */
    AddAddressDirective.prototype.index;
    /** @type {?} */
    AddAddressDirective.prototype.entrance;
    /** @type {?} */
    AddAddressDirective.prototype.floor;
    /** @type {?} */
    AddAddressDirective.prototype.apartment;
    /** @type {?} */
    AddAddressDirective.prototype.doorphone;
    /** @type {?} */
    AddAddressDirective.prototype.success;
    /** @type {?} */
    AddAddressDirective.prototype.error;
    /** @type {?} */
    AddAddressDirective.prototype.ngRestoUserService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNhaWxzLXJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9hZGQtYWRkcmVzcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztJQXNCckUsNkJBQ1U7UUFBQSx1QkFBa0IsR0FBbEIsa0JBQWtCO3VCQUpSLElBQUksWUFBWSxFQUFXO3FCQUM3QixJQUFJLFlBQVksRUFBVTtLQUl2Qzs7OztJQUdMLHFDQUFPOzs7SUFEUDtRQUFBLGlCQTBCQztRQXhCQyxJQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFBQyxPQUFPO1NBQ3JEO1FBQ0QsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUMxRDs7UUFFRCxJQUFJLElBQUksR0FBeUI7WUFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRTtZQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUU7WUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFO1lBQy9CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUU7U0FDaEMsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsVUFBVSxDQUFDLElBQUksQ0FBQzthQUNoQixTQUFTLENBQ1IsY0FBTSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUF2QixDQUF1QixFQUM3QixVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF0QixDQUFzQixDQUNoQyxDQUFDO0tBQ0w7O2dCQWhERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7Ozs7Z0JBTlEsa0JBQWtCOzs7eUJBU3hCLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLO3dCQUNMLEtBQUs7NEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUVMLE1BQU07d0JBQ04sTUFBTTswQkFNTixZQUFZLFNBQUMsT0FBTzs7OEJBM0J2Qjs7U0FRYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBBZGRBZGRyZXNzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FkZC1hZGRyZXNzLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBBZGRBZGRyZXNzXSdcbn0pXG5leHBvcnQgY2xhc3MgQWRkQWRkcmVzc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgc3RyZWV0OnN0cmluZzsgICAgIC8vcmVxdWlyZWRcbiAgQElucHV0KCkgaG9tZTpzdHJpbmc7ICAgICAgIC8vcmVxdWlyZWRcbiAgQElucHV0KCkgbmFtZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGhvdXNpbmc6c3RyaW5nO1xuICBASW5wdXQoKSBpbmRleDpzdHJpbmc7XG4gIEBJbnB1dCgpIGVudHJhbmNlOnN0cmluZztcbiAgQElucHV0KCkgZmxvb3I6c3RyaW5nO1xuICBASW5wdXQoKSBhcGFydG1lbnQ6c3RyaW5nO1xuICBASW5wdXQoKSBkb29ycGhvbmU6c3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmKCF0aGlzLnN0cmVldCkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDRg9C70LjRhtGDJyk7IHJldHVybjtcbiAgICB9XG4gICAgaWYoIXRoaXMuaG9tZSkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDQvdC+0LzQtdGAINC00L7QvNCwJyk7IHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YTpBZGRBZGRyZXNzUmVxdWVzdERhdGEgPSB7XG4gICAgICBzdHJlZXQ6IHRoaXMuc3RyZWV0LFxuICAgICAgaG9tZTogdGhpcy5ob21lLFxuICAgICAgbmFtZTogdGhpcy5uYW1lIHx8ICcnLFxuICAgICAgaG91c2luZzogdGhpcy5ob3VzaW5nIHx8ICcnLFxuICAgICAgaW5kZXg6IHRoaXMuaW5kZXggfHwgJycsXG4gICAgICBlbnRyYW5jZTogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgIGZsb29yOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgYXBhcnRtZW50OiB0aGlzLmFwYXJ0bWVudCB8fCAnJyxcbiAgICAgIGRvb3JwaG9uZTogdGhpcy5kb29ycGhvbmUgfHwgJydcbiAgICB9O1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuYWRkQWRkcmVzcyhkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==