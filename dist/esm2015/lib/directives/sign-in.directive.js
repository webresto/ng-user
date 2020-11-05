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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbGFyY2hlbmtvdi9mcm9udGVuZC9wcm9qZWN0cy93ZWJyZXN0by9uZy11c2VyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3NpZ24taW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPckYsTUFBTSxPQUFPLGVBQWU7SUFTMUIsWUFDVSxrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUp0QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUl6QyxDQUFDO0lBR0wsT0FBTztRQUNMLElBQUksSUFBSSxHQUFxQjtZQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQzdCLFNBQVMsQ0FDUixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDaEMsQ0FBQTtJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBSztRQUNoQixLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7OEVBL0JVLGVBQWU7b0RBQWYsZUFBZTs0RkFBZixhQUFTOztrREFBVCxlQUFlO2NBSDNCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTthQUN4QjtxRUFHVSxLQUFLO2tCQUFiLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNJLE9BQU87a0JBQWhCLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUFPUCxPQUFPO2tCQUROLFlBQVk7bUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2lnbkluUmVxdWVzdERhdGEgfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwU2lnbkluXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZ25JbkRpcmVjdGl2ZSB7XHJcblxyXG4gIEBJbnB1dCgpIHBob25lOnN0cmluZztcclxuICBASW5wdXQoKSBwYXNzd29yZDpzdHJpbmc7XHJcbiAgQElucHV0KCkgY2FwdGNoYTpzdHJpbmc7XHJcbiAgQElucHV0KCkgcmVtZW1iZXJNZTpib29sZWFuO1xyXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIGxldCBkYXRhOlNpZ25JblJlcXVlc3REYXRhID0ge1xyXG4gICAgICBwaG9uZTogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXHJcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxyXG4gICAgICBjYXB0Y2hhOiB0aGlzLmNhcHRjaGFcclxuICAgIH07XHJcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICAgICAuc2lnbkluKGRhdGEsIHRoaXMucmVtZW1iZXJNZSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXHJcbiAgICAgIClcclxuICB9XHJcblxyXG4gIHByZXBhcmVQaG9uZShwaG9uZSkge1xyXG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcclxuICAgIHJldHVybiBwaG9uZS5yZXBsYWNlKCcrOCcsICcnKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==