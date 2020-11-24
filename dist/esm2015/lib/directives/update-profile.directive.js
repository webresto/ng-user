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
            additionalInfo: this.additionalInfo,
            birthday: this.birthday
        };
        this.ngRestoUserService
            .updateProfile(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
UpdateProfileDirective.ɵfac = function UpdateProfileDirective_Factory(t) { return new (t || UpdateProfileDirective)(i0.ɵɵdirectiveInject(i1.NgRestoUserService)); };
UpdateProfileDirective.ɵdir = i0.ɵɵdefineDirective({ type: UpdateProfileDirective, selectors: [["", "appUpdateProfile", ""]], hostBindings: function UpdateProfileDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function UpdateProfileDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { name: "name", phone: "phone", email: "email", additionalInfo: "additionalInfo", birthday: "birthday" }, outputs: { success: "success", error: "error" } });
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
        }], additionalInfo: [{
            type: Input
        }], birthday: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXByb2ZpbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3VwZGF0ZS1wcm9maWxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBT3JGLE1BQU0sT0FBTyxzQkFBc0I7SUFXakMsWUFDVSxrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUp0QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUl6QyxDQUFDO0lBR0wsT0FBTztRQUNMLElBQUksSUFBSSxHQUE0QjtZQUNsQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixvQkFBb0I7WUFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGNBQWMsRUFBQyxJQUFJLENBQUMsY0FBYztZQUNsQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFFBQVE7U0FDdkIsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsYUFBYSxDQUFDLElBQUksQ0FBQzthQUNuQixTQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7SUFDTixDQUFDOzs0RkE5QlUsc0JBQXNCOzJEQUF0QixzQkFBc0I7bUdBQXRCLGFBQVM7O2tEQUFULHNCQUFzQjtjQUhsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjthQUMvQjtxRUFHVSxJQUFJO2tCQUFaLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxjQUFjO2tCQUF0QixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUVJLE9BQU87a0JBQWhCLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUFPUCxPQUFPO2tCQUROLFlBQVk7bUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcclxuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FwcFVwZGF0ZVByb2ZpbGVdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVXBkYXRlUHJvZmlsZURpcmVjdGl2ZSB7XHJcblxyXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBob25lOnN0cmluZztcclxuICBASW5wdXQoKSBlbWFpbDpzdHJpbmc7XHJcbiAgQElucHV0KCkgYWRkaXRpb25hbEluZm86c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGJpcnRoZGF5OnN0cmluZztcclxuXHJcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgbGV0IGRhdGE6VXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhID0ge1xyXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgIC8vcGhvbmU6IHRoaXMucGhvbmUsXHJcbiAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxyXG4gICAgICBhZGRpdGlvbmFsSW5mbzp0aGlzLmFkZGl0aW9uYWxJbmZvLFxyXG4gICAgICBiaXJ0aGRheTp0aGlzLmJpcnRoZGF5XHJcbiAgICB9O1xyXG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcclxuICAgICAgLnVwZGF0ZVByb2ZpbGUoZGF0YSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==