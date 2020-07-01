/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, Renderer2, ElementRef } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export class BalanceDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} ngRestoUserService
     */
    constructor(renderer, el, ngRestoUserService) {
        this.renderer = renderer;
        this.el = el;
        this.ngRestoUserService = ngRestoUserService;
        /** @type {?} */
        let balance = 0;
        this.ngRestoUserService
            .getBonuses()
            .subscribe(bonuses => {
            for (let name in bonuses) {
                /** @type {?} */
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
BalanceDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appBalance]'
            },] },
];
BalanceDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgRestoUserService }
];
if (false) {
    /** @type {?} */
    BalanceDirective.prototype.amount;
    /** @type {?} */
    BalanceDirective.prototype.renderer;
    /** @type {?} */
    BalanceDirective.prototype.el;
    /** @type {?} */
    BalanceDirective.prototype.ngRestoUserService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctdXNlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2JhbGFuY2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFLdkUsTUFBTTs7Ozs7O0lBSUosWUFDVSxRQUFtQixFQUNuQixFQUFjLEVBQ2Qsa0JBQXNDO1FBRnRDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7O1lBRTFDLE9BQU8sR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixVQUFVLEVBQUU7YUFDWixTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkIsS0FBSSxJQUFJLElBQUksSUFBSSxPQUFPLEVBQUU7O3NCQUNqQixJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDMUIsSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFBRTtvQkFDekIsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7aUJBQ3pCO2FBQ0Y7WUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7OztZQTNCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7YUFDekI7OztZQUxtQixTQUFTO1lBQUUsVUFBVTtZQUNoQyxrQkFBa0I7Ozs7SUFPekIsa0NBQWM7O0lBR1osb0NBQTJCOztJQUMzQiw4QkFBc0I7O0lBQ3RCLDhDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwQmFsYW5jZV0nXG59KVxuZXhwb3J0IGNsYXNzIEJhbGFuY2VEaXJlY3RpdmUge1xuXG4gIGFtb3VudDpzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHtcbiAgICBsZXQgYmFsYW5jZSA9IDA7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5nZXRCb251c2VzKClcbiAgICAgIC5zdWJzY3JpYmUoYm9udXNlcyA9PiB7XG4gICAgICAgIGZvcihsZXQgbmFtZSBpbiBib251c2VzKSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGJvbnVzZXNbbmFtZV07XG4gICAgICAgICAgaWYoZGF0YS5zdGF0ZSA9PSAnYWN0aXZlJykge1xuICAgICAgICAgICAgYmFsYW5jZSArPSBkYXRhLmJhbGFuY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hbW91bnQgPSBgJHtiYWxhbmNlfWA7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5hbW91bnQpO1xuICAgICAgfSk7XG5cbiAgfVxuXG59XG4iXX0=