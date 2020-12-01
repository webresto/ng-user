import { Renderer2, ElementRef } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export declare class BalanceDirective {
    private renderer;
    private el;
    private ngRestoUserService;
    amount: string;
    constructor(renderer: Renderer2, el: ElementRef, ngRestoUserService: NgRestoUserService);
}
