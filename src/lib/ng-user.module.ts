import { NgModule } from '@angular/core';

import { SignUpDirective } from './directives/sign-up.directive';
import { SignInDirective } from './directives/sign-in.directive';
import { SignOutDirective } from './directives/sign-out.directive';
import { ResetPasswordDirective } from './directives/reset-password.directive';
import { ResetPasswordCodeDirective } from './directives/reset-password-code.directive';
import { BalanceDirective } from './directives/balance.directive';
import { ToggleDishToFavoritesDirective } from './directives/toggle-dish-to-favorites.directive';


const DIRECTIVES = [
  SignUpDirective,
  SignInDirective,
  SignOutDirective,
  ResetPasswordDirective,
  ResetPasswordCodeDirective,
  BalanceDirective,
  ToggleDishToFavoritesDirective
];

@NgModule({
  imports: [],
  providers: [],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES]
})
export class NgUserModule { }
