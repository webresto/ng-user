import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { UpdateProfileRequestData } from '../../models';
import { NgRestoUserService } from '../services/ng-resto-user.service';

@Directive({
  selector: '[appUpdateProfile]'
})
export class UpdateProfileDirective {

  @Input() name:string;
  @Input() phone:string;
  @Input() email:string;
  @Input() avatar:string;

  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  constructor(
    private ngRestoUserService: NgRestoUserService
  ) { }

  @HostListener('click')
  onClick() {
    let data:UpdateProfileRequestData = {
      name: this.name,
      //phone: this.phone,
      email: this.email,
      avatar:this.avatar
    };
    this.ngRestoUserService
      .updateProfile(data)
      .subscribe(
        () => this.success.emit(true),
        error => this.error.emit(error)
      );
  }
}
