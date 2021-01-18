import { EventEmitter, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export declare class ToggleDishToFavoritesDirective implements OnDestroy {
    private ngRestoUserService;
    private element;
    private renderer;
    dish: any;
    change: EventEmitter<boolean>;
    error: EventEmitter<string>;
    inFavorites: boolean;
    isLoggedIn: boolean;
    constructor(ngRestoUserService: NgRestoUserService, element: ElementRef, renderer: Renderer2);
    ngOnDestroy(): void;
    ngOnInit(): void;
    onClick(): void;
    addDishToFavorites(): void;
    removeDishFromFavorites(): void;
}
