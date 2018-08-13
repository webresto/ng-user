import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';

import { ResetPasswordRequestData } from '../interfaces/reset-password-request-data';

@Directive({
  selector: '[appResetPassword]'
})
export class ResetPasswordDirective {

  @Input() phone:string;
  @Input() password:string;
  @Input() captcha:string;
  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  constructor(
    private ngRestoUserService: NgRestoUserService
  ) { }

  @HostListener('click')
  onClick() {
    let data:ResetPasswordRequestData = {
      phone: this.phone,
      password: this.password,
      captcha: this.captcha
    };
    this.ngRestoUserService
      .resetPassword(data)
      .subscribe(
        () => this.success.emit(true),
        error => this.error.emit(error)
      );
  }

}
