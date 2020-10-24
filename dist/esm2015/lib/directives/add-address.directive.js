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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL1Byb2Zlc3Npb25hbC9mcm9udGVuZC9wcm9qZWN0cy93ZWJyZXN0by9uZy11c2VyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2FkZC1hZGRyZXNzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7O0FBT3ZFLE1BQU0sT0FBTyxtQkFBbUI7SUFlOUIsWUFDVSxrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUp0QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUl6QyxDQUFDO0lBR0wsT0FBTztRQUNMLElBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUFDLE9BQU87U0FDckQ7UUFDRCxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFBQyxPQUFPO1NBQzFEO1FBRUQsSUFBSSxJQUFJLEdBQXlCO1lBQy9CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUU7WUFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFO1lBQzdCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTtZQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFO1NBQ2hDLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDaEIsU0FBUyxDQUNSLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM3QixLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNoQyxDQUFDO0lBQ04sQ0FBQzs7c0ZBN0NVLG1CQUFtQjt3REFBbkIsbUJBQW1CO2dHQUFuQixhQUFTOztrREFBVCxtQkFBbUI7Y0FIL0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7YUFDNUI7cUVBR1UsTUFBTTtrQkFBZCxLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBRUksT0FBTztrQkFBaEIsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQU9QLE9BQU87a0JBRE4sWUFBWTttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQWRkQWRkcmVzc1JlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hZGQtYWRkcmVzcy1yZXF1ZXN0LWRhdGEnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwQWRkQWRkcmVzc10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGRBZGRyZXNzRGlyZWN0aXZlIHtcclxuXHJcbiAgQElucHV0KCkgc3RyZWV0OnN0cmluZzsgICAgIC8vcmVxdWlyZWRcclxuICBASW5wdXQoKSBob21lOnN0cmluZzsgICAgICAgLy9yZXF1aXJlZFxyXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGhvdXNpbmc6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGluZGV4OnN0cmluZztcclxuICBASW5wdXQoKSBlbnRyYW5jZTpzdHJpbmc7XHJcbiAgQElucHV0KCkgZmxvb3I6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGFwYXJ0bWVudDpzdHJpbmc7XHJcbiAgQElucHV0KCkgZG9vcnBob25lOnN0cmluZztcclxuXHJcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgaWYoIXRoaXMuc3RyZWV0KSB7XHJcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgn0J3QtdC+0LHRhdC+0LTQuNC80L4g0YPQutCw0LfQsNGC0Ywg0YPQu9C40YbRgycpOyByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZighdGhpcy5ob21lKSB7XHJcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgn0J3QtdC+0LHRhdC+0LTQuNC80L4g0YPQutCw0LfQsNGC0Ywg0L3QvtC80LXRgCDQtNC+0LzQsCcpOyByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRhdGE6QWRkQWRkcmVzc1JlcXVlc3REYXRhID0ge1xyXG4gICAgICBzdHJlZXQ6IHRoaXMuc3RyZWV0LFxyXG4gICAgICBob21lOiB0aGlzLmhvbWUsXHJcbiAgICAgIG5hbWU6IHRoaXMubmFtZSB8fCAnJyxcclxuICAgICAgaG91c2luZzogdGhpcy5ob3VzaW5nIHx8ICcnLFxyXG4gICAgICBpbmRleDogdGhpcy5pbmRleCB8fCAnJyxcclxuICAgICAgZW50cmFuY2U6IHRoaXMuZW50cmFuY2UgfHwgJycsXHJcbiAgICAgIGZsb29yOiB0aGlzLmZsb29yIHx8ICcnLFxyXG4gICAgICBhcGFydG1lbnQ6IHRoaXMuYXBhcnRtZW50IHx8ICcnLFxyXG4gICAgICBkb29ycGhvbmU6IHRoaXMuZG9vcnBob25lIHx8ICcnXHJcbiAgICB9O1xyXG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcclxuICAgICAgLmFkZEFkZHJlc3MoZGF0YSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==