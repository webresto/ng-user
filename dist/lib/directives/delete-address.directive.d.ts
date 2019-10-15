import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import { Address } from "../interfaces/address";
export declare class DeleteAddressDirective {
    private ngRestoUserService;
    address: Address;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
}
