import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
export class ToggleDishToFavoritesDirective {
    constructor(ngRestoUserService, element, renderer) {
        this.ngRestoUserService = ngRestoUserService;
        this.element = element;
        this.renderer = renderer;
        this.addedToFavorites = new EventEmitter();
        this.removedFromFavorites = new EventEmitter();
        this.change = new EventEmitter();
        this.error = new EventEmitter();
    }
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
            this.addedToFavorites.emit();
            this.change.emit(true);
            this.renderer.addClass(this.element.nativeElement, 'selected');
        }, error => this.error.emit(error));
    }
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
ToggleDishToFavoritesDirective.ɵfac = function ToggleDishToFavoritesDirective_Factory(t) { return new (t || ToggleDishToFavoritesDirective)(i0.ɵɵdirectiveInject(i1.NgRestoUserService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
ToggleDishToFavoritesDirective.ɵdir = i0.ɵɵdefineDirective({ type: ToggleDishToFavoritesDirective, selectors: [["", "appToggleDishToFavorites", ""]], hostBindings: function ToggleDishToFavoritesDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function ToggleDishToFavoritesDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { dish: "dish" }, outputs: { addedToFavorites: "addedToFavorites", removedFromFavorites: "removedFromFavorites", change: "change", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ToggleDishToFavoritesDirective, [{
        type: Directive,
        args: [{
                selector: '[appToggleDishToFavorites]'
            }]
    }], function () { return [{ type: i1.NgRestoUserService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { dish: [{
            type: Input
        }], addedToFavorites: [{
            type: Output
        }], removedFromFavorites: [{
            type: Output
        }], change: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy90b2dnbGUtZGlzaC10by1mYXZvcml0ZXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDOUIsTUFBTSxFQUFFLFlBQVksRUFDckIsTUFBTSxlQUFlLENBQUM7OztBQU12QixNQUFNLE9BQU8sOEJBQThCO0lBV3pDLFlBQ1Usa0JBQXNDLEVBQ3RDLE9BQW1CLEVBQ25CLFFBQW1CO1FBRm5CLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBWG5CLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDNUMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNoRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNyQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQVMxQyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsYUFBYSxFQUFFO2FBQ2YsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBRXJCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVuRSxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFBO2FBQy9EO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ25FO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGNBQWMsRUFBRTthQUNoQixTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFHRCxPQUFPO1FBQ0wsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25CLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2hDO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzdCLFNBQVMsQ0FDUixHQUFHLEVBQUU7WUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakUsQ0FBQyxFQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUE7SUFDTCxDQUFDO0lBRUQsdUJBQXVCO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNsQyxTQUFTLENBQ1IsR0FBRyxFQUFFO1lBQ0gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsRUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNoQyxDQUFBO0lBQ0wsQ0FBQzs7NEdBcEVVLDhCQUE4QjttRUFBOUIsOEJBQThCOzJHQUE5QixhQUFTOztrREFBVCw4QkFBOEI7Y0FIMUMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7YUFDdkM7c0hBR1UsSUFBSTtrQkFBWixLQUFLO1lBQ0ksZ0JBQWdCO2tCQUF6QixNQUFNO1lBQ0csb0JBQW9CO2tCQUE3QixNQUFNO1lBQ0csTUFBTTtrQkFBZixNQUFNO1lBQ0csS0FBSztrQkFBZCxNQUFNO1lBOEJQLE9BQU87a0JBRE4sWUFBWTttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsXHJcbiAgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwVG9nZ2xlRGlzaFRvRmF2b3JpdGVzXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSB7XHJcblxyXG4gIEBJbnB1dCgpIGRpc2g6YW55O1xyXG4gIEBPdXRwdXQoKSBhZGRlZFRvRmF2b3JpdGVzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG4gIEBPdXRwdXQoKSByZW1vdmVkRnJvbUZhdm9yaXRlcyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBpbkZhdm9yaXRlczogYm9vbGVhbjtcclxuICBpc0xvZ2dlZEluOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcclxuICAgICAgLnVzZXJGYXZvcml0ZXMoKVxyXG4gICAgICAuc3Vic2NyaWJlKGZhdm9yaXRlcyA9PiB7XHJcblxyXG4gICAgICAgIHRoaXMuaW5GYXZvcml0ZXMgPSBmYXZvcml0ZXMuZmluZChkaXNoID0+IGRpc2guaWQgPT0gdGhpcy5kaXNoLmlkKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5pbkZhdm9yaXRlcykge1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgICAgIC51c2VySXNMb2dnZWRJbigpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHRoaXMuaXNMb2dnZWRJbiA9IHJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIGlmKHRoaXMuaW5GYXZvcml0ZXMpIHtcclxuICAgICAgdGhpcy5yZW1vdmVEaXNoRnJvbUZhdm9yaXRlcygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hZGREaXNoVG9GYXZvcml0ZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZERpc2hUb0Zhdm9yaXRlcygpIHtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgICAgIC5hZGREaXNoVG9GYXZvcml0ZXModGhpcy5kaXNoKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuYWRkZWRUb0Zhdm9yaXRlcy5lbWl0KCk7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXHJcbiAgICAgIClcclxuICB9XHJcblxyXG4gIHJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCkge1xyXG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcclxuICAgICAgLnJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKHRoaXMuZGlzaClcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZWRGcm9tRmF2b3JpdGVzLmVtaXQoKTtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXHJcbiAgICAgIClcclxuICB9XHJcblxyXG59XHJcbiJdfQ==