import { Renderer2, ElementRef } from '@angular/core';
export declare class BalanceDirective {
    private renderer;
    private el;
    amount: string;
    constructor(renderer: Renderer2, el: ElementRef);
}
