import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
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
}
