import { Injectable, Directive, HostListener, Input, Output, EventEmitter, Renderer2, ElementRef, defineInjectable, inject, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
import { __spread } from 'tslib';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var LS_TOKEN_NAME = 'gf:tkn:v2';
var NgRestoUserService = /** @class */ (function () {
    function NgRestoUserService(net, eventer) {
        var _this = this;
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
        this.isLoggedIn.subscribe((/**
         * @param {?} isLoggedIn
         * @return {?}
         */
        function (isLoggedIn) {
            if (isLoggedIn) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.getFavorites().subscribe();
                    _this.getProfile().subscribe();
                    _this.getAddresses().subscribe();
                    _this.getHistory().subscribe();
                }), 500);
            }
        }));
        this.eventer
            .getMessageEmitter()
            .subscribe((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            switch (message.type) {
                case "Unauthorized":
                    _this.deleteAuthToken();
                    break;
            }
        }));
    }
    /**
     * @param {?} data
     * @param {?=} rememberMe
     * @return {?}
     */
    NgRestoUserService.prototype.signIn = /**
     * @param {?} data
     * @param {?=} rememberMe
     * @return {?}
     */
    function (data, rememberMe) {
        var _this = this;
        if (rememberMe === void 0) { rememberMe = false; }
        this.rememberMe = rememberMe;
        return this.net.post('/signin', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            _this.setAuthToken(result.token, false);
            _this.user.next(result.user);
            _this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Успешно авторизирован'));
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.getProfile = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.net.get('/user/get/user-info')
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            _this.user.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.getHistory = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.net.get('/user/get/history')
            .pipe(tap((/**
         * @param {?} historyItems
         * @return {?}
         */
        function (historyItems) {
            _this.historyItems.next(historyItems);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgRestoUserService.prototype.updateProfile = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return this.net.post('/user/set/user-info', {
            user: data
        })
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            _this.user.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.getAddresses = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.net.get('/user/get/location')
            .pipe(tap((/**
         * @param {?} addresses
         * @return {?}
         */
        function (addresses) {
            _this.addresses.next(addresses);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @param {?} address
     * @return {?}
     */
    NgRestoUserService.prototype.addAddress = /**
     * @param {?} address
     * @return {?}
     */
    function (address) {
        var _this = this;
        return this.net.post('/user/add/location', address)
            .pipe(tap((/**
         * @param {?} addresses
         * @return {?}
         */
        function (addresses) {
            _this.addresses.next(addresses);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @param {?} address
     * @return {?}
     */
    NgRestoUserService.prototype.deleteAddress = /**
     * @param {?} address
     * @return {?}
     */
    function (address) {
        var _this = this;
        /** @type {?} */
        var reqBody = {
            id: address.id,
            street: address.street,
            home: address.home
        };
        return this.net.post('/user/remove/location', reqBody)
            .pipe(tap((/**
         * @param {?} addresses
         * @return {?}
         */
        function (addresses) {
            _this.addresses.next(addresses);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgRestoUserService.prototype.signUp = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return this.net.post('/signup', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            //this.setAuthToken(result.token, false);
            //this.user.next(result.user);
            _this.eventer.emitMessageEvent(new EventMessage('success', 'Регистрация', 'Ваш пароль был отправлен на указанный номер телефона'));
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error));
        })));
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.signOut = /**
     * @return {?}
     */
    function () {
        return this.deleteAuthToken();
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.getBonuses = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.net.post('/bonus/get', {})
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgRestoUserService.prototype.resetPassword = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return this.net.post('/reset', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgRestoUserService.prototype.resetPasswordCode = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return this.net.post('/code', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.getFavorites = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.net.get('/user/get/favorites ')
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            console.info('getFavorites result', result);
            _this.favorites.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @param {?} dish
     * @return {?}
     */
    NgRestoUserService.prototype.addDishToFavorites = /**
     * @param {?} dish
     * @return {?}
     */
    function (dish) {
        var _this = this;
        /** @type {?} */
        var data = {
            dishId: dish.id
        };
        return this.net.post('/user/add/favorites ', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            /** @type {?} */
            var favoritesUpdated = _this.favorites.getValue();
            favoritesUpdated.push(dish);
            _this.favorites.next(favoritesUpdated);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @param {?} dish
     * @return {?}
     */
    NgRestoUserService.prototype.removeDishFromFavorites = /**
     * @param {?} dish
     * @return {?}
     */
    function (dish) {
        var _this = this;
        /** @type {?} */
        var data = {
            dishId: dish.id
        };
        return this.net.post('/user/remove/favorites ', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            console.info('Было=>>>', _this.favorites.getValue().length);
            /** @type {?} */
            var favoritesUpdated = _this.favorites
                .getValue()
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.id != dish.id; }));
            console.info('Стало=>>>', favoritesUpdated.length);
            _this.favorites.next(favoritesUpdated);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); })));
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.userProfile = /**
     * @return {?}
     */
    function () {
        return this.user;
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.userIsLoggedIn = /**
     * @return {?}
     */
    function () {
        return this.isLoggedIn;
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.userFavorites = /**
     * @return {?}
     */
    function () {
        return this.favorites;
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.userAddresses = /**
     * @return {?}
     */
    function () {
        return this.addresses;
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.userHistory = /**
     * @return {?}
     */
    function () {
        return this.historyItems;
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.getAuthToken = /**
     * @return {?}
     */
    function () {
        return this.authToken;
    };
    /**
     * @param {?} authToken
     * @param {?=} updateProfile
     * @return {?}
     */
    NgRestoUserService.prototype.setAuthToken = /**
     * @param {?} authToken
     * @param {?=} updateProfile
     * @return {?}
     */
    function (authToken, updateProfile) {
        if (updateProfile === void 0) { updateProfile = true; }
        if (this.rememberMe) {
            localStorage.setItem(LS_TOKEN_NAME, authToken);
            localStorage.removeItem('gf:login:phone');
        }
        this.authToken = authToken;
        this.isLoggedIn.next(true);
        /*if(updateProfile) {
          this.getProfile().subscribe();
          this.getFavorites().subscribe();
          this.getAddresses().subscribe();
          this.getHistory().subscribe();
        }*/
    };
    /**
     * @return {?}
     */
    NgRestoUserService.prototype.deleteAuthToken = /**
     * @return {?}
     */
    function () {
        this.authToken = undefined;
        localStorage.removeItem(LS_TOKEN_NAME);
        localStorage.removeItem('gf:login:phone');
        this.isLoggedIn.next(false);
    };
    NgRestoUserService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    NgRestoUserService.ctorParameters = function () { return [
        { type: NetService },
        { type: EventerService }
    ]; };
    /** @nocollapse */ NgRestoUserService.ngInjectableDef = defineInjectable({ factory: function NgRestoUserService_Factory() { return new NgRestoUserService(inject(NetService), inject(EventerService)); }, token: NgRestoUserService, providedIn: "root" });
    return NgRestoUserService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SignUpDirective = /** @class */ (function () {
    function SignUpDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    SignUpDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = {
            name: this.name,
            phone: this.preparePhone(this.phone),
            email: this.email,
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signUp(data)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.success.emit(true); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    /**
     * @param {?} phone
     * @return {?}
     */
    SignUpDirective.prototype.preparePhone = /**
     * @param {?} phone
     * @return {?}
     */
    function (phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
    };
    SignUpDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appSignUp]'
                },] },
    ];
    SignUpDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
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
    return SignUpDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SignInDirective = /** @class */ (function () {
    function SignInDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    SignInDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = {
            phone: this.preparePhone(this.phone),
            password: this.password,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .signIn(data, this.rememberMe)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.success.emit(true); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    /**
     * @param {?} phone
     * @return {?}
     */
    SignInDirective.prototype.preparePhone = /**
     * @param {?} phone
     * @return {?}
     */
    function (phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
    };
    SignInDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appSignIn]'
                },] },
    ];
    SignInDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    SignInDirective.propDecorators = {
        phone: [{ type: Input }],
        password: [{ type: Input }],
        captcha: [{ type: Input }],
        rememberMe: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return SignInDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SignOutDirective = /** @class */ (function () {
    function SignOutDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
    }
    /**
     * @return {?}
     */
    SignOutDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.ngRestoUserService.signOut();
    };
    SignOutDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appSignOut]'
                },] },
    ];
    SignOutDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    SignOutDirective.propDecorators = {
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return SignOutDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ResetPasswordDirective = /** @class */ (function () {
    function ResetPasswordDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ResetPasswordDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = {
            phone: this.phone,
            captcha: this.captcha
        };
        this.ngRestoUserService
            .resetPassword(data)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.success.emit(true); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    ResetPasswordDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appResetPassword]'
                },] },
    ];
    ResetPasswordDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    ResetPasswordDirective.propDecorators = {
        phone: [{ type: Input }],
        captcha: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return ResetPasswordDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ResetPasswordCodeDirective = /** @class */ (function () {
    function ResetPasswordCodeDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ResetPasswordCodeDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = {
            userId: this.userId,
            code: this.code,
            password: this.password
        };
        this.ngRestoUserService
            .resetPasswordCode(data)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.success.emit(true); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    ResetPasswordCodeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appResetPasswordCode]'
                },] },
    ];
    ResetPasswordCodeDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    ResetPasswordCodeDirective.propDecorators = {
        userId: [{ type: Input }],
        code: [{ type: Input }],
        password: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return ResetPasswordCodeDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BalanceDirective = /** @class */ (function () {
    function BalanceDirective(renderer, el, ngRestoUserService) {
        var _this = this;
        this.renderer = renderer;
        this.el = el;
        this.ngRestoUserService = ngRestoUserService;
        /** @type {?} */
        var balance = 0;
        this.ngRestoUserService
            .getBonuses()
            .subscribe((/**
         * @param {?} bonuses
         * @return {?}
         */
        function (bonuses) {
            for (var name_1 in bonuses) {
                /** @type {?} */
                var data = bonuses[name_1];
                if (data.state == 'active') {
                    balance += data.balance;
                }
            }
            _this.amount = "" + balance;
            _this.renderer.setProperty(_this.el.nativeElement, 'innerHTML', _this.amount);
        }));
    }
    BalanceDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appBalance]'
                },] },
    ];
    BalanceDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgRestoUserService }
    ]; };
    return BalanceDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ToggleDishToFavoritesDirective = /** @class */ (function () {
    function ToggleDishToFavoritesDirective(ngRestoUserService, element, renderer) {
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
    ToggleDishToFavoritesDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngRestoUserService
            .userFavorites()
            .subscribe((/**
         * @param {?} favorites
         * @return {?}
         */
        function (favorites) {
            _this.inFavorites = favorites.find((/**
             * @param {?} dish
             * @return {?}
             */
            function (dish) { return dish.id == _this.dish.id; }));
            if (_this.inFavorites) {
                _this.renderer.addClass(_this.element.nativeElement, 'selected');
            }
            else {
                _this.renderer.removeClass(_this.element.nativeElement, 'selected');
            }
        }));
        this.ngRestoUserService
            .userIsLoggedIn()
            .subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) { return _this.isLoggedIn = result; }));
    };
    /**
     * @return {?}
     */
    ToggleDishToFavoritesDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        if (this.inFavorites) {
            this.removeDishFromFavorites();
        }
        else {
            this.addDishToFavorites();
        }
    };
    /**
     * @return {?}
     */
    ToggleDishToFavoritesDirective.prototype.addDishToFavorites = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngRestoUserService
            .addDishToFavorites(this.dish)
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.addedToFavorites.emit();
            _this.change.emit(true);
            _this.renderer.addClass(_this.element.nativeElement, 'selected');
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    /**
     * @return {?}
     */
    ToggleDishToFavoritesDirective.prototype.removeDishFromFavorites = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngRestoUserService
            .removeDishFromFavorites(this.dish)
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.removedFromFavorites.emit();
            _this.change.emit(false);
            _this.renderer.removeClass(_this.element.nativeElement, 'selected');
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    ToggleDishToFavoritesDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appToggleDishToFavorites]'
                },] },
    ];
    ToggleDishToFavoritesDirective.ctorParameters = function () { return [
        { type: NgRestoUserService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ToggleDishToFavoritesDirective.propDecorators = {
        dish: [{ type: Input }],
        addedToFavorites: [{ type: Output }],
        removedFromFavorites: [{ type: Output }],
        change: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return ToggleDishToFavoritesDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UpdateProfileDirective = /** @class */ (function () {
    function UpdateProfileDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    UpdateProfileDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = {
            name: this.name,
            //phone: this.phone,
            email: this.email
        };
        this.ngRestoUserService
            .updateProfile(data)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.success.emit(true); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    UpdateProfileDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appUpdateProfile]'
                },] },
    ];
    UpdateProfileDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    UpdateProfileDirective.propDecorators = {
        name: [{ type: Input }],
        phone: [{ type: Input }],
        email: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return UpdateProfileDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AddAddressDirective = /** @class */ (function () {
    function AddAddressDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    AddAddressDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.street) {
            this.error.emit('Необходимо указать улицу');
            return;
        }
        if (!this.home) {
            this.error.emit('Необходимо указать номер дома');
            return;
        }
        /** @type {?} */
        var data = {
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
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.success.emit(true); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    AddAddressDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appAddAddress]'
                },] },
    ];
    AddAddressDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
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
    return AddAddressDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DeleteAddressDirective = /** @class */ (function () {
    function DeleteAddressDirective(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    DeleteAddressDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngRestoUserService
            .deleteAddress(this.address)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.success.emit(true); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    DeleteAddressDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appDeleteAddress]'
                },] },
    ];
    DeleteAddressDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    DeleteAddressDirective.propDecorators = {
        address: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return DeleteAddressDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DIRECTIVES = [
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
var NgUserModule = /** @class */ (function () {
    function NgUserModule() {
    }
    NgUserModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    providers: [],
                    declarations: __spread(DIRECTIVES),
                    exports: __spread(DIRECTIVES)
                },] },
    ];
    return NgUserModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(userService) {
        this.userService = userService;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    AuthInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        console.info('AuthInterceptor', req);
        // Get the auth token from the service.
        /** @type {?} */
        var authToken = this.userService.getAuthToken();
        if (authToken) {
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
            /** @type {?} */
            var authReq = req.clone({
                headers: req.headers.set('Authorization', "JWT " + authToken)
            });
            // send cloned request with header to the next handler.
            return next.handle(authReq);
        }
        return next.handle(req);
    };
    AuthInterceptor.decorators = [
        { type: Injectable },
    ];
    AuthInterceptor.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    return AuthInterceptor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var ngUserHttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgRestoUserService, NgUserModule, ngUserHttpInterceptorProviders, AuthInterceptor, AddAddressDirective as ɵj, BalanceDirective as ɵg, DeleteAddressDirective as ɵk, ResetPasswordCodeDirective as ɵf, ResetPasswordDirective as ɵe, SignInDirective as ɵc, SignOutDirective as ɵd, SignUpDirective as ɵa, ToggleDishToFavoritesDirective as ɵh, UpdateProfileDirective as ɵi, NgRestoUserService as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicmVzdG8tbmctdXNlci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHdlYnJlc3RvL25nLXVzZXIvbGliL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLXVzZXIvbGliL2RpcmVjdGl2ZXMvc2lnbi11cC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL3NpZ24taW4uZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy9zaWduLW91dC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLXVzZXIvbGliL2RpcmVjdGl2ZXMvcmVzZXQtcGFzc3dvcmQtY29kZS5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL2JhbGFuY2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy90b2dnbGUtZGlzaC10by1mYXZvcml0ZXMuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy91cGRhdGUtcHJvZmlsZS5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL2FkZC1hZGRyZXNzLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLXVzZXIvbGliL2RpcmVjdGl2ZXMvZGVsZXRlLWFkZHJlc3MuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvbmctdXNlci5tb2R1bGUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9odHRwLWludGVyY2VwdG9ycy9hdXRoLmludGVyY2VwdG9yLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvaHR0cC1pbnRlcmNlcHRvcnMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIE5ldFNlcnZpY2UsXG4gIEV2ZW50ZXJTZXJ2aWNlLFxuICBFdmVudE1lc3NhZ2Vcbn0gZnJvbSAnQHdlYnJlc3RvL25nLWNvcmUnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgU2lnblVwUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLWNvZGUtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IEFkZERpc2hUb0Zhdm9yaXRlc1JlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hZGQtZGlzaC10by1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlbW92ZURpc2hGcm9tRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbW92ZS1kaXNoLWZyb20tZmF2b3JpdGVzLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBQcm9maWxlUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9wcm9maWxlLXJlc3BvbnNlLWRhdGEnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24taW4tcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBTaWduVXBSZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZVJlc3BvbnNlRGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXBkYXRlLXByb2ZpbGUtcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VwZGF0ZS1wcm9maWxlLXJlcXVlc3QtZGF0YSc7XG5cblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXNlcic7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYWRkcmVzc1wiO1xuaW1wb3J0IHsgUmVtb3ZlQWRkcmVzc1JlcXVlc3REYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcmVtb3ZlLWFkZHJlc3MtcmVxdWVzdC1kYXRhXCI7XG5pbXBvcnQge0FkZEFkZHJlc3NSZXF1ZXN0RGF0YX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYWRkLWFkZHJlc3MtcmVxdWVzdC1kYXRhXCI7XG5cbmNvbnN0IExTX1RPS0VOX05BTUUgPSAnZ2Y6dGtuOnYyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdSZXN0b1VzZXJTZXJ2aWNlIHtcblxuICBwcml2YXRlIGF1dGhUb2tlbjpzdHJpbmc7XG4gIHByaXZhdGUgcmVtZW1iZXJNZTpib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgdXNlcjpCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgcHJpdmF0ZSBpc0xvZ2dlZEluOkJlaGF2aW9yU3ViamVjdDxib29sZWFuPjtcbiAgcHJpdmF0ZSBmYXZvcml0ZXM6QmVoYXZpb3JTdWJqZWN0PGFueVtdPjtcbiAgcHJpdmF0ZSBhZGRyZXNzZXM6QmVoYXZpb3JTdWJqZWN0PEFkZHJlc3NbXT47XG4gIHByaXZhdGUgc3RyZWV0czpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xuICBwcml2YXRlIGhpc3RvcnlJdGVtczpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIC8vcHJpdmF0ZSByZXN0b1N0b3JhZ2VTZXJ2aWNlOlJlc3RvU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZXQ6TmV0U2VydmljZSxcbiAgICBwcml2YXRlIGV2ZW50ZXI6RXZlbnRlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy51c2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gICAgdGhpcy5pc0xvZ2dlZEluID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gICAgdGhpcy5mYXZvcml0ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgICB0aGlzLmFkZHJlc3NlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMuaGlzdG9yeUl0ZW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG5cbiAgICB0aGlzLmF1dGhUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKExTX1RPS0VOX05BTUUpO1xuICAgIGlmKHRoaXMuYXV0aFRva2VuKSB7XG4gICAgICB0aGlzLmlzTG9nZ2VkSW4ubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzTG9nZ2VkSW4uc3Vic2NyaWJlKGlzTG9nZ2VkSW4gPT4ge1xuICAgICAgaWYoaXNMb2dnZWRJbikge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmdldEZhdm9yaXRlcygpLnN1YnNjcmliZSgpO1xuICAgICAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpLnN1YnNjcmliZSgpO1xuICAgICAgICAgIHRoaXMuZ2V0QWRkcmVzc2VzKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRIaXN0b3J5KCkuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmV2ZW50ZXJcbiAgICAgIC5nZXRNZXNzYWdlRW1pdHRlcigpXG4gICAgICAuc3Vic2NyaWJlKG1lc3NhZ2UgPT4ge1xuICAgICAgICBzd2l0Y2gobWVzc2FnZS50eXBlKSB7XG4gICAgICAgICAgY2FzZSBcIlVuYXV0aG9yaXplZFwiOlxuICAgICAgICAgICAgdGhpcy5kZWxldGVBdXRoVG9rZW4oKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHNpZ25JbihkYXRhOlNpZ25JblJlcXVlc3REYXRhLCByZW1lbWJlck1lOmJvb2xlYW4gPSBmYWxzZSkge1xuXG4gICAgdGhpcy5yZW1lbWJlck1lID0gcmVtZW1iZXJNZTtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvc2lnbmluJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogU2lnbkluUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QXV0aFRva2VuKHJlc3VsdC50b2tlbiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0LnVzZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfDkMKjw5HCgcOQwr/DkMK1w5HChScsICfDkMKjw5HCgcOQwr/DkMK1w5HCiMOQwr3DkMK+IMOQwrDDkMKyw5HCgsOQwr7DkcKAw5DCuMOQwrfDkMK4w5HCgMOQwr7DkMKyw5DCsMOQwr0nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgfVxuXG4gIGdldFByb2ZpbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L3VzZXItaW5mbycpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFVzZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgZ2V0SGlzdG9yeSgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0KCcvdXNlci9nZXQvaGlzdG9yeScpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChoaXN0b3J5SXRlbXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeUl0ZW1zLm5leHQoaGlzdG9yeUl0ZW1zKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVQcm9maWxlKGRhdGE6VXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL3NldC91c2VyLWluZm8nLCB7XG4gICAgICB1c2VyOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogVXBkYXRlUHJvZmlsZVJlc3BvbnNlRGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gIH1cblxuICBnZXRBZGRyZXNzZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2xvY2F0aW9uJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgYWRkQWRkcmVzcyhhZGRyZXNzOiBBZGRBZGRyZXNzUmVxdWVzdERhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvYWRkL2xvY2F0aW9uJywgYWRkcmVzcylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgZGVsZXRlQWRkcmVzcyhhZGRyZXNzOiBBZGRyZXNzKSB7XG5cbiAgICB2YXIgcmVxQm9keTogUmVtb3ZlQWRkcmVzc1JlcXVlc3REYXRhID0ge1xuICAgICAgaWQ6IGFkZHJlc3MuaWQsXG4gICAgICBzdHJlZXQ6IGFkZHJlc3Muc3RyZWV0LFxuICAgICAgaG9tZTogYWRkcmVzcy5ob21lXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9yZW1vdmUvbG9jYXRpb24nLCByZXFCb2R5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAoYWRkcmVzc2VzOiBBZGRyZXNzW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc2VzLm5leHQoYWRkcmVzc2VzKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBzaWduVXAoZGF0YTpTaWduVXBSZXF1ZXN0RGF0YSkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvc2lnbnVwJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogU2lnblVwUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIC8vdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICAvL3RoaXMudXNlci5uZXh0KHJlc3VsdC51c2VyKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAnw5DCoMOQwrXDkMKzw5DCuMORwoHDkcKCw5HCgMOQwrDDkcKGw5DCuMORwo8nLCAnw5DCksOQwrDDkcKIIMOQwr/DkMKww5HCgMOQwr7DkMK7w5HCjCDDkMKxw5HCi8OQwrsgw5DCvsORwoLDkMK/w5HCgMOQwrDDkMKyw5DCu8OQwrXDkMK9IMOQwr3DkMKwIMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvcOQwr3DkcKLw5DCuSDDkMK9w5DCvsOQwrzDkMK1w5HCgCDDkcKCw5DCtcOQwrvDkMK1w5HChMOQwr7DkMK9w5DCsCcpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHsgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApfVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgc2lnbk91dCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxldGVBdXRoVG9rZW4oKTtcbiAgfVxuXG5cbiAgZ2V0Qm9udXNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2JvbnVzL2dldCcsIHt9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHJlc2V0UGFzc3dvcmQoZGF0YTpSZXNldFBhc3N3b3JkUmVxdWVzdERhdGEpIHtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvcmVzZXQnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBSZXNldFBhc3N3b3JkUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICByZXNldFBhc3N3b3JkQ29kZShkYXRhOlJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEpIHtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvY29kZScsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFJlc2V0UGFzc3dvcmRDb2RlUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuXG4gIGdldEZhdm9yaXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0KCcvdXNlci9nZXQvZmF2b3JpdGVzICcpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ2dldEZhdm9yaXRlcyByZXN1bHQnLCByZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXMubmV4dChyZXN1bHQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBhZGREaXNoVG9GYXZvcml0ZXMoZGlzaDphbnkpIHtcbiAgICBsZXQgZGF0YTpBZGREaXNoVG9GYXZvcml0ZXNSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIGRpc2hJZDogZGlzaC5pZFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL2FkZC9mYXZvcml0ZXMgJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgZmF2b3JpdGVzVXBkYXRlZDogYW55W10gPSB0aGlzLmZhdm9yaXRlcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgZmF2b3JpdGVzVXBkYXRlZC5wdXNoKGRpc2gpO1xuXG4gICAgICAgICAgICB0aGlzLmZhdm9yaXRlcy5uZXh0KGZhdm9yaXRlc1VwZGF0ZWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUZhdm9yaXRlcyhkaXNoOmFueSkge1xuICAgIGxldCBkYXRhOlJlbW92ZURpc2hGcm9tRmF2b3JpdGVzUmVxdWVzdERhdGEgPSB7XG4gICAgICBkaXNoSWQ6IGRpc2guaWRcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9yZW1vdmUvZmF2b3JpdGVzICcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCfDkMKRw5HCi8OQwrvDkMK+PT4+PicsIHRoaXMuZmF2b3JpdGVzLmdldFZhbHVlKCkubGVuZ3RoKTtcbiAgICAgICAgICAgIGxldCBmYXZvcml0ZXNVcGRhdGVkOiBhbnlbXSA9IHRoaXMuZmF2b3JpdGVzXG4gICAgICAgICAgICAgIC5nZXRWYWx1ZSgpXG4gICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9IGRpc2guaWQpO1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCfDkMKhw5HCgsOQwrDDkMK7w5DCvj0+Pj4nLCBmYXZvcml0ZXNVcGRhdGVkLmxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLmZhdm9yaXRlcy5uZXh0KGZhdm9yaXRlc1VwZGF0ZWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICB1c2VyUHJvZmlsZSgpOkJlaGF2aW9yU3ViamVjdDxVc2VyPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlcjtcbiAgfVxuXG4gIHVzZXJJc0xvZ2dlZEluKCk6QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pc0xvZ2dlZEluO1xuICB9XG5cbiAgdXNlckZhdm9yaXRlcygpOkJlaGF2aW9yU3ViamVjdDxhbnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmZhdm9yaXRlcztcbiAgfVxuXG4gIHVzZXJBZGRyZXNzZXMoKTpCZWhhdmlvclN1YmplY3Q8QWRkcmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRkcmVzc2VzO1xuICB9XG5cbiAgdXNlckhpc3RvcnkoKTpCZWhhdmlvclN1YmplY3Q8YW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5SXRlbXM7XG4gIH1cblxuXG4gIGdldEF1dGhUb2tlbigpOnN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aFRva2VuO1xuICB9XG5cbiAgc2V0QXV0aFRva2VuKGF1dGhUb2tlbjogc3RyaW5nLCB1cGRhdGVQcm9maWxlOiBib29sZWFuID0gdHJ1ZSk6dm9pZCB7XG4gICAgaWYodGhpcy5yZW1lbWJlck1lKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMU19UT0tFTl9OQU1FLCBhdXRoVG9rZW4pO1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2dmOmxvZ2luOnBob25lJyk7XG4gICAgfVxuICAgIHRoaXMuYXV0aFRva2VuID0gYXV0aFRva2VuO1xuICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KHRydWUpO1xuXG4gICAgLyppZih1cGRhdGVQcm9maWxlKSB7XG4gICAgICB0aGlzLmdldFByb2ZpbGUoKS5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuZ2V0RmF2b3JpdGVzKCkuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmdldEFkZHJlc3NlcygpLnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5nZXRIaXN0b3J5KCkuc3Vic2NyaWJlKCk7XG4gICAgfSovXG4gIH1cblxuICBkZWxldGVBdXRoVG9rZW4oKTp2b2lkIHtcbiAgICB0aGlzLmF1dGhUb2tlbiA9IHVuZGVmaW5lZDtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShMU19UT0tFTl9OQU1FKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZ2Y6bG9naW46cGhvbmUnKTtcbiAgICB0aGlzLmlzTG9nZ2VkSW4ubmV4dChmYWxzZSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgU2lnblVwUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFNpZ25VcF0nXG59KVxuZXhwb3J0IGNsYXNzIFNpZ25VcERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgbmFtZTpzdHJpbmc7XG4gIEBJbnB1dCgpIHBob25lOnN0cmluZztcbiAgQElucHV0KCkgZW1haWw6c3RyaW5nO1xuICBASW5wdXQoKSBwYXNzd29yZDpzdHJpbmc7XG4gIEBJbnB1dCgpIGNhcHRjaGE6c3RyaW5nO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpTaWduVXBSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIHBob25lOiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKSxcbiAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXG4gICAgICBjYXB0Y2hhOiB0aGlzLmNhcHRjaGFcbiAgICB9O1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuc2lnblVwKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG4gIHByZXBhcmVQaG9uZShwaG9uZSkge1xuICAgIHBob25lID0gJysnICsgcGhvbmUucmVwbGFjZSgvW14wLTldL2dpbSwnJyk7XG4gICAgcmV0dXJuIHBob25lLnJlcGxhY2UoJys4JywgJycpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwU2lnbkluXSdcbn0pXG5leHBvcnQgY2xhc3MgU2lnbkluRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIHBhc3N3b3JkOnN0cmluZztcbiAgQElucHV0KCkgY2FwdGNoYTpzdHJpbmc7XG4gIEBJbnB1dCgpIHJlbWVtYmVyTWU6Ym9vbGVhbjtcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgbGV0IGRhdGE6U2lnbkluUmVxdWVzdERhdGEgPSB7XG4gICAgICBwaG9uZTogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgIGNhcHRjaGE6IHRoaXMuY2FwdGNoYVxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5zaWduSW4oZGF0YSwgdGhpcy5yZW1lbWJlck1lKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgIClcbiAgfVxuXG4gIHByZXBhcmVQaG9uZShwaG9uZSkge1xuICAgIHBob25lID0gJysnICsgcGhvbmUucmVwbGFjZSgvW14wLTldL2dpbSwnJyk7XG4gICAgcmV0dXJuIHBob25lLnJlcGxhY2UoJys4JywgJycpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgU2lnbkluUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24taW4tcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFNpZ25PdXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBTaWduT3V0RGlyZWN0aXZlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlLnNpZ25PdXQoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBSZXNldFBhc3N3b3JkXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVzZXRQYXNzd29yZERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgcGhvbmU6c3RyaW5nO1xuICBASW5wdXQoKSBjYXB0Y2hhOnN0cmluZztcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgbGV0IGRhdGE6UmVzZXRQYXNzd29yZFJlcXVlc3REYXRhID0ge1xuICAgICAgcGhvbmU6IHRoaXMucGhvbmUsXG4gICAgICBjYXB0Y2hhOiB0aGlzLmNhcHRjaGFcbiAgICB9O1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAucmVzZXRQYXNzd29yZChkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvZGVSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtY29kZS1yZXF1ZXN0LWRhdGEnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBSZXNldFBhc3N3b3JkQ29kZV0nXG59KVxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmRDb2RlRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSB1c2VySWQ6c3RyaW5nO1xuICBASW5wdXQoKSBjb2RlOnN0cmluZztcbiAgQElucHV0KCkgcGFzc3dvcmQ6c3RyaW5nO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhID0ge1xuICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXG4gICAgfTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnJlc2V0UGFzc3dvcmRDb2RlKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIFJlbmRlcmVyMiwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcEJhbGFuY2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBCYWxhbmNlRGlyZWN0aXZlIHtcblxuICBhbW91bnQ6c3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7XG4gICAgbGV0IGJhbGFuY2UgPSAwO1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuZ2V0Qm9udXNlcygpXG4gICAgICAuc3Vic2NyaWJlKGJvbnVzZXMgPT4ge1xuICAgICAgICBmb3IobGV0IG5hbWUgaW4gYm9udXNlcykge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBib251c2VzW25hbWVdO1xuICAgICAgICAgIGlmKGRhdGEuc3RhdGUgPT0gJ2FjdGl2ZScpIHtcbiAgICAgICAgICAgIGJhbGFuY2UgKz0gZGF0YS5iYWxhbmNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYW1vdW50ID0gYCR7YmFsYW5jZX1gO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsIHRoaXMuYW1vdW50KTtcbiAgICAgIH0pO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LFxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FkZC1kaXNoLXRvLWZhdm9yaXRlcy1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUmVtb3ZlRGlzaEZyb21GYXZvcml0ZXNSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVtb3ZlLWRpc2gtZnJvbS1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFRvZ2dsZURpc2hUb0Zhdm9yaXRlc10nXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBPdXRwdXQoKSBhZGRlZFRvRmF2b3JpdGVzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVtb3ZlZEZyb21GYXZvcml0ZXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGluRmF2b3JpdGVzOiBib29sZWFuO1xuICBpc0xvZ2dlZEluOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC51c2VyRmF2b3JpdGVzKClcbiAgICAgIC5zdWJzY3JpYmUoZmF2b3JpdGVzID0+IHtcblxuICAgICAgICB0aGlzLmluRmF2b3JpdGVzID0gZmF2b3JpdGVzLmZpbmQoZGlzaCA9PiBkaXNoLmlkID09IHRoaXMuZGlzaC5pZCk7XG5cbiAgICAgICAgaWYodGhpcy5pbkZhdm9yaXRlcykge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAudXNlcklzTG9nZ2VkSW4oKVxuICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4gdGhpcy5pc0xvZ2dlZEluID0gcmVzdWx0KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZih0aGlzLmluRmF2b3JpdGVzKSB7XG4gICAgICB0aGlzLnJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkRGlzaFRvRmF2b3JpdGVzKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlzaFRvRmF2b3JpdGVzKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuYWRkRGlzaFRvRmF2b3JpdGVzKHRoaXMuZGlzaClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZGVkVG9GYXZvcml0ZXMuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgIClcbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAucmVtb3ZlRGlzaEZyb21GYXZvcml0ZXModGhpcy5kaXNoKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlZEZyb21GYXZvcml0ZXMuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy91cGRhdGUtcHJvZmlsZS1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwVXBkYXRlUHJvZmlsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGVtYWlsOnN0cmluZztcblxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEgPSB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvL3Bob25lOiB0aGlzLnBob25lLFxuICAgICAgZW1haWw6IHRoaXMuZW1haWxcbiAgICB9O1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAudXBkYXRlUHJvZmlsZShkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IEFkZEFkZHJlc3NSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvYWRkLWFkZHJlc3MtcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcEFkZEFkZHJlc3NdJ1xufSlcbmV4cG9ydCBjbGFzcyBBZGRBZGRyZXNzRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBzdHJlZXQ6c3RyaW5nOyAgICAgLy9yZXF1aXJlZFxuICBASW5wdXQoKSBob21lOnN0cmluZzsgICAgICAgLy9yZXF1aXJlZFxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcbiAgQElucHV0KCkgaG91c2luZzpzdHJpbmc7XG4gIEBJbnB1dCgpIGluZGV4OnN0cmluZztcbiAgQElucHV0KCkgZW50cmFuY2U6c3RyaW5nO1xuICBASW5wdXQoKSBmbG9vcjpzdHJpbmc7XG4gIEBJbnB1dCgpIGFwYXJ0bWVudDpzdHJpbmc7XG4gIEBJbnB1dCgpIGRvb3JwaG9uZTpzdHJpbmc7XG5cbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgaWYoIXRoaXMuc3RyZWV0KSB7XG4gICAgICB0aGlzLmVycm9yLmVtaXQoJ8OQwp3DkMK1w5DCvsOQwrHDkcKFw5DCvsOQwrTDkMK4w5DCvMOQwr4gw5HCg8OQwrrDkMKww5DCt8OQwrDDkcKCw5HCjCDDkcKDw5DCu8OQwrjDkcKGw5HCgycpOyByZXR1cm47XG4gICAgfVxuICAgIGlmKCF0aGlzLmhvbWUpIHtcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgnw5DCncOQwrXDkMK+w5DCscORwoXDkMK+w5DCtMOQwrjDkMK8w5DCviDDkcKDw5DCusOQwrDDkMK3w5DCsMORwoLDkcKMIMOQwr3DkMK+w5DCvMOQwrXDkcKAIMOQwrTDkMK+w5DCvMOQwrAnKTsgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBkYXRhOkFkZEFkZHJlc3NSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIHN0cmVldDogdGhpcy5zdHJlZXQsXG4gICAgICBob21lOiB0aGlzLmhvbWUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUgfHwgJycsXG4gICAgICBob3VzaW5nOiB0aGlzLmhvdXNpbmcgfHwgJycsXG4gICAgICBpbmRleDogdGhpcy5pbmRleCB8fCAnJyxcbiAgICAgIGVudHJhbmNlOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxuICAgICAgZmxvb3I6IHRoaXMuZmxvb3IgfHwgJycsXG4gICAgICBhcGFydG1lbnQ6IHRoaXMuYXBhcnRtZW50IHx8ICcnLFxuICAgICAgZG9vcnBob25lOiB0aGlzLmRvb3JwaG9uZSB8fCAnJ1xuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5hZGRBZGRyZXNzKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9hZGRyZXNzXCI7XG5cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwRGVsZXRlQWRkcmVzc10nXG59KVxuZXhwb3J0IGNsYXNzIERlbGV0ZUFkZHJlc3NEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIGFkZHJlc3M6QWRkcmVzcztcblxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLmRlbGV0ZUFkZHJlc3ModGhpcy5hZGRyZXNzKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNpZ25VcERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zaWduLXVwLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTaWduSW5EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2lnbi1pbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2lnbk91dERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zaWduLW91dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9yZXNldC1wYXNzd29yZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvZGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVzZXQtcGFzc3dvcmQtY29kZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQmFsYW5jZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9iYWxhbmNlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUb2dnbGVEaXNoVG9GYXZvcml0ZXNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdG9nZ2xlLWRpc2gtdG8tZmF2b3JpdGVzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBVcGRhdGVQcm9maWxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3VwZGF0ZS1wcm9maWxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBZGRBZGRyZXNzRGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9hZGQtYWRkcmVzcy5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IERlbGV0ZUFkZHJlc3NEaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2RlbGV0ZS1hZGRyZXNzLmRpcmVjdGl2ZVwiO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBTaWduVXBEaXJlY3RpdmUsXG4gIFNpZ25JbkRpcmVjdGl2ZSxcbiAgU2lnbk91dERpcmVjdGl2ZSxcbiAgUmVzZXRQYXNzd29yZERpcmVjdGl2ZSxcbiAgUmVzZXRQYXNzd29yZENvZGVEaXJlY3RpdmUsXG4gIEJhbGFuY2VEaXJlY3RpdmUsXG4gIFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSxcbiAgVXBkYXRlUHJvZmlsZURpcmVjdGl2ZSxcbiAgQWRkQWRkcmVzc0RpcmVjdGl2ZSxcbiAgRGVsZXRlQWRkcmVzc0RpcmVjdGl2ZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW10sXG4gIGRlY2xhcmF0aW9uczogWy4uLkRJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbLi4uRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgTmdVc2VyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cFJlcXVlc3QsXG4gIEh0dHBFcnJvclJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlKSB7fVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKSB7XG5cbiAgICBjb25zb2xlLmluZm8oJ0F1dGhJbnRlcmNlcHRvcicsIHJlcSk7XG5cbiAgICAvLyBHZXQgdGhlIGF1dGggdG9rZW4gZnJvbSB0aGUgc2VydmljZS5cbiAgICBjb25zdCBhdXRoVG9rZW4gPSB0aGlzLnVzZXJTZXJ2aWNlLmdldEF1dGhUb2tlbigpO1xuXG4gICAgaWYoYXV0aFRva2VuKSB7XG4gICAgICAvLyBDbG9uZSB0aGUgcmVxdWVzdCBhbmQgcmVwbGFjZSB0aGUgb3JpZ2luYWwgaGVhZGVycyB3aXRoXG4gICAgICAvLyBjbG9uZWQgaGVhZGVycywgdXBkYXRlZCB3aXRoIHRoZSBhdXRob3JpemF0aW9uLlxuICAgICAgY29uc3QgYXV0aFJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsIGBKV1QgJHthdXRoVG9rZW59YClcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZW5kIGNsb25lZCByZXF1ZXN0IHdpdGggaGVhZGVyIHRvIHRoZSBuZXh0IGhhbmRsZXIuXG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUoYXV0aFJlcSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKTtcbiAgfVxufSIsImltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBBdXRoSW50ZXJjZXB0b3IgfSBmcm9tICcuL2F1dGguaW50ZXJjZXB0b3InO1xuXG5leHBvcnQgY29uc3QgbmdVc2VySHR0cEludGVyY2VwdG9yUHJvdmlkZXJzID0gW1xuICB7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogQXV0aEludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSB9XG5dOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0lBK0JNLGFBQWEsR0FBRyxXQUFXO0FBRWpDO0lBY0UsNEJBRVUsR0FBYyxFQUNkLE9BQXNCO1FBSGhDLGlCQW9DQztRQWxDUyxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQVh4QixlQUFVLEdBQVcsS0FBSyxDQUFDO1FBYWpDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcs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