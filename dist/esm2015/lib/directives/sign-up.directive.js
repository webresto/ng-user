import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export class SignUpDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        let data = {
            name: this.name,
            phone: this.preparePhone(this.phone),
            email: this.email,
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signUp(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
    preparePhone(phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
    }
}
SignUpDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstSignUp]'
            },] }
];
SignUpDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
SignUpDirective.propDecorators = {
    name: [{ type: Input }],
    phone: [{ type: Input }],
    email: [{ type: Input }],
    password: [{ type: Input }],
    captcha: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy93ZWJyZXN0by9uZy11c2VyL3NyYy9saWIvZGlyZWN0aXZlcy9zaWduLXVwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUt2RSxNQUFNLE9BQU8sZUFBZTtJQVUxQixZQUNVLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBSnRDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBSXpDLENBQUM7SUFHTCxPQUFPO1FBQ0wsSUFBSSxJQUFJLEdBQXFCO1lBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNaLFNBQVMsQ0FDUixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDaEMsQ0FBQztJQUNOLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBSztRQUNoQixLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7O1lBckNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTthQUN4Qjs7O1lBSlEsa0JBQWtCOzs7bUJBT3hCLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxNQUFNO29CQUNOLE1BQU07c0JBTU4sWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaWduVXBSZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uL21vZGVscyc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcnN0U2lnblVwXSdcbn0pXG5leHBvcnQgY2xhc3MgU2lnblVwRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcbiAgQElucHV0KCkgcGhvbmU6c3RyaW5nO1xuICBASW5wdXQoKSBlbWFpbDpzdHJpbmc7XG4gIEBJbnB1dCgpIHBhc3N3b3JkOnN0cmluZztcbiAgQElucHV0KCkgY2FwdGNoYTpzdHJpbmc7XG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGxldCBkYXRhOlNpZ25VcFJlcXVlc3REYXRhID0ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgcGhvbmU6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgZW1haWw6IHRoaXMuZW1haWwsXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgIGNhcHRjaGE6IHRoaXMuY2FwdGNoYVxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5zaWduVXAoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnJyk7XG4gIH1cbn1cbiJdfQ==