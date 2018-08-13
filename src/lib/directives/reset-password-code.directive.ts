import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';

import { ResetPasswordCodeRequestData } from '../interfaces/reset-password-code-request-data';


@Directive({
  selector: '[appResetPasswordCode]'
})
export class ResetPasswordCodeDirective {

  @Input() userId:string;
  @Input() code:string;
  @Input() password:string;
  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  constructor(
    private ngRestoUserService: NgRestoUserService
  ) { }

  @HostListener('click')
  onClick() {
    let data:ResetPasswordCodeRequestData = {
      userId: this.userId,
      code: this.code,
      password: this.password
    };
    this.ngRestoUserService
      .resetPasswordCode(data)
      .subscribe(
        () => this.success.emit(true),
        error => this.error.emit(error)
      );
  }

}
