import { NgModule } from '@angular/core';
import { SignUpDirective } from './directives/sign-up.directive';
import { SignInDirective } from './directives/sign-in.directive';
import { SignOutDirective } from './directives/sign-out.directive';
import { ResetPasswordDirective } from './directives/reset-password.directive';
import { ResetPasswordCodeDirective } from './directives/reset-password-code.directive';
import { BalanceDirective } from './directives/balance.directive';
import { ToggleDishToFavoritesDirective } from './directives/toggle-dish-to-favorites.directive';
import { UpdateProfileDirective } from './directives/update-profile.directive';
import { AddAddressDirective } from "./directives/add-address.directive";
import { DeleteAddressDirective } from "./directives/delete-address.directive";
export class NgUserModule {
}
NgUserModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                providers: [],
                declarations: [
                    SignUpDirective,
                    SignInDirective,
                    SignOutDirective,
                    ResetPasswordDirective,
                    ResetPasswordCodeDirective,
                    BalanceDirective,
                    ToggleDishToFavoritesDirective,
                    UpdateProfileDirective,
                    AddAddressDirective,
                    DeleteAddressDirective
                ],
                exports: [
                    SignUpDirective,
                    SignInDirective,
                    SignOutDirective,
                    ResetPasswordDirective,
                    ResetPasswordCodeDirective,
                    BalanceDirective,
                    ToggleDishToFavoritesDirective,
                    UpdateProfileDirective,
                    AddAddressDirective,
                    DeleteAddressDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdXNlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy93ZWJyZXN0by9uZy11c2VyL3NyYy9saWIvbmctdXNlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBOEIvRSxNQUFNLE9BQU8sWUFBWTs7O1lBNUJ4QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFO29CQUNaLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO29CQUMxQixnQkFBZ0I7b0JBQ2hCLDhCQUE4QjtvQkFDOUIsc0JBQXNCO29CQUN0QixtQkFBbUI7b0JBQ25CLHNCQUFzQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO29CQUMxQixnQkFBZ0I7b0JBQ2hCLDhCQUE4QjtvQkFDOUIsc0JBQXNCO29CQUN0QixtQkFBbUI7b0JBQ25CLHNCQUFzQjtpQkFDdkI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaWduVXBEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2lnbi11cC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2lnbkluRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NpZ24taW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNpZ25PdXREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2lnbi1vdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVzZXQtcGFzc3dvcmQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLWNvZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJhbGFuY2VEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYmFsYW5jZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RvZ2dsZS1kaXNoLXRvLWZhdm9yaXRlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy91cGRhdGUtcHJvZmlsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWRkQWRkcmVzc0RpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvYWRkLWFkZHJlc3MuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBEZWxldGVBZGRyZXNzRGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9kZWxldGUtYWRkcmVzcy5kaXJlY3RpdmVcIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW10sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFNpZ25VcERpcmVjdGl2ZSxcbiAgICBTaWduSW5EaXJlY3RpdmUsXG4gICAgU2lnbk91dERpcmVjdGl2ZSxcbiAgICBSZXNldFBhc3N3b3JkRGlyZWN0aXZlLFxuICAgIFJlc2V0UGFzc3dvcmRDb2RlRGlyZWN0aXZlLFxuICAgIEJhbGFuY2VEaXJlY3RpdmUsXG4gICAgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlLFxuICAgIFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmUsXG4gICAgQWRkQWRkcmVzc0RpcmVjdGl2ZSxcbiAgICBEZWxldGVBZGRyZXNzRGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTaWduVXBEaXJlY3RpdmUsXG4gICAgU2lnbkluRGlyZWN0aXZlLFxuICAgIFNpZ25PdXREaXJlY3RpdmUsXG4gICAgUmVzZXRQYXNzd29yZERpcmVjdGl2ZSxcbiAgICBSZXNldFBhc3N3b3JkQ29kZURpcmVjdGl2ZSxcbiAgICBCYWxhbmNlRGlyZWN0aXZlLFxuICAgIFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSxcbiAgICBVcGRhdGVQcm9maWxlRGlyZWN0aXZlLFxuICAgIEFkZEFkZHJlc3NEaXJlY3RpdmUsXG4gICAgRGVsZXRlQWRkcmVzc0RpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nVXNlck1vZHVsZSB7IH1cbiJdfQ==