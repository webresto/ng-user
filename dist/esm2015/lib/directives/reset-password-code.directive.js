import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
export class ResetPasswordCodeDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        let data = {
            userId: this.userId,
            code: this.code,
            password: this.password
        };
        this.ngRestoUserService
            .resetPasswordCode(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
ResetPasswordCodeDirective.ɵfac = function ResetPasswordCodeDirective_Factory(t) { return new (t || ResetPasswordCodeDirective)(i0.ɵɵdirectiveInject(i1.NgRestoUserService)); };
ResetPasswordCodeDirective.ɵdir = i0.ɵɵdefineDirective({ type: ResetPasswordCodeDirective, selectors: [["", "rstResetPasswordCode", ""]], hostBindings: function ResetPasswordCodeDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function ResetPasswordCodeDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { userId: "userId", code: "code", password: "password" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResetPasswordCodeDirective, [{
        type: Directive,
        args: [{
                selector: '[rstResetPasswordCode]'
            }]
    }], function () { return [{ type: i1.NgRestoUserService }]; }, { userId: [{
            type: Input
        }], code: [{
            type: Input
        }], password: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQtY29kZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vcHJvamVjdHMvd2VicmVzdG8vbmctdXNlci9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9yZXNldC1wYXNzd29yZC1jb2RlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBT3JGLE1BQU0sT0FBTywwQkFBMEI7SUFRckMsWUFDVSxrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUp0QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUl6QyxDQUFDO0lBR0wsT0FBTztRQUNMLElBQUksSUFBSSxHQUFnQztZQUN0QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3hCLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGlCQUFpQixDQUFDLElBQUksQ0FBQzthQUN2QixTQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7SUFDTixDQUFDOztvR0F6QlUsMEJBQTBCOytEQUExQiwwQkFBMEI7dUdBQTFCLGFBQVM7O2tEQUFULDBCQUEwQjtjQUh0QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjthQUNuQztxRUFHVSxNQUFNO2tCQUFkLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0ksT0FBTztrQkFBaEIsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQU9QLE9BQU87a0JBRE4sWUFBWTttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcclxuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3JzdFJlc2V0UGFzc3dvcmRDb2RlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmRDb2RlRGlyZWN0aXZlIHtcclxuXHJcbiAgQElucHV0KCkgdXNlcklkOnN0cmluZztcclxuICBASW5wdXQoKSBjb2RlOnN0cmluZztcclxuICBASW5wdXQoKSBwYXNzd29yZDpzdHJpbmc7XHJcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgbGV0IGRhdGE6UmVzZXRQYXNzd29yZENvZGVSZXF1ZXN0RGF0YSA9IHtcclxuICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgY29kZTogdGhpcy5jb2RlLFxyXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZFxyXG4gICAgfTtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgICAgIC5yZXNldFBhc3N3b3JkQ29kZShkYXRhKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcclxuICAgICAgKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==