import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
export declare class SignUpDirective {
    private ngRestoUserService;
    name: string;
    phone: string;
    email: string;
    password: string;
    captcha: string;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
    preparePhone(phone: any): any;
    static ɵfac: i0.ɵɵFactoryDef<SignUpDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<SignUpDirective, "[rstSignUp]", never, { "name": "name"; "phone": "phone"; "email": "email"; "password": "password"; "captcha": "captcha"; }, { "success": "success"; "error": "error"; }, never>;
}
//# sourceMappingURL=sign-up.directive.d.ts.map