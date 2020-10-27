import { Directive, HostListener } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1vdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2xhcmNoZW5rb3YvZnJvbnRlbmQvcHJvamVjdHMvd2VicmVzdG8vbmctdXNlci9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9zaWduLW91dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQU92RSxNQUFNLE9BQU8sZ0JBQWdCO0lBRTNCLFlBQ1Usa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFDNUMsQ0FBQztJQUdMLE9BQU87UUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Z0ZBVFUsZ0JBQWdCO3FEQUFoQixnQkFBZ0I7NkZBQWhCLGFBQVM7O2tEQUFULGdCQUFnQjtjQUg1QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7YUFDekI7cUVBUUMsT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IFNpZ25JblJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLWluLXJlcXVlc3QtZGF0YSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBTaWduT3V0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZ25PdXREaXJlY3RpdmUge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlLnNpZ25PdXQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==