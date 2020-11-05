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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9sYXJjaGVua292L2Zyb250ZW5kL3Byb2plY3RzL3dlYnJlc3RvL25nLXVzZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvdG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQzlCLE1BQU0sRUFBRSxZQUFZLEVBQ3JCLE1BQU0sZUFBZSxDQUFDOzs7QUFNdkIsTUFBTSxPQUFPLDhCQUE4QjtJQVd6QyxZQUNVLGtCQUFzQyxFQUN0QyxPQUFtQixFQUNuQixRQUFtQjtRQUZuQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVhuQixxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzVDLHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDaEQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDckMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFTMUMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGFBQWEsRUFBRTthQUNmLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUVyQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFbkUsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQTthQUMvRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNuRTtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixjQUFjLEVBQUU7YUFDaEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBR0QsT0FBTztRQUNMLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUNoQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM3QixTQUFTLENBQ1IsR0FBRyxFQUFFO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsRUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNoQyxDQUFBO0lBQ0wsQ0FBQztJQUVELHVCQUF1QjtRQUNyQixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEMsU0FBUyxDQUNSLEdBQUcsRUFBRTtZQUNILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRSxDQUFDLEVBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDaEMsQ0FBQTtJQUNMLENBQUM7OzRHQXBFVSw4QkFBOEI7bUVBQTlCLDhCQUE4QjsyR0FBOUIsYUFBUzs7a0RBQVQsOEJBQThCO2NBSDFDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2FBQ3ZDO3NIQUdVLElBQUk7a0JBQVosS0FBSztZQUNJLGdCQUFnQjtrQkFBekIsTUFBTTtZQUNHLG9CQUFvQjtrQkFBN0IsTUFBTTtZQUNHLE1BQU07a0JBQWYsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQThCUCxPQUFPO2tCQUROLFlBQVk7bUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LFxyXG4gIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FwcFRvZ2dsZURpc2hUb0Zhdm9yaXRlc10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb2dnbGVEaXNoVG9GYXZvcml0ZXNEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBkaXNoOmFueTtcclxuICBAT3V0cHV0KCkgYWRkZWRUb0Zhdm9yaXRlcyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuICBAT3V0cHV0KCkgcmVtb3ZlZEZyb21GYXZvcml0ZXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgaW5GYXZvcml0ZXM6IGJvb2xlYW47XHJcbiAgaXNMb2dnZWRJbjogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgICAgIC51c2VyRmF2b3JpdGVzKClcclxuICAgICAgLnN1YnNjcmliZShmYXZvcml0ZXMgPT4ge1xyXG5cclxuICAgICAgICB0aGlzLmluRmF2b3JpdGVzID0gZmF2b3JpdGVzLmZpbmQoZGlzaCA9PiBkaXNoLmlkID09IHRoaXMuZGlzaC5pZCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaW5GYXZvcml0ZXMpIHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICAgICAudXNlcklzTG9nZ2VkSW4oKVxyXG4gICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB0aGlzLmlzTG9nZ2VkSW4gPSByZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKSB7XHJcbiAgICBpZih0aGlzLmluRmF2b3JpdGVzKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlRGlzaEZyb21GYXZvcml0ZXMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWRkRGlzaFRvRmF2b3JpdGVzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGREaXNoVG9GYXZvcml0ZXMoKSB7XHJcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICAgICAuYWRkRGlzaFRvRmF2b3JpdGVzKHRoaXMuZGlzaClcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmFkZGVkVG9GYXZvcml0ZXMuZW1pdCgpO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0cnVlKTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxyXG4gICAgICApXHJcbiAgfVxyXG5cclxuICByZW1vdmVEaXNoRnJvbUZhdm9yaXRlcygpIHtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgICAgIC5yZW1vdmVEaXNoRnJvbUZhdm9yaXRlcyh0aGlzLmRpc2gpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVkRnJvbUZhdm9yaXRlcy5lbWl0KCk7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxyXG4gICAgICApXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=