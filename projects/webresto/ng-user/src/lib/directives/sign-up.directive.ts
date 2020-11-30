import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { SignUpRequestData } from '../../models';
import { NgRestoUserService } from '../services/ng-resto-user.service';

@Directive({
  selector: '[rstSignUp]'
})
export class SignUpDirective {

  @Input() name:string;
  @Input() phone:string;
  @Input() email:string;
  @Input() password:string;
  @Input() captcha:string;
  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  constructor(
    private ngRestoUserService: NgRestoUserService
  ) { }

  @HostListener('click')
  onClick() {
    let data:SignUpRequestData = {
      name: this.name,
      phone: this.preparePhone(this.phone),
      email: this.email,
      password: this.password,
      captcha: this.captcha
    };
    this.ngRestoUserService
      .signUp(data)
      .subscribe(
        () => this.success.emit(true),
        error => this.error.emit(error)
      );
  }

  preparePhone(phone) {
    phone = '+' + phone.replace(/[^0-9]/gim,'');
    return phone.replace('+8', '');
  }
}
