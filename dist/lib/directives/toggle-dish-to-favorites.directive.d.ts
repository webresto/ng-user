import { EventEmitter, ElementRef, Renderer2, OnDestroy, OnChanges } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export declare class ToggleDishToFavoritesDirective implements OnDestroy, OnChanges {
    private ngRestoUserService;
    private element;
    private renderer;
    dish: any;
    change: EventEmitter<boolean>;
    error: EventEmitter<string>;
    isLoggedIn: boolean;
    favorites: any[];
    constructor(ngRestoUserService: NgRestoUserService, element: ElementRef, renderer: Renderer2);
    get inFavorites(): boolean;
    ngOnDestroy(): void;
    ngOnChanges(): void;
    onClick(): void;
    addDishToFavorites(): void;
    removeDishFromFavorites(): void;
}
