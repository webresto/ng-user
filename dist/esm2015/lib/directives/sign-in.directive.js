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
SignInDirective.ɵdir = i0.ɵɵdefineDirective({ type: SignInDirective, selectors: [["", "rstSignIn", ""]], hostBindings: function SignInDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function SignInDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { phone: "phone", password: "password", captcha: "captcha", rememberMe: "rememberMe" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SignInDirective, [{
        type: Directive,
        args: [{
                selector: '[rstSignIn]'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vcHJvamVjdHMvd2VicmVzdG8vbmctdXNlci9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9zaWduLWluLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBT3JGLE1BQU0sT0FBTyxlQUFlO0lBUzFCLFlBQ1Usa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFKdEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFJekMsQ0FBQztJQUdMLE9BQU87UUFDTCxJQUFJLElBQUksR0FBcUI7WUFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUM3QixTQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUE7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQUs7UUFDaEIsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7OzhFQS9CVSxlQUFlO29EQUFmLGVBQWU7NEZBQWYsYUFBUzs7a0RBQVQsZUFBZTtjQUgzQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7YUFDeEI7cUVBR1UsS0FBSztrQkFBYixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUs7WUFDSSxPQUFPO2tCQUFoQixNQUFNO1lBQ0csS0FBSztrQkFBZCxNQUFNO1lBT1AsT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNpZ25JblJlcXVlc3REYXRhIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcclxuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3JzdFNpZ25Jbl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWduSW5EaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XHJcbiAgQElucHV0KCkgcGFzc3dvcmQ6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGNhcHRjaGE6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIHJlbWVtYmVyTWU6Ym9vbGVhbjtcclxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKSB7XHJcbiAgICBsZXQgZGF0YTpTaWduSW5SZXF1ZXN0RGF0YSA9IHtcclxuICAgICAgcGhvbmU6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxyXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcclxuICAgICAgY2FwdGNoYTogdGhpcy5jYXB0Y2hhXHJcbiAgICB9O1xyXG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcclxuICAgICAgLnNpZ25JbihkYXRhLCB0aGlzLnJlbWVtYmVyTWUpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXHJcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxyXG4gICAgICApXHJcbiAgfVxyXG5cclxuICBwcmVwYXJlUGhvbmUocGhvbmUpIHtcclxuICAgIHBob25lID0gJysnICsgcGhvbmUucmVwbGFjZSgvW14wLTldL2dpbSwnJyk7XHJcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnJyk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=