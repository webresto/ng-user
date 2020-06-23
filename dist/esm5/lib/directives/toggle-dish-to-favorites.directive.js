/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
var ToggleDishToFavoritesDirective = /** @class */ (function () {
    function ToggleDishToFavoritesDirective(ngRestoUserService, element, renderer) {
        this.ngRestoUserService = ngRestoUserService;
        this.element = element;
        this.renderer = renderer;
        this.addedToFavorites = new EventEmitter();
        this.removedFromFavorites = new EventEmitter();
        this.change = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ToggleDishToFavoritesDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngRestoUserService
            .userFavorites()
            .subscribe((/**
         * @param {?} favorites
         * @return {?}
         */
        function (favorites) {
            _this.inFavorites = favorites.find((/**
             * @param {?} dish
             * @return {?}
             */
            function (dish) { return dish.id == _this.dish.id; }));
            if (_this.inFavorites) {
                _this.renderer.addClass(_this.element.nativeElement, 'selected');
            }
            else {
                _this.renderer.removeClass(_this.element.nativeElement, 'selected');
            }
        }));
        this.ngRestoUserService
            .userIsLoggedIn()
            .subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) { return _this.isLoggedIn = result; }));
    };
    /**
     * @return {?}
     */
    ToggleDishToFavoritesDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        if (this.inFavorites) {
            this.removeDishFromFavorites();
        }
        else {
            this.addDishToFavorites();
        }
    };
    /**
     * @return {?}
     */
    ToggleDishToFavoritesDirective.prototype.addDishToFavorites = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngRestoUserService
            .addDishToFavorites(this.dish)
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.addedToFavorites.emit();
            _this.change.emit(true);
            _this.renderer.addClass(_this.element.nativeElement, 'selected');
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    /**
     * @return {?}
     */
    ToggleDishToFavoritesDirective.prototype.removeDishFromFavorites = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngRestoUserService
            .removeDishFromFavorites(this.dish)
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.removedFromFavorites.emit();
            _this.change.emit(false);
            _this.renderer.removeClass(_this.element.nativeElement, 'selected');
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    ToggleDishToFavoritesDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appToggleDishToFavorites]'
                },] },
    ];
    ToggleDishToFavoritesDirective.ctorParameters = function () { return [
        { type: NgRestoUserService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ToggleDishToFavoritesDirective.propDecorators = {
        dish: [{ type: Input }],
        addedToFavorites: [{ type: Output }],
        removedFromFavorites: [{ type: Output }],
        change: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return ToggleDishToFavoritesDirective;
}());
export { ToggleDishToFavoritesDirective };
if (false) {
    /** @type {?} */
    ToggleDishToFavoritesDirective.prototype.dish;
    /** @type {?} */
    ToggleDishToFavoritesDirective.prototype.addedToFavorites;
    /** @type {?} */
    ToggleDishToFavoritesDirective.prototype.removedFromFavorites;
    /** @type {?} */
    ToggleDishToFavoritesDirective.prototype.change;
    /** @type {?} */
    ToggleDishToFavoritesDirective.prototype.error;
    /** @type {?} */
    ToggleDishToFavoritesDirective.prototype.inFavorites;
    /** @type {?} */
    ToggleDishToFavoritesDirective.prototype.isLoggedIn;
    /**
     * @type {?}
     * @private
     */
    ToggleDishToFavoritesDirective.prototype.ngRestoUserService;
    /**
     * @type {?}
     * @private
     */
    ToggleDishToFavoritesDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    ToggleDishToFavoritesDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B3ZWJyZXN0by9uZy11c2VyLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvdG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUM5QixNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQzVDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBS3ZFO0lBY0Usd0NBQ1Usa0JBQXNDLEVBQ3RDLE9BQW1CLEVBQ25CLFFBQW1CO1FBRm5CLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBWG5CLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDNUMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNoRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNyQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQVMxQyxDQUFDOzs7O0lBRUosaURBQVE7OztJQUFSO1FBQUEsaUJBZ0JDO1FBZkMsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixhQUFhLEVBQUU7YUFDZixTQUFTOzs7O1FBQUMsVUFBQSxTQUFTO1lBRWxCLEtBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUk7Ozs7WUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxFQUFFLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQXZCLENBQXVCLEVBQUMsQ0FBQztZQUVuRSxJQUFHLEtBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFBO2FBQy9EO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ25FO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGNBQWMsRUFBRTthQUNoQixTQUFTOzs7O1FBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sRUFBeEIsQ0FBd0IsRUFBQyxDQUFDO0lBQ25ELENBQUM7Ozs7SUFHRCxnREFBTzs7O0lBRFA7UUFFRSxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztJQUVELDJEQUFrQjs7O0lBQWxCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDN0IsU0FBUzs7O1FBQ1I7WUFDRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakUsQ0FBQzs7OztRQUNELFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXRCLENBQXNCLEVBQ2hDLENBQUE7SUFDTCxDQUFDOzs7O0lBRUQsZ0VBQXVCOzs7SUFBdkI7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNsQyxTQUFTOzs7UUFDUjtZQUNFLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRSxDQUFDOzs7O1FBQ0QsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBdEIsQ0FBc0IsRUFDaEMsQ0FBQTtJQUNMLENBQUM7O2dCQXZFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtpQkFDdkM7OztnQkFQUSxrQkFBa0I7Z0JBRkgsVUFBVTtnQkFBRSxTQUFTOzs7dUJBWTFDLEtBQUs7bUNBQ0wsTUFBTTt1Q0FDTixNQUFNO3lCQUNOLE1BQU07d0JBQ04sTUFBTTswQkE2Qk4sWUFBWSxTQUFDLE9BQU87O0lBbUN2QixxQ0FBQztDQUFBLEFBekVELElBeUVDO1NBdEVZLDhCQUE4Qjs7O0lBRXpDLDhDQUFrQjs7SUFDbEIsMERBQXNEOztJQUN0RCw4REFBMEQ7O0lBQzFELGdEQUErQzs7SUFDL0MsK0NBQTZDOztJQUU3QyxxREFBcUI7O0lBQ3JCLG9EQUFvQjs7Ozs7SUFHbEIsNERBQThDOzs7OztJQUM5QyxpREFBMkI7Ozs7O0lBQzNCLGtEQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCxcbiAgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IEFkZERpc2hUb0Zhdm9yaXRlc1JlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hZGQtZGlzaC10by1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlbW92ZURpc2hGcm9tRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbW92ZS1kaXNoLWZyb20tZmF2b3JpdGVzLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBUb2dnbGVEaXNoVG9GYXZvcml0ZXNdJ1xufSlcbmV4cG9ydCBjbGFzcyBUb2dnbGVEaXNoVG9GYXZvcml0ZXNEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIGRpc2g6YW55O1xuICBAT3V0cHV0KCkgYWRkZWRUb0Zhdm9yaXRlcyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlbW92ZWRGcm9tRmF2b3JpdGVzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBpbkZhdm9yaXRlczogYm9vbGVhbjtcbiAgaXNMb2dnZWRJbjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAudXNlckZhdm9yaXRlcygpXG4gICAgICAuc3Vic2NyaWJlKGZhdm9yaXRlcyA9PiB7XG5cbiAgICAgICAgdGhpcy5pbkZhdm9yaXRlcyA9IGZhdm9yaXRlcy5maW5kKGRpc2ggPT4gZGlzaC5pZCA9PSB0aGlzLmRpc2guaWQpO1xuXG4gICAgICAgIGlmKHRoaXMuaW5GYXZvcml0ZXMpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnVzZXJJc0xvZ2dlZEluKClcbiAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHRoaXMuaXNMb2dnZWRJbiA9IHJlc3VsdCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgaWYodGhpcy5pbkZhdm9yaXRlcykge1xuICAgICAgdGhpcy5yZW1vdmVEaXNoRnJvbUZhdm9yaXRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZERpc2hUb0Zhdm9yaXRlcygpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpc2hUb0Zhdm9yaXRlcygpIHtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLmFkZERpc2hUb0Zhdm9yaXRlcyh0aGlzLmRpc2gpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRlZFRvRmF2b3JpdGVzLmVtaXQoKTtcbiAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApXG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUZhdm9yaXRlcygpIHtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKHRoaXMuZGlzaClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlbW92ZWRGcm9tRmF2b3JpdGVzLmVtaXQoKTtcbiAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKVxuICB9XG5cbn1cbiJdfQ==