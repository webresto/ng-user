import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
export class BalanceDirective {
    constructor(renderer, el, ngRestoUserService) {
        this.renderer = renderer;
        this.el = el;
        this.ngRestoUserService = ngRestoUserService;
        let balance = 0;
        this.ngRestoUserService
            .getBonuses()
            .subscribe(bonuses => {
            for (let name in bonuses) {
                const data = bonuses[name];
                if (data.state == 'active') {
                    balance += data.balance;
                }
            }
            this.amount = `${balance}`;
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        });
    }
}
BalanceDirective.ɵfac = function BalanceDirective_Factory(t) { return new (t || BalanceDirective)(i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.NgRestoUserService)); };
BalanceDirective.ɵdir = i0.ɵɵdefineDirective({ type: BalanceDirective, selectors: [["", "appBalance", ""]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BalanceDirective, [{
        type: Directive,
        args: [{
                selector: '[appBalance]'
            }]
    }], function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.NgRestoUserService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbGFyY2hlbmtvdi9mcm9udGVuZC9wcm9qZWN0cy93ZWJyZXN0by9uZy11c2VyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2JhbGFuY2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlCLE1BQU0sZUFBZSxDQUFDOzs7QUFNakUsTUFBTSxPQUFPLGdCQUFnQjtJQUkzQixZQUNVLFFBQW1CLEVBQ25CLEVBQWMsRUFDZCxrQkFBc0M7UUFGdEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUU5QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixVQUFVLEVBQUU7YUFDWixTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkIsS0FBSSxJQUFJLElBQUksSUFBSSxPQUFPLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFBRTtvQkFDekIsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7aUJBQ3pCO2FBQ0Y7WUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7O2dGQXhCVSxnQkFBZ0I7cURBQWhCLGdCQUFnQjtrREFBaEIsZ0JBQWdCO2NBSDVCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsY0FBYzthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBCYWxhbmNlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJhbGFuY2VEaXJlY3RpdmUge1xyXG5cclxuICBhbW91bnQ6c3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBsZXQgYmFsYW5jZSA9IDA7XHJcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICAgICAuZ2V0Qm9udXNlcygpXHJcbiAgICAgIC5zdWJzY3JpYmUoYm9udXNlcyA9PiB7XHJcbiAgICAgICAgZm9yKGxldCBuYW1lIGluIGJvbnVzZXMpIHtcclxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBib251c2VzW25hbWVdO1xyXG4gICAgICAgICAgaWYoZGF0YS5zdGF0ZSA9PSAnYWN0aXZlJykge1xyXG4gICAgICAgICAgICBiYWxhbmNlICs9IGRhdGEuYmFsYW5jZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW1vdW50ID0gYCR7YmFsYW5jZX1gO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5hbW91bnQpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=