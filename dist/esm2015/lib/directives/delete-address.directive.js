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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3Byb2plY3RzL3dlYnJlc3RvL25nLXVzZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvZGVsZXRlLWFkZHJlc3MuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPckYsTUFBTSxPQUFPLHNCQUFzQjtJQU9qQyxZQUNVLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBSnRDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBSXpDLENBQUM7SUFHTCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUMzQixTQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7SUFDTixDQUFDOzs0RkFuQlUsc0JBQXNCOzJEQUF0QixzQkFBc0I7bUdBQXRCLGFBQVM7O2tEQUFULHNCQUFzQjtjQUhsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjthQUMvQjtxRUFHVSxPQUFPO2tCQUFmLEtBQUs7WUFFSSxPQUFPO2tCQUFoQixNQUFNO1lBQ0csS0FBSztrQkFBZCxNQUFNO1lBT1AsT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwRGVsZXRlQWRkcmVzc10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZWxldGVBZGRyZXNzRGlyZWN0aXZlIHtcclxuXHJcbiAgQElucHV0KCkgYWRkcmVzczpBZGRyZXNzO1xyXG5cclxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICAgICAuZGVsZXRlQWRkcmVzcyh0aGlzLmFkZHJlc3MpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXHJcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=