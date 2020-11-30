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
SignOutDirective.ɵdir = i0.ɵɵdefineDirective({ type: SignOutDirective, selectors: [["", "rstSignOut", ""]], hostBindings: function SignOutDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function SignOutDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SignOutDirective, [{
        type: Directive,
        args: [{
                selector: '[rstSignOut]'
            }]
    }], function () { return [{ type: i1.NgRestoUserService }]; }, { onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1vdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3Byb2plY3RzL3dlYnJlc3RvL25nLXVzZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvc2lnbi1vdXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNeEQsTUFBTSxPQUFPLGdCQUFnQjtJQUUzQixZQUNVLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQzVDLENBQUM7SUFHTCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BDLENBQUM7O2dGQVRVLGdCQUFnQjtxREFBaEIsZ0JBQWdCOzZGQUFoQixhQUFTOztrREFBVCxnQkFBZ0I7Y0FINUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2FBQ3pCO3FFQVFDLE9BQU87a0JBRE4sWUFBWTttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3JzdFNpZ25PdXRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2lnbk91dERpcmVjdGl2ZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2Uuc2lnbk91dCgpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19