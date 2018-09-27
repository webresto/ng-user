import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
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
}
