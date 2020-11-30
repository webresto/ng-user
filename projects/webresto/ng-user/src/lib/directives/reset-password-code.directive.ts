import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ResetPasswordCodeRequestData } from '../../models';
import { NgRestoUserService } from '../services/ng-resto-user.service';

@Directive({
  selector: '[rstResetPasswordCode]'
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
