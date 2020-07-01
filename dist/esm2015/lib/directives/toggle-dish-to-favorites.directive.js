/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B3ZWJyZXN0by9uZy11c2VyLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvdG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUM5QixNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQzVDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBUXZFLE1BQU07Ozs7OztJQVdKLFlBQ1Usa0JBQXNDLEVBQ3RDLE9BQW1CLEVBQ25CLFFBQW1CO1FBRm5CLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBWG5CLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDNUMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNoRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNyQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQVMxQyxDQUFDOzs7O0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsYUFBYSxFQUFFO2FBQ2YsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBRXJCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVuRSxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFBO2FBQy9EO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ25FO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGNBQWMsRUFBRTthQUNoQixTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7SUFHRCxPQUFPO1FBQ0wsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25CLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2hDO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzdCLFNBQVMsQ0FDUixHQUFHLEVBQUU7WUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakUsQ0FBQyxFQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUE7SUFDTCxDQUFDOzs7O0lBRUQsdUJBQXVCO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNsQyxTQUFTLENBQ1IsR0FBRyxFQUFFO1lBQ0gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsRUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNoQyxDQUFBO0lBQ0wsQ0FBQzs7O1lBdkVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2FBQ3ZDOzs7WUFQUSxrQkFBa0I7WUFGSCxVQUFVO1lBQUUsU0FBUzs7O21CQVkxQyxLQUFLOytCQUNMLE1BQU07bUNBQ04sTUFBTTtxQkFDTixNQUFNO29CQUNOLE1BQU07c0JBNkJOLFlBQVksU0FBQyxPQUFPOzs7O0lBakNyQiw4Q0FBa0I7O0lBQ2xCLDBEQUFzRDs7SUFDdEQsOERBQTBEOztJQUMxRCxnREFBK0M7O0lBQy9DLCtDQUE2Qzs7SUFFN0MscURBQXFCOztJQUNyQixvREFBb0I7O0lBR2xCLDREQUE4Qzs7SUFDOUMsaURBQTJCOztJQUMzQixrREFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsXG4gIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBBZGREaXNoVG9GYXZvcml0ZXNSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvYWRkLWRpc2gtdG8tZmF2b3JpdGVzLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBSZW1vdmVEaXNoRnJvbUZhdm9yaXRlc1JlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW1vdmUtZGlzaC1mcm9tLWZhdm9yaXRlcy1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwVG9nZ2xlRGlzaFRvRmF2b3JpdGVzXSdcbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBkaXNoOmFueTtcbiAgQE91dHB1dCgpIGFkZGVkVG9GYXZvcml0ZXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZW1vdmVkRnJvbUZhdm9yaXRlcyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgaW5GYXZvcml0ZXM6IGJvb2xlYW47XG4gIGlzTG9nZ2VkSW46IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnVzZXJGYXZvcml0ZXMoKVxuICAgICAgLnN1YnNjcmliZShmYXZvcml0ZXMgPT4ge1xuXG4gICAgICAgIHRoaXMuaW5GYXZvcml0ZXMgPSBmYXZvcml0ZXMuZmluZChkaXNoID0+IGRpc2guaWQgPT0gdGhpcy5kaXNoLmlkKTtcblxuICAgICAgICBpZih0aGlzLmluRmF2b3JpdGVzKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC51c2VySXNMb2dnZWRJbigpXG4gICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB0aGlzLmlzTG9nZ2VkSW4gPSByZXN1bHQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmKHRoaXMuaW5GYXZvcml0ZXMpIHtcbiAgICAgIHRoaXMucmVtb3ZlRGlzaEZyb21GYXZvcml0ZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGREaXNoVG9GYXZvcml0ZXMoKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXNoVG9GYXZvcml0ZXMoKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5hZGREaXNoVG9GYXZvcml0ZXModGhpcy5kaXNoKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkZWRUb0Zhdm9yaXRlcy5lbWl0KCk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKVxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21GYXZvcml0ZXMoKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5yZW1vdmVEaXNoRnJvbUZhdm9yaXRlcyh0aGlzLmRpc2gpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVkRnJvbUZhdm9yaXRlcy5lbWl0KCk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgIClcbiAgfVxuXG59XG4iXX0=