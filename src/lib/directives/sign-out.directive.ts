import { Directive, HostListener, Input } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';

import { SignInRequestData } from '../interfaces/sign-in-request-data';

@Directive({
  selector: '[appSignOut]'
})
export class SignOutDirective {

  constructor(
    private ngRestoUserService: NgRestoUserService
  ) { }

  @HostListener('click')
  onClick() {
    this.ngRestoUserService.signOut();
  }

}
