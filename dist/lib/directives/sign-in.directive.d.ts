import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
export declare class SignInDirective {
    private ngRestoUserService;
    phone: string;
    password: string;
    captcha: string;
    rememberMe: boolean;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
    preparePhone(phone: any): any;
    static ɵfac: i0.ɵɵFactoryDef<SignInDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<SignInDirective, "[appSignIn]", never, { "phone": "phone"; "password": "password"; "captcha": "captcha"; "rememberMe": "rememberMe"; }, { "success": "success"; "error": "error"; }, never>;
}
