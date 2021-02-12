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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdXNlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy93ZWJyZXN0by9uZy11c2VyL3NyYy9saWIvbmctdXNlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBOEIvRSxNQUFNLE9BQU8sWUFBWTs7O1lBNUJ4QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFO29CQUNaLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO29CQUMxQixnQkFBZ0I7b0JBQ2hCLDhCQUE4QjtvQkFDOUIsc0JBQXNCO29CQUN0QixtQkFBbUI7b0JBQ25CLHNCQUFzQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLHNCQUFzQjtvQkFDdEIsMEJBQTBCO29CQUMxQixnQkFBZ0I7b0JBQ2hCLDhCQUE4QjtvQkFDOUIsc0JBQXNCO29CQUN0QixtQkFBbUI7b0JBQ25CLHNCQUFzQjtpQkFDdkI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNpZ25VcERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zaWduLXVwLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFNpZ25JbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zaWduLWluLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFNpZ25PdXREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2lnbi1vdXQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgUmVzZXRQYXNzd29yZERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9yZXNldC1wYXNzd29yZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29kZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9yZXNldC1wYXNzd29yZC1jb2RlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEJhbGFuY2VEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYmFsYW5jZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUb2dnbGVEaXNoVG9GYXZvcml0ZXNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdXBkYXRlLXByb2ZpbGUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQWRkQWRkcmVzc0RpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvYWRkLWFkZHJlc3MuZGlyZWN0aXZlXCI7XHJcbmltcG9ydCB7IERlbGV0ZUFkZHJlc3NEaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2RlbGV0ZS1hZGRyZXNzLmRpcmVjdGl2ZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXSxcclxuICBwcm92aWRlcnM6IFtdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgU2lnblVwRGlyZWN0aXZlLFxyXG4gICAgU2lnbkluRGlyZWN0aXZlLFxyXG4gICAgU2lnbk91dERpcmVjdGl2ZSxcclxuICAgIFJlc2V0UGFzc3dvcmREaXJlY3RpdmUsXHJcbiAgICBSZXNldFBhc3N3b3JkQ29kZURpcmVjdGl2ZSxcclxuICAgIEJhbGFuY2VEaXJlY3RpdmUsXHJcbiAgICBUb2dnbGVEaXNoVG9GYXZvcml0ZXNEaXJlY3RpdmUsXHJcbiAgICBVcGRhdGVQcm9maWxlRGlyZWN0aXZlLFxyXG4gICAgQWRkQWRkcmVzc0RpcmVjdGl2ZSxcclxuICAgIERlbGV0ZUFkZHJlc3NEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFNpZ25VcERpcmVjdGl2ZSxcclxuICAgIFNpZ25JbkRpcmVjdGl2ZSxcclxuICAgIFNpZ25PdXREaXJlY3RpdmUsXHJcbiAgICBSZXNldFBhc3N3b3JkRGlyZWN0aXZlLFxyXG4gICAgUmVzZXRQYXNzd29yZENvZGVEaXJlY3RpdmUsXHJcbiAgICBCYWxhbmNlRGlyZWN0aXZlLFxyXG4gICAgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlLFxyXG4gICAgVXBkYXRlUHJvZmlsZURpcmVjdGl2ZSxcclxuICAgIEFkZEFkZHJlc3NEaXJlY3RpdmUsXHJcbiAgICBEZWxldGVBZGRyZXNzRGlyZWN0aXZlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdVc2VyTW9kdWxlIHsgfVxyXG4iXX0=