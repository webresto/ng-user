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
ToggleDishToFavoritesDirective.ɵdir = i0.ɵɵdefineDirective({ type: ToggleDishToFavoritesDirective, selectors: [["", "rstToggleDishToFavorites", ""]], hostBindings: function ToggleDishToFavoritesDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function ToggleDishToFavoritesDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { dish: "dish" }, outputs: { addedToFavorites: "addedToFavorites", removedFromFavorites: "removedFromFavorites", change: "change", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ToggleDishToFavoritesDirective, [{
        type: Directive,
        args: [{
                selector: '[rstToggleDishToFavorites]'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9wcm9qZWN0cy93ZWJyZXN0by9uZy11c2VyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3RvZ2dsZS1kaXNoLXRvLWZhdm9yaXRlcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUM5QixNQUFNLEVBQUUsWUFBWSxFQUNyQixNQUFNLGVBQWUsQ0FBQzs7O0FBTXZCLE1BQU0sT0FBTyw4QkFBOEI7SUFXekMsWUFDVSxrQkFBc0MsRUFDdEMsT0FBbUIsRUFDbkIsUUFBbUI7UUFGbkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFYbkIscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUM1Qyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2hELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3JDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBUzFDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLGtCQUFrQjthQUNwQixhQUFhLEVBQUU7YUFDZixTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFFckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRW5FLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUE7YUFDL0Q7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDbkU7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsY0FBYyxFQUFFO2FBQ2hCLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUdELE9BQU87UUFDTCxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDN0IsU0FBUyxDQUNSLEdBQUcsRUFBRTtZQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRSxDQUFDLEVBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDaEMsQ0FBQTtJQUNMLENBQUM7SUFFRCx1QkFBdUI7UUFDckIsSUFBSSxDQUFDLGtCQUFrQjthQUNwQix1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2xDLFNBQVMsQ0FDUixHQUFHLEVBQUU7WUFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEUsQ0FBQyxFQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUE7SUFDTCxDQUFDOzs0R0FwRVUsOEJBQThCO21FQUE5Qiw4QkFBOEI7MkdBQTlCLGFBQVM7O2tEQUFULDhCQUE4QjtjQUgxQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjthQUN2QztzSEFHVSxJQUFJO2tCQUFaLEtBQUs7WUFDSSxnQkFBZ0I7a0JBQXpCLE1BQU07WUFDRyxvQkFBb0I7a0JBQTdCLE1BQU07WUFDRyxNQUFNO2tCQUFmLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUE4QlAsT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCxcclxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tyc3RUb2dnbGVEaXNoVG9GYXZvcml0ZXNdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlIHtcclxuXHJcbiAgQElucHV0KCkgZGlzaDphbnk7XHJcbiAgQE91dHB1dCgpIGFkZGVkVG9GYXZvcml0ZXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgQE91dHB1dCgpIHJlbW92ZWRGcm9tRmF2b3JpdGVzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIGluRmF2b3JpdGVzOiBib29sZWFuO1xyXG4gIGlzTG9nZ2VkSW46IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICAgICAudXNlckZhdm9yaXRlcygpXHJcbiAgICAgIC5zdWJzY3JpYmUoZmF2b3JpdGVzID0+IHtcclxuXHJcbiAgICAgICAgdGhpcy5pbkZhdm9yaXRlcyA9IGZhdm9yaXRlcy5maW5kKGRpc2ggPT4gZGlzaC5pZCA9PSB0aGlzLmRpc2guaWQpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmluRmF2b3JpdGVzKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcclxuICAgICAgLnVzZXJJc0xvZ2dlZEluKClcclxuICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4gdGhpcy5pc0xvZ2dlZEluID0gcmVzdWx0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgaWYodGhpcy5pbkZhdm9yaXRlcykge1xyXG4gICAgICB0aGlzLnJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFkZERpc2hUb0Zhdm9yaXRlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkRGlzaFRvRmF2b3JpdGVzKCkge1xyXG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcclxuICAgICAgLmFkZERpc2hUb0Zhdm9yaXRlcyh0aGlzLmRpc2gpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5hZGRlZFRvRmF2b3JpdGVzLmVtaXQoKTtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcclxuICAgICAgKVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRGlzaEZyb21GYXZvcml0ZXMoKSB7XHJcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICAgICAucmVtb3ZlRGlzaEZyb21GYXZvcml0ZXModGhpcy5kaXNoKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVtb3ZlZEZyb21GYXZvcml0ZXMuZW1pdCgpO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcclxuICAgICAgKVxyXG4gIH1cclxuXHJcbn1cclxuIl19