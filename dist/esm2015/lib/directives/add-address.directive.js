import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
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
AddAddressDirective.ɵdir = i0.ɵɵdefineDirective({ type: AddAddressDirective, selectors: [["", "rstAddAddress", ""]], hostBindings: function AddAddressDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function AddAddressDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { street: "street", home: "home", name: "name", housing: "housing", index: "index", entrance: "entrance", floor: "floor", apartment: "apartment", doorphone: "doorphone" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AddAddressDirective, [{
        type: Directive,
        args: [{
                selector: '[rstAddAddress]'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3Byb2plY3RzL3dlYnJlc3RvL25nLXVzZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvYWRkLWFkZHJlc3MuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPckYsTUFBTSxPQUFPLG1CQUFtQjtJQWU5QixZQUNVLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBSnRDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBSXpDLENBQUM7SUFHTCxPQUFPO1FBQ0wsSUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUNyRDtRQUNELElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUFDLE9BQU87U0FDMUQ7UUFFRCxJQUFJLElBQUksR0FBeUI7WUFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRTtZQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUU7WUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFO1lBQy9CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUU7U0FDaEMsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsVUFBVSxDQUFDLElBQUksQ0FBQzthQUNoQixTQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7SUFDTixDQUFDOztzRkE3Q1UsbUJBQW1CO3dEQUFuQixtQkFBbUI7Z0dBQW5CLGFBQVM7O2tEQUFULG1CQUFtQjtjQUgvQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjthQUM1QjtxRUFHVSxNQUFNO2tCQUFkLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFFSSxPQUFPO2tCQUFoQixNQUFNO1lBQ0csS0FBSztrQkFBZCxNQUFNO1lBT1AsT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFkZEFkZHJlc3NSZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uL21vZGVscyc7XHJcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tyc3RBZGRBZGRyZXNzXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFkZEFkZHJlc3NEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBzdHJlZXQ6c3RyaW5nOyAgICAgLy9yZXF1aXJlZFxyXG4gIEBJbnB1dCgpIGhvbWU6c3RyaW5nOyAgICAgICAvL3JlcXVpcmVkXHJcbiAgQElucHV0KCkgbmFtZTpzdHJpbmc7XHJcbiAgQElucHV0KCkgaG91c2luZzpzdHJpbmc7XHJcbiAgQElucHV0KCkgaW5kZXg6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGVudHJhbmNlOnN0cmluZztcclxuICBASW5wdXQoKSBmbG9vcjpzdHJpbmc7XHJcbiAgQElucHV0KCkgYXBhcnRtZW50OnN0cmluZztcclxuICBASW5wdXQoKSBkb29ycGhvbmU6c3RyaW5nO1xyXG5cclxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKSB7XHJcbiAgICBpZighdGhpcy5zdHJlZXQpIHtcclxuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDRg9C70LjRhtGDJyk7IHJldHVybjtcclxuICAgIH1cclxuICAgIGlmKCF0aGlzLmhvbWUpIHtcclxuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDQvdC+0LzQtdGAINC00L7QvNCwJyk7IHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZGF0YTpBZGRBZGRyZXNzUmVxdWVzdERhdGEgPSB7XHJcbiAgICAgIHN0cmVldDogdGhpcy5zdHJlZXQsXHJcbiAgICAgIGhvbWU6IHRoaXMuaG9tZSxcclxuICAgICAgbmFtZTogdGhpcy5uYW1lIHx8ICcnLFxyXG4gICAgICBob3VzaW5nOiB0aGlzLmhvdXNpbmcgfHwgJycsXHJcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4IHx8ICcnLFxyXG4gICAgICBlbnRyYW5jZTogdGhpcy5lbnRyYW5jZSB8fCAnJyxcclxuICAgICAgZmxvb3I6IHRoaXMuZmxvb3IgfHwgJycsXHJcbiAgICAgIGFwYXJ0bWVudDogdGhpcy5hcGFydG1lbnQgfHwgJycsXHJcbiAgICAgIGRvb3JwaG9uZTogdGhpcy5kb29ycGhvbmUgfHwgJydcclxuICAgIH07XHJcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICAgICAuYWRkQWRkcmVzcyhkYXRhKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIl19