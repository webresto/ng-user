import { Directive, HostListener, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export class ToggleDishToFavoritesDirective {
    constructor(ngRestoUserService, element, renderer) {
        this.ngRestoUserService = ngRestoUserService;
        this.element = element;
        this.renderer = renderer;
        this.change = new EventEmitter();
        this.error = new EventEmitter();
    }
    get inFavorites() {
        return !!this.favorites.find(dish => dish.id == this.dish.id);
    }
    ;
    ngOnDestroy() {
        [this.change, this.error].forEach(emitter => emitter.complete());
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
            this.change.emit(true);
            this.renderer.addClass(this.element.nativeElement, 'selected');
        }, error => this.error.emit(error));
    }
    removeDishFromFavorites() {
        const req = this.ngRestoUserService.removeDishFromFavorites(this.dish).subscribe(() => {
            this.change.emit(false);
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
    change: [{ type: Output }],
    error: [{ type: Output }],
    isLoggedIn: [{ type: Input }],
    favorites: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3dlYnJlc3RvL25nLXVzZXIvc3JjL2xpYi9kaXJlY3RpdmVzL3RvZ2dsZS1kaXNoLXRvLWZhdm9yaXRlcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUM5QixNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQzVDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBS3ZFLE1BQU0sT0FBTyw4QkFBOEI7SUFTekMsWUFDVSxrQkFBc0MsRUFDdEMsT0FBbUIsRUFDbkIsUUFBbUI7UUFGbkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFUbkIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDckMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFTekMsQ0FBQztJQUVMLElBQUksV0FBVztRQUNiLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQy9ELENBQUM7SUFBQSxDQUFDO0lBR0YsV0FBVztRQUNULENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUE7U0FDL0Q7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ25FO1FBQUEsQ0FBQztJQUNKLENBQUM7SUFHRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2hDO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzdCLFNBQVMsQ0FDUixHQUFHLEVBQUU7WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRSxDQUFDLEVBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDaEMsQ0FBQTtJQUNMLENBQUM7SUFFRCx1QkFBdUI7UUFDckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQzlFLEdBQUcsRUFBRTtZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsRUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUMvQixHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQ3hCLENBQUE7SUFDSCxDQUFDOzs7WUFqRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7YUFDdkM7OztZQUpRLGtCQUFrQjtZQUZILFVBQVU7WUFBRSxTQUFTOzs7bUJBUzFDLEtBQUs7cUJBQ0wsTUFBTTtvQkFDTixNQUFNO3lCQUVOLEtBQUs7d0JBQ0wsS0FBSztzQkF5QkwsWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsXG4gIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIE9uRGVzdHJveSwgT25DaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3JzdFRvZ2dsZURpc2hUb0Zhdm9yaXRlc10nXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBkaXNoOiBhbnk7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIEBJbnB1dCgpIGlzTG9nZ2VkSW46IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZhdm9yaXRlczogYW55W107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkgeyB9XG5cbiAgZ2V0IGluRmF2b3JpdGVzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuZmF2b3JpdGVzLmZpbmQoZGlzaCA9PiBkaXNoLmlkID09IHRoaXMuZGlzaC5pZClcbiAgfTtcblxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIFt0aGlzLmNoYW5nZSwgdGhpcy5lcnJvcl0uZm9yRWFjaChlbWl0dGVyID0+IGVtaXR0ZXIuY29tcGxldGUoKSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5pbkZhdm9yaXRlcykge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgfTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZiAodGhpcy5pbkZhdm9yaXRlcykge1xuICAgICAgdGhpcy5yZW1vdmVEaXNoRnJvbUZhdm9yaXRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZERpc2hUb0Zhdm9yaXRlcygpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpc2hUb0Zhdm9yaXRlcygpIHtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLmFkZERpc2hUb0Zhdm9yaXRlcyh0aGlzLmRpc2gpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKVxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21GYXZvcml0ZXMoKSB7XG4gICAgY29uc3QgcmVxID0gdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2UucmVtb3ZlRGlzaEZyb21GYXZvcml0ZXModGhpcy5kaXNoKS5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKTtcbiAgICAgIH0sXG4gICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpLFxuICAgICAgKCkgPT4gcmVxLnVuc3Vic2NyaWJlKClcbiAgICApXG4gIH1cblxufVxuIl19