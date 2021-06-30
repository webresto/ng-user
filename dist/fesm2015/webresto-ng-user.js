import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Directive, Input, Output, HostListener, Renderer2, ElementRef, NgModule } from '@angular/core';
import * as i1 from '@webresto/ng-core';
import { NetService } from '@webresto/ng-core';
import { BehaviorSubject, of } from 'rxjs';
import { filter, switchMap, tap, map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

const LS_TOKEN_NAME = 'gf:tkn:v2';
class NgRestoUserService {
    constructor(net) {
        this.net = net;
        this.authToken = localStorage.getItem(LS_TOKEN_NAME);
        this.rememberMe = false;
        this.isLoggedIn = new BehaviorSubject(this.authToken ? true : false);
        this.historyItems = new BehaviorSubject([]);
        this.historyTransactions = new BehaviorSubject([]);
        const isLoggedSubscription = this.isLoggedIn.pipe(filter(isLoggedIn => !!isLoggedIn), switchMap(() => this.getFavorites()), switchMap(() => this.getProfile()), switchMap(() => this.getAddresses()), switchMap(() => this.getBonuses())).subscribe(() => { }, () => { }, () => isLoggedSubscription.unsubscribe());
    }
    signIn(data, rememberMe = false) {
        this.rememberMe = rememberMe;
        return this.net.post('/signin', data).pipe(tap((result) => {
            this.setAuthToken(result.token);
            this.user.next(result.user);
            this.isLoggedIn.next(true);
        }, () => { }));
    }
    getProfile() {
        return this.user ? this.user : this.net.get('/user/get/user-info').pipe(switchMap(result => {
            this.user = new BehaviorSubject(result);
            return this.user;
        }));
    }
    getHistory() {
        return this.net.get('/user/get/history').pipe(tap((historyItems) => {
            this.historyItems.next(historyItems);
        }, error => {
            if ((error === null || error === void 0 ? void 0 : error.type) === "Unauthorized") {
                this.deleteAuthToken();
            }
            ;
        }));
    }
    getHistoryTransactions(bonusSystem = "local", limit = 15, set = 0) {
        return this.net.get(`/bonus/transactions?bonussystem=${bonusSystem}&limit=${limit}&number=${set}`).pipe(tap((transactions) => {
            this.historyTransactions.next(transactions);
        }, () => { }));
    }
    updateProfile(data) {
        return this.net.post('/user/set/user-info', {
            user: data
        }).pipe(tap((result) => {
            this.user.next(result.user);
        }, () => { }));
    }
    getAddresses() {
        return this.addresses ? this.addresses : this.net.get('/user/get/location').pipe(switchMap(addresses => {
            this.addresses = new BehaviorSubject(addresses);
            return this.addresses;
        }));
    }
    addAddress(address) {
        return this.net.post('/user/add/location', address).pipe(switchMap(addresses => {
            this.addresses.next(addresses);
            return this.addresses;
        }));
    }
    deleteAddress(address) {
        return this.net.post('/user/remove/location', {
            id: address.id,
            street: address.street,
            home: address.home
        }).pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, () => { }));
    }
    signUp(data) {
        return this.net.post('/signup', data).pipe(tap(() => {
            //this.setAuthToken(result.token, false);
            //this.user.next(result.user);
        }, () => { }));
    }
    signOut() {
        return this.deleteAuthToken();
    }
    getBonuses() {
        return this.bonusSystems ? this.bonusSystems : this.net.post('/bonus/get', {}).pipe(switchMap(result => {
            this.bonusSystems = new BehaviorSubject(result);
            return this.bonusSystems;
        }));
    }
    resetPassword(data) {
        return this.net.post('/reset', data).pipe(tap(() => { }, () => { }));
    }
    resetPasswordCode(data) {
        return this.net.post('/code', data).pipe(tap(() => { }, () => { }));
    }
    getFavorites() {
        return this.favorites ? this.favorites : this.net.get('/user/get/favorites').pipe(switchMap(result => {
            console.info('getFavorites result', result);
            this.favorites = new BehaviorSubject(result);
            return this.favorites;
        }));
    }
    addDishToFavorites(dish) {
        return this.net.post('/user/add/favorites ', {
            dishId: dish.id
        }).pipe(map(result => this.favorites.next(result)));
    }
    removeDishFromFavorites(dish) {
        return this.net.post('/user/remove/favorites ', {
            dishId: dish.id
        }).pipe(tap(result => {
            console.info('Было=>>>', this.favorites.getValue().length);
            let favoritesUpdated = this.favorites
                .getValue()
                .filter(item => item.id != dish.id);
            console.info('Стало=>>>', favoritesUpdated.length);
            this.favorites.next(result);
        }, () => { }));
    }
    userProfile() {
        return this.user ? this.user : this.getProfile().pipe(switchMap(() => this.getFavorites()), switchMap(() => this.getAddresses()), switchMap(() => this.getBonuses()), switchMap(() => this.user));
    }
    userIsLoggedIn() {
        return this.isLoggedIn;
    }
    userFavorites() {
        return this.favorites ? this.favorites.asObservable() : of([]);
    }
    userAddresses() {
        return this.addresses ? this.addresses.asObservable() : of([]);
    }
    userHistory() {
        return this.historyItems ? this.historyItems.asObservable() : of([]);
    }
    userTransactionsHistory() {
        return this.historyTransactions ? this.historyTransactions.asObservable() : of([]);
    }
    getAuthToken() {
        return this.authToken;
    }
    setAuthToken(authToken) {
        if (this.rememberMe) {
            localStorage.setItem(LS_TOKEN_NAME, authToken);
        }
        ;
        this.authToken = authToken;
        this.isLoggedIn.next(true);
        /*if(updateProfile) {
          this.getProfile().subscribe();
          this.getFavorites().subscribe();
          this.getAddresses().subscribe();
          this.getHistory().subscribe();
        }*/
    }
    deleteAuthToken() {
        this.authToken = null;
        localStorage.removeItem(LS_TOKEN_NAME);
        this.isLoggedIn.next(false);
    }
    saveAvatar(avatar) {
        const data = new FormData();
        data.append('avatar', avatar, avatar.name);
        return this.net.post('/user/avatar/upload', data, true, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).pipe(tap(result => this.user.next(result.user), () => { }));
    }
}
NgRestoUserService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgRestoUserService_Factory() { return new NgRestoUserService(i0.ɵɵinject(i1.NetService)); }, token: NgRestoUserService, providedIn: "root" });
NgRestoUserService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NgRestoUserService.ctorParameters = () => [
    { type: NetService }
];

class SignUpDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        let data = {
            name: this.name,
            phone: this.preparePhone(this.phone),
            email: this.email,
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signUp(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
    preparePhone(phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
    }
}
SignUpDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstSignUp]'
            },] }
];
SignUpDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
SignUpDirective.propDecorators = {
    name: [{ type: Input }],
    phone: [{ type: Input }],
    email: [{ type: Input }],
    password: [{ type: Input }],
    captcha: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class SignInDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        let data = {
            phone: this.preparePhone(this.phone),
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signIn(data, this.rememberMe)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
    preparePhone(phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
    }
}
SignInDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstSignIn]'
            },] }
];
SignInDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
SignInDirective.propDecorators = {
    phone: [{ type: Input }],
    password: [{ type: Input }],
    captcha: [{ type: Input }],
    rememberMe: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class SignOutDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
    }
    onClick() {
        this.ngRestoUserService.signOut();
    }
}
SignOutDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstSignOut]'
            },] }
];
SignOutDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
SignOutDirective.propDecorators = {
    onClick: [{ type: HostListener, args: ['click',] }]
};

class ResetPasswordDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        let data = {
            phone: this.phone,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .resetPassword(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
ResetPasswordDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstResetPassword]'
            },] }
];
ResetPasswordDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
ResetPasswordDirective.propDecorators = {
    phone: [{ type: Input }],
    captcha: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class ResetPasswordCodeDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        let data = {
            userId: this.userId,
            code: this.code,
            password: this.password
        };
        this.ngRestoUserService
            .resetPasswordCode(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
ResetPasswordCodeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstResetPasswordCode]'
            },] }
];
ResetPasswordCodeDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
ResetPasswordCodeDirective.propDecorators = {
    userId: [{ type: Input }],
    code: [{ type: Input }],
    password: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class BalanceDirective {
    constructor(renderer, el, ngRestoUserService) {
        this.renderer = renderer;
        this.el = el;
        this.ngRestoUserService = ngRestoUserService;
        let balance = 0;
        this.ngRestoUserService
            .getBonuses()
            .subscribe(bonuses => {
            for (let name in bonuses) {
                const data = bonuses[name];
                if (data.state == 'active') {
                    balance += data.balance;
                }
            }
            this.amount = `${balance}`;
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        });
    }
}
BalanceDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstBalance]'
            },] }
];
BalanceDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgRestoUserService }
];

class ToggleDishToFavoritesDirective {
    constructor(ngRestoUserService, element, renderer) {
        this.ngRestoUserService = ngRestoUserService;
        this.element = element;
        this.renderer = renderer;
        this.change = new EventEmitter();
        this.error = new EventEmitter();
    }
    get inFavorites() {
        return !!this.favorites.find(dish => dish.id == this.dish.id);
    }
    ;
    ngOnDestroy() {
        [this.change, this.error].forEach(emitter => emitter.complete());
    }
    ngOnChanges() {
        if (this.inFavorites) {
            this.renderer.addClass(this.element.nativeElement, 'selected');
        }
        else {
            this.renderer.removeClass(this.element.nativeElement, 'selected');
        }
        ;
    }
    onClick() {
        if (this.inFavorites) {
            this.removeDishFromFavorites();
        }
        else {
            this.addDishToFavorites();
        }
    }
    addDishToFavorites() {
        this.ngRestoUserService
            .addDishToFavorites(this.dish)
            .subscribe(() => {
            console.log('toggle dish');
            this.change.emit(true);
            this.renderer.addClass(this.element.nativeElement, 'selected');
        }, error => this.error.emit(error));
    }
    removeDishFromFavorites() {
        const req = this.ngRestoUserService.removeDishFromFavorites(this.dish).subscribe(() => {
            this.change.emit(false);
            this.renderer.removeClass(this.element.nativeElement, 'selected');
        }, error => this.error.emit(error), () => req.unsubscribe());
    }
}
ToggleDishToFavoritesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstToggleDishToFavorites]'
            },] }
];
ToggleDishToFavoritesDirective.ctorParameters = () => [
    { type: NgRestoUserService },
    { type: ElementRef },
    { type: Renderer2 }
];
ToggleDishToFavoritesDirective.propDecorators = {
    dish: [{ type: Input }],
    change: [{ type: Output }],
    error: [{ type: Output }],
    isLoggedIn: [{ type: Input }],
    favorites: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class UpdateProfileDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        let data = {
            name: this.name,
            //phone: this.phone,
            email: this.email,
            additionalInfo: this.additionalInfo,
            birthday: this.birthday ? formatDate(this.birthday, 'yyyy-MM-dd', 'en') : this.birthday
        };
        this.ngRestoUserService
            .updateProfile(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
UpdateProfileDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstUpdateProfile]'
            },] }
];
UpdateProfileDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
UpdateProfileDirective.propDecorators = {
    name: [{ type: Input }],
    phone: [{ type: Input }],
    email: [{ type: Input }],
    additionalInfo: [{ type: Input }],
    birthday: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class AddAddressDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        if (!this.street) {
            this.error.emit('Необходимо указать улицу');
            return;
        }
        if (!this.streetId) {
            this.error.emit('Необходимо указать streetId');
            return;
        }
        if (!this.home) {
            this.error.emit('Необходимо указать номер дома');
            return;
        }
        let data = {
            street: this.street,
            streetId: this.streetId,
            home: this.home,
            name: this.name || '',
            housing: this.housing || '',
            index: this.index || '',
            entrance: this.entrance || '',
            floor: this.floor || '',
            apartment: this.apartment || '',
            doorphone: this.doorphone || ''
        };
        const req = this.ngRestoUserService.addAddress(data).subscribe(() => this.success.emit(true), error => this.error.emit(error), () => req.unsubscribe());
    }
}
AddAddressDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstAddAddress]'
            },] }
];
AddAddressDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
AddAddressDirective.propDecorators = {
    street: [{ type: Input }],
    streetId: [{ type: Input }],
    home: [{ type: Input }],
    name: [{ type: Input }],
    housing: [{ type: Input }],
    index: [{ type: Input }],
    entrance: [{ type: Input }],
    floor: [{ type: Input }],
    apartment: [{ type: Input }],
    doorphone: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class DeleteAddressDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        this.ngRestoUserService
            .deleteAddress(this.address)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
DeleteAddressDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstDeleteAddress]'
            },] }
];
DeleteAddressDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
DeleteAddressDirective.propDecorators = {
    address: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class NgUserModule {
}
NgUserModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                providers: [],
                declarations: [
                    SignUpDirective,
                    SignInDirective,
                    SignOutDirective,
                    ResetPasswordDirective,
                    ResetPasswordCodeDirective,
                    BalanceDirective,
                    ToggleDishToFavoritesDirective,
                    UpdateProfileDirective,
                    AddAddressDirective,
                    DeleteAddressDirective
                ],
                exports: [
                    SignUpDirective,
                    SignInDirective,
                    SignOutDirective,
                    ResetPasswordDirective,
                    ResetPasswordCodeDirective,
                    BalanceDirective,
                    ToggleDishToFavoritesDirective,
                    UpdateProfileDirective,
                    AddAddressDirective,
                    DeleteAddressDirective
                ]
            },] }
];

/*
 * Public API Surface of ng-user
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AddAddressDirective, BalanceDirective, DeleteAddressDirective, NgRestoUserService, NgUserModule, ResetPasswordCodeDirective, ResetPasswordDirective, SignInDirective, SignOutDirective, SignUpDirective, ToggleDishToFavoritesDirective, UpdateProfileDirective };
//# sourceMappingURL=webresto-ng-user.js.map
