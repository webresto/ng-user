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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvYmFsYW5jZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBeUIsTUFBTSxlQUFlLENBQUM7OztBQU1qRSxNQUFNLE9BQU8sZ0JBQWdCO0lBSTNCLFlBQ1UsUUFBbUIsRUFDbkIsRUFBYyxFQUNkLGtCQUFzQztRQUZ0QyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBRTlDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLFVBQVUsRUFBRTthQUNaLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNuQixLQUFJLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFFO29CQUN6QixPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDekI7YUFDRjtZQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdFLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQzs7Z0ZBeEJVLGdCQUFnQjtxREFBaEIsZ0JBQWdCO2tEQUFoQixnQkFBZ0I7Y0FINUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2FBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FwcEJhbGFuY2VdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFsYW5jZURpcmVjdGl2ZSB7XHJcblxyXG4gIGFtb3VudDpzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcclxuICApIHtcclxuICAgIGxldCBiYWxhbmNlID0gMDtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgICAgIC5nZXRCb251c2VzKClcclxuICAgICAgLnN1YnNjcmliZShib251c2VzID0+IHtcclxuICAgICAgICBmb3IobGV0IG5hbWUgaW4gYm9udXNlcykge1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IGJvbnVzZXNbbmFtZV07XHJcbiAgICAgICAgICBpZihkYXRhLnN0YXRlID09ICdhY3RpdmUnKSB7XHJcbiAgICAgICAgICAgIGJhbGFuY2UgKz0gZGF0YS5iYWxhbmNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbW91bnQgPSBgJHtiYWxhbmNlfWA7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCB0aGlzLmFtb3VudCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG59XHJcbiJdfQ==