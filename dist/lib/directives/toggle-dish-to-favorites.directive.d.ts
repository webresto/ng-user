import { EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
export declare class ToggleDishToFavoritesDirective {
    private ngRestoUserService;
    private element;
    private renderer;
    dish: any;
    addedToFavorites: EventEmitter<void>;
    removedFromFavorites: EventEmitter<void>;
    change: EventEmitter<boolean>;
    error: EventEmitter<string>;
    inFavorites: boolean;
    isLoggedIn: boolean;
    constructor(ngRestoUserService: NgRestoUserService, element: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    onClick(): void;
    addDishToFavorites(): void;
    removeDishFromFavorites(): void;
    static ɵfac: i0.ɵɵFactoryDef<ToggleDishToFavoritesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ToggleDishToFavoritesDirective, "[appToggleDishToFavorites]", never, { "dish": "dish"; }, { "addedToFavorites": "addedToFavorites"; "removedFromFavorites": "removedFromFavorites"; "change": "change"; "error": "error"; }, never>;
}
