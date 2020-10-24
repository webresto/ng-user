import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
export class DeleteAddressDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        this.ngRestoUserService
            .deleteAddress(this.address)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
DeleteAddressDirective.ɵfac = function DeleteAddressDirective_Factory(t) { return new (t || DeleteAddressDirective)(i0.ɵɵdirectiveInject(i1.NgRestoUserService)); };
DeleteAddressDirective.ɵdir = i0.ɵɵdefineDirective({ type: DeleteAddressDirective, selectors: [["", "appDeleteAddress", ""]], hostBindings: function DeleteAddressDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function DeleteAddressDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { address: "address" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DeleteAddressDirective, [{
        type: Directive,
        args: [{
                selector: '[appDeleteAddress]'
            }]
    }], function () { return [{ type: i1.NgRestoUserService }]; }, { address: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL1Byb2Zlc3Npb25hbC9mcm9udGVuZC9wcm9qZWN0cy93ZWJyZXN0by9uZy11c2VyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2RlbGV0ZS1hZGRyZXNzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7O0FBUXZFLE1BQU0sT0FBTyxzQkFBc0I7SUFPakMsWUFDVSxrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUp0QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUl6QyxDQUFDO0lBR0wsT0FBTztRQUNMLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDM0IsU0FBUyxDQUNSLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM3QixLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNoQyxDQUFDO0lBQ04sQ0FBQzs7NEZBbkJVLHNCQUFzQjsyREFBdEIsc0JBQXNCO21HQUF0QixhQUFTOztrREFBVCxzQkFBc0I7Y0FIbEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7YUFDL0I7cUVBR1UsT0FBTztrQkFBZixLQUFLO1lBRUksT0FBTztrQkFBaEIsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQU9QLE9BQU87a0JBRE4sWUFBWTttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYWRkcmVzc1wiO1xyXG5cclxuXHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBEZWxldGVBZGRyZXNzXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERlbGV0ZUFkZHJlc3NEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBhZGRyZXNzOkFkZHJlc3M7XHJcblxyXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgICAgIC5kZWxldGVBZGRyZXNzKHRoaXMuYWRkcmVzcylcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==