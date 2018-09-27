/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { SignUpDirective } from './directives/sign-up.directive';
import { SignInDirective } from './directives/sign-in.directive';
import { SignOutDirective } from './directives/sign-out.directive';
import { ResetPasswordDirective } from './directives/reset-password.directive';
import { ResetPasswordCodeDirective } from './directives/reset-password-code.directive';
import { BalanceDirective } from './directives/balance.directive';
import { ToggleDishToFavoritesDirective } from './directives/toggle-dish-to-favorites.directive';
import { UpdateProfileDirective } from './directives/update-profile.directive';
/** @type {?} */
var DIRECTIVES = [
    SignUpDirective,
    SignInDirective,
    SignOutDirective,
    ResetPasswordDirective,
    ResetPasswordCodeDirective,
    BalanceDirective,
    ToggleDishToFavoritesDirective,
    UpdateProfileDirective
];
var NgUserModule = /** @class */ (function () {
    function NgUserModule() {
    }
    NgUserModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    providers: [],
                    declarations: tslib_1.__spread(DIRECTIVES),
                    exports: tslib_1.__spread(DIRECTIVES)
                },] },
    ];
    return NgUserModule;
}());
export { NgUserModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdXNlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2FpbHMtcmVzdG8vbmctdXNlci8iLCJzb3VyY2VzIjpbImxpYi9uZy11c2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFFL0UsSUFBTSxVQUFVLEdBQUc7SUFDakIsZUFBZTtJQUNmLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLDBCQUEwQjtJQUMxQixnQkFBZ0I7SUFDaEIsOEJBQThCO0lBQzlCLHNCQUFzQjtDQUN2QixDQUFDOzs7OztnQkFFRCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsWUFBWSxtQkFBTSxVQUFVLENBQUM7b0JBQzdCLE9BQU8sbUJBQU0sVUFBVSxDQUFDO2lCQUN6Qjs7dUJBM0JEOztTQTRCYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU2lnblVwRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NpZ24tdXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNpZ25JbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zaWduLWluLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTaWduT3V0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NpZ24tb3V0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29kZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9yZXNldC1wYXNzd29yZC1jb2RlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCYWxhbmNlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2JhbGFuY2UuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90b2dnbGUtZGlzaC10by1mYXZvcml0ZXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdXBkYXRlLXByb2ZpbGUuZGlyZWN0aXZlJztcblxuY29uc3QgRElSRUNUSVZFUyA9IFtcbiAgU2lnblVwRGlyZWN0aXZlLFxuICBTaWduSW5EaXJlY3RpdmUsXG4gIFNpZ25PdXREaXJlY3RpdmUsXG4gIFJlc2V0UGFzc3dvcmREaXJlY3RpdmUsXG4gIFJlc2V0UGFzc3dvcmRDb2RlRGlyZWN0aXZlLFxuICBCYWxhbmNlRGlyZWN0aXZlLFxuICBUb2dnbGVEaXNoVG9GYXZvcml0ZXNEaXJlY3RpdmUsXG4gIFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogWy4uLkRJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIE5nVXNlck1vZHVsZSB7IH1cbiJdfQ==