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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1vdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2xhcmNoZW5rb3YvZnJvbnRlbmQvcHJvamVjdHMvd2VicmVzdG8vbmctdXNlci9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9zaWduLW91dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU14RCxNQUFNLE9BQU8sZ0JBQWdCO0lBRTNCLFlBQ1Usa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFDNUMsQ0FBQztJQUdMLE9BQU87UUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Z0ZBVFUsZ0JBQWdCO3FEQUFoQixnQkFBZ0I7NkZBQWhCLGFBQVM7O2tEQUFULGdCQUFnQjtjQUg1QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7YUFDekI7cUVBUUMsT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwU2lnbk91dF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWduT3V0RGlyZWN0aXZlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZS5zaWduT3V0KCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=