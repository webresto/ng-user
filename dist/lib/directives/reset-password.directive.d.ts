import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export declare class ResetPasswordDirective {
    private ngRestoUserService;
    phone: string;
    captcha: string;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
}
