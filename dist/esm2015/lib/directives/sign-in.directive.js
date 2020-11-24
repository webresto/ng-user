import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
export class SignInDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        let data = {
            phone: this.preparePhone(this.phone),
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signIn(data, this.rememberMe)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
    preparePhone(phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
    }
}
SignInDirective.ɵfac = function SignInDirective_Factory(t) { return new (t || SignInDirective)(i0.ɵɵdirectiveInject(i1.NgRestoUserService)); };
SignInDirective.ɵdir = i0.ɵɵdefineDirective({ type: SignInDirective, selectors: [["", "appSignIn", ""]], hostBindings: function SignInDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function SignInDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { phone: "phone", password: "password", captcha: "captcha", rememberMe: "rememberMe" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SignInDirective, [{
        type: Directive,
        args: [{
                selector: '[appSignIn]'
            }]
    }], function () { return [{ type: i1.NgRestoUserService }]; }, { phone: [{
            type: Input
        }], password: [{
            type: Input
        }], captcha: [{
            type: Input
        }], rememberMe: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvc2lnbi1pbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU9yRixNQUFNLE9BQU8sZUFBZTtJQVMxQixZQUNVLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBSnRDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBSXpDLENBQUM7SUFHTCxPQUFPO1FBQ0wsSUFBSSxJQUFJLEdBQXFCO1lBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDN0IsU0FBUyxDQUNSLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM3QixLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNoQyxDQUFBO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFLO1FBQ2hCLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs4RUEvQlUsZUFBZTtvREFBZixlQUFlOzRGQUFmLGFBQVM7O2tEQUFULGVBQWU7Y0FIM0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2FBQ3hCO3FFQUdVLEtBQUs7a0JBQWIsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0ksT0FBTztrQkFBaEIsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQU9QLE9BQU87a0JBRE4sWUFBWTttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTaWduSW5SZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uL21vZGVscyc7XHJcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBTaWduSW5dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2lnbkluRGlyZWN0aXZlIHtcclxuXHJcbiAgQElucHV0KCkgcGhvbmU6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBhc3N3b3JkOnN0cmluZztcclxuICBASW5wdXQoKSBjYXB0Y2hhOnN0cmluZztcclxuICBASW5wdXQoKSByZW1lbWJlck1lOmJvb2xlYW47XHJcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgbGV0IGRhdGE6U2lnbkluUmVxdWVzdERhdGEgPSB7XHJcbiAgICAgIHBob25lOiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKSxcclxuICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXHJcbiAgICAgIGNhcHRjaGE6IHRoaXMuY2FwdGNoYVxyXG4gICAgfTtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgICAgIC5zaWduSW4oZGF0YSwgdGhpcy5yZW1lbWJlck1lKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcclxuICAgICAgKVxyXG4gIH1cclxuXHJcbiAgcHJlcGFyZVBob25lKHBob25lKSB7XHJcbiAgICBwaG9uZSA9ICcrJyArIHBob25lLnJlcGxhY2UoL1teMC05XS9naW0sJycpO1xyXG4gICAgcmV0dXJuIHBob25lLnJlcGxhY2UoJys4JywgJycpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19