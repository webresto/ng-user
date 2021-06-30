import { Directive, HostListener, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export class ToggleDishToFavoritesDirective {
    constructor(ngRestoUserService, element, renderer) {
        this.ngRestoUserService = ngRestoUserService;
        this.element = element;
        this.renderer = renderer;
        this.toggle = new EventEmitter();
        this.error = new EventEmitter();
    }
    get inFavorites() {
        return !!this.favorites.find(dish => dish.id == this.dish.id);
    }
    ;
    ngOnDestroy() {
        [this.toggle, this.error].forEach(emitter => emitter.complete());
    }
    ngOnChanges() {
        if (this.inFavorites) {
            this.renderer.addClass(this.element.nativeElement, 'selected');
        }
        else {
            this.renderer.removeClass(this.element.nativeElement, 'selected');
        }
        ;
    }
    onClick() {
        if (this.inFavorites) {
            this.removeDishFromFavorites();
        }
        else {
            this.addDishToFavorites();
        }
    }
    addDishToFavorites() {
        this.ngRestoUserService
            .addDishToFavorites(this.dish)
            .subscribe(() => {
            console.log('toggle dish');
            this.toggle.emit(true);
            this.renderer.addClass(this.element.nativeElement, 'selected');
        }, error => this.error.emit(error));
    }
    removeDishFromFavorites() {
        const req = this.ngRestoUserService.removeDishFromFavorites(this.dish).subscribe(() => {
            this.toggle.emit(false);
            this.renderer.removeClass(this.element.nativeElement, 'selected');
        }, error => this.error.emit(error), () => req.unsubscribe());
    }
}
ToggleDishToFavoritesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstToggleDishToFavorites]'
            },] }
];
ToggleDishToFavoritesDirective.ctorParameters = () => [
    { type: NgRestoUserService },
    { type: ElementRef },
    { type: Renderer2 }
];
ToggleDishToFavoritesDirective.propDecorators = {
    dish: [{ type: Input }],
    toggle: [{ type: Output }],
    error: [{ type: Output }],
    isLoggedIn: [{ type: Input }],
    favorites: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3dlYnJlc3RvL25nLXVzZXIvc3JjL2xpYi9kaXJlY3RpdmVzL3RvZ2dsZS1kaXNoLXRvLWZhdm9yaXRlcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUM5QixNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQzVDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBS3ZFLE1BQU0sT0FBTyw4QkFBOEI7SUFTekMsWUFDVSxrQkFBc0MsRUFDdEMsT0FBbUIsRUFDbkIsUUFBbUI7UUFGbkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFUbkIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDckMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFTekMsQ0FBQztJQUVMLElBQUksV0FBVztRQUNiLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQy9ELENBQUM7SUFBQSxDQUFDO0lBR0YsV0FBVztRQUNULENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUE7U0FDL0Q7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ25FO1FBQUEsQ0FBQztJQUNKLENBQUM7SUFHRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2hDO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzdCLFNBQVMsQ0FDUixHQUFHLEVBQUU7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsRUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNoQyxDQUFBO0lBQ0wsQ0FBQztJQUVELHVCQUF1QjtRQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDOUUsR0FBRyxFQUFFO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEUsQ0FBQyxFQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQy9CLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FDeEIsQ0FBQTtJQUNILENBQUM7OztZQWxFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjthQUN2Qzs7O1lBSlEsa0JBQWtCO1lBRkgsVUFBVTtZQUFFLFNBQVM7OzttQkFTMUMsS0FBSztxQkFDTCxNQUFNO29CQUNOLE1BQU07eUJBRU4sS0FBSzt3QkFDTCxLQUFLO3NCQXlCTCxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCxcbiAgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgT25EZXN0cm95LCBPbkNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcnN0VG9nZ2xlRGlzaFRvRmF2b3JpdGVzXSdcbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGRpc2g6IGFueTtcbiAgQE91dHB1dCgpIHRvZ2dsZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgQElucHV0KCkgaXNMb2dnZWRJbjogYm9vbGVhbjtcbiAgQElucHV0KCkgZmF2b3JpdGVzOiBhbnlbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7IH1cblxuICBnZXQgaW5GYXZvcml0ZXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5mYXZvcml0ZXMuZmluZChkaXNoID0+IGRpc2guaWQgPT0gdGhpcy5kaXNoLmlkKVxuICB9O1xuXG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgW3RoaXMudG9nZ2xlLCB0aGlzLmVycm9yXS5mb3JFYWNoKGVtaXR0ZXIgPT4gZW1pdHRlci5jb21wbGV0ZSgpKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLmluRmF2b3JpdGVzKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKTtcbiAgICB9O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmICh0aGlzLmluRmF2b3JpdGVzKSB7XG4gICAgICB0aGlzLnJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkRGlzaFRvRmF2b3JpdGVzKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlzaFRvRmF2b3JpdGVzKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuYWRkRGlzaFRvRmF2b3JpdGVzKHRoaXMuZGlzaClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygndG9nZ2xlIGRpc2gnKTtcbiAgICAgICAgICB0aGlzLnRvZ2dsZS5lbWl0KHRydWUpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApXG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUZhdm9yaXRlcygpIHtcbiAgICBjb25zdCByZXEgPSB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZS5yZW1vdmVEaXNoRnJvbUZhdm9yaXRlcyh0aGlzLmRpc2gpLnN1YnNjcmliZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy50b2dnbGUuZW1pdChmYWxzZSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvciksXG4gICAgICAoKSA9PiByZXEudW5zdWJzY3JpYmUoKVxuICAgIClcbiAgfVxuXG59XG4iXX0=