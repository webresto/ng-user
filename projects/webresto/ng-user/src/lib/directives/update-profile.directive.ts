import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { UpdateProfileRequestData } from '../../models';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import { formatDate } from '@angular/common';

@Directive({
  selector: '[rstUpdateProfile]'
})
export class UpdateProfileDirective {

  @Input() name:string;
  @Input() phone:string;
  @Input() email:string;
  @Input() additionalInfo:string;
  @Input() birthday:string;

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
      additionalInfo:this.additionalInfo,
      birthday:this.birthday ? formatDate(this.birthday,'yyyy-MM-dd','en') : this.birthday
    };
    this.ngRestoUserService
      .updateProfile(data)
      .subscribe(
        () => this.success.emit(true),
        error => this.error.emit(error)
      );
  }
}
