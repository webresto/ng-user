import { Renderer2, ElementRef } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
export declare class BalanceDirective {
    private renderer;
    private el;
    private ngRestoUserService;
    amount: string;
    constructor(renderer: Renderer2, el: ElementRef, ngRestoUserService: NgRestoUserService);
    static ɵfac: i0.ɵɵFactoryDef<BalanceDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<BalanceDirective, "[rstBalance]", never, {}, {}, never>;
}
