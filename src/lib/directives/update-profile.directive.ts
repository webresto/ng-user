import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';

import { UpdateProfileRequestData } from '../interfaces/update-profile-request-data';

@Directive({
  selector: '[appUpdateProfile]'
})
export class UpdateProfileDirective {

  @Input() name:string;
  @Input() phone:string;
  @Input() email:string;

  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  constructor(
    private ngRestoUserService: NgRestoUserService
  ) { }

  @HostListener('click')
  onClick() {
    let data:UpdateProfileRequestData = {
      name: this.name,
      phone: this.phone,
      email: this.email
    };
    this.ngRestoUserService
      .updateProfile(data)
      .subscribe(
        () => this.success.emit(true),
        error => this.error.emit(error)
      );
  }
}
