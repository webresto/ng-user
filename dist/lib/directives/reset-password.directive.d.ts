import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
export declare class ResetPasswordDirective {
    private ngRestoUserService;
    phone: string;
    captcha: string;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDef<ResetPasswordDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ResetPasswordDirective, "[rstResetPassword]", never, { "phone": "phone"; "captcha": "captcha"; }, { "success": "success"; "error": "error"; }, never>;
}
