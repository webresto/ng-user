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
import * as i0 from "@angular/core";
const DIRECTIVES = [
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
];
export class NgUserModule {
}
NgUserModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgUserModule });
NgUserModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgUserModule_Factory(t) { return new (t || NgUserModule)(); }, providers: [], imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgUserModule, { declarations: [SignUpDirective,
        SignInDirective,
        SignOutDirective,
        ResetPasswordDirective,
        ResetPasswordCodeDirective,
        BalanceDirective,
        ToggleDishToFavoritesDirective,
        UpdateProfileDirective,
        AddAddressDirective,
        DeleteAddressDirective], exports: [SignUpDirective,
        SignInDirective,
        SignOutDirective,
        ResetPasswordDirective,
        ResetPasswordCodeDirective,
        BalanceDirective,
        ToggleDishToFavoritesDirective,
        UpdateProfileDirective,
        AddAddressDirective,
        DeleteAddressDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgUserModule, [{
        type: NgModule,
        args: [{
                imports: [],
                providers: [],
                declarations: [...DIRECTIVES],
                exports: [...DIRECTIVES]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdXNlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbGFyY2hlbmtvdi9mcm9udGVuZC9wcm9qZWN0cy93ZWJyZXN0by9uZy11c2VyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9uZy11c2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDakcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7O0FBRS9FLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLGVBQWU7SUFDZixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLHNCQUFzQjtJQUN0QiwwQkFBMEI7SUFDMUIsZ0JBQWdCO0lBQ2hCLDhCQUE4QjtJQUM5QixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHNCQUFzQjtDQUN2QixDQUFDO0FBUUYsTUFBTSxPQUFPLFlBQVk7O2dEQUFaLFlBQVk7dUdBQVosWUFBWSxtQkFKWixFQUFFLFlBREosRUFBRTt3RkFLQSxZQUFZLG1CQWxCdkIsZUFBZTtRQUNmLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUMxQixnQkFBZ0I7UUFDaEIsOEJBQThCO1FBQzlCLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsc0JBQXNCLGFBVHRCLGVBQWU7UUFDZixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFDMUIsZ0JBQWdCO1FBQ2hCLDhCQUE4QjtRQUM5QixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLHNCQUFzQjtrREFTWCxZQUFZO2NBTnhCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUUsRUFBRTtnQkFDYixZQUFZLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7YUFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU2lnblVwRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NpZ24tdXAuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgU2lnbkluRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NpZ24taW4uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgU2lnbk91dERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zaWduLW91dC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLWNvZGUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQmFsYW5jZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9iYWxhbmNlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90b2dnbGUtZGlzaC10by1mYXZvcml0ZXMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy91cGRhdGUtcHJvZmlsZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBBZGRBZGRyZXNzRGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9hZGQtYWRkcmVzcy5kaXJlY3RpdmVcIjtcclxuaW1wb3J0IHsgRGVsZXRlQWRkcmVzc0RpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvZGVsZXRlLWFkZHJlc3MuZGlyZWN0aXZlXCI7XHJcblxyXG5jb25zdCBESVJFQ1RJVkVTID0gW1xyXG4gIFNpZ25VcERpcmVjdGl2ZSxcclxuICBTaWduSW5EaXJlY3RpdmUsXHJcbiAgU2lnbk91dERpcmVjdGl2ZSxcclxuICBSZXNldFBhc3N3b3JkRGlyZWN0aXZlLFxyXG4gIFJlc2V0UGFzc3dvcmRDb2RlRGlyZWN0aXZlLFxyXG4gIEJhbGFuY2VEaXJlY3RpdmUsXHJcbiAgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlLFxyXG4gIFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmUsXHJcbiAgQWRkQWRkcmVzc0RpcmVjdGl2ZSxcclxuICBEZWxldGVBZGRyZXNzRGlyZWN0aXZlXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtdLFxyXG4gIHByb3ZpZGVyczogW10sXHJcbiAgZGVjbGFyYXRpb25zOiBbLi4uRElSRUNUSVZFU10sXHJcbiAgZXhwb3J0czogWy4uLkRJUkVDVElWRVNdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1VzZXJNb2R1bGUgeyB9XHJcbiJdfQ==