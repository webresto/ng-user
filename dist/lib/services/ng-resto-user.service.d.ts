import { Observable, BehaviorSubject } from 'rxjs';
import { NetService, EventerService } from '@webresto/ng-core';
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
import { User } from '../interfaces/user';
import { Address } from "../interfaces/address";
import { AddAddressRequestData } from "../interfaces/add-address-request-data";
export declare class NgRestoUserService {
    private net;
    private eventer;
    private authToken;
    private rememberMe;
    private user;
    private isLoggedIn;
    private favorites;
    private addresses;
    private streets;
    private historyItems;
    constructor(net: NetService, eventer: EventerService);
    signIn(data: SignInRequestData, rememberMe?: boolean): Observable<SignInResponseData>;
    getProfile(): Observable<User>;
    getHistory(): Observable<any>;
    updateProfile(data: UpdateProfileRequestData): Observable<UpdateProfileResponseData>;
    getAddresses(): Observable<Address[]>;
    addAddress(address: AddAddressRequestData): Observable<Address[]>;
    deleteAddress(address: Address): Observable<Address[]>;
    signUp(data: SignUpRequestData): Observable<SignUpResponseData>;
    signOut(): void;
    resetPassword(data: ResetPasswordRequestData): Observable<ResetPasswordResponseData>;
    resetPasswordCode(data: ResetPasswordCodeRequestData): Observable<ResetPasswordCodeResponseData>;
    getFavorites(): Observable<any[]>;
    addDishToFavorites(dish: any): Observable<any>;
    removeDishFromFavorites(dish: any): Observable<any>;
    userProfile(): BehaviorSubject<User>;
    userIsLoggedIn(): BehaviorSubject<boolean>;
    userFavorites(): BehaviorSubject<any[]>;
    userAddresses(): BehaviorSubject<Address[]>;
    userHistory(): BehaviorSubject<any[]>;
    getAuthToken(): string;
    setAuthToken(authToken: string, updateProfile?: boolean): void;
    deleteAuthToken(): void;
}
