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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWFkZHJlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvd2VicmVzdG8vbmctdXNlci9zcmMvbGliL2RpcmVjdGl2ZXMvYWRkLWFkZHJlc3MuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBS3ZFLE1BQU0sT0FBTyxtQkFBbUI7SUFnQjlCLFlBQ1Usa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFKdEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFJekMsQ0FBQztJQUdMLE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUNyRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFBQyxPQUFPO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUMxRDtRQUVELElBQUksSUFBSSxHQUEwQjtZQUNoQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRTtZQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUU7WUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFO1lBQy9CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUU7U0FDaEMsQ0FBQztRQUNGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUM1RCxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFDL0IsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUN4QixDQUFDO0lBQ0osQ0FBQzs7O1lBcERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2FBQzVCOzs7WUFKUSxrQkFBa0I7OztxQkFPeEIsS0FBSzt1QkFDTCxLQUFLO21CQUNMLEtBQUs7bUJBQ0wsS0FBSztzQkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSztzQkFFTCxNQUFNO29CQUNOLE1BQU07c0JBTU4sWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZGRBZGRyZXNzUmVxdWVzdERhdGEgfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3JzdEFkZEFkZHJlc3NdJ1xufSlcbmV4cG9ydCBjbGFzcyBBZGRBZGRyZXNzRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBzdHJlZXQ6IHN0cmluZzsgICAgIC8vcmVxdWlyZWRcbiAgQElucHV0KCkgc3RyZWV0SWQ6IHN0cmluZzsgICAgIC8vcmVxdWlyZWRcbiAgQElucHV0KCkgaG9tZTogc3RyaW5nOyAgICAgICAvL3JlcXVpcmVkXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgaG91c2luZzogc3RyaW5nO1xuICBASW5wdXQoKSBpbmRleDogc3RyaW5nO1xuICBASW5wdXQoKSBlbnRyYW5jZTogc3RyaW5nO1xuICBASW5wdXQoKSBmbG9vcjogc3RyaW5nO1xuICBASW5wdXQoKSBhcGFydG1lbnQ6IHN0cmluZztcbiAgQElucHV0KCkgZG9vcnBob25lOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgaWYgKCF0aGlzLnN0cmVldCkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDRg9C70LjRhtGDJyk7IHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnN0cmVldElkKSB7XG4gICAgICB0aGlzLmVycm9yLmVtaXQoJ9Cd0LXQvtCx0YXQvtC00LjQvNC+INGD0LrQsNC30LDRgtGMIHN0cmVldElkJyk7IHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmhvbWUpIHtcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgn0J3QtdC+0LHRhdC+0LTQuNC80L4g0YPQutCw0LfQsNGC0Ywg0L3QvtC80LXRgCDQtNC+0LzQsCcpOyByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGRhdGE6IEFkZEFkZHJlc3NSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIHN0cmVldDogdGhpcy5zdHJlZXQsXG4gICAgICBzdHJlZXRJZDogdGhpcy5zdHJlZXRJZCxcbiAgICAgIGhvbWU6IHRoaXMuaG9tZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSB8fCAnJyxcbiAgICAgIGhvdXNpbmc6IHRoaXMuaG91c2luZyB8fCAnJyxcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4IHx8ICcnLFxuICAgICAgZW50cmFuY2U6IHRoaXMuZW50cmFuY2UgfHwgJycsXG4gICAgICBmbG9vcjogdGhpcy5mbG9vciB8fCAnJyxcbiAgICAgIGFwYXJ0bWVudDogdGhpcy5hcGFydG1lbnQgfHwgJycsXG4gICAgICBkb29ycGhvbmU6IHRoaXMuZG9vcnBob25lIHx8ICcnXG4gICAgfTtcbiAgICBjb25zdCByZXEgPSB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZS5hZGRBZGRyZXNzKGRhdGEpLnN1YnNjcmliZShcbiAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKSxcbiAgICAgICgpID0+IHJlcS51bnN1YnNjcmliZSgpXG4gICAgKTtcbiAgfVxufVxuIl19