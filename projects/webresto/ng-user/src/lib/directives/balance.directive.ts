import { Directive, Renderer2, ElementRef } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';

@Directive({
  selector: '[rstBalance]'
})
export class BalanceDirective {

  amount:string;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private ngRestoUserService: NgRestoUserService
  ) {
    let balance = 0;
    this.ngRestoUserService
      .getBonuses()
      .subscribe(bonuses => {
        for(let name in bonuses) {
          const data = bonuses[name];
          if(data.state == 'active') {
            balance += data.balance;
          }
        }

        this.amount = `${balance}`;
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
      });

  }

}
