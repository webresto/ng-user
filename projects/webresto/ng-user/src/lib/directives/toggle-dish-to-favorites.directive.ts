import {
  Directive, HostListener, Input,
  Output, EventEmitter, ElementRef, Renderer2, OnDestroy, OnChanges
} from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';

@Directive({
  selector: '[rstToggleDishToFavorites]'
})
export class ToggleDishToFavoritesDirective implements OnDestroy, OnChanges {

  @Input() dish: any;
  @Output() change = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  @Input() isLoggedIn: boolean;
  @Input() favorites: any[];

  constructor(
    private ngRestoUserService: NgRestoUserService,
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  get inFavorites(): boolean {
    return !!this.favorites.find(dish => dish.id == this.dish.id)
  };


  ngOnDestroy(): void {
    [this.change, this.error].forEach(emitter => emitter.complete());
  }

  ngOnChanges() {
    if (this.inFavorites) {
      this.renderer.addClass(this.element.nativeElement, 'selected')
    } else {
      this.renderer.removeClass(this.element.nativeElement, 'selected');
    };
  }

  @HostListener('click')
  onClick() {
    if (this.inFavorites) {
      this.removeDishFromFavorites();
    } else {
      this.addDishToFavorites();
    }
  }

  addDishToFavorites() {
    this.ngRestoUserService
      .addDishToFavorites(this.dish)
      .subscribe(
        () => {
          this.change.emit(true);
          this.renderer.addClass(this.element.nativeElement, 'selected');
        },
        error => this.error.emit(error)
      )
  }

  removeDishFromFavorites() {
    const req = this.ngRestoUserService.removeDishFromFavorites(this.dish).subscribe(
      () => {
        this.change.emit(false);
        this.renderer.removeClass(this.element.nativeElement, 'selected');
      },
      error => this.error.emit(error),
      () => req.unsubscribe()
    )
  }

}
