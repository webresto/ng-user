/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export class ToggleDishToFavoritesDirective {
    /**
     * @param {?} ngRestoUserService
     * @param {?} element
     * @param {?} renderer
     */
    constructor(ngRestoUserService, element, renderer) {
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
    ngOnInit() {
        this.ngRestoUserService
            .userFavorites()
            .subscribe(favorites => {
            this.inFavorites = favorites.find(dish => dish.id == this.dish.id);
            if (this.inFavorites) {
                this.renderer.addClass(this.element.nativeElement, 'selected');
            }
            else {
                this.renderer.removeClass(this.element.nativeElement, 'selected');
            }
        });
        this.ngRestoUserService
            .userIsLoggedIn()
            .subscribe(result => this.isLoggedIn = result);
    }
    /**
     * @return {?}
     */
    onClick() {
        if (this.inFavorites) {
            this.removeDishFromFavorites();
        }
        else {
            this.addDishToFavorites();
        }
    }
    /**
     * @return {?}
     */
    addDishToFavorites() {
        this.ngRestoUserService
            .addDishToFavorites(this.dish)
            .subscribe(() => {
            this.addedToFavorites.emit();
            this.change.emit(true);
            this.renderer.addClass(this.element.nativeElement, 'selected');
        }, error => this.error.emit(error));
    }
    /**
     * @return {?}
     */
    removeDishFromFavorites() {
        this.ngRestoUserService
            .removeDishFromFavorites(this.dish)
            .subscribe(() => {
            this.removedFromFavorites.emit();
            this.change.emit(false);
            this.renderer.removeClass(this.element.nativeElement, 'selected');
        }, error => this.error.emit(error));
    }
}
ToggleDishToFavoritesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appToggleDishToFavorites]'
            },] },
];
/** @nocollapse */
ToggleDishToFavoritesDirective.ctorParameters = () => [
    { type: NgRestoUserService },
    { type: ElementRef },
    { type: Renderer2 }
];
ToggleDishToFavoritesDirective.propDecorators = {
    dish: [{ type: Input }],
    addedToFavorites: [{ type: Output }],
    removedFromFavorites: [{ type: Output }],
    change: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzYWlscy1yZXN0by9uZy11c2VyLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvdG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUM5QixNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQzVDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBUXZFLE1BQU07Ozs7OztJQVdKLFlBQ1Usb0JBQ0EsU0FDQTtRQUZBLHVCQUFrQixHQUFsQixrQkFBa0I7UUFDbEIsWUFBTyxHQUFQLE9BQU87UUFDUCxhQUFRLEdBQVIsUUFBUTtnQ0FYVyxJQUFJLFlBQVksRUFBUTtvQ0FDcEIsSUFBSSxZQUFZLEVBQVE7c0JBQ3RDLElBQUksWUFBWSxFQUFXO3FCQUM1QixJQUFJLFlBQVksRUFBVTtLQVN4Qzs7OztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGFBQWEsRUFBRTthQUNmLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUVyQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFbkUsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQTthQUMvRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNuRTtTQUNGLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsY0FBYyxFQUFFO2FBQ2hCLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUM7S0FDbEQ7Ozs7SUFHRCxPQUFPO1FBQ0wsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25CLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2hDO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtLQUNGOzs7O0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM3QixTQUFTLENBQ1IsR0FBRyxFQUFFO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2hFLEVBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDaEMsQ0FBQTtLQUNKOzs7O0lBRUQsdUJBQXVCO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNsQyxTQUFTLENBQ1IsR0FBRyxFQUFFO1lBQ0gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ25FLEVBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDaEMsQ0FBQTtLQUNKOzs7WUF2RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7YUFDdkM7Ozs7WUFQUSxrQkFBa0I7WUFGSCxVQUFVO1lBQUUsU0FBUzs7O21CQVkxQyxLQUFLOytCQUNMLE1BQU07bUNBQ04sTUFBTTtxQkFDTixNQUFNO29CQUNOLE1BQU07c0JBNkJOLFlBQVksU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LFxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FkZC1kaXNoLXRvLWZhdm9yaXRlcy1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUmVtb3ZlRGlzaEZyb21GYXZvcml0ZXNSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVtb3ZlLWRpc2gtZnJvbS1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFRvZ2dsZURpc2hUb0Zhdm9yaXRlc10nXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBPdXRwdXQoKSBhZGRlZFRvRmF2b3JpdGVzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVtb3ZlZEZyb21GYXZvcml0ZXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGluRmF2b3JpdGVzOiBib29sZWFuO1xuICBpc0xvZ2dlZEluOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC51c2VyRmF2b3JpdGVzKClcbiAgICAgIC5zdWJzY3JpYmUoZmF2b3JpdGVzID0+IHtcblxuICAgICAgICB0aGlzLmluRmF2b3JpdGVzID0gZmF2b3JpdGVzLmZpbmQoZGlzaCA9PiBkaXNoLmlkID09IHRoaXMuZGlzaC5pZCk7XG5cbiAgICAgICAgaWYodGhpcy5pbkZhdm9yaXRlcykge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAudXNlcklzTG9nZ2VkSW4oKVxuICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4gdGhpcy5pc0xvZ2dlZEluID0gcmVzdWx0KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZih0aGlzLmluRmF2b3JpdGVzKSB7XG4gICAgICB0aGlzLnJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkRGlzaFRvRmF2b3JpdGVzKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlzaFRvRmF2b3JpdGVzKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuYWRkRGlzaFRvRmF2b3JpdGVzKHRoaXMuZGlzaClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZGVkVG9GYXZvcml0ZXMuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgIClcbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAucmVtb3ZlRGlzaEZyb21GYXZvcml0ZXModGhpcy5kaXNoKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlZEZyb21GYXZvcml0ZXMuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApXG4gIH1cblxufVxuIl19