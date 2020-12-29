import { EventEmitter } from '@angular/core';
import { Address } from '../../models';
import { NgRestoUserService } from '../services/ng-resto-user.service';
export declare class DeleteAddressDirective {
    private ngRestoUserService;
    address: Address;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
}
