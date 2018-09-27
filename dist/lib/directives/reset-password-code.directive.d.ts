import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export declare class ResetPasswordCodeDirective {
    private ngRestoUserService;
    userId: string;
    code: string;
    password: string;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
}
