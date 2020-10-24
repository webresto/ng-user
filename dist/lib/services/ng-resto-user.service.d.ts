import { BehaviorSubject } from 'rxjs';
import { EventerService, NetService } from '@webresto/ng-core';
import { SignInRequestData } from '../interfaces/sign-in-request-data';
import { SignUpRequestData } from '../interfaces/sign-up-request-data';
import { ResetPasswordRequestData } from '../interfaces/reset-password-request-data';
import { ResetPasswordCodeRequestData } from '../interfaces/reset-password-code-request-data';
import { SignInResponseData } from '../interfaces/sign-in-response-data';
import { SignUpResponseData } from '../interfaces/sign-up-response-data';
import { ResetPasswordResponseData } from '../interfaces/reset-password-response-data';
import { ResetPasswordCodeResponseData } from '../interfaces/reset-password-code-response-data';
import { UpdateProfileResponseData } from '../interfaces/update-profile-response-data';
import { UpdateProfileRequestData } from '../interfaces/update-profile-request-data';
import { Address, User } from '../interfaces';
import { AddAddressRequestData } from "../interfaces/add-address-request-data";
import * as i0 from "@angular/core";
export declare class NgRestoUserService {
    private net;
    private eventer;
    private authToken;
    private rememberMe;
    private historyTransactions;
    private user;
    private isLoggedIn;
    private favorites;
    private addresses;
    private streets;
    private historyItems;
    private bonusSystems;
    constructor(net: NetService, eventer: EventerService);
    signIn(data: SignInRequestData, rememberMe?: boolean): import("rxjs").Observable<SignInResponseData>;
    getProfile(): import("rxjs").Observable<User>;
    getHistory(): import("rxjs").Observable<any>;
    getHistoryTransactions(bonusSystem?: string, limit?: number, set?: number): import("rxjs").Observable<any>;
    updateProfile(data: UpdateProfileRequestData): import("rxjs").Observable<UpdateProfileResponseData>;
    getAddresses(): import("rxjs").Observable<Address[]>;
    addAddress(address: AddAddressRequestData): import("rxjs").Observable<Address[]>;
    deleteAddress(address: Address): import("rxjs").Observable<Address[]>;
    signUp(data: SignUpRequestData): import("rxjs").Observable<SignUpResponseData>;
    signOut(): void;
    getBonuses(): import("rxjs").Observable<any>;
    resetPassword(data: ResetPasswordRequestData): import("rxjs").Observable<ResetPasswordResponseData>;
    resetPasswordCode(data: ResetPasswordCodeRequestData): import("rxjs").Observable<ResetPasswordCodeResponseData>;
    getFavorites(): import("rxjs").Observable<any[]>;
    addDishToFavorites(dish: any): import("rxjs").Observable<any>;
    removeDishFromFavorites(dish: any): import("rxjs").Observable<any>;
    userProfile(): BehaviorSubject<User>;
    userIsLoggedIn(): BehaviorSubject<boolean>;
    userFavorites(): BehaviorSubject<any[]>;
    userAddresses(): BehaviorSubject<Address[]>;
    userHistory(): BehaviorSubject<any[]>;
    userTransactionsHistory(): BehaviorSubject<any[]>;
    getAuthToken(): string;
    setAuthToken(authToken: string, updateProfile?: boolean): void;
    deleteAuthToken(): void;
    static ɵfac: i0.ɵɵFactoryDef<NgRestoUserService, never>;
    static ɵprov: i0.ɵɵInjectableDef<NgRestoUserService>;
}
