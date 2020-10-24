import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
export declare class UpdateProfileDirective {
    private ngRestoUserService;
    name: string;
    phone: string;
    email: string;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDef<UpdateProfileDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<UpdateProfileDirective, "[appUpdateProfile]", never, { "name": "name"; "phone": "phone"; "email": "email"; }, { "success": "success"; "error": "error"; }, never>;
}
