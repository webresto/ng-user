import { EventEmitter } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
export declare class AddAddressDirective {
    private ngRestoUserService;
    street: string;
    home: string;
    name: string;
    housing: string;
    index: string;
    entrance: string;
    floor: string;
    apartment: string;
    doorphone: string;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    constructor(ngRestoUserService: NgRestoUserService);
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDef<AddAddressDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AddAddressDirective, "[appAddAddress]", never, { "street": "street"; "home": "home"; "name": "name"; "housing": "housing"; "index": "index"; "entrance": "entrance"; "floor": "floor"; "apartment": "apartment"; "doorphone": "doorphone"; }, { "success": "success"; "error": "error"; }, never>;
}
