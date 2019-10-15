import { Injectable, Directive, Renderer2, ElementRef, HostListener, Input, Output, EventEmitter, NgModule, defineInjectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const LS_TOKEN_NAME = 'ghtke';
class NgRestoUserService {
    /**
     * @param {?} net
     * @param {?} eventer
     */
    constructor(net, eventer) {
        this.net = net;
        this.eventer = eventer;
        this.rememberMe = false;
        this.user = new BehaviorSubject({});
        this.isLoggedIn = new BehaviorSubject(false);
        this.favorites = new BehaviorSubject([]);
        this.addresses = new BehaviorSubject([]);
        this.historyItems = new BehaviorSubject([]);
        this.authToken = localStorage.getItem(LS_TOKEN_NAME);
        if (this.authToken) {
            this.isLoggedIn.next(true);
        }
        this.isLoggedIn.subscribe(isLoggedIn => {
            if (isLoggedIn) {
                setTimeout(() => {
                    this.getFavorites().subscribe();
                    this.getProfile().subscribe();
                    this.getAddresses().subscribe();
                    this.getHistory().subscribe();
                }, 500);
            }
        });
        this.eventer
            .getMessageEmitter()
            .subscribe(message => {
            switch (message.type) {
                case "Unauthorized":
                    this.deleteAuthToken();
                    break;
            }
        });
    }
    /**
     * @param {?} data
     * @param {?=} rememberMe
     * @return {?}
     */
    signIn(data, rememberMe = false) {
        this.rememberMe = rememberMe;
        return this.net.post('/signin', data)
            .pipe(tap((result) => {
            this.setAuthToken(result.token, false);
            this.user.next(result.user);
            this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Успешно авторизирован'));
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @return {?}
     */
    getProfile() {
        return this.net.get('/user/get/user-info')
            .pipe(tap((result) => {
            this.user.next(result);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @return {?}
     */
    getHistory() {
        return this.net.get('/user/get/history')
            .pipe(tap((historyItems) => {
            this.historyItems.next(historyItems);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    updateProfile(data) {
        return this.net.post('/user/set/user-info', {
            user: data
        })
            .pipe(tap((result) => {
            this.user.next(result);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @return {?}
     */
    getAddresses() {
        return this.net.get('/user/get/location')
            .pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} address
     * @return {?}
     */
    addAddress(address) {
        return this.net.post('/user/add/location', address)
            .pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} address
     * @return {?}
     */
    deleteAddress(address) {
        /** @type {?} */
        var reqBody = {
            id: address.id,
            street: address.street,
            home: address.home
        };
        return this.net.post('/user/remove/location', reqBody)
            .pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    signUp(data) {
        return this.net.post('/signup', data)
            .pipe(tap((result) => {
            this.setAuthToken(result.token, false);
            this.user.next(result.user);
            this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Успешно зарегистирован'));
        }, error => {
            this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error));
        }));
    }
    /**
     * @return {?}
     */
    signOut() {
        return this.deleteAuthToken();
    }
    /**
     * @param {?} data
     * @return {?}
     */
    resetPassword(data) {
        return this.net.post('/reset', data)
            .pipe(tap((result) => {
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    resetPasswordCode(data) {
        return this.net.post('/code', data)
            .pipe(tap((result) => {
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @return {?}
     */
    getFavorites() {
        return this.net.get('/user/get/favorites ')
            .pipe(tap((result) => {
            console.info('getFavorites result', result);
            this.favorites.next(result);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} dish
     * @return {?}
     */
    addDishToFavorites(dish) {
        /** @type {?} */
        let data = {
            dishId: dish.id
        };
        return this.net.post('/user/add/favorites ', data)
            .pipe(tap((result) => {
            /** @type {?} */
            let favoritesUpdated = this.favorites.getValue();
            favoritesUpdated.push(dish);
            this.favorites.next(favoritesUpdated);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} dish
     * @return {?}
     */
    removeDishFromFavorites(dish) {
        /** @type {?} */
        let data = {
            dishId: dish.id
        };
        return this.net.post('/user/remove/favorites ', data)
            .pipe(tap((result) => {
            console.info('Было=>>>', this.favorites.getValue().length);
            /** @type {?} */
            let favoritesUpdated = this.favorites
                .getValue()
                .filter(item => item.id != dish.id);
            console.info('Стало=>>>', favoritesUpdated.length);
            this.favorites.next(favoritesUpdated);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @return {?}
     */
    userProfile() {
        return this.user;
    }
    /**
     * @return {?}
     */
    userIsLoggedIn() {
        return this.isLoggedIn;
    }
    /**
     * @return {?}
     */
    userFavorites() {
        return this.favorites;
    }
    /**
     * @return {?}
     */
    userAddresses() {
        return this.addresses;
    }
    /**
     * @return {?}
     */
    userHistory() {
        return this.historyItems;
    }
    /**
     * @return {?}
     */
    getAuthToken() {
        return this.authToken;
    }
    /**
     * @param {?} authToken
     * @param {?=} updateProfile
     * @return {?}
     */
    setAuthToken(authToken, updateProfile = true) {
        if (this.rememberMe) {
            localStorage.setItem(LS_TOKEN_NAME, authToken);
        }
        this.authToken = authToken;
        this.isLoggedIn.next(true);
        /*if(updateProfile) {
              this.getProfile().subscribe();
              this.getFavorites().subscribe();
              this.getAddresses().subscribe();
              this.getHistory().subscribe();
            }*/
    }
    /**
     * @return {?}
     */
    deleteAuthToken() {
        this.authToken = undefined;
        localStorage.removeItem(LS_TOKEN_NAME);
        this.isLoggedIn.next(false);
    }
}
NgRestoUserService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
NgRestoUserService.ctorParameters = () => [
    { type: NetService },
    { type: EventerService }
];
/** @nocollapse */ NgRestoUserService.ngInjectableDef = defineInjectable({ factory: function NgRestoUserService_Factory() { return new NgRestoUserService(inject(NetService), inject(EventerService)); }, token: NgRestoUserService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SignUpDirective {
    /**
     * @param {?} ngRestoUserService
     */
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onClick() {
        /** @type {?} */
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
    /**
     * @param {?} phone
     * @return {?}
     */
    preparePhone(phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
    }
}
SignUpDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appSignUp]'
            },] },
];
/** @nocollapse */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SignInDirective {
    /**
     * @param {?} ngRestoUserService
     */
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onClick() {
        /** @type {?} */
        let data = {
            phone: this.preparePhone(this.phone),
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signIn(data, this.rememberMe)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
    /**
     * @param {?} phone
     * @return {?}
     */
    preparePhone(phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
    }
}
SignInDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appSignIn]'
            },] },
];
/** @nocollapse */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SignOutDirective {
    /**
     * @param {?} ngRestoUserService
     */
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
    }
    /**
     * @return {?}
     */
    onClick() {
        this.ngRestoUserService.signOut();
    }
}
SignOutDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appSignOut]'
            },] },
];
/** @nocollapse */
SignOutDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
SignOutDirective.propDecorators = {
    onClick: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ResetPasswordDirective {
    /**
     * @param {?} ngRestoUserService
     */
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onClick() {
        /** @type {?} */
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
                selector: '[appResetPassword]'
            },] },
];
/** @nocollapse */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ResetPasswordCodeDirective {
    /**
     * @param {?} ngRestoUserService
     */
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onClick() {
        /** @type {?} */
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
                selector: '[appResetPasswordCode]'
            },] },
];
/** @nocollapse */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class BalanceDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this.amount = '0';
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
    }
}
BalanceDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appBalance]'
            },] },
];
/** @nocollapse */
BalanceDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ToggleDishToFavoritesDirective {
    /**
     * @param {?} ngRestoUserService
     * @param {?} element
     * @param {?} renderer
     */
    constructor(ngRestoUserService, element, renderer) {
        this.ngRestoUserService = ngRestoUserService;
        this.element = element;
        this.renderer = renderer;
        this.addedToFavorites = new EventEmitter();
        this.removedFromFavorites = new EventEmitter();
        this.change = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ngRestoUserService
            .userFavorites()
            .subscribe(favorites => {
            this.inFavorites = favorites.find(dish => dish.id == this.dish.id);
            if (this.inFavorites) {
                this.renderer.addClass(this.element.nativeElement, 'selected');
            }
            else {
                this.renderer.removeClass(this.element.nativeElement, 'selected');
            }
        });
        this.ngRestoUserService
            .userIsLoggedIn()
            .subscribe(result => this.isLoggedIn = result);
    }
    /**
     * @return {?}
     */
    onClick() {
        if (this.inFavorites) {
            this.removeDishFromFavorites();
        }
        else {
            this.addDishToFavorites();
        }
    }
    /**
     * @return {?}
     */
    addDishToFavorites() {
        this.ngRestoUserService
            .addDishToFavorites(this.dish)
            .subscribe(() => {
            this.addedToFavorites.emit();
            this.change.emit(true);
            this.renderer.addClass(this.element.nativeElement, 'selected');
        }, error => this.error.emit(error));
    }
    /**
     * @return {?}
     */
    removeDishFromFavorites() {
        this.ngRestoUserService
            .removeDishFromFavorites(this.dish)
            .subscribe(() => {
            this.removedFromFavorites.emit();
            this.change.emit(false);
            this.renderer.removeClass(this.element.nativeElement, 'selected');
        }, error => this.error.emit(error));
    }
}
ToggleDishToFavoritesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appToggleDishToFavorites]'
            },] },
];
/** @nocollapse */
ToggleDishToFavoritesDirective.ctorParameters = () => [
    { type: NgRestoUserService },
    { type: ElementRef },
    { type: Renderer2 }
];
ToggleDishToFavoritesDirective.propDecorators = {
    dish: [{ type: Input }],
    addedToFavorites: [{ type: Output }],
    removedFromFavorites: [{ type: Output }],
    change: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class UpdateProfileDirective {
    /**
     * @param {?} ngRestoUserService
     */
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onClick() {
        /** @type {?} */
        let data = {
            name: this.name,
            phone: this.phone,
            email: this.email
        };
        this.ngRestoUserService
            .updateProfile(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
UpdateProfileDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appUpdateProfile]'
            },] },
];
/** @nocollapse */
UpdateProfileDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
UpdateProfileDirective.propDecorators = {
    name: [{ type: Input }],
    phone: [{ type: Input }],
    email: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AddAddressDirective {
    /**
     * @param {?} ngRestoUserService
     */
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onClick() {
        if (!this.street) {
            this.error.emit('Необходимо указать улицу');
            return;
        }
        if (!this.home) {
            this.error.emit('Необходимо указать номер дома');
            return;
        }
        /** @type {?} */
        let data = {
            street: this.street,
            home: this.home,
            name: this.name || '',
            housing: this.housing || '',
            index: this.index || '',
            entrance: this.entrance || '',
            floor: this.floor || '',
            apartment: this.apartment || '',
            doorphone: this.doorphone || ''
        };
        this.ngRestoUserService
            .addAddress(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
AddAddressDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appAddAddress]'
            },] },
];
/** @nocollapse */
AddAddressDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
AddAddressDirective.propDecorators = {
    street: [{ type: Input }],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DeleteAddressDirective {
    /**
     * @param {?} ngRestoUserService
     */
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onClick() {
        this.ngRestoUserService
            .deleteAddress(this.address)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
DeleteAddressDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appDeleteAddress]'
            },] },
];
/** @nocollapse */
DeleteAddressDirective.ctorParameters = () => [
    { type: NgRestoUserService }
];
DeleteAddressDirective.propDecorators = {
    address: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const DIRECTIVES = [
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
];
class NgUserModule {
}
NgUserModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                providers: [],
                declarations: [...DIRECTIVES],
                exports: [...DIRECTIVES]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AuthInterceptor {
    /**
     * @param {?} userService
     */
    constructor(userService) {
        this.userService = userService;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        console.info('AuthInterceptor', req);
        /** @type {?} */
        const authToken = this.userService.getAuthToken();
        if (authToken) {
            /** @type {?} */
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `JWT ${authToken}`)
            });
            // send cloned request with header to the next handler.
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
AuthInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthInterceptor.ctorParameters = () => [
    { type: NgRestoUserService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const ngUserHttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgRestoUserService, NgUserModule, ngUserHttpInterceptorProviders, AuthInterceptor, AddAddressDirective as ɵj, BalanceDirective as ɵg, DeleteAddressDirective as ɵk, ResetPasswordCodeDirective as ɵf, ResetPasswordDirective as ɵe, SignInDirective as ɵc, SignOutDirective as ɵd, SignUpDirective as ɵa, ToggleDishToFavoritesDirective as ɵh, UpdateProfileDirective as ɵi, NgRestoUserService as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicmVzdG8tbmctdXNlci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHdlYnJlc3RvL25nLXVzZXIvbGliL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLXVzZXIvbGliL2RpcmVjdGl2ZXMvc2lnbi11cC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL3NpZ24taW4uZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy9zaWduLW91dC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLXVzZXIvbGliL2RpcmVjdGl2ZXMvcmVzZXQtcGFzc3dvcmQtY29kZS5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL2JhbGFuY2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy90b2dnbGUtZGlzaC10by1mYXZvcml0ZXMuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy91cGRhdGUtcHJvZmlsZS5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL2FkZC1hZGRyZXNzLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLXVzZXIvbGliL2RpcmVjdGl2ZXMvZGVsZXRlLWFkZHJlc3MuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvbmctdXNlci5tb2R1bGUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9odHRwLWludGVyY2VwdG9ycy9hdXRoLmludGVyY2VwdG9yLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvaHR0cC1pbnRlcmNlcHRvcnMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIE5ldFNlcnZpY2UsXG4gIEV2ZW50ZXJTZXJ2aWNlLFxuICBFdmVudE1lc3NhZ2Vcbn0gZnJvbSAnQHdlYnJlc3RvL25nLWNvcmUnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgU2lnblVwUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLWNvZGUtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IEFkZERpc2hUb0Zhdm9yaXRlc1JlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hZGQtZGlzaC10by1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlbW92ZURpc2hGcm9tRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbW92ZS1kaXNoLWZyb20tZmF2b3JpdGVzLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBQcm9maWxlUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9wcm9maWxlLXJlc3BvbnNlLWRhdGEnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24taW4tcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBTaWduVXBSZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZVJlc3BvbnNlRGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXBkYXRlLXByb2ZpbGUtcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VwZGF0ZS1wcm9maWxlLXJlcXVlc3QtZGF0YSc7XG5cblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXNlcic7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYWRkcmVzc1wiO1xuaW1wb3J0IHsgUmVtb3ZlQWRkcmVzc1JlcXVlc3REYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcmVtb3ZlLWFkZHJlc3MtcmVxdWVzdC1kYXRhXCI7XG5pbXBvcnQge0FkZEFkZHJlc3NSZXF1ZXN0RGF0YX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYWRkLWFkZHJlc3MtcmVxdWVzdC1kYXRhXCI7XG5cbmNvbnN0IExTX1RPS0VOX05BTUUgPSAnZ2h0a2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvVXNlclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgYXV0aFRva2VuOnN0cmluZztcbiAgcHJpdmF0ZSByZW1lbWJlck1lOmJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB1c2VyOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBwcml2YXRlIGlzTG9nZ2VkSW46QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xuICBwcml2YXRlIGZhdm9yaXRlczpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xuICBwcml2YXRlIGFkZHJlc3NlczpCZWhhdmlvclN1YmplY3Q8QWRkcmVzc1tdPjtcbiAgcHJpdmF0ZSBzdHJlZXRzOkJlaGF2aW9yU3ViamVjdDxhbnlbXT47XG4gIHByaXZhdGUgaGlzdG9yeUl0ZW1zOkJlaGF2aW9yU3ViamVjdDxhbnlbXT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy9wcml2YXRlIHJlc3RvU3RvcmFnZVNlcnZpY2U6UmVzdG9TdG9yYWdlU2VydmljZSxcbiAgICBwcml2YXRlIG5ldDpOZXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLnVzZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgICB0aGlzLmZhdm9yaXRlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMuYWRkcmVzc2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgdGhpcy5oaXN0b3J5SXRlbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcblxuICAgIHRoaXMuYXV0aFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTFNfVE9LRU5fTkFNRSk7XG4gICAgaWYodGhpcy5hdXRoVG9rZW4pIHtcbiAgICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuaXNMb2dnZWRJbi5zdWJzY3JpYmUoaXNMb2dnZWRJbiA9PiB7XG4gICAgICBpZihpc0xvZ2dlZEluKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0RmF2b3JpdGVzKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRQcm9maWxlKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRBZGRyZXNzZXMoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmdldEhpc3RvcnkoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZXZlbnRlclxuICAgICAgLmdldE1lc3NhZ2VFbWl0dGVyKClcbiAgICAgIC5zdWJzY3JpYmUobWVzc2FnZSA9PiB7XG4gICAgICAgIHN3aXRjaChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwiVW5hdXRob3JpemVkXCI6XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUF1dGhUb2tlbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgc2lnbkluKGRhdGE6U2lnbkluUmVxdWVzdERhdGEsIHJlbWVtYmVyTWU6Ym9vbGVhbiA9IGZhbHNlKSB7XG5cbiAgICB0aGlzLnJlbWVtYmVyTWUgPSByZW1lbWJlck1lO1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9zaWduaW4nLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBTaWduSW5SZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnVzZXIubmV4dChyZXN1bHQudXNlcik7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKIw5DCvcOQwr4gw5DCsMOQwrLDkcKCw5DCvsORwoDDkMK4w5DCt8OQwrjDkcKAw5DCvsOQwrLDkMKww5DCvScpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcblxuICB9XG5cbiAgZ2V0UHJvZmlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0KCcvdXNlci9nZXQvdXNlci1pbmZvJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogVXNlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBnZXRIaXN0b3J5KCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5nZXQoJy91c2VyL2dldC9oaXN0b3J5JylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGhpc3RvcnlJdGVtcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5SXRlbXMubmV4dChoaXN0b3J5SXRlbXMpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHVwZGF0ZVByb2ZpbGUoZGF0YTpVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvc2V0L3VzZXItaW5mbycsIHtcbiAgICAgIHVzZXI6IGRhdGFcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBVcGRhdGVQcm9maWxlUmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIubmV4dChyZXN1bHQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgfVxuXG4gIGdldEFkZHJlc3NlcygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0KCcvdXNlci9nZXQvbG9jYXRpb24nKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAoYWRkcmVzc2VzOiBBZGRyZXNzW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc2VzLm5leHQoYWRkcmVzc2VzKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBhZGRBZGRyZXNzKGFkZHJlc3M6IEFkZEFkZHJlc3NSZXF1ZXN0RGF0YSkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9hZGQvbG9jYXRpb24nLCBhZGRyZXNzKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAoYWRkcmVzc2VzOiBBZGRyZXNzW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc2VzLm5leHQoYWRkcmVzc2VzKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBkZWxldGVBZGRyZXNzKGFkZHJlc3M6IEFkZHJlc3MpIHtcblxuICAgIHZhciByZXFCb2R5OiBSZW1vdmVBZGRyZXNzUmVxdWVzdERhdGEgPSB7XG4gICAgICBpZDogYWRkcmVzcy5pZCxcbiAgICAgIHN0cmVldDogYWRkcmVzcy5zdHJlZXQsXG4gICAgICBob21lOiBhZGRyZXNzLmhvbWVcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL3JlbW92ZS9sb2NhdGlvbicsIHJlcUJvZHkpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChhZGRyZXNzZXM6IEFkZHJlc3NbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRyZXNzZXMubmV4dChhZGRyZXNzZXMpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHNpZ25VcChkYXRhOlNpZ25VcFJlcXVlc3REYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9zaWdudXAnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBTaWduVXBSZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnVzZXIubmV4dChyZXN1bHQudXNlcik7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKIw5DCvcOQwr4gw5DCt8OQwrDDkcKAw5DCtcOQwrPDkMK4w5HCgcORwoLDkMK4w5HCgMOQwr7DkMKyw5DCsMOQwr0nKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB7IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKX1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHNpZ25PdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlQXV0aFRva2VuKCk7XG4gIH1cblxuICByZXNldFBhc3N3b3JkKGRhdGE6UmVzZXRQYXNzd29yZFJlcXVlc3REYXRhKSB7XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3Jlc2V0JywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogUmVzZXRQYXNzd29yZFJlc3BvbnNlRGF0YSkgPT4ge1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcmVzZXRQYXNzd29yZENvZGUoZGF0YTpSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhKSB7XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NvZGUnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBSZXNldFBhc3N3b3JkQ29kZVJlc3BvbnNlRGF0YSkgPT4ge1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cblxuICBnZXRGYXZvcml0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2Zhdm9yaXRlcyAnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdnZXRGYXZvcml0ZXMgcmVzdWx0JywgcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgYWRkRGlzaFRvRmF2b3JpdGVzKGRpc2g6YW55KSB7XG4gICAgbGV0IGRhdGE6QWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGEgPSB7XG4gICAgICBkaXNoSWQ6IGRpc2guaWRcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9hZGQvZmF2b3JpdGVzICcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IGZhdm9yaXRlc1VwZGF0ZWQ6IGFueVtdID0gdGhpcy5mYXZvcml0ZXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGZhdm9yaXRlc1VwZGF0ZWQucHVzaChkaXNoKTtcblxuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXMubmV4dChmYXZvcml0ZXNVcGRhdGVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21GYXZvcml0ZXMoZGlzaDphbnkpIHtcbiAgICBsZXQgZGF0YTpSZW1vdmVEaXNoRnJvbUZhdm9yaXRlc1JlcXVlc3REYXRhID0ge1xuICAgICAgZGlzaElkOiBkaXNoLmlkXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvcmVtb3ZlL2Zhdm9yaXRlcyAnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnw5DCkcORwovDkMK7w5DCvj0+Pj4nLCB0aGlzLmZhdm9yaXRlcy5nZXRWYWx1ZSgpLmxlbmd0aCk7XG4gICAgICAgICAgICBsZXQgZmF2b3JpdGVzVXBkYXRlZDogYW55W10gPSB0aGlzLmZhdm9yaXRlc1xuICAgICAgICAgICAgICAuZ2V0VmFsdWUoKVxuICAgICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCAhPSBkaXNoLmlkKTtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnw5DCocORwoLDkMKww5DCu8OQwr49Pj4+JywgZmF2b3JpdGVzVXBkYXRlZC5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXMubmV4dChmYXZvcml0ZXNVcGRhdGVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgdXNlclByb2ZpbGUoKTpCZWhhdmlvclN1YmplY3Q8VXNlcj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXI7XG4gIH1cblxuICB1c2VySXNMb2dnZWRJbigpOkJlaGF2aW9yU3ViamVjdDxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNMb2dnZWRJbjtcbiAgfVxuXG4gIHVzZXJGYXZvcml0ZXMoKTpCZWhhdmlvclN1YmplY3Q8YW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5mYXZvcml0ZXM7XG4gIH1cblxuICB1c2VyQWRkcmVzc2VzKCk6QmVoYXZpb3JTdWJqZWN0PEFkZHJlc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmFkZHJlc3NlcztcbiAgfVxuXG4gIHVzZXJIaXN0b3J5KCk6QmVoYXZpb3JTdWJqZWN0PGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeUl0ZW1zO1xuICB9XG5cblxuICBnZXRBdXRoVG9rZW4oKTpzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmF1dGhUb2tlbjtcbiAgfVxuXG4gIHNldEF1dGhUb2tlbihhdXRoVG9rZW46IHN0cmluZywgdXBkYXRlUHJvZmlsZTogYm9vbGVhbiA9IHRydWUpOnZvaWQge1xuICAgIGlmKHRoaXMucmVtZW1iZXJNZSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTFNfVE9LRU5fTkFNRSwgYXV0aFRva2VuKTtcbiAgICB9XG4gICAgdGhpcy5hdXRoVG9rZW4gPSBhdXRoVG9rZW47XG4gICAgdGhpcy5pc0xvZ2dlZEluLm5leHQodHJ1ZSk7XG5cbiAgICAvKmlmKHVwZGF0ZVByb2ZpbGUpIHtcbiAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpLnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5nZXRGYXZvcml0ZXMoKS5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuZ2V0QWRkcmVzc2VzKCkuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmdldEhpc3RvcnkoKS5zdWJzY3JpYmUoKTtcbiAgICB9Ki9cbiAgfVxuXG4gIGRlbGV0ZUF1dGhUb2tlbigpOnZvaWQge1xuICAgIHRoaXMuYXV0aFRva2VuID0gdW5kZWZpbmVkO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKExTX1RPS0VOX05BTUUpO1xuICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KGZhbHNlKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTaWduVXBSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi11cC1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwU2lnblVwXSdcbn0pXG5leHBvcnQgY2xhc3MgU2lnblVwRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcbiAgQElucHV0KCkgcGhvbmU6c3RyaW5nO1xuICBASW5wdXQoKSBlbWFpbDpzdHJpbmc7XG4gIEBJbnB1dCgpIHBhc3N3b3JkOnN0cmluZztcbiAgQElucHV0KCkgY2FwdGNoYTpzdHJpbmc7XG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGxldCBkYXRhOlNpZ25VcFJlcXVlc3REYXRhID0ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgcGhvbmU6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgZW1haWw6IHRoaXMuZW1haWwsXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgIGNhcHRjaGE6IHRoaXMuY2FwdGNoYVxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5zaWduVXAoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFNpZ25JblJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLWluLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBTaWduSW5dJ1xufSlcbmV4cG9ydCBjbGFzcyBTaWduSW5EaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHBob25lOnN0cmluZztcbiAgQElucHV0KCkgcGFzc3dvcmQ6c3RyaW5nO1xuICBASW5wdXQoKSBjYXB0Y2hhOnN0cmluZztcbiAgQElucHV0KCkgcmVtZW1iZXJNZTpib29sZWFuO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpTaWduSW5SZXF1ZXN0RGF0YSA9IHtcbiAgICAgIHBob25lOiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKSxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxuICAgICAgY2FwdGNoYTogdGhpcy5jYXB0Y2hhXG4gICAgfTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnNpZ25JbihkYXRhLCB0aGlzLnJlbWVtYmVyTWUpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKVxuICB9XG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnJyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwU2lnbk91dF0nXG59KVxuZXhwb3J0IGNsYXNzIFNpZ25PdXREaXJlY3RpdmUge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2Uuc2lnbk91dCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFJlc2V0UGFzc3dvcmRdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZXNldFBhc3N3b3JkRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGNhcHRjaGE6c3RyaW5nO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpSZXNldFBhc3N3b3JkUmVxdWVzdERhdGEgPSB7XG4gICAgICBwaG9uZTogdGhpcy5waG9uZSxcbiAgICAgIGNhcHRjaGE6IHRoaXMuY2FwdGNoYVxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5yZXNldFBhc3N3b3JkKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlcXVlc3QtZGF0YSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFJlc2V0UGFzc3dvcmRDb2RlXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVzZXRQYXNzd29yZENvZGVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHVzZXJJZDpzdHJpbmc7XG4gIEBJbnB1dCgpIGNvZGU6c3RyaW5nO1xuICBASW5wdXQoKSBwYXNzd29yZDpzdHJpbmc7XG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGxldCBkYXRhOlJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEgPSB7XG4gICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcbiAgICB9O1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAucmVzZXRQYXNzd29yZENvZGUoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwQmFsYW5jZV0nXG59KVxuZXhwb3J0IGNsYXNzIEJhbGFuY2VEaXJlY3RpdmUge1xuXG4gIGFtb3VudDpzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgdGhpcy5hbW91bnQgPSAnMCc7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCB0aGlzLmFtb3VudCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LFxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FkZC1kaXNoLXRvLWZhdm9yaXRlcy1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUmVtb3ZlRGlzaEZyb21GYXZvcml0ZXNSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVtb3ZlLWRpc2gtZnJvbS1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFRvZ2dsZURpc2hUb0Zhdm9yaXRlc10nXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBPdXRwdXQoKSBhZGRlZFRvRmF2b3JpdGVzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVtb3ZlZEZyb21GYXZvcml0ZXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGluRmF2b3JpdGVzOiBib29sZWFuO1xuICBpc0xvZ2dlZEluOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC51c2VyRmF2b3JpdGVzKClcbiAgICAgIC5zdWJzY3JpYmUoZmF2b3JpdGVzID0+IHtcblxuICAgICAgICB0aGlzLmluRmF2b3JpdGVzID0gZmF2b3JpdGVzLmZpbmQoZGlzaCA9PiBkaXNoLmlkID09IHRoaXMuZGlzaC5pZCk7XG5cbiAgICAgICAgaWYodGhpcy5pbkZhdm9yaXRlcykge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAudXNlcklzTG9nZ2VkSW4oKVxuICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4gdGhpcy5pc0xvZ2dlZEluID0gcmVzdWx0KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZih0aGlzLmluRmF2b3JpdGVzKSB7XG4gICAgICB0aGlzLnJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkRGlzaFRvRmF2b3JpdGVzKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlzaFRvRmF2b3JpdGVzKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuYWRkRGlzaFRvRmF2b3JpdGVzKHRoaXMuZGlzaClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZGVkVG9GYXZvcml0ZXMuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgIClcbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAucmVtb3ZlRGlzaEZyb21GYXZvcml0ZXModGhpcy5kaXNoKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlZEZyb21GYXZvcml0ZXMuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy91cGRhdGUtcHJvZmlsZS1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwVXBkYXRlUHJvZmlsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGVtYWlsOnN0cmluZztcblxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEgPSB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBwaG9uZTogdGhpcy5waG9uZSxcbiAgICAgIGVtYWlsOiB0aGlzLmVtYWlsXG4gICAgfTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnVwZGF0ZVByb2ZpbGUoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBBZGRBZGRyZXNzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FkZC1hZGRyZXNzLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBBZGRBZGRyZXNzXSdcbn0pXG5leHBvcnQgY2xhc3MgQWRkQWRkcmVzc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgc3RyZWV0OnN0cmluZzsgICAgIC8vcmVxdWlyZWRcbiAgQElucHV0KCkgaG9tZTpzdHJpbmc7ICAgICAgIC8vcmVxdWlyZWRcbiAgQElucHV0KCkgbmFtZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGhvdXNpbmc6c3RyaW5nO1xuICBASW5wdXQoKSBpbmRleDpzdHJpbmc7XG4gIEBJbnB1dCgpIGVudHJhbmNlOnN0cmluZztcbiAgQElucHV0KCkgZmxvb3I6c3RyaW5nO1xuICBASW5wdXQoKSBhcGFydG1lbnQ6c3RyaW5nO1xuICBASW5wdXQoKSBkb29ycGhvbmU6c3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmKCF0aGlzLnN0cmVldCkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfDkMKdw5DCtcOQwr7DkMKxw5HChcOQwr7DkMK0w5DCuMOQwrzDkMK+IMORwoPDkMK6w5DCsMOQwrfDkMKww5HCgsORwowgw5HCg8OQwrvDkMK4w5HChsORwoMnKTsgcmV0dXJuO1xuICAgIH1cbiAgICBpZighdGhpcy5ob21lKSB7XG4gICAgICB0aGlzLmVycm9yLmVtaXQoJ8OQwp3DkMK1w5DCvsOQwrHDkcKFw5DCvsOQwrTDkMK4w5DCvMOQwr4gw5HCg8OQwrrDkMKww5DCt8OQwrDDkcKCw5HCjCDDkMK9w5DCvsOQwrzDkMK1w5HCgCDDkMK0w5DCvsOQwrzDkMKwJyk7IHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YTpBZGRBZGRyZXNzUmVxdWVzdERhdGEgPSB7XG4gICAgICBzdHJlZXQ6IHRoaXMuc3RyZWV0LFxuICAgICAgaG9tZTogdGhpcy5ob21lLFxuICAgICAgbmFtZTogdGhpcy5uYW1lIHx8ICcnLFxuICAgICAgaG91c2luZzogdGhpcy5ob3VzaW5nIHx8ICcnLFxuICAgICAgaW5kZXg6IHRoaXMuaW5kZXggfHwgJycsXG4gICAgICBlbnRyYW5jZTogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgIGZsb29yOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgYXBhcnRtZW50OiB0aGlzLmFwYXJ0bWVudCB8fCAnJyxcbiAgICAgIGRvb3JwaG9uZTogdGhpcy5kb29ycGhvbmUgfHwgJydcbiAgICB9O1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuYWRkQWRkcmVzcyhkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYWRkcmVzc1wiO1xuXG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcERlbGV0ZUFkZHJlc3NdJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWxldGVBZGRyZXNzRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBhZGRyZXNzOkFkZHJlc3M7XG5cbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5kZWxldGVBZGRyZXNzKHRoaXMuYWRkcmVzcylcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTaWduVXBEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2lnbi11cC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2lnbkluRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NpZ24taW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNpZ25PdXREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2lnbi1vdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVzZXQtcGFzc3dvcmQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLWNvZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJhbGFuY2VEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYmFsYW5jZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RvZ2dsZS1kaXNoLXRvLWZhdm9yaXRlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy91cGRhdGUtcHJvZmlsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWRkQWRkcmVzc0RpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvYWRkLWFkZHJlc3MuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBEZWxldGVBZGRyZXNzRGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9kZWxldGUtYWRkcmVzcy5kaXJlY3RpdmVcIjtcblxuY29uc3QgRElSRUNUSVZFUyA9IFtcbiAgU2lnblVwRGlyZWN0aXZlLFxuICBTaWduSW5EaXJlY3RpdmUsXG4gIFNpZ25PdXREaXJlY3RpdmUsXG4gIFJlc2V0UGFzc3dvcmREaXJlY3RpdmUsXG4gIFJlc2V0UGFzc3dvcmRDb2RlRGlyZWN0aXZlLFxuICBCYWxhbmNlRGlyZWN0aXZlLFxuICBUb2dnbGVEaXNoVG9GYXZvcml0ZXNEaXJlY3RpdmUsXG4gIFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmUsXG4gIEFkZEFkZHJlc3NEaXJlY3RpdmUsXG4gIERlbGV0ZUFkZHJlc3NEaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogWy4uLkRJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIE5nVXNlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBSZXF1ZXN0LFxuICBIdHRwRXJyb3JSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZSkge31cblxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcikge1xuXG4gICAgY29uc29sZS5pbmZvKCdBdXRoSW50ZXJjZXB0b3InLCByZXEpO1xuXG4gICAgLy8gR2V0IHRoZSBhdXRoIHRva2VuIGZyb20gdGhlIHNlcnZpY2UuXG4gICAgY29uc3QgYXV0aFRva2VuID0gdGhpcy51c2VyU2VydmljZS5nZXRBdXRoVG9rZW4oKTtcblxuICAgIGlmKGF1dGhUb2tlbikge1xuICAgICAgLy8gQ2xvbmUgdGhlIHJlcXVlc3QgYW5kIHJlcGxhY2UgdGhlIG9yaWdpbmFsIGhlYWRlcnMgd2l0aFxuICAgICAgLy8gY2xvbmVkIGhlYWRlcnMsIHVwZGF0ZWQgd2l0aCB0aGUgYXV0aG9yaXphdGlvbi5cbiAgICAgIGNvbnN0IGF1dGhSZXEgPSByZXEuY2xvbmUoe1xuICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCBgSldUICR7YXV0aFRva2VufWApXG4gICAgICB9KTtcblxuICAgICAgLy8gc2VuZCBjbG9uZWQgcmVxdWVzdCB3aXRoIGhlYWRlciB0byB0aGUgbmV4dCBoYW5kbGVyLlxuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKGF1dGhSZXEpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gIH1cbn0iLCJpbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgQXV0aEludGVyY2VwdG9yIH0gZnJvbSAnLi9hdXRoLmludGVyY2VwdG9yJztcblxuZXhwb3J0IGNvbnN0IG5nVXNlckh0dHBJbnRlcmNlcHRvclByb3ZpZGVycyA9IFtcbiAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEF1dGhJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfVxuXTsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBK0JBLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQztBQUs5Qjs7Ozs7SUFXRSxZQUVVLEtBQ0E7UUFEQSxRQUFHLEdBQUgsR0FBRztRQUNILFlBQU8sR0FBUCxPQUFPOzBCQVhZLEtBQUs7UUFhaEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENB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