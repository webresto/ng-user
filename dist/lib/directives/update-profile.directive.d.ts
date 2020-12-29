import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export declare class UpdateProfileDirective {
    private ngRestoUserService;
    name: string;
    phone: string;
    email: string;
    additionalInfo: string;
    birthday: string;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
}
