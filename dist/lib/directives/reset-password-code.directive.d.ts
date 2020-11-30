import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
export declare class ResetPasswordCodeDirective {
    private ngRestoUserService;
    userId: string;
    code: string;
    password: string;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDef<ResetPasswordCodeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ResetPasswordCodeDirective, "[rstResetPasswordCode]", never, { "userId": "userId"; "code": "code"; "password": "password"; }, { "success": "success"; "error": "error"; }, never>;
}
