import { Directive, Renderer2, ElementRef } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';

@Directive({
  selector: '[appBalance]'
})
export class BalanceDirective {

  amount:string;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.amount = '0';
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
  }

}
