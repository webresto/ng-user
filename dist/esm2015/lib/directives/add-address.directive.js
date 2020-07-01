/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export class AddAddressDirective {
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
        if (!this.street) {
            this.error.emit('Необходимо указать улицу');
            return;
        }
        if (!this.home) {
            this.error.emit('Необходимо указать номер дома');
            return;
        }
        /** @type {?} */
        let data = {
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
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
AddAddressDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appAddAddress]'
            },] },
];
AddAddressDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9hZGQtYWRkcmVzcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBT3ZFLE1BQU07Ozs7SUFlSixZQUNVLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBSnRDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBSXpDLENBQUM7Ozs7SUFHTCxPQUFPO1FBQ0wsSUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUNyRDtRQUNELElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUFDLE9BQU87U0FDMUQ7O1lBRUcsSUFBSSxHQUF5QjtZQUMvQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFO1lBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTtZQUM3QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUU7WUFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTtTQUNoQztRQUNELElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsVUFBVSxDQUFDLElBQUksQ0FBQzthQUNoQixTQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7SUFDTixDQUFDOzs7WUFoREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7YUFDNUI7OztZQU5RLGtCQUFrQjs7O3FCQVN4QixLQUFLO21CQUNMLEtBQUs7bUJBQ0wsS0FBSztzQkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSztzQkFFTCxNQUFNO29CQUNOLE1BQU07c0JBTU4sWUFBWSxTQUFDLE9BQU87Ozs7SUFqQnJCLHFDQUF1Qjs7SUFDdkIsbUNBQXFCOztJQUNyQixtQ0FBcUI7O0lBQ3JCLHNDQUF3Qjs7SUFDeEIsb0NBQXNCOztJQUN0Qix1Q0FBeUI7O0lBQ3pCLG9DQUFzQjs7SUFDdEIsd0NBQTBCOztJQUMxQix3Q0FBMEI7O0lBRTFCLHNDQUFnRDs7SUFDaEQsb0NBQTZDOztJQUczQyxpREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBBZGRBZGRyZXNzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FkZC1hZGRyZXNzLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBBZGRBZGRyZXNzXSdcbn0pXG5leHBvcnQgY2xhc3MgQWRkQWRkcmVzc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgc3RyZWV0OnN0cmluZzsgICAgIC8vcmVxdWlyZWRcbiAgQElucHV0KCkgaG9tZTpzdHJpbmc7ICAgICAgIC8vcmVxdWlyZWRcbiAgQElucHV0KCkgbmFtZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGhvdXNpbmc6c3RyaW5nO1xuICBASW5wdXQoKSBpbmRleDpzdHJpbmc7XG4gIEBJbnB1dCgpIGVudHJhbmNlOnN0cmluZztcbiAgQElucHV0KCkgZmxvb3I6c3RyaW5nO1xuICBASW5wdXQoKSBhcGFydG1lbnQ6c3RyaW5nO1xuICBASW5wdXQoKSBkb29ycGhvbmU6c3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmKCF0aGlzLnN0cmVldCkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDRg9C70LjRhtGDJyk7IHJldHVybjtcbiAgICB9XG4gICAgaWYoIXRoaXMuaG9tZSkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDQvdC+0LzQtdGAINC00L7QvNCwJyk7IHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YTpBZGRBZGRyZXNzUmVxdWVzdERhdGEgPSB7XG4gICAgICBzdHJlZXQ6IHRoaXMuc3RyZWV0LFxuICAgICAgaG9tZTogdGhpcy5ob21lLFxuICAgICAgbmFtZTogdGhpcy5uYW1lIHx8ICcnLFxuICAgICAgaG91c2luZzogdGhpcy5ob3VzaW5nIHx8ICcnLFxuICAgICAgaW5kZXg6IHRoaXMuaW5kZXggfHwgJycsXG4gICAgICBlbnRyYW5jZTogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgIGZsb29yOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgYXBhcnRtZW50OiB0aGlzLmFwYXJ0bWVudCB8fCAnJyxcbiAgICAgIGRvb3JwaG9uZTogdGhpcy5kb29ycGhvbmUgfHwgJydcbiAgICB9O1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuYWRkQWRkcmVzcyhkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==