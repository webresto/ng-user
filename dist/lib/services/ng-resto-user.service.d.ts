import { BehaviorSubject, Observable } from 'rxjs';
import { NetService } from '@webresto/ng-core';
import { Address, SignInRequestData, SignInResponseData, User, UpdateProfileRequestData, UpdateProfileResponseData, AddAddressRequestData, SignUpRequestData, ResetPasswordRequestData, ResetPasswordCodeRequestData } from '../../models';
export declare class NgRestoUserService {
    private net;
    private authToken;
    private rememberMe;
    private user;
    private isLoggedIn;
    private favorites;
    private addresses;
    private historyItems;
    private historyTransactions;
    private bonusSystems;
    constructor(net: NetService);
    signIn(data: SignInRequestData, rememberMe?: boolean): Observable<SignInResponseData>;
    getProfile(): Observable<User>;
    getHistory(): Observable<any>;
    getHistoryTransactions(bonusSystem?: string, limit?: number, set?: number): Observable<any>;
    updateProfile(data: UpdateProfileRequestData): Observable<UpdateProfileResponseData>;
    getAddresses(): Observable<Address[]>;
    addAddress(address: AddAddressRequestData): Observable<Address[]>;
    deleteAddress(address: Address): Observable<Address[]>;
    signUp(data: SignUpRequestData): Observable<any>;
    signOut(): void;
    getBonuses(): Observable<any>;
    resetPassword(data: ResetPasswordRequestData): Observable<any>;
    resetPasswordCode(data: ResetPasswordCodeRequestData): Observable<any>;
    getFavorites(): Observable<any[]>;
    addDishToFavorites(dish: any): Observable<any>;
    removeDishFromFavorites(dish: any): Observable<any[]>;
    userProfile(): Observable<User>;
    userIsLoggedIn(): BehaviorSubject<boolean>;
    userFavorites(): Observable<any[]>;
    userAddresses(): Observable<Address[]>;
    userHistory(): Observable<any[]>;
    userTransactionsHistory(): Observable<any[]>;
    getAuthToken(): string;
    setAuthToken(authToken: string): void;
    deleteAuthToken(): void;
    saveAvatar(avatar: File): Observable<any>;
}
