import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '../../models';
import { NgRestoUserService } from '../services/ng-resto-user.service';

@Directive({
  selector: '[rstDeleteAddress]'
})
export class DeleteAddressDirective {

  @Input() address:Address;

  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  constructor(
    private ngRestoUserService: NgRestoUserService
  ) { }

  @HostListener('click')
  onClick() {
    this.ngRestoUserService
      .deleteAddress(this.address)
      .subscribe(
        () => this.success.emit(true),
        error => this.error.emit(error)
      );
  }
}
