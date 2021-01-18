import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { AddAddressRequestData } from '../../models';
import { NgRestoUserService } from '../services/ng-resto-user.service';

@Directive({
  selector: '[rstAddAddress]'
})
export class AddAddressDirective {

  @Input() street: string;     //required
  @Input() streetId: string;     //required
  @Input() home: string;       //required
  @Input() name: string;
  @Input() housing: string;
  @Input() index: string;
  @Input() entrance: string;
  @Input() floor: string;
  @Input() apartment: string;
  @Input() doorphone: string;

  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  constructor(
    private ngRestoUserService: NgRestoUserService
  ) { }

  @HostListener('click')
  onClick() {
    if (!this.street) {
      this.error.emit('Необходимо указать улицу'); return;
    }
    if (!this.streetId) {
      this.error.emit('Необходимо указать streetId'); return;
    }
    if (!this.home) {
      this.error.emit('Необходимо указать номер дома'); return;
    }

    let data: AddAddressRequestData = {
      street: this.street,
      streetId: this.streetId,
      home: this.home,
      name: this.name || '',
      housing: this.housing || '',
      index: this.index || '',
      entrance: this.entrance || '',
      floor: this.floor || '',
      apartment: this.apartment || '',
      doorphone: this.doorphone || ''
    };
    const req = this.ngRestoUserService.addAddress(data).subscribe(
      () => this.success.emit(true),
      error => this.error.emit(error),
      () => req.unsubscribe()
    );
  }
}
