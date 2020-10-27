import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
export class AddAddressDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        if (!this.street) {
            this.error.emit('Необходимо указать улицу');
            return;
        }
        if (!this.home) {
            this.error.emit('Необходимо указать номер дома');
            return;
        }
        let data = {
            street: this.street,
            home: this.home,
            name: this.name || '',
            housing: this.housing || '',
            index: this.index || '',
            entrance: this.entrance || '',
            floor: this.floor || '',
            apartment: this.apartment || '',
            doorphone: this.doorphone || ''
        };
        this.ngRestoUserService
            .addAddress(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
AddAddressDirective.ɵfac = function AddAddressDirective_Factory(t) { return new (t || AddAddressDirective)(i0.ɵɵdirectiveInject(i1.NgRestoUserService)); };
AddAddressDirective.ɵdir = i0.ɵɵdefineDirective({ type: AddAddressDirective, selectors: [["", "appAddAddress", ""]], hostBindings: function AddAddressDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function AddAddressDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { street: "street", home: "home", name: "name", housing: "housing", index: "index", entrance: "entrance", floor: "floor", apartment: "apartment", doorphone: "doorphone" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AddAddressDirective, [{
        type: Directive,
        args: [{
                selector: '[appAddAddress]'
            }]
    }], function () { return [{ type: i1.NgRestoUserService }]; }, { street: [{
            type: Input
        }], home: [{
            type: Input
        }], name: [{
            type: Input
        }], housing: [{
            type: Input
        }], index: [{
            type: Input
        }], entrance: [{
            type: Input
        }], floor: [{
            type: Input
        }], apartment: [{
            type: Input
        }], doorphone: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2xhcmNoZW5rb3YvZnJvbnRlbmQvcHJvamVjdHMvd2VicmVzdG8vbmctdXNlci9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9hZGQtYWRkcmVzcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQU92RSxNQUFNLE9BQU8sbUJBQW1CO0lBZTlCLFlBQ1Usa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFKdEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFJekMsQ0FBQztJQUdMLE9BQU87UUFDTCxJQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFBQyxPQUFPO1NBQ3JEO1FBQ0QsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUMxRDtRQUVELElBQUksSUFBSSxHQUF5QjtZQUMvQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFO1lBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTtZQUM3QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUU7WUFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTtTQUNoQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ2hCLFNBQVMsQ0FDUixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDaEMsQ0FBQztJQUNOLENBQUM7O3NGQTdDVSxtQkFBbUI7d0RBQW5CLG1CQUFtQjtnR0FBbkIsYUFBUzs7a0RBQVQsbUJBQW1CO2NBSC9CLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2FBQzVCO3FFQUdVLE1BQU07a0JBQWQsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUVJLE9BQU87a0JBQWhCLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUFPUCxPQUFPO2tCQUROLFlBQVk7bUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IEFkZEFkZHJlc3NSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvYWRkLWFkZHJlc3MtcmVxdWVzdC1kYXRhJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FwcEFkZEFkZHJlc3NdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRkQWRkcmVzc0RpcmVjdGl2ZSB7XHJcblxyXG4gIEBJbnB1dCgpIHN0cmVldDpzdHJpbmc7ICAgICAvL3JlcXVpcmVkXHJcbiAgQElucHV0KCkgaG9tZTpzdHJpbmc7ICAgICAgIC8vcmVxdWlyZWRcclxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcclxuICBASW5wdXQoKSBob3VzaW5nOnN0cmluZztcclxuICBASW5wdXQoKSBpbmRleDpzdHJpbmc7XHJcbiAgQElucHV0KCkgZW50cmFuY2U6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZsb29yOnN0cmluZztcclxuICBASW5wdXQoKSBhcGFydG1lbnQ6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGRvb3JwaG9uZTpzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIGlmKCF0aGlzLnN0cmVldCkge1xyXG4gICAgICB0aGlzLmVycm9yLmVtaXQoJ9Cd0LXQvtCx0YXQvtC00LjQvNC+INGD0LrQsNC30LDRgtGMINGD0LvQuNGG0YMnKTsgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYoIXRoaXMuaG9tZSkge1xyXG4gICAgICB0aGlzLmVycm9yLmVtaXQoJ9Cd0LXQvtCx0YXQvtC00LjQvNC+INGD0LrQsNC30LDRgtGMINC90L7QvNC10YAg0LTQvtC80LAnKTsgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkYXRhOkFkZEFkZHJlc3NSZXF1ZXN0RGF0YSA9IHtcclxuICAgICAgc3RyZWV0OiB0aGlzLnN0cmVldCxcclxuICAgICAgaG9tZTogdGhpcy5ob21lLFxyXG4gICAgICBuYW1lOiB0aGlzLm5hbWUgfHwgJycsXHJcbiAgICAgIGhvdXNpbmc6IHRoaXMuaG91c2luZyB8fCAnJyxcclxuICAgICAgaW5kZXg6IHRoaXMuaW5kZXggfHwgJycsXHJcbiAgICAgIGVudHJhbmNlOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxyXG4gICAgICBmbG9vcjogdGhpcy5mbG9vciB8fCAnJyxcclxuICAgICAgYXBhcnRtZW50OiB0aGlzLmFwYXJ0bWVudCB8fCAnJyxcclxuICAgICAgZG9vcnBob25lOiB0aGlzLmRvb3JwaG9uZSB8fCAnJ1xyXG4gICAgfTtcclxuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgICAgIC5hZGRBZGRyZXNzKGRhdGEpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXHJcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=