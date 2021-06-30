import { Directive, Renderer2, ElementRef } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export class BalanceDirective {
    constructor(renderer, el, ngRestoUserService) {
        this.renderer = renderer;
        this.el = el;
        this.ngRestoUserService = ngRestoUserService;
        let balance = 0;
        this.ngRestoUserService
            .getBonuses()
            .subscribe(bonuses => {
            for (let name in bonuses) {
                const data = bonuses[name];
                if (data.state == 'active') {
                    balance += data.balance;
                }
            }
            this.amount = `${balance}`;
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        });
    }
}
BalanceDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstBalance]'
            },] }
];
BalanceDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgRestoUserService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy93ZWJyZXN0by9uZy11c2VyL3NyYy9saWIvZGlyZWN0aXZlcy9iYWxhbmNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFLdkUsTUFBTSxPQUFPLGdCQUFnQjtJQUkzQixZQUNVLFFBQW1CLEVBQ25CLEVBQWMsRUFDZCxrQkFBc0M7UUFGdEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUU5QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixVQUFVLEVBQUU7YUFDWixTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkIsS0FBSSxJQUFJLElBQUksSUFBSSxPQUFPLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFBRTtvQkFDekIsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7aUJBQ3pCO2FBQ0Y7WUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7OztZQTNCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7YUFDekI7OztZQUxtQixTQUFTO1lBQUUsVUFBVTtZQUNoQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFJlbmRlcmVyMiwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3JzdEJhbGFuY2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBCYWxhbmNlRGlyZWN0aXZlIHtcblxuICBhbW91bnQ6c3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7XG4gICAgbGV0IGJhbGFuY2UgPSAwO1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuZ2V0Qm9udXNlcygpXG4gICAgICAuc3Vic2NyaWJlKGJvbnVzZXMgPT4ge1xuICAgICAgICBmb3IobGV0IG5hbWUgaW4gYm9udXNlcykge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBib251c2VzW25hbWVdO1xuICAgICAgICAgIGlmKGRhdGEuc3RhdGUgPT0gJ2FjdGl2ZScpIHtcbiAgICAgICAgICAgIGJhbGFuY2UgKz0gZGF0YS5iYWxhbmNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYW1vdW50ID0gYCR7YmFsYW5jZX1gO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsIHRoaXMuYW1vdW50KTtcbiAgICAgIH0pO1xuXG4gIH1cblxufVxuIl19