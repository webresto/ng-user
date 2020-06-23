/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            .subscribe((/**
         * @return {?}
         */
        () => this.success.emit(true)), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.error.emit(error)));
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
    /**
     * @type {?}
     * @private
     */
    AddAddressDirective.prototype.ngRestoUserService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9hZGQtYWRkcmVzcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBT3ZFLE1BQU07Ozs7SUFlSixZQUNVLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBSnRDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBSXpDLENBQUM7Ozs7SUFHTCxPQUFPO1FBQ0wsSUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUNyRDtRQUNELElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUFDLE9BQU87U0FDMUQ7O1lBRUcsSUFBSSxHQUF5QjtZQUMvQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFO1lBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTtZQUM3QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUU7WUFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTtTQUNoQztRQUNELElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsVUFBVSxDQUFDLElBQUksQ0FBQzthQUNoQixTQUFTOzs7UUFDUixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7UUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFDaEMsQ0FBQztJQUNOLENBQUM7OztZQWhERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjthQUM1Qjs7O1lBTlEsa0JBQWtCOzs7cUJBU3hCLEtBQUs7bUJBQ0wsS0FBSzttQkFDTCxLQUFLO3NCQUNMLEtBQUs7b0JBQ0wsS0FBSzt1QkFDTCxLQUFLO29CQUNMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3NCQUVMLE1BQU07b0JBQ04sTUFBTTtzQkFNTixZQUFZLFNBQUMsT0FBTzs7OztJQWpCckIscUNBQXVCOztJQUN2QixtQ0FBcUI7O0lBQ3JCLG1DQUFxQjs7SUFDckIsc0NBQXdCOztJQUN4QixvQ0FBc0I7O0lBQ3RCLHVDQUF5Qjs7SUFDekIsb0NBQXNCOztJQUN0Qix3Q0FBMEI7O0lBQzFCLHdDQUEwQjs7SUFFMUIsc0NBQWdEOztJQUNoRCxvQ0FBNkM7Ozs7O0lBRzNDLGlEQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IEFkZEFkZHJlc3NSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvYWRkLWFkZHJlc3MtcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcEFkZEFkZHJlc3NdJ1xufSlcbmV4cG9ydCBjbGFzcyBBZGRBZGRyZXNzRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBzdHJlZXQ6c3RyaW5nOyAgICAgLy9yZXF1aXJlZFxuICBASW5wdXQoKSBob21lOnN0cmluZzsgICAgICAgLy9yZXF1aXJlZFxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcbiAgQElucHV0KCkgaG91c2luZzpzdHJpbmc7XG4gIEBJbnB1dCgpIGluZGV4OnN0cmluZztcbiAgQElucHV0KCkgZW50cmFuY2U6c3RyaW5nO1xuICBASW5wdXQoKSBmbG9vcjpzdHJpbmc7XG4gIEBJbnB1dCgpIGFwYXJ0bWVudDpzdHJpbmc7XG4gIEBJbnB1dCgpIGRvb3JwaG9uZTpzdHJpbmc7XG5cbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgaWYoIXRoaXMuc3RyZWV0KSB7XG4gICAgICB0aGlzLmVycm9yLmVtaXQoJ9Cd0LXQvtCx0YXQvtC00LjQvNC+INGD0LrQsNC30LDRgtGMINGD0LvQuNGG0YMnKTsgcmV0dXJuO1xuICAgIH1cbiAgICBpZighdGhpcy5ob21lKSB7XG4gICAgICB0aGlzLmVycm9yLmVtaXQoJ9Cd0LXQvtCx0YXQvtC00LjQvNC+INGD0LrQsNC30LDRgtGMINC90L7QvNC10YAg0LTQvtC80LAnKTsgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBkYXRhOkFkZEFkZHJlc3NSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIHN0cmVldDogdGhpcy5zdHJlZXQsXG4gICAgICBob21lOiB0aGlzLmhvbWUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUgfHwgJycsXG4gICAgICBob3VzaW5nOiB0aGlzLmhvdXNpbmcgfHwgJycsXG4gICAgICBpbmRleDogdGhpcy5pbmRleCB8fCAnJyxcbiAgICAgIGVudHJhbmNlOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxuICAgICAgZmxvb3I6IHRoaXMuZmxvb3IgfHwgJycsXG4gICAgICBhcGFydG1lbnQ6IHRoaXMuYXBhcnRtZW50IHx8ICcnLFxuICAgICAgZG9vcnBob25lOiB0aGlzLmRvb3JwaG9uZSB8fCAnJ1xuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5hZGRBZGRyZXNzKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxufVxuIl19