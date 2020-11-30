import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
export class ResetPasswordDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        let data = {
            phone: this.phone,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .resetPassword(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
ResetPasswordDirective.ɵfac = function ResetPasswordDirective_Factory(t) { return new (t || ResetPasswordDirective)(i0.ɵɵdirectiveInject(i1.NgRestoUserService)); };
ResetPasswordDirective.ɵdir = i0.ɵɵdefineDirective({ type: ResetPasswordDirective, selectors: [["", "rstResetPassword", ""]], hostBindings: function ResetPasswordDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function ResetPasswordDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { phone: "phone", captcha: "captcha" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResetPasswordDirective, [{
        type: Directive,
        args: [{
                selector: '[rstResetPassword]'
            }]
    }], function () { return [{ type: i1.NgRestoUserService }]; }, { phone: [{
            type: Input
        }], captcha: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3Byb2plY3RzL3dlYnJlc3RvL25nLXVzZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvcmVzZXQtcGFzc3dvcmQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPckYsTUFBTSxPQUFPLHNCQUFzQjtJQU9qQyxZQUNVLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBSnRDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBSXpDLENBQUM7SUFHTCxPQUFPO1FBQ0wsSUFBSSxJQUFJLEdBQTRCO1lBQ2xDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsYUFBYSxDQUFDLElBQUksQ0FBQzthQUNuQixTQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7SUFDTixDQUFDOzs0RkF2QlUsc0JBQXNCOzJEQUF0QixzQkFBc0I7bUdBQXRCLGFBQVM7O2tEQUFULHNCQUFzQjtjQUhsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjthQUMvQjtxRUFHVSxLQUFLO2tCQUFiLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFDSSxPQUFPO2tCQUFoQixNQUFNO1lBQ0csS0FBSztrQkFBZCxNQUFNO1lBT1AsT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRSZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uL21vZGVscyc7XHJcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tyc3RSZXNldFBhc3N3b3JkXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmREaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XHJcbiAgQElucHV0KCkgY2FwdGNoYTpzdHJpbmc7XHJcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgbGV0IGRhdGE6UmVzZXRQYXNzd29yZFJlcXVlc3REYXRhID0ge1xyXG4gICAgICBwaG9uZTogdGhpcy5waG9uZSxcclxuICAgICAgY2FwdGNoYTogdGhpcy5jYXB0Y2hhXHJcbiAgICB9O1xyXG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcclxuICAgICAgLnJlc2V0UGFzc3dvcmQoZGF0YSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=