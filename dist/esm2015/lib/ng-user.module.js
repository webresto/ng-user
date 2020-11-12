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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdXNlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsibGliL25nLXVzZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFFL0UsTUFBTSxVQUFVLEdBQUc7SUFDakIsZUFBZTtJQUNmLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLDBCQUEwQjtJQUMxQixnQkFBZ0I7SUFDaEIsOEJBQThCO0lBQzlCLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsc0JBQXNCO0NBQ3ZCLENBQUM7QUFRRixNQUFNLE9BQU8sWUFBWTs7Z0RBQVosWUFBWTt1R0FBWixZQUFZLG1CQUpaLEVBQUUsWUFESixFQUFFO3dGQUtBLFlBQVksbUJBbEJ2QixlQUFlO1FBQ2YsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixzQkFBc0I7UUFDdEIsMEJBQTBCO1FBQzFCLGdCQUFnQjtRQUNoQiw4QkFBOEI7UUFDOUIsc0JBQXNCO1FBQ3RCLG1CQUFtQjtRQUNuQixzQkFBc0IsYUFUdEIsZUFBZTtRQUNmLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUMxQixnQkFBZ0I7UUFDaEIsOEJBQThCO1FBQzlCLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsc0JBQXNCO2tEQVNYLFlBQVk7Y0FOeEIsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBRSxFQUFFO2dCQUNiLFlBQVksRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQzthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTaWduVXBEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2lnbi11cC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBTaWduSW5EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2lnbi1pbi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBTaWduT3V0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NpZ24tb3V0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVzZXQtcGFzc3dvcmQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvZGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVzZXQtcGFzc3dvcmQtY29kZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBCYWxhbmNlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2JhbGFuY2UuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RvZ2dsZS1kaXNoLXRvLWZhdm9yaXRlcy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBVcGRhdGVQcm9maWxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3VwZGF0ZS1wcm9maWxlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEFkZEFkZHJlc3NEaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2FkZC1hZGRyZXNzLmRpcmVjdGl2ZVwiO1xyXG5pbXBvcnQgeyBEZWxldGVBZGRyZXNzRGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9kZWxldGUtYWRkcmVzcy5kaXJlY3RpdmVcIjtcclxuXHJcbmNvbnN0IERJUkVDVElWRVMgPSBbXHJcbiAgU2lnblVwRGlyZWN0aXZlLFxyXG4gIFNpZ25JbkRpcmVjdGl2ZSxcclxuICBTaWduT3V0RGlyZWN0aXZlLFxyXG4gIFJlc2V0UGFzc3dvcmREaXJlY3RpdmUsXHJcbiAgUmVzZXRQYXNzd29yZENvZGVEaXJlY3RpdmUsXHJcbiAgQmFsYW5jZURpcmVjdGl2ZSxcclxuICBUb2dnbGVEaXNoVG9GYXZvcml0ZXNEaXJlY3RpdmUsXHJcbiAgVXBkYXRlUHJvZmlsZURpcmVjdGl2ZSxcclxuICBBZGRBZGRyZXNzRGlyZWN0aXZlLFxyXG4gIERlbGV0ZUFkZHJlc3NEaXJlY3RpdmVcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW10sXHJcbiAgcHJvdmlkZXJzOiBbXSxcclxuICBkZWNsYXJhdGlvbnM6IFsuLi5ESVJFQ1RJVkVTXSxcclxuICBleHBvcnRzOiBbLi4uRElSRUNUSVZFU11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nVXNlck1vZHVsZSB7IH1cclxuIl19