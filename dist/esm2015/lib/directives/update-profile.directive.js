import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
export class UpdateProfileDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        let data = {
            name: this.name,
            //phone: this.phone,
            email: this.email,
            avatar: this.avatar
        };
        this.ngRestoUserService
            .updateProfile(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
UpdateProfileDirective.ɵfac = function UpdateProfileDirective_Factory(t) { return new (t || UpdateProfileDirective)(i0.ɵɵdirectiveInject(i1.NgRestoUserService)); };
UpdateProfileDirective.ɵdir = i0.ɵɵdefineDirective({ type: UpdateProfileDirective, selectors: [["", "appUpdateProfile", ""]], hostBindings: function UpdateProfileDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function UpdateProfileDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { name: "name", phone: "phone", email: "email", avatar: "avatar" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(UpdateProfileDirective, [{
        type: Directive,
        args: [{
                selector: '[appUpdateProfile]'
            }]
    }], function () { return [{ type: i1.NgRestoUserService }]; }, { name: [{
            type: Input
        }], phone: [{
            type: Input
        }], email: [{
            type: Input
        }], avatar: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXByb2ZpbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2xhcmNoZW5rb3YvZnJvbnRlbmQvcHJvamVjdHMvd2VicmVzdG8vbmctdXNlci9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy91cGRhdGUtcHJvZmlsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU9yRixNQUFNLE9BQU8sc0JBQXNCO0lBVWpDLFlBQ1Usa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFKdEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFJekMsQ0FBQztJQUdMLE9BQU87UUFDTCxJQUFJLElBQUksR0FBNEI7WUFDbEMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2Ysb0JBQW9CO1lBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU07U0FDbkIsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsYUFBYSxDQUFDLElBQUksQ0FBQzthQUNuQixTQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7SUFDTixDQUFDOzs0RkE1QlUsc0JBQXNCOzJEQUF0QixzQkFBc0I7bUdBQXRCLGFBQVM7O2tEQUFULHNCQUFzQjtjQUhsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjthQUMvQjtxRUFHVSxJQUFJO2tCQUFaLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUs7WUFFSSxPQUFPO2tCQUFoQixNQUFNO1lBQ0csS0FBSztrQkFBZCxNQUFNO1lBT1AsT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFVwZGF0ZVByb2ZpbGVSZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uL21vZGVscyc7XHJcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBVcGRhdGVQcm9maWxlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcclxuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XHJcbiAgQElucHV0KCkgZW1haWw6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGF2YXRhcjpzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIGxldCBkYXRhOlVwZGF0ZVByb2ZpbGVSZXF1ZXN0RGF0YSA9IHtcclxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAvL3Bob25lOiB0aGlzLnBob25lLFxyXG4gICAgICBlbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgYXZhdGFyOnRoaXMuYXZhdGFyXHJcbiAgICB9O1xyXG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcclxuICAgICAgLnVwZGF0ZVByb2ZpbGUoZGF0YSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==