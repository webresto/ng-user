import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
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
        if (!this.streetId) {
            this.error.emit('Необходимо указать streetId');
            return;
        }
        if (!this.home) {
            this.error.emit('Необходимо указать номер дома');
            return;
        }
        let data = {
            street: this.street,
            streetId: this.streetId,
            home: this.home,
            name: this.name || '',
            housing: this.housing || '',
            index: this.index || '',
            entrance: this.entrance || '',
            floor: this.floor || '',
            apartment: this.apartment || '',
            doorphone: this.doorphone || ''
        };
        const req = this.ngRestoUserService.addAddress(data).subscribe(() => this.success.emit(true), error => this.error.emit(error), () => req.unsubscribe());
    }
}
AddAddressDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstAddAddress]'
            },] }
];
AddAddressDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
AddAddressDirective.propDecorators = {
    street: [{ type: Input }],
    streetId: [{ type: Input }],
    home: [{ type: Input }],
    name: [{ type: Input }],
    housing: [{ type: Input }],
    index: [{ type: Input }],
    entrance: [{ type: Input }],
    floor: [{ type: Input }],
    apartment: [{ type: Input }],
    doorphone: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3Byb2plY3RzL3dlYnJlc3RvL25nLXVzZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvYWRkLWFkZHJlc3MuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBS3ZFLE1BQU0sT0FBTyxtQkFBbUI7SUFnQjlCLFlBQ1Usa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFKdEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFJekMsQ0FBQztJQUdMLE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUNyRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFBQyxPQUFPO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUMxRDtRQUVELElBQUksSUFBSSxHQUEwQjtZQUNoQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRTtZQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUU7WUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFO1lBQy9CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUU7U0FDaEMsQ0FBQztRQUNGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUM1RCxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFDL0IsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUN4QixDQUFDO0lBQ0osQ0FBQzs7O1lBcERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2FBQzVCOzs7WUFKUSxrQkFBa0I7OztxQkFPeEIsS0FBSzt1QkFDTCxLQUFLO21CQUNMLEtBQUs7bUJBQ0wsS0FBSztzQkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSztzQkFFTCxNQUFNO29CQUNOLE1BQU07c0JBTU4sWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFkZEFkZHJlc3NSZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uL21vZGVscyc7XHJcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tyc3RBZGRBZGRyZXNzXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFkZEFkZHJlc3NEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBzdHJlZXQ6IHN0cmluZzsgICAgIC8vcmVxdWlyZWRcclxuICBASW5wdXQoKSBzdHJlZXRJZDogc3RyaW5nOyAgICAgLy9yZXF1aXJlZFxyXG4gIEBJbnB1dCgpIGhvbWU6IHN0cmluZzsgICAgICAgLy9yZXF1aXJlZFxyXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSBob3VzaW5nOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgaW5kZXg6IHN0cmluZztcclxuICBASW5wdXQoKSBlbnRyYW5jZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZsb29yOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYXBhcnRtZW50OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZG9vcnBob25lOiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIGlmICghdGhpcy5zdHJlZXQpIHtcclxuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDRg9C70LjRhtGDJyk7IHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zdHJlZXRJZCkge1xyXG4gICAgICB0aGlzLmVycm9yLmVtaXQoJ9Cd0LXQvtCx0YXQvtC00LjQvNC+INGD0LrQsNC30LDRgtGMIHN0cmVldElkJyk7IHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5ob21lKSB7XHJcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgn0J3QtdC+0LHRhdC+0LTQuNC80L4g0YPQutCw0LfQsNGC0Ywg0L3QvtC80LXRgCDQtNC+0LzQsCcpOyByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRhdGE6IEFkZEFkZHJlc3NSZXF1ZXN0RGF0YSA9IHtcclxuICAgICAgc3RyZWV0OiB0aGlzLnN0cmVldCxcclxuICAgICAgc3RyZWV0SWQ6IHRoaXMuc3RyZWV0SWQsXHJcbiAgICAgIGhvbWU6IHRoaXMuaG9tZSxcclxuICAgICAgbmFtZTogdGhpcy5uYW1lIHx8ICcnLFxyXG4gICAgICBob3VzaW5nOiB0aGlzLmhvdXNpbmcgfHwgJycsXHJcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4IHx8ICcnLFxyXG4gICAgICBlbnRyYW5jZTogdGhpcy5lbnRyYW5jZSB8fCAnJyxcclxuICAgICAgZmxvb3I6IHRoaXMuZmxvb3IgfHwgJycsXHJcbiAgICAgIGFwYXJ0bWVudDogdGhpcy5hcGFydG1lbnQgfHwgJycsXHJcbiAgICAgIGRvb3JwaG9uZTogdGhpcy5kb29ycGhvbmUgfHwgJydcclxuICAgIH07XHJcbiAgICBjb25zdCByZXEgPSB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZS5hZGRBZGRyZXNzKGRhdGEpLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXHJcbiAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvciksXHJcbiAgICAgICgpID0+IHJlcS51bnN1YnNjcmliZSgpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=