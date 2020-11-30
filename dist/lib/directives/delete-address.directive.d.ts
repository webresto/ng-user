import { EventEmitter } from '@angular/core';
import { Address } from '../../models';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
export declare class DeleteAddressDirective {
    private ngRestoUserService;
    address: Address;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDef<DeleteAddressDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<DeleteAddressDirective, "[rstDeleteAddress]", never, { "address": "address"; }, { "success": "success"; "error": "error"; }, never>;
}
