import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ResetPasswordRequestData } from '../../models';
import { NgRestoUserService } from '../services/ng-resto-user.service';

@Directive({
  selector: '[rstResetPassword]'
})
export class ResetPasswordDirective {

  @Input() phone:string;
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
