/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
            .subscribe(function (favorites) {
            _this.inFavorites = favorites.find(function (dish) { return dish.id == _this.dish.id; });
            if (_this.inFavorites) {
                _this.renderer.addClass(_this.element.nativeElement, 'selected');
            }
            else {
                _this.renderer.removeClass(_this.element.nativeElement, 'selected');
            }
        });
        this.ngRestoUserService
            .userIsLoggedIn()
            .subscribe(function (result) { return _this.isLoggedIn = result; });
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
            .subscribe(function () {
            _this.addedToFavorites.emit();
            _this.change.emit(true);
            _this.renderer.addClass(_this.element.nativeElement, 'selected');
        }, function (error) { return _this.error.emit(error); });
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
            .subscribe(function () {
            _this.removedFromFavorites.emit();
            _this.change.emit(false);
            _this.renderer.removeClass(_this.element.nativeElement, 'selected');
        }, function (error) { return _this.error.emit(error); });
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
    /** @type {?} */
    ToggleDishToFavoritesDirective.prototype.ngRestoUserService;
    /** @type {?} */
    ToggleDishToFavoritesDirective.prototype.element;
    /** @type {?} */
    ToggleDishToFavoritesDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B3ZWJyZXN0by9uZy11c2VyLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvdG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUM5QixNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQzVDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBS3ZFO0lBY0Usd0NBQ1Usa0JBQXNDLEVBQ3RDLE9BQW1CLEVBQ25CLFFBQW1CO1FBRm5CLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBWG5CLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDNUMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNoRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNyQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQVMxQyxDQUFDOzs7O0lBRUosaURBQVE7OztJQUFSO1FBQUEsaUJBZ0JDO1FBZkMsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixhQUFhLEVBQUU7YUFDZixTQUFTLENBQUMsVUFBQSxTQUFTO1lBRWxCLEtBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxFQUFFLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQXZCLENBQXVCLENBQUMsQ0FBQztZQUVuRSxJQUFHLEtBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFBO2FBQy9EO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ25FO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGNBQWMsRUFBRTthQUNoQixTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7SUFHRCxnREFBTzs7O0lBRFA7UUFFRSxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztJQUVELDJEQUFrQjs7O0lBQWxCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDN0IsU0FBUyxDQUNSO1lBQ0UsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsRUFDRCxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF0QixDQUFzQixDQUNoQyxDQUFBO0lBQ0wsQ0FBQzs7OztJQUVELGdFQUF1Qjs7O0lBQXZCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEMsU0FBUyxDQUNSO1lBQ0UsS0FBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsRUFDRCxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF0QixDQUFzQixDQUNoQyxDQUFBO0lBQ0wsQ0FBQzs7Z0JBdkVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2lCQUN2Qzs7O2dCQVBRLGtCQUFrQjtnQkFGSCxVQUFVO2dCQUFFLFNBQVM7Ozt1QkFZMUMsS0FBSzttQ0FDTCxNQUFNO3VDQUNOLE1BQU07eUJBQ04sTUFBTTt3QkFDTixNQUFNOzBCQTZCTixZQUFZLFNBQUMsT0FBTzs7SUFtQ3ZCLHFDQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0F0RVksOEJBQThCOzs7SUFFekMsOENBQWtCOztJQUNsQiwwREFBc0Q7O0lBQ3RELDhEQUEwRDs7SUFDMUQsZ0RBQStDOztJQUMvQywrQ0FBNkM7O0lBRTdDLHFEQUFxQjs7SUFDckIsb0RBQW9COztJQUdsQiw0REFBOEM7O0lBQzlDLGlEQUEyQjs7SUFDM0Isa0RBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LFxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FkZC1kaXNoLXRvLWZhdm9yaXRlcy1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUmVtb3ZlRGlzaEZyb21GYXZvcml0ZXNSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVtb3ZlLWRpc2gtZnJvbS1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFRvZ2dsZURpc2hUb0Zhdm9yaXRlc10nXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBPdXRwdXQoKSBhZGRlZFRvRmF2b3JpdGVzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVtb3ZlZEZyb21GYXZvcml0ZXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGluRmF2b3JpdGVzOiBib29sZWFuO1xuICBpc0xvZ2dlZEluOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC51c2VyRmF2b3JpdGVzKClcbiAgICAgIC5zdWJzY3JpYmUoZmF2b3JpdGVzID0+IHtcblxuICAgICAgICB0aGlzLmluRmF2b3JpdGVzID0gZmF2b3JpdGVzLmZpbmQoZGlzaCA9PiBkaXNoLmlkID09IHRoaXMuZGlzaC5pZCk7XG5cbiAgICAgICAgaWYodGhpcy5pbkZhdm9yaXRlcykge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAudXNlcklzTG9nZ2VkSW4oKVxuICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4gdGhpcy5pc0xvZ2dlZEluID0gcmVzdWx0KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZih0aGlzLmluRmF2b3JpdGVzKSB7XG4gICAgICB0aGlzLnJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkRGlzaFRvRmF2b3JpdGVzKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlzaFRvRmF2b3JpdGVzKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuYWRkRGlzaFRvRmF2b3JpdGVzKHRoaXMuZGlzaClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZGVkVG9GYXZvcml0ZXMuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgIClcbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAucmVtb3ZlRGlzaEZyb21GYXZvcml0ZXModGhpcy5kaXNoKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlZEZyb21GYXZvcml0ZXMuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApXG4gIH1cblxufVxuIl19