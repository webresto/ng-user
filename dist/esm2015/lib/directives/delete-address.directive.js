import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2xhcmNoZW5rb3YvZnJvbnRlbmQvcHJvamVjdHMvd2VicmVzdG8vbmctdXNlci9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9kZWxldGUtYWRkcmVzcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU9yRixNQUFNLE9BQU8sc0JBQXNCO0lBT2pDLFlBQ1Usa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFKdEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFJekMsQ0FBQztJQUdMLE9BQU87UUFDTCxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQzNCLFNBQVMsQ0FDUixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDaEMsQ0FBQztJQUNOLENBQUM7OzRGQW5CVSxzQkFBc0I7MkRBQXRCLHNCQUFzQjttR0FBdEIsYUFBUzs7a0RBQVQsc0JBQXNCO2NBSGxDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2FBQy9CO3FFQUdVLE9BQU87a0JBQWYsS0FBSztZQUVJLE9BQU87a0JBQWhCLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUFPUCxPQUFPO2tCQUROLFlBQVk7bUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gJy4uLy4uL21vZGVscyc7XHJcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBEZWxldGVBZGRyZXNzXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERlbGV0ZUFkZHJlc3NEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBhZGRyZXNzOkFkZHJlc3M7XHJcblxyXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgICAgIC5kZWxldGVBZGRyZXNzKHRoaXMuYWRkcmVzcylcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==