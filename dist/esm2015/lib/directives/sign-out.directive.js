import { Directive, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
export class SignOutDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
    }
    onClick() {
        this.ngRestoUserService.signOut();
    }
}
SignOutDirective.ɵfac = function SignOutDirective_Factory(t) { return new (t || SignOutDirective)(i0.ɵɵdirectiveInject(i1.NgRestoUserService)); };
SignOutDirective.ɵdir = i0.ɵɵdefineDirective({ type: SignOutDirective, selectors: [["", "appSignOut", ""]], hostBindings: function SignOutDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function SignOutDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SignOutDirective, [{
        type: Directive,
        args: [{
                selector: '[appSignOut]'
            }]
    }], function () { return [{ type: i1.NgRestoUserService }]; }, { onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1vdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3NpZ24tb3V0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTXhELE1BQU0sT0FBTyxnQkFBZ0I7SUFFM0IsWUFDVSxrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtJQUM1QyxDQUFDO0lBR0wsT0FBTztRQUNMLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwQyxDQUFDOztnRkFUVSxnQkFBZ0I7cURBQWhCLGdCQUFnQjs2RkFBaEIsYUFBUzs7a0RBQVQsZ0JBQWdCO2NBSDVCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsY0FBYzthQUN6QjtxRUFRQyxPQUFPO2tCQUROLFlBQVk7bUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBTaWduT3V0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZ25PdXREaXJlY3RpdmUge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlLnNpZ25PdXQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==