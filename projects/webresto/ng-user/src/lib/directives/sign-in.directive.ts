import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { SignInRequestData } from '../../models';
import { NgRestoUserService } from '../services/ng-resto-user.service';

@Directive({
  selector: '[rstSignIn]'
})
export class SignInDirective {

  @Input() phone:string;
  @Input() password:string;
  @Input() captcha:string;
  @Input() rememberMe:boolean;
  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  constructor(
    private ngRestoUserService: NgRestoUserService
  ) { }

  @HostListener('click')
  onClick() {
    let data:SignInRequestData = {
      phone: this.preparePhone(this.phone),
      password: this.password,
      captcha: this.captcha
    };
    this.ngRestoUserService
      .signIn(data, this.rememberMe)
      .subscribe(
        () => this.success.emit(true),
        error => this.error.emit(error)
      )
  }

  preparePhone(phone) {
    phone = '+' + phone.replace(/[^0-9]/gim,'');
    return phone.replace('+8', '');
  }

}
