import { Directive, HostListener } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';

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
