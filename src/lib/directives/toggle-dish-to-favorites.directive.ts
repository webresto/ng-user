import {
  Directive, HostListener, Input,
  Output, EventEmitter, ElementRef, Renderer2
} from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';

import { AddDishToFavoritesRequestData } from '../interfaces/add-dish-to-favorites-request-data';
import { RemoveDishFromFavoritesRequestData } from '../interfaces/remove-dish-from-favorites-request-data';

@Directive({
  selector: '[appToggleDishToFavorites]'
})
export class ToggleDishToFavoritesDirective {

  @Input() dishId:string;
  @Output() addedToFavorites = new EventEmitter<void>();
  @Output() removedFromFavorites = new EventEmitter<void>();
  @Output() change = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  inFavorites: boolean;
  isLoggedIn: boolean;

  constructor(
    private ngRestoUserService: NgRestoUserService,
    private element: ElementRef,
    private renderer: Renderer2
  ) {

    this.ngRestoUserService
      .userFavorites()
      .subscribe(favorites => {
        this.inFavorites = favorites.find(dish => dish.id == this.dishId);

        if(this.inFavorites) {
          this.renderer.addClass(this.element.nativeElement, 'selected')
        } else {
          this.renderer.removeClass(this.element.nativeElement, 'selected');
        }
      });
    this.ngRestoUserService
      .userIsLoggedIn()
      .subscribe(result => this.isLoggedIn = result);
  }

  @HostListener('click')
  onClick() {
    if(this.inFavorites) {
      this.removeDishFromFavorites();
    } else {
      this.addDishToFavorites();
    }
  }

  addDishToFavorites() {
    let data:AddDishToFavoritesRequestData = {
      dishId: this.dishId
    };
    this.ngRestoUserService
      .addDishToFavorites(data)
      .subscribe(
        () => {
          this.addedToFavorites.emit();
          this.change.emit(true);
          this.renderer.addClass(this.element.nativeElement, 'selected');
        },
        error => this.error.emit(error)
      )
  }

  removeDishFromFavorites() {
    let data:RemoveDishFromFavoritesRequestData = {
      dishId: this.dishId
    };
    this.ngRestoUserService
      .removeDishFromFavorites(data)
      .subscribe(
        () => {
          this.removedFromFavorites.emit();
          this.change.emit(false);
          this.renderer.removeClass(this.element.nativeElement, 'selected');
        },
        error => this.error.emit(error)
      )
  }

}
