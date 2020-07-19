(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@webresto/ng-core'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@webresto/ng-user', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@webresto/ng-core', '@angular/common/http'], factory) :
    (factory((global.webresto = global.webresto || {}, global.webresto['ng-user'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,null,global.ng.common.http));
}(this, (function (exports,i0,rxjs,operators,i1,http) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var LS_TOKEN_NAME = 'gf:tkn:v2';
    var NgRestoUserService = /** @class */ (function () {
        function NgRestoUserService(net, eventer) {
            var _this = this;
            this.net = net;
            this.eventer = eventer;
            this.rememberMe = false;
            this.user = new rxjs.BehaviorSubject({});
            this.isLoggedIn = new rxjs.BehaviorSubject(false);
            this.favorites = new rxjs.BehaviorSubject([]);
            this.addresses = new rxjs.BehaviorSubject([]);
            this.historyItems = new rxjs.BehaviorSubject([]);
            this.historyTransactions = new rxjs.BehaviorSubject([]);
            this.bonusSystems = new rxjs.BehaviorSubject([]);
            this.authToken = localStorage.getItem(LS_TOKEN_NAME);
            if (this.authToken) {
                this.isLoggedIn.next(true);
            }
            this.isLoggedIn.subscribe(function (isLoggedIn) {
                if (isLoggedIn) {
                    setTimeout(function () {
                        _this.getFavorites().subscribe();
                        _this.getProfile().subscribe();
                        _this.getAddresses().subscribe();
                        _this.getBonuses().subscribe();
                        _this.getHistory().subscribe();
                    }, 500);
                }
            });
            this.eventer
                .getMessageEmitter()
                .subscribe(function (message) {
                switch (message.type) {
                    case "Unauthorized":
                        _this.deleteAuthToken();
                        break;
                }
            });
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
                if (rememberMe === void 0) {
                    rememberMe = false;
                }
                this.rememberMe = rememberMe;
                return this.net.post('/signin', data)
                    .pipe(operators.tap(function (result) {
                    _this.setAuthToken(result.token, false);
                    _this.user.next(result.user);
                    _this.eventer.emitMessageEvent(new i1.EventMessage('success', 'Успех', 'Успешно авторизирован'));
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (result) {
                    _this.user.next(result);
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (historyItems) {
                    _this.historyItems.next(historyItems);
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
            };
        /**
         * @param {?=} bonusSystem
         * @param {?=} limit
         * @param {?=} set
         * @return {?}
         */
        NgRestoUserService.prototype.getHistoryTransactions = /**
         * @param {?=} bonusSystem
         * @param {?=} limit
         * @param {?=} set
         * @return {?}
         */
            function (bonusSystem, limit, set) {
                var _this = this;
                if (bonusSystem === void 0) {
                    bonusSystem = "local";
                }
                if (limit === void 0) {
                    limit = 15;
                }
                if (set === void 0) {
                    set = 0;
                }
                return this.net.get("/bonus/transactions?bonussystem=" + bonusSystem + "&limit=" + limit + "&number=" + set)
                    .pipe(operators.tap(function (transactions) {
                    _this.historyTransactions.next(transactions);
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (result) {
                    _this.user.next(result);
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (addresses) {
                    _this.addresses.next(addresses);
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (addresses) {
                    _this.addresses.next(addresses);
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (addresses) {
                    _this.addresses.next(addresses);
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (result) {
                    //this.setAuthToken(result.token, false);
                    //this.user.next(result.user);
                    _this.eventer.emitMessageEvent(new i1.EventMessage('success', 'Регистрация', 'Ваш пароль был отправлен на указанный номер телефона'));
                }, function (error) {
                    _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error));
                }));
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
                    .pipe(operators.tap(function (result) {
                    _this.bonusSystems.next(result);
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (result) {
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (result) {
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (result) {
                    console.info('getFavorites result', result);
                    _this.favorites.next(result);
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (result) {
                    /** @type {?} */
                    var favoritesUpdated = _this.favorites.getValue();
                    favoritesUpdated.push(dish);
                    _this.favorites.next(favoritesUpdated);
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
                    .pipe(operators.tap(function (result) {
                    console.info('Было=>>>', _this.favorites.getValue().length);
                    /** @type {?} */
                    var favoritesUpdated = _this.favorites
                        .getValue()
                        .filter(function (item) { return item.id != dish.id; });
                    console.info('Стало=>>>', favoritesUpdated.length);
                    _this.favorites.next(favoritesUpdated);
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
        NgRestoUserService.prototype.userTransactionsHistory = /**
         * @return {?}
         */
            function () {
                return this.historyTransactions;
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
                if (updateProfile === void 0) {
                    updateProfile = true;
                }
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        NgRestoUserService.ctorParameters = function () {
            return [
                { type: i1.NetService },
                { type: i1.EventerService }
            ];
        };
        /** @nocollapse */ NgRestoUserService.ngInjectableDef = i0.defineInjectable({ factory: function NgRestoUserService_Factory() { return new NgRestoUserService(i0.inject(i1.NetService), i0.inject(i1.EventerService)); }, token: NgRestoUserService, providedIn: "root" });
        return NgRestoUserService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var SignUpDirective = /** @class */ (function () {
        function SignUpDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
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
                    .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
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
            { type: i0.Directive, args: [{
                        selector: '[appSignUp]'
                    },] },
        ];
        SignUpDirective.ctorParameters = function () {
            return [
                { type: NgRestoUserService }
            ];
        };
        SignUpDirective.propDecorators = {
            name: [{ type: i0.Input }],
            phone: [{ type: i0.Input }],
            email: [{ type: i0.Input }],
            password: [{ type: i0.Input }],
            captcha: [{ type: i0.Input }],
            success: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return SignUpDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var SignInDirective = /** @class */ (function () {
        function SignInDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
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
                    .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
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
            { type: i0.Directive, args: [{
                        selector: '[appSignIn]'
                    },] },
        ];
        SignInDirective.ctorParameters = function () {
            return [
                { type: NgRestoUserService }
            ];
        };
        SignInDirective.propDecorators = {
            phone: [{ type: i0.Input }],
            password: [{ type: i0.Input }],
            captcha: [{ type: i0.Input }],
            rememberMe: [{ type: i0.Input }],
            success: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return SignInDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
            { type: i0.Directive, args: [{
                        selector: '[appSignOut]'
                    },] },
        ];
        SignOutDirective.ctorParameters = function () {
            return [
                { type: NgRestoUserService }
            ];
        };
        SignOutDirective.propDecorators = {
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return SignOutDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ResetPasswordDirective = /** @class */ (function () {
        function ResetPasswordDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
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
                    .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
            };
        ResetPasswordDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[appResetPassword]'
                    },] },
        ];
        ResetPasswordDirective.ctorParameters = function () {
            return [
                { type: NgRestoUserService }
            ];
        };
        ResetPasswordDirective.propDecorators = {
            phone: [{ type: i0.Input }],
            captcha: [{ type: i0.Input }],
            success: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return ResetPasswordDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ResetPasswordCodeDirective = /** @class */ (function () {
        function ResetPasswordCodeDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
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
                    .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
            };
        ResetPasswordCodeDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[appResetPasswordCode]'
                    },] },
        ];
        ResetPasswordCodeDirective.ctorParameters = function () {
            return [
                { type: NgRestoUserService }
            ];
        };
        ResetPasswordCodeDirective.propDecorators = {
            userId: [{ type: i0.Input }],
            code: [{ type: i0.Input }],
            password: [{ type: i0.Input }],
            success: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return ResetPasswordCodeDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
                .subscribe(function (bonuses) {
                for (var name_1 in bonuses) {
                    /** @type {?} */
                    var data = bonuses[name_1];
                    if (data.state == 'active') {
                        balance += data.balance;
                    }
                }
                _this.amount = "" + balance;
                _this.renderer.setProperty(_this.el.nativeElement, 'innerHTML', _this.amount);
            });
        }
        BalanceDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[appBalance]'
                    },] },
        ];
        BalanceDirective.ctorParameters = function () {
            return [
                { type: i0.Renderer2 },
                { type: i0.ElementRef },
                { type: NgRestoUserService }
            ];
        };
        return BalanceDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ToggleDishToFavoritesDirective = /** @class */ (function () {
        function ToggleDishToFavoritesDirective(ngRestoUserService, element, renderer) {
            this.ngRestoUserService = ngRestoUserService;
            this.element = element;
            this.renderer = renderer;
            this.addedToFavorites = new i0.EventEmitter();
            this.removedFromFavorites = new i0.EventEmitter();
            this.change = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
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
                    .subscribe(function (favorites) {
                    _this.inFavorites = favorites.find(function (dish) { return dish.id == _this.dish.id; });
                    if (_this.inFavorites) {
                        _this.renderer.addClass(_this.element.nativeElement, 'selected');
                    }
                    else {
                        _this.renderer.removeClass(_this.element.nativeElement, 'selected');
                    }
                });
                this.ngRestoUserService
                    .userIsLoggedIn()
                    .subscribe(function (result) { return _this.isLoggedIn = result; });
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
                    .subscribe(function () {
                    _this.addedToFavorites.emit();
                    _this.change.emit(true);
                    _this.renderer.addClass(_this.element.nativeElement, 'selected');
                }, function (error) { return _this.error.emit(error); });
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
                    .subscribe(function () {
                    _this.removedFromFavorites.emit();
                    _this.change.emit(false);
                    _this.renderer.removeClass(_this.element.nativeElement, 'selected');
                }, function (error) { return _this.error.emit(error); });
            };
        ToggleDishToFavoritesDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[appToggleDishToFavorites]'
                    },] },
        ];
        ToggleDishToFavoritesDirective.ctorParameters = function () {
            return [
                { type: NgRestoUserService },
                { type: i0.ElementRef },
                { type: i0.Renderer2 }
            ];
        };
        ToggleDishToFavoritesDirective.propDecorators = {
            dish: [{ type: i0.Input }],
            addedToFavorites: [{ type: i0.Output }],
            removedFromFavorites: [{ type: i0.Output }],
            change: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return ToggleDishToFavoritesDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var UpdateProfileDirective = /** @class */ (function () {
        function UpdateProfileDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
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
                    .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
            };
        UpdateProfileDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[appUpdateProfile]'
                    },] },
        ];
        UpdateProfileDirective.ctorParameters = function () {
            return [
                { type: NgRestoUserService }
            ];
        };
        UpdateProfileDirective.propDecorators = {
            name: [{ type: i0.Input }],
            phone: [{ type: i0.Input }],
            email: [{ type: i0.Input }],
            success: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return UpdateProfileDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var AddAddressDirective = /** @class */ (function () {
        function AddAddressDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
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
                    .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
            };
        AddAddressDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[appAddAddress]'
                    },] },
        ];
        AddAddressDirective.ctorParameters = function () {
            return [
                { type: NgRestoUserService }
            ];
        };
        AddAddressDirective.propDecorators = {
            street: [{ type: i0.Input }],
            home: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            housing: [{ type: i0.Input }],
            index: [{ type: i0.Input }],
            entrance: [{ type: i0.Input }],
            floor: [{ type: i0.Input }],
            apartment: [{ type: i0.Input }],
            doorphone: [{ type: i0.Input }],
            success: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return AddAddressDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var DeleteAddressDirective = /** @class */ (function () {
        function DeleteAddressDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
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
                    .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
            };
        DeleteAddressDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[appDeleteAddress]'
                    },] },
        ];
        DeleteAddressDirective.ctorParameters = function () {
            return [
                { type: NgRestoUserService }
            ];
        };
        DeleteAddressDirective.propDecorators = {
            address: [{ type: i0.Input }],
            success: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return DeleteAddressDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
            { type: i0.NgModule, args: [{
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
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
            { type: i0.Injectable },
        ];
        AuthInterceptor.ctorParameters = function () {
            return [
                { type: NgRestoUserService }
            ];
        };
        return AuthInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ngUserHttpInterceptorProviders = [
        { provide: http.HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    exports.NgRestoUserService = NgRestoUserService;
    exports.NgUserModule = NgUserModule;
    exports.ngUserHttpInterceptorProviders = ngUserHttpInterceptorProviders;
    exports.AuthInterceptor = AuthInterceptor;
    exports.ɵj = AddAddressDirective;
    exports.ɵg = BalanceDirective;
    exports.ɵk = DeleteAddressDirective;
    exports.ɵf = ResetPasswordCodeDirective;
    exports.ɵe = ResetPasswordDirective;
    exports.ɵc = SignInDirective;
    exports.ɵd = SignOutDirective;
    exports.ɵa = SignUpDirective;
    exports.ɵh = ToggleDishToFavoritesDirective;
    exports.ɵi = UpdateProfileDirective;
    exports.ɵb = NgRestoUserService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicmVzdG8tbmctdXNlci51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UudHMiLG51bGwsIm5nOi8vQHdlYnJlc3RvL25nLXVzZXIvbGliL2RpcmVjdGl2ZXMvc2lnbi11cC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL3NpZ24taW4uZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy9zaWduLW91dC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLXVzZXIvbGliL2RpcmVjdGl2ZXMvcmVzZXQtcGFzc3dvcmQtY29kZS5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL2JhbGFuY2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy90b2dnbGUtZGlzaC10by1mYXZvcml0ZXMuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy91cGRhdGUtcHJvZmlsZS5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL2FkZC1hZGRyZXNzLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLXVzZXIvbGliL2RpcmVjdGl2ZXMvZGVsZXRlLWFkZHJlc3MuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvbmctdXNlci5tb2R1bGUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy11c2VyL2xpYi9odHRwLWludGVyY2VwdG9ycy9hdXRoLmludGVyY2VwdG9yLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctdXNlci9saWIvaHR0cC1pbnRlcmNlcHRvcnMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7dGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7RXZlbnRlclNlcnZpY2UsIEV2ZW50TWVzc2FnZSwgTmV0U2VydmljZX0gZnJvbSAnQHdlYnJlc3RvL25nLWNvcmUnO1xuXG5pbXBvcnQge1NpZ25JblJlcXVlc3REYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24taW4tcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7U2lnblVwUmVxdWVzdERhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi11cC1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHtSZXNldFBhc3N3b3JkUmVxdWVzdERhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7UmVzZXRQYXNzd29yZENvZGVSZXF1ZXN0RGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQge0FkZERpc2hUb0Zhdm9yaXRlc1JlcXVlc3REYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FkZC1kaXNoLXRvLWZhdm9yaXRlcy1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHtSZW1vdmVEaXNoRnJvbUZhdm9yaXRlc1JlcXVlc3REYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbW92ZS1kaXNoLWZyb20tZmF2b3JpdGVzLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQge1NpZ25JblJlc3BvbnNlRGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLWluLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHtTaWduVXBSZXNwb25zZURhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi11cC1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7UmVzZXRQYXNzd29yZFJlc3BvbnNlRGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7UmVzZXRQYXNzd29yZENvZGVSZXNwb25zZURhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtY29kZS1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7VXBkYXRlUHJvZmlsZVJlc3BvbnNlRGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy91cGRhdGUtcHJvZmlsZS1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7VXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VwZGF0ZS1wcm9maWxlLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQge0FkZHJlc3MsIFVzZXJ9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtSZW1vdmVBZGRyZXNzUmVxdWVzdERhdGF9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3JlbW92ZS1hZGRyZXNzLXJlcXVlc3QtZGF0YVwiO1xuaW1wb3J0IHtBZGRBZGRyZXNzUmVxdWVzdERhdGF9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2FkZC1hZGRyZXNzLXJlcXVlc3QtZGF0YVwiO1xuXG5jb25zdCBMU19UT0tFTl9OQU1FID0gJ2dmOnRrbjp2Mic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVzdG9Vc2VyU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBhdXRoVG9rZW46IHN0cmluZztcbiAgcHJpdmF0ZSByZW1lbWJlck1lOmJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBoaXN0b3J5VHJhbnNhY3Rpb25zOiBCZWhhdmlvclN1YmplY3Q8YW55W10+O1xuICBwcml2YXRlIHVzZXI6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIHByaXZhdGUgaXNMb2dnZWRJbjpCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XG4gIHByaXZhdGUgZmF2b3JpdGVzOkJlaGF2aW9yU3ViamVjdDxhbnlbXT47XG4gIHByaXZhdGUgYWRkcmVzc2VzOkJlaGF2aW9yU3ViamVjdDxBZGRyZXNzW10+O1xuICBwcml2YXRlIHN0cmVldHM6QmVoYXZpb3JTdWJqZWN0PGFueVtdPjtcbiAgcHJpdmF0ZSBoaXN0b3J5SXRlbXM6QmVoYXZpb3JTdWJqZWN0PGFueVtdPjtcbiAgcHJpdmF0ZSBib251c1N5c3RlbXM6IEJlaGF2aW9yU3ViamVjdDxhbnlbXT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy9wcml2YXRlIHJlc3RvU3RvcmFnZVNlcnZpY2U6UmVzdG9TdG9yYWdlU2VydmljZSxcbiAgICBwcml2YXRlIG5ldDpOZXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLnVzZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgICB0aGlzLmZhdm9yaXRlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMuYWRkcmVzc2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgdGhpcy5oaXN0b3J5SXRlbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgICB0aGlzLmhpc3RvcnlUcmFuc2FjdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueVtdPihbXSk7XG4gICAgdGhpcy5ib251c1N5c3RlbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueVtdPihbXSk7XG5cbiAgICB0aGlzLmF1dGhUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKExTX1RPS0VOX05BTUUpO1xuICAgIGlmKHRoaXMuYXV0aFRva2VuKSB7XG4gICAgICB0aGlzLmlzTG9nZ2VkSW4ubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzTG9nZ2VkSW4uc3Vic2NyaWJlKGlzTG9nZ2VkSW4gPT4ge1xuICAgICAgaWYoaXNMb2dnZWRJbikge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmdldEZhdm9yaXRlcygpLnN1YnNjcmliZSgpO1xuICAgICAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpLnN1YnNjcmliZSgpO1xuICAgICAgICAgIHRoaXMuZ2V0QWRkcmVzc2VzKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRCb251c2VzKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRIaXN0b3J5KCkuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmV2ZW50ZXJcbiAgICAgIC5nZXRNZXNzYWdlRW1pdHRlcigpXG4gICAgICAuc3Vic2NyaWJlKG1lc3NhZ2UgPT4ge1xuICAgICAgICBzd2l0Y2gobWVzc2FnZS50eXBlKSB7XG4gICAgICAgICAgY2FzZSBcIlVuYXV0aG9yaXplZFwiOlxuICAgICAgICAgICAgdGhpcy5kZWxldGVBdXRoVG9rZW4oKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHNpZ25JbihkYXRhOlNpZ25JblJlcXVlc3REYXRhLCByZW1lbWJlck1lOmJvb2xlYW4gPSBmYWxzZSkge1xuXG4gICAgdGhpcy5yZW1lbWJlck1lID0gcmVtZW1iZXJNZTtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvc2lnbmluJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogU2lnbkluUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QXV0aFRva2VuKHJlc3VsdC50b2tlbiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0LnVzZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfDkMKjw5HCgcOQwr/DkMK1w5HChScsICfDkMKjw5HCgcOQwr/DkMK1w5HCiMOQwr3DkMK+IMOQwrDDkMKyw5HCgsOQwr7DkcKAw5DCuMOQwrfDkMK4w5HCgMOQwr7DkMKyw5DCsMOQwr0nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgfVxuXG4gIGdldFByb2ZpbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L3VzZXItaW5mbycpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFVzZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgZ2V0SGlzdG9yeSgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0KCcvdXNlci9nZXQvaGlzdG9yeScpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChoaXN0b3J5SXRlbXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeUl0ZW1zLm5leHQoaGlzdG9yeUl0ZW1zKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBnZXRIaXN0b3J5VHJhbnNhY3Rpb25zKGJvbnVzU3lzdGVtOiBzdHJpbmc9IFwibG9jYWxcIiwgbGltaXQ6IG51bWJlciA9IDE1LCBzZXQ6IG51bWJlciA9IDApIHtcbiAgICAgcmV0dXJuIHRoaXMubmV0LmdldChgL2JvbnVzL3RyYW5zYWN0aW9ucz9ib251c3N5c3RlbT0ke2JvbnVzU3lzdGVtfSZsaW1pdD0ke2xpbWl0fSZudW1iZXI9JHtzZXR9YClcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHRyYW5zYWN0aW9ucykgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5VHJhbnNhY3Rpb25zLm5leHQodHJhbnNhY3Rpb25zKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVQcm9maWxlKGRhdGE6VXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL3NldC91c2VyLWluZm8nLCB7XG4gICAgICB1c2VyOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogVXBkYXRlUHJvZmlsZVJlc3BvbnNlRGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gIH1cblxuICBnZXRBZGRyZXNzZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2xvY2F0aW9uJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgYWRkQWRkcmVzcyhhZGRyZXNzOiBBZGRBZGRyZXNzUmVxdWVzdERhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvYWRkL2xvY2F0aW9uJywgYWRkcmVzcylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgZGVsZXRlQWRkcmVzcyhhZGRyZXNzOiBBZGRyZXNzKSB7XG5cbiAgICB2YXIgcmVxQm9keTogUmVtb3ZlQWRkcmVzc1JlcXVlc3REYXRhID0ge1xuICAgICAgaWQ6IGFkZHJlc3MuaWQsXG4gICAgICBzdHJlZXQ6IGFkZHJlc3Muc3RyZWV0LFxuICAgICAgaG9tZTogYWRkcmVzcy5ob21lXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9yZW1vdmUvbG9jYXRpb24nLCByZXFCb2R5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAoYWRkcmVzc2VzOiBBZGRyZXNzW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc2VzLm5leHQoYWRkcmVzc2VzKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBzaWduVXAoZGF0YTpTaWduVXBSZXF1ZXN0RGF0YSkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvc2lnbnVwJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogU2lnblVwUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIC8vdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICAvL3RoaXMudXNlci5uZXh0KHJlc3VsdC51c2VyKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAnw5DCoMOQwrXDkMKzw5DCuMORwoHDkcKCw5HCgMOQwrDDkcKGw5DCuMORwo8nLCAnw5DCksOQwrDDkcKIIMOQwr/DkMKww5HCgMOQwr7DkMK7w5HCjCDDkMKxw5HCi8OQwrsgw5DCvsORwoLDkMK/w5HCgMOQwrDDkMKyw5DCu8OQwrXDkMK9IMOQwr3DkMKwIMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvcOQwr3DkcKLw5DCuSDDkMK9w5DCvsOQwrzDkMK1w5HCgCDDkcKCw5DCtcOQwrvDkMK1w5HChMOQwr7DkMK9w5DCsCcpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHsgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApfVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgc2lnbk91dCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxldGVBdXRoVG9rZW4oKTtcbiAgfVxuXG5cbiAgZ2V0Qm9udXNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2JvbnVzL2dldCcsIHt9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYm9udXNTeXN0ZW1zLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICByZXNldFBhc3N3b3JkKGRhdGE6UmVzZXRQYXNzd29yZFJlcXVlc3REYXRhKSB7XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3Jlc2V0JywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogUmVzZXRQYXNzd29yZFJlc3BvbnNlRGF0YSkgPT4ge1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcmVzZXRQYXNzd29yZENvZGUoZGF0YTpSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhKSB7XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NvZGUnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBSZXNldFBhc3N3b3JkQ29kZVJlc3BvbnNlRGF0YSkgPT4ge1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cblxuICBnZXRGYXZvcml0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2Zhdm9yaXRlcyAnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdnZXRGYXZvcml0ZXMgcmVzdWx0JywgcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgYWRkRGlzaFRvRmF2b3JpdGVzKGRpc2g6YW55KSB7XG4gICAgbGV0IGRhdGE6QWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGEgPSB7XG4gICAgICBkaXNoSWQ6IGRpc2guaWRcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9hZGQvZmF2b3JpdGVzICcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IGZhdm9yaXRlc1VwZGF0ZWQ6IGFueVtdID0gdGhpcy5mYXZvcml0ZXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGZhdm9yaXRlc1VwZGF0ZWQucHVzaChkaXNoKTtcblxuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXMubmV4dChmYXZvcml0ZXNVcGRhdGVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21GYXZvcml0ZXMoZGlzaDphbnkpIHtcbiAgICBsZXQgZGF0YTpSZW1vdmVEaXNoRnJvbUZhdm9yaXRlc1JlcXVlc3REYXRhID0ge1xuICAgICAgZGlzaElkOiBkaXNoLmlkXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvcmVtb3ZlL2Zhdm9yaXRlcyAnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnw5DCkcORwovDkMK7w5DCvj0+Pj4nLCB0aGlzLmZhdm9yaXRlcy5nZXRWYWx1ZSgpLmxlbmd0aCk7XG4gICAgICAgICAgICBsZXQgZmF2b3JpdGVzVXBkYXRlZDogYW55W10gPSB0aGlzLmZhdm9yaXRlc1xuICAgICAgICAgICAgICAuZ2V0VmFsdWUoKVxuICAgICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCAhPSBkaXNoLmlkKTtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnw5DCocORwoLDkMKww5DCu8OQwr49Pj4+JywgZmF2b3JpdGVzVXBkYXRlZC5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXMubmV4dChmYXZvcml0ZXNVcGRhdGVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgdXNlclByb2ZpbGUoKTpCZWhhdmlvclN1YmplY3Q8VXNlcj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXI7XG4gIH1cblxuICB1c2VySXNMb2dnZWRJbigpOkJlaGF2aW9yU3ViamVjdDxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNMb2dnZWRJbjtcbiAgfVxuXG4gIHVzZXJGYXZvcml0ZXMoKTpCZWhhdmlvclN1YmplY3Q8YW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5mYXZvcml0ZXM7XG4gIH1cblxuICB1c2VyQWRkcmVzc2VzKCk6QmVoYXZpb3JTdWJqZWN0PEFkZHJlc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmFkZHJlc3NlcztcbiAgfVxuXG4gIHVzZXJIaXN0b3J5KCk6QmVoYXZpb3JTdWJqZWN0PGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeUl0ZW1zO1xuICB9XG4gIHVzZXJUcmFuc2FjdGlvbnNIaXN0b3J5KCk6QmVoYXZpb3JTdWJqZWN0PGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVRyYW5zYWN0aW9ucztcbiAgfVxuXG5cbiAgZ2V0QXV0aFRva2VuKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hdXRoVG9rZW47XG4gIH1cblxuICBzZXRBdXRoVG9rZW4oYXV0aFRva2VuOiBzdHJpbmcsIHVwZGF0ZVByb2ZpbGU6IGJvb2xlYW4gPSB0cnVlKTp2b2lkIHtcbiAgICBpZih0aGlzLnJlbWVtYmVyTWUpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExTX1RPS0VOX05BTUUsIGF1dGhUb2tlbik7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZ2Y6bG9naW46cGhvbmUnKTtcbiAgICB9XG4gICAgdGhpcy5hdXRoVG9rZW4gPSBhdXRoVG9rZW47XG4gICAgdGhpcy5pc0xvZ2dlZEluLm5leHQodHJ1ZSk7XG5cbiAgICAvKmlmKHVwZGF0ZVByb2ZpbGUpIHtcbiAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpLnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5nZXRGYXZvcml0ZXMoKS5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuZ2V0QWRkcmVzc2VzKCkuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmdldEhpc3RvcnkoKS5zdWJzY3JpYmUoKTtcbiAgICB9Ki9cbiAgfVxuXG4gIGRlbGV0ZUF1dGhUb2tlbigpOnZvaWQge1xuICAgIHRoaXMuYXV0aFRva2VuID0gdW5kZWZpbmVkO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKExTX1RPS0VOX05BTUUpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdnZjpsb2dpbjpwaG9uZScpO1xuICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KGZhbHNlKTtcbiAgfVxuXG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jcmVhdGVCaW5kaW5nKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTaWduVXBSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi11cC1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwU2lnblVwXSdcbn0pXG5leHBvcnQgY2xhc3MgU2lnblVwRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcbiAgQElucHV0KCkgcGhvbmU6c3RyaW5nO1xuICBASW5wdXQoKSBlbWFpbDpzdHJpbmc7XG4gIEBJbnB1dCgpIHBhc3N3b3JkOnN0cmluZztcbiAgQElucHV0KCkgY2FwdGNoYTpzdHJpbmc7XG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGxldCBkYXRhOlNpZ25VcFJlcXVlc3REYXRhID0ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgcGhvbmU6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgZW1haWw6IHRoaXMuZW1haWwsXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgIGNhcHRjaGE6IHRoaXMuY2FwdGNoYVxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5zaWduVXAoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFNpZ25JblJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLWluLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBTaWduSW5dJ1xufSlcbmV4cG9ydCBjbGFzcyBTaWduSW5EaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHBob25lOnN0cmluZztcbiAgQElucHV0KCkgcGFzc3dvcmQ6c3RyaW5nO1xuICBASW5wdXQoKSBjYXB0Y2hhOnN0cmluZztcbiAgQElucHV0KCkgcmVtZW1iZXJNZTpib29sZWFuO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpTaWduSW5SZXF1ZXN0RGF0YSA9IHtcbiAgICAgIHBob25lOiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKSxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxuICAgICAgY2FwdGNoYTogdGhpcy5jYXB0Y2hhXG4gICAgfTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnNpZ25JbihkYXRhLCB0aGlzLnJlbWVtYmVyTWUpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKVxuICB9XG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnJyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwU2lnbk91dF0nXG59KVxuZXhwb3J0IGNsYXNzIFNpZ25PdXREaXJlY3RpdmUge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2Uuc2lnbk91dCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFJlc2V0UGFzc3dvcmRdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZXNldFBhc3N3b3JkRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGNhcHRjaGE6c3RyaW5nO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpSZXNldFBhc3N3b3JkUmVxdWVzdERhdGEgPSB7XG4gICAgICBwaG9uZTogdGhpcy5waG9uZSxcbiAgICAgIGNhcHRjaGE6IHRoaXMuY2FwdGNoYVxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5yZXNldFBhc3N3b3JkKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlcXVlc3QtZGF0YSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFJlc2V0UGFzc3dvcmRDb2RlXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVzZXRQYXNzd29yZENvZGVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHVzZXJJZDpzdHJpbmc7XG4gIEBJbnB1dCgpIGNvZGU6c3RyaW5nO1xuICBASW5wdXQoKSBwYXNzd29yZDpzdHJpbmc7XG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGxldCBkYXRhOlJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEgPSB7XG4gICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcbiAgICB9O1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAucmVzZXRQYXNzd29yZENvZGUoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwQmFsYW5jZV0nXG59KVxuZXhwb3J0IGNsYXNzIEJhbGFuY2VEaXJlY3RpdmUge1xuXG4gIGFtb3VudDpzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHtcbiAgICBsZXQgYmFsYW5jZSA9IDA7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5nZXRCb251c2VzKClcbiAgICAgIC5zdWJzY3JpYmUoYm9udXNlcyA9PiB7XG4gICAgICAgIGZvcihsZXQgbmFtZSBpbiBib251c2VzKSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGJvbnVzZXNbbmFtZV07XG4gICAgICAgICAgaWYoZGF0YS5zdGF0ZSA9PSAnYWN0aXZlJykge1xuICAgICAgICAgICAgYmFsYW5jZSArPSBkYXRhLmJhbGFuY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hbW91bnQgPSBgJHtiYWxhbmNlfWA7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5hbW91bnQpO1xuICAgICAgfSk7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsXG4gIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBBZGREaXNoVG9GYXZvcml0ZXNSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvYWRkLWRpc2gtdG8tZmF2b3JpdGVzLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBSZW1vdmVEaXNoRnJvbUZhdm9yaXRlc1JlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW1vdmUtZGlzaC1mcm9tLWZhdm9yaXRlcy1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwVG9nZ2xlRGlzaFRvRmF2b3JpdGVzXSdcbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBkaXNoOmFueTtcbiAgQE91dHB1dCgpIGFkZGVkVG9GYXZvcml0ZXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZW1vdmVkRnJvbUZhdm9yaXRlcyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgaW5GYXZvcml0ZXM6IGJvb2xlYW47XG4gIGlzTG9nZ2VkSW46IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnVzZXJGYXZvcml0ZXMoKVxuICAgICAgLnN1YnNjcmliZShmYXZvcml0ZXMgPT4ge1xuXG4gICAgICAgIHRoaXMuaW5GYXZvcml0ZXMgPSBmYXZvcml0ZXMuZmluZChkaXNoID0+IGRpc2guaWQgPT0gdGhpcy5kaXNoLmlkKTtcblxuICAgICAgICBpZih0aGlzLmluRmF2b3JpdGVzKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC51c2VySXNMb2dnZWRJbigpXG4gICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB0aGlzLmlzTG9nZ2VkSW4gPSByZXN1bHQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmKHRoaXMuaW5GYXZvcml0ZXMpIHtcbiAgICAgIHRoaXMucmVtb3ZlRGlzaEZyb21GYXZvcml0ZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGREaXNoVG9GYXZvcml0ZXMoKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXNoVG9GYXZvcml0ZXMoKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5hZGREaXNoVG9GYXZvcml0ZXModGhpcy5kaXNoKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkZWRUb0Zhdm9yaXRlcy5lbWl0KCk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKVxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21GYXZvcml0ZXMoKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5yZW1vdmVEaXNoRnJvbUZhdm9yaXRlcyh0aGlzLmRpc2gpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVkRnJvbUZhdm9yaXRlcy5lbWl0KCk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgIClcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VwZGF0ZS1wcm9maWxlLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBVcGRhdGVQcm9maWxlXSdcbn0pXG5leHBvcnQgY2xhc3MgVXBkYXRlUHJvZmlsZURpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgbmFtZTpzdHJpbmc7XG4gIEBJbnB1dCgpIHBob25lOnN0cmluZztcbiAgQElucHV0KCkgZW1haWw6c3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGxldCBkYXRhOlVwZGF0ZVByb2ZpbGVSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vcGhvbmU6IHRoaXMucGhvbmUsXG4gICAgICBlbWFpbDogdGhpcy5lbWFpbFxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC51cGRhdGVQcm9maWxlKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQWRkQWRkcmVzc1JlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hZGQtYWRkcmVzcy1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwQWRkQWRkcmVzc10nXG59KVxuZXhwb3J0IGNsYXNzIEFkZEFkZHJlc3NEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHN0cmVldDpzdHJpbmc7ICAgICAvL3JlcXVpcmVkXG4gIEBJbnB1dCgpIGhvbWU6c3RyaW5nOyAgICAgICAvL3JlcXVpcmVkXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xuICBASW5wdXQoKSBob3VzaW5nOnN0cmluZztcbiAgQElucHV0KCkgaW5kZXg6c3RyaW5nO1xuICBASW5wdXQoKSBlbnRyYW5jZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGZsb29yOnN0cmluZztcbiAgQElucHV0KCkgYXBhcnRtZW50OnN0cmluZztcbiAgQElucHV0KCkgZG9vcnBob25lOnN0cmluZztcblxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZighdGhpcy5zdHJlZXQpIHtcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgnw5DCncOQwrXDkMK+w5DCscORwoXDkMK+w5DCtMOQwrjDkMK8w5DCviDDkcKDw5DCusOQwrDDkMK3w5DCsMORwoLDkcKMIMORwoPDkMK7w5DCuMORwobDkcKDJyk7IHJldHVybjtcbiAgICB9XG4gICAgaWYoIXRoaXMuaG9tZSkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfDkMKdw5DCtcOQwr7DkMKxw5HChcOQwr7DkMK0w5DCuMOQwrzDkMK+IMORwoPDkMK6w5DCsMOQwrfDkMKww5HCgsORwowgw5DCvcOQwr7DkMK8w5DCtcORwoAgw5DCtMOQwr7DkMK8w5DCsCcpOyByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGRhdGE6QWRkQWRkcmVzc1JlcXVlc3REYXRhID0ge1xuICAgICAgc3RyZWV0OiB0aGlzLnN0cmVldCxcbiAgICAgIGhvbWU6IHRoaXMuaG9tZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSB8fCAnJyxcbiAgICAgIGhvdXNpbmc6IHRoaXMuaG91c2luZyB8fCAnJyxcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4IHx8ICcnLFxuICAgICAgZW50cmFuY2U6IHRoaXMuZW50cmFuY2UgfHwgJycsXG4gICAgICBmbG9vcjogdGhpcy5mbG9vciB8fCAnJyxcbiAgICAgIGFwYXJ0bWVudDogdGhpcy5hcGFydG1lbnQgfHwgJycsXG4gICAgICBkb29ycGhvbmU6IHRoaXMuZG9vcnBob25lIHx8ICcnXG4gICAgfTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLmFkZEFkZHJlc3MoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2FkZHJlc3NcIjtcblxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBEZWxldGVBZGRyZXNzXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVsZXRlQWRkcmVzc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgYWRkcmVzczpBZGRyZXNzO1xuXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuZGVsZXRlQWRkcmVzcyh0aGlzLmFkZHJlc3MpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU2lnblVwRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NpZ24tdXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNpZ25JbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zaWduLWluLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTaWduT3V0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NpZ24tb3V0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29kZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9yZXNldC1wYXNzd29yZC1jb2RlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCYWxhbmNlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2JhbGFuY2UuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90b2dnbGUtZGlzaC10by1mYXZvcml0ZXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdXBkYXRlLXByb2ZpbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFkZEFkZHJlc3NEaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2FkZC1hZGRyZXNzLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgRGVsZXRlQWRkcmVzc0RpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvZGVsZXRlLWFkZHJlc3MuZGlyZWN0aXZlXCI7XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIFNpZ25VcERpcmVjdGl2ZSxcbiAgU2lnbkluRGlyZWN0aXZlLFxuICBTaWduT3V0RGlyZWN0aXZlLFxuICBSZXNldFBhc3N3b3JkRGlyZWN0aXZlLFxuICBSZXNldFBhc3N3b3JkQ29kZURpcmVjdGl2ZSxcbiAgQmFsYW5jZURpcmVjdGl2ZSxcbiAgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlLFxuICBVcGRhdGVQcm9maWxlRGlyZWN0aXZlLFxuICBBZGRBZGRyZXNzRGlyZWN0aXZlLFxuICBEZWxldGVBZGRyZXNzRGlyZWN0aXZlXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFsuLi5ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1VzZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBIdHRwSW50ZXJjZXB0b3IsXG4gIEh0dHBIYW5kbGVyLFxuICBIdHRwUmVxdWVzdCxcbiAgSHR0cEVycm9yUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2UpIHt9XG5cbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpIHtcblxuICAgIGNvbnNvbGUuaW5mbygnQXV0aEludGVyY2VwdG9yJywgcmVxKTtcblxuICAgIC8vIEdldCB0aGUgYXV0aCB0b2tlbiBmcm9tIHRoZSBzZXJ2aWNlLlxuICAgIGNvbnN0IGF1dGhUb2tlbiA9IHRoaXMudXNlclNlcnZpY2UuZ2V0QXV0aFRva2VuKCk7XG5cbiAgICBpZihhdXRoVG9rZW4pIHtcbiAgICAgIC8vIENsb25lIHRoZSByZXF1ZXN0IGFuZCByZXBsYWNlIHRoZSBvcmlnaW5hbCBoZWFkZXJzIHdpdGhcbiAgICAgIC8vIGNsb25lZCBoZWFkZXJzLCB1cGRhdGVkIHdpdGggdGhlIGF1dGhvcml6YXRpb24uXG4gICAgICBjb25zdCBhdXRoUmVxID0gcmVxLmNsb25lKHtcbiAgICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgYEpXVCAke2F1dGhUb2tlbn1gKVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHNlbmQgY2xvbmVkIHJlcXVlc3Qgd2l0aCBoZWFkZXIgdG8gdGhlIG5leHQgaGFuZGxlci5cbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShhdXRoUmVxKTtcblxuICAgIH1cblxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICB9XG59IiwiaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciB9IGZyb20gJy4vYXV0aC5pbnRlcmNlcHRvcic7XG5cbmV4cG9ydCBjb25zdCBuZ1VzZXJIdHRwSW50ZXJjZXB0b3JQcm92aWRlcnMgPSBbXG4gIHsgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBBdXRoSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH1cbl07Il0sIm5hbWVzIjpbIkJlaGF2aW9yU3ViamVjdCIsInRhcCIsIkV2ZW50TWVzc2FnZSIsIkluamVjdGFibGUiLCJOZXRTZXJ2aWNlIiwiRXZlbnRlclNlcnZpY2UiLCJFdmVudEVtaXR0ZXIiLCJEaXJlY3RpdmUiLCJJbnB1dCIsIk91dHB1dCIsIkhvc3RMaXN0ZW5lciIsIlJlbmRlcmVyMiIsIkVsZW1lbnRSZWYiLCJOZ01vZHVsZSIsIkhUVFBfSU5URVJDRVBUT1JTIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFzQk0sYUFBYSxHQUFHLFdBQVc7QUFFakM7UUFnQkUsNEJBRVUsR0FBYyxFQUNkLE9BQXNCO1lBSGhDLGlCQXVDQztZQXJDUyxRQUFHLEdBQUgsR0FBRyxDQUFXO1lBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBZTtZQWJ4QixlQUFVLEdBQVcsS0FBSyxDQUFDO1lBZWpDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSUEsb0JBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUlBLG9CQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJQSxvQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLElBQUks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