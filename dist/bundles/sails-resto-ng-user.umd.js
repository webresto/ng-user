(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@sails-resto/ng-core'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@sails-resto/ng-user', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@sails-resto/ng-core', '@angular/common/http'], factory) :
    (factory((global['sails-resto'] = global['sails-resto'] || {}, global['sails-resto']['ng-user'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,null,global.ng.common.http));
}(this, (function (exports,i0,rxjs,operators,i1,http) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var LS_TOKEN_NAME = 'ghtke';
    var NgRestoUserService = /** @class */ (function () {
        function NgRestoUserService(net, eventer) {
            var _this = this;
            this.net = net;
            this.eventer = eventer;
            this.rememberMe = false;
            this.user = new rxjs.BehaviorSubject({});
            this.isLoggedIn = new rxjs.BehaviorSubject(false);
            this.favorites = new rxjs.BehaviorSubject([]);
            this.authToken = localStorage.getItem(LS_TOKEN_NAME);
            if (this.authToken) {
                this.isLoggedIn.next(true);
            }
            this.isLoggedIn.subscribe(function (isLoggedIn) {
                if (isLoggedIn) {
                    setTimeout(function () {
                        _this.getFavorites().subscribe();
                        _this.getProfile().subscribe();
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
         * @param {?} data
         * @return {?}
         */
        NgRestoUserService.prototype.updateProfile = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                var _this = this;
                return this.net.post('/user/set/user-info', data)
                    .pipe(operators.tap(function (result) {
                    _this.user.next(result);
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
                    _this.setAuthToken(result.token, false);
                    _this.user.next(result.user);
                    _this.eventer.emitMessageEvent(new i1.EventMessage('success', 'Успех', 'Успешно зарегистирован'));
                }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
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
         * @param {?} data
         * @return {?}
         */
        NgRestoUserService.prototype.resetPassword = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                var _this = this;
                return this.net.post('/login', data)
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
                }
                this.authToken = authToken;
                this.isLoggedIn.next(true);
                this.getFavorites().subscribe();
                if (updateProfile) {
                    this.getProfile().subscribe();
                }
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
                this.isLoggedIn.next(false);
            };
        NgRestoUserService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    phone: this.phone,
                    email: this.email,
                    password: this.password,
                    captcha: this.captcha
                };
                this.ngRestoUserService
                    .signUp(data)
                    .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
            };
        SignUpDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[appSignUp]'
                    },] },
        ];
        /** @nocollapse */
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    phone: this.phone,
                    password: this.password,
                    captcha: this.captcha
                };
                this.ngRestoUserService
                    .signIn(data, this.rememberMe)
                    .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
            };
        SignInDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[appSignIn]'
                    },] },
        ];
        /** @nocollapse */
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        /** @nocollapse */
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    password: this.password,
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
        /** @nocollapse */
        ResetPasswordDirective.ctorParameters = function () {
            return [
                { type: NgRestoUserService }
            ];
        };
        ResetPasswordDirective.propDecorators = {
            phone: [{ type: i0.Input }],
            password: [{ type: i0.Input }],
            captcha: [{ type: i0.Input }],
            success: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return ResetPasswordDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        /** @nocollapse */
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var BalanceDirective = /** @class */ (function () {
        function BalanceDirective(renderer, el) {
            this.renderer = renderer;
            this.el = el;
            this.amount = '0';
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        }
        BalanceDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[appBalance]'
                    },] },
        ];
        /** @nocollapse */
        BalanceDirective.ctorParameters = function () {
            return [
                { type: i0.Renderer2 },
                { type: i0.ElementRef }
            ];
        };
        return BalanceDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        /** @nocollapse */
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    phone: this.phone,
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
        /** @nocollapse */
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        UpdateProfileDirective
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                /** @type {?} */
                var authToken = this.userService.getAuthToken();
                if (authToken) {
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
        /** @nocollapse */
        AuthInterceptor.ctorParameters = function () {
            return [
                { type: NgRestoUserService }
            ];
        };
        return AuthInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ngUserHttpInterceptorProviders = [
        { provide: http.HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgRestoUserService = NgRestoUserService;
    exports.NgUserModule = NgUserModule;
    exports.ngUserHttpInterceptorProviders = ngUserHttpInterceptorProviders;
    exports.AuthInterceptor = AuthInterceptor;
    exports.ɵg = BalanceDirective;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FpbHMtcmVzdG8tbmctdXNlci51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BzYWlscy1yZXN0by9uZy11c2VyL2xpYi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UudHMiLG51bGwsIm5nOi8vQHNhaWxzLXJlc3RvL25nLXVzZXIvbGliL2RpcmVjdGl2ZXMvc2lnbi11cC5kaXJlY3RpdmUudHMiLCJuZzovL0BzYWlscy1yZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL3NpZ24taW4uZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac2FpbHMtcmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy9zaWduLW91dC5kaXJlY3RpdmUudHMiLCJuZzovL0BzYWlscy1yZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHNhaWxzLXJlc3RvL25nLXVzZXIvbGliL2RpcmVjdGl2ZXMvcmVzZXQtcGFzc3dvcmQtY29kZS5kaXJlY3RpdmUudHMiLCJuZzovL0BzYWlscy1yZXN0by9uZy11c2VyL2xpYi9kaXJlY3RpdmVzL2JhbGFuY2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac2FpbHMtcmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy90b2dnbGUtZGlzaC10by1mYXZvcml0ZXMuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac2FpbHMtcmVzdG8vbmctdXNlci9saWIvZGlyZWN0aXZlcy91cGRhdGUtcHJvZmlsZS5kaXJlY3RpdmUudHMiLCJuZzovL0BzYWlscy1yZXN0by9uZy11c2VyL2xpYi9uZy11c2VyLm1vZHVsZS50cyIsIm5nOi8vQHNhaWxzLXJlc3RvL25nLXVzZXIvbGliL2h0dHAtaW50ZXJjZXB0b3JzL2F1dGguaW50ZXJjZXB0b3IudHMiLCJuZzovL0BzYWlscy1yZXN0by9uZy11c2VyL2xpYi9odHRwLWludGVyY2VwdG9ycy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgTmV0U2VydmljZSxcbiAgRXZlbnRlclNlcnZpY2UsXG4gIEV2ZW50TWVzc2FnZVxufSBmcm9tICdAc2FpbHMtcmVzdG8vbmctY29yZSc7XG5cbmltcG9ydCB7IFNpZ25JblJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLWluLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBTaWduVXBSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi11cC1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZFJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvZGVSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtY29kZS1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgQWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FkZC1kaXNoLXRvLWZhdm9yaXRlcy1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUmVtb3ZlRGlzaEZyb21GYXZvcml0ZXNSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVtb3ZlLWRpc2gtZnJvbS1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFByb2ZpbGVSZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Byb2ZpbGUtcmVzcG9uc2UtZGF0YSc7XG5cbmltcG9ydCB7IFNpZ25JblJlc3BvbnNlRGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7IFNpZ25VcFJlc3BvbnNlRGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi11cC1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRSZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvZGVSZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLWNvZGUtcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBVcGRhdGVQcm9maWxlUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy91cGRhdGUtcHJvZmlsZS1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7IFVwZGF0ZVByb2ZpbGVSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXBkYXRlLXByb2ZpbGUtcmVxdWVzdC1kYXRhJztcblxuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy91c2VyJztcblxuY29uc3QgTFNfVE9LRU5fTkFNRSA9ICdnaHRrZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVzdG9Vc2VyU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBhdXRoVG9rZW46c3RyaW5nO1xuICBwcml2YXRlIHJlbWVtYmVyTWU6Ym9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHVzZXI6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIHByaXZhdGUgaXNMb2dnZWRJbjpCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XG4gIHByaXZhdGUgZmF2b3JpdGVzOkJlaGF2aW9yU3ViamVjdDxhbnlbXT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy9wcml2YXRlIHJlc3RvU3RvcmFnZVNlcnZpY2U6UmVzdG9TdG9yYWdlU2VydmljZSxcbiAgICBwcml2YXRlIG5ldDpOZXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLnVzZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgICB0aGlzLmZhdm9yaXRlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuXG4gICAgdGhpcy5hdXRoVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMU19UT0tFTl9OQU1FKTtcbiAgICBpZih0aGlzLmF1dGhUb2tlbikge1xuICAgICAgdGhpcy5pc0xvZ2dlZEluLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5pc0xvZ2dlZEluLnN1YnNjcmliZShpc0xvZ2dlZEluID0+IHtcbiAgICAgIGlmKGlzTG9nZ2VkSW4pIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5nZXRGYXZvcml0ZXMoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmdldFByb2ZpbGUoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZXZlbnRlclxuICAgICAgLmdldE1lc3NhZ2VFbWl0dGVyKClcbiAgICAgIC5zdWJzY3JpYmUobWVzc2FnZSA9PiB7XG4gICAgICAgIHN3aXRjaChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwiVW5hdXRob3JpemVkXCI6XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUF1dGhUb2tlbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgc2lnbkluKGRhdGE6U2lnbkluUmVxdWVzdERhdGEsIHJlbWVtYmVyTWU6Ym9vbGVhbiA9IGZhbHNlKSB7XG5cbiAgICB0aGlzLnJlbWVtYmVyTWUgPSByZW1lbWJlck1lO1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9zaWduaW4nLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBTaWduSW5SZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnVzZXIubmV4dChyZXN1bHQudXNlcik7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKIw5DCvcOQwr4gw5DCsMOQwrLDkcKCw5DCvsORwoDDkMK4w5DCt8OQwrjDkcKAw5DCvsOQwrLDkMKww5DCvScpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcblxuICB9XG5cbiAgZ2V0UHJvZmlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0KCcvdXNlci9nZXQvdXNlci1pbmZvJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogVXNlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVQcm9maWxlKGRhdGE6VXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL3NldC91c2VyLWluZm8nLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBVcGRhdGVQcm9maWxlUmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIubmV4dChyZXN1bHQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgfVxuXG4gIHNpZ25VcChkYXRhOlNpZ25VcFJlcXVlc3REYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9zaWdudXAnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBTaWduVXBSZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnVzZXIubmV4dChyZXN1bHQudXNlcik7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKIw5DCvcOQwr4gw5DCt8OQwrDDkcKAw5DCtcOQwrPDkMK4w5HCgcORwoLDkMK4w5HCgMOQwr7DkMKyw5DCsMOQwr0nKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHNpZ25PdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlQXV0aFRva2VuKCk7XG4gIH1cblxuICByZXNldFBhc3N3b3JkKGRhdGE6UmVzZXRQYXNzd29yZFJlcXVlc3REYXRhKSB7XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2xvZ2luJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogUmVzZXRQYXNzd29yZFJlc3BvbnNlRGF0YSkgPT4ge1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcmVzZXRQYXNzd29yZENvZGUoZGF0YTpSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhKSB7XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NvZGUnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBSZXNldFBhc3N3b3JkQ29kZVJlc3BvbnNlRGF0YSkgPT4ge1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cblxuICBnZXRGYXZvcml0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2Zhdm9yaXRlcyAnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdnZXRGYXZvcml0ZXMgcmVzdWx0JywgcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgYWRkRGlzaFRvRmF2b3JpdGVzKGRpc2g6YW55KSB7XG4gICAgbGV0IGRhdGE6QWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGEgPSB7XG4gICAgICBkaXNoSWQ6IGRpc2guaWRcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9hZGQvZmF2b3JpdGVzICcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IGZhdm9yaXRlc1VwZGF0ZWQ6IGFueVtdID0gdGhpcy5mYXZvcml0ZXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGZhdm9yaXRlc1VwZGF0ZWQucHVzaChkaXNoKTtcblxuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXMubmV4dChmYXZvcml0ZXNVcGRhdGVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21GYXZvcml0ZXMoZGlzaDphbnkpIHtcbiAgICBsZXQgZGF0YTpSZW1vdmVEaXNoRnJvbUZhdm9yaXRlc1JlcXVlc3REYXRhID0ge1xuICAgICAgZGlzaElkOiBkaXNoLmlkXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvcmVtb3ZlL2Zhdm9yaXRlcyAnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnw5DCkcORwovDkMK7w5DCvj0+Pj4nLCB0aGlzLmZhdm9yaXRlcy5nZXRWYWx1ZSgpLmxlbmd0aCk7XG4gICAgICAgICAgICBsZXQgZmF2b3JpdGVzVXBkYXRlZDogYW55W10gPSB0aGlzLmZhdm9yaXRlc1xuICAgICAgICAgICAgICAuZ2V0VmFsdWUoKVxuICAgICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCAhPSBkaXNoLmlkKTtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnw5DCocORwoLDkMKww5DCu8OQwr49Pj4+JywgZmF2b3JpdGVzVXBkYXRlZC5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXMubmV4dChmYXZvcml0ZXNVcGRhdGVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgdXNlclByb2ZpbGUoKTpCZWhhdmlvclN1YmplY3Q8VXNlcj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXI7XG4gIH1cblxuICB1c2VySXNMb2dnZWRJbigpOkJlaGF2aW9yU3ViamVjdDxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNMb2dnZWRJbjtcbiAgfVxuXG4gIHVzZXJGYXZvcml0ZXMoKTpCZWhhdmlvclN1YmplY3Q8YW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5mYXZvcml0ZXM7XG4gIH1cblxuXG5cbiAgZ2V0QXV0aFRva2VuKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hdXRoVG9rZW47XG4gIH1cblxuICBzZXRBdXRoVG9rZW4oYXV0aFRva2VuOiBzdHJpbmcsIHVwZGF0ZVByb2ZpbGU6IGJvb2xlYW4gPSB0cnVlKTp2b2lkIHtcbiAgICBpZih0aGlzLnJlbWVtYmVyTWUpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExTX1RPS0VOX05BTUUsIGF1dGhUb2tlbik7XG4gICAgfVxuICAgIHRoaXMuYXV0aFRva2VuID0gYXV0aFRva2VuO1xuICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KHRydWUpO1xuICAgIHRoaXMuZ2V0RmF2b3JpdGVzKCkuc3Vic2NyaWJlKCk7XG5cbiAgICBpZih1cGRhdGVQcm9maWxlKSB7XG4gICAgICB0aGlzLmdldFByb2ZpbGUoKS5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVBdXRoVG9rZW4oKTp2b2lkIHtcbiAgICB0aGlzLmF1dGhUb2tlbiA9IHVuZGVmaW5lZDtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShMU19UT0tFTl9OQU1FKTtcbiAgICB0aGlzLmlzTG9nZ2VkSW4ubmV4dChmYWxzZSk7XG4gIH1cblxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFNpZ25VcFJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLXVwLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBTaWduVXBdJ1xufSlcbmV4cG9ydCBjbGFzcyBTaWduVXBEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGVtYWlsOnN0cmluZztcbiAgQElucHV0KCkgcGFzc3dvcmQ6c3RyaW5nO1xuICBASW5wdXQoKSBjYXB0Y2hhOnN0cmluZztcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgbGV0IGRhdGE6U2lnblVwUmVxdWVzdERhdGEgPSB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBwaG9uZTogdGhpcy5waG9uZSxcbiAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXG4gICAgICBjYXB0Y2hhOiB0aGlzLmNhcHRjaGFcbiAgICB9O1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuc2lnblVwKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgU2lnbkluUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24taW4tcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFNpZ25Jbl0nXG59KVxuZXhwb3J0IGNsYXNzIFNpZ25JbkRpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgcGhvbmU6c3RyaW5nO1xuICBASW5wdXQoKSBwYXNzd29yZDpzdHJpbmc7XG4gIEBJbnB1dCgpIGNhcHRjaGE6c3RyaW5nO1xuICBASW5wdXQoKSByZW1lbWJlck1lOmJvb2xlYW47XG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGxldCBkYXRhOlNpZ25JblJlcXVlc3REYXRhID0ge1xuICAgICAgcGhvbmU6IHRoaXMucGhvbmUsXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgIGNhcHRjaGE6IHRoaXMuY2FwdGNoYVxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5zaWduSW4oZGF0YSwgdGhpcy5yZW1lbWJlck1lKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgIClcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IFNpZ25JblJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLWluLXJlcXVlc3QtZGF0YSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBTaWduT3V0XSdcbn0pXG5leHBvcnQgY2xhc3MgU2lnbk91dERpcmVjdGl2ZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZS5zaWduT3V0KCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgUmVzZXRQYXNzd29yZFJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwUmVzZXRQYXNzd29yZF0nXG59KVxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmREaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHBob25lOnN0cmluZztcbiAgQElucHV0KCkgcGFzc3dvcmQ6c3RyaW5nO1xuICBASW5wdXQoKSBjYXB0Y2hhOnN0cmluZztcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2VcbiAgKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgbGV0IGRhdGE6UmVzZXRQYXNzd29yZFJlcXVlc3REYXRhID0ge1xuICAgICAgcGhvbmU6IHRoaXMucGhvbmUsXG4gICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgIGNhcHRjaGE6IHRoaXMuY2FwdGNoYVxuICAgIH07XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC5yZXNldFBhc3N3b3JkKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlcXVlc3QtZGF0YSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFJlc2V0UGFzc3dvcmRDb2RlXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVzZXRQYXNzd29yZENvZGVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHVzZXJJZDpzdHJpbmc7XG4gIEBJbnB1dCgpIGNvZGU6c3RyaW5nO1xuICBASW5wdXQoKSBwYXNzd29yZDpzdHJpbmc7XG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGxldCBkYXRhOlJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEgPSB7XG4gICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcbiAgICB9O1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAucmVzZXRQYXNzd29yZENvZGUoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwQmFsYW5jZV0nXG59KVxuZXhwb3J0IGNsYXNzIEJhbGFuY2VEaXJlY3RpdmUge1xuXG4gIGFtb3VudDpzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgdGhpcy5hbW91bnQgPSAnMCc7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCB0aGlzLmFtb3VudCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LFxuICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FkZC1kaXNoLXRvLWZhdm9yaXRlcy1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUmVtb3ZlRGlzaEZyb21GYXZvcml0ZXNSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVtb3ZlLWRpc2gtZnJvbS1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcFRvZ2dsZURpc2hUb0Zhdm9yaXRlc10nXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBPdXRwdXQoKSBhZGRlZFRvRmF2b3JpdGVzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVtb3ZlZEZyb21GYXZvcml0ZXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGluRmF2b3JpdGVzOiBib29sZWFuO1xuICBpc0xvZ2dlZEluOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZXN0b1VzZXJTZXJ2aWNlOiBOZ1Jlc3RvVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcbiAgICAgIC51c2VyRmF2b3JpdGVzKClcbiAgICAgIC5zdWJzY3JpYmUoZmF2b3JpdGVzID0+IHtcblxuICAgICAgICB0aGlzLmluRmF2b3JpdGVzID0gZmF2b3JpdGVzLmZpbmQoZGlzaCA9PiBkaXNoLmlkID09IHRoaXMuZGlzaC5pZCk7XG5cbiAgICAgICAgaWYodGhpcy5pbkZhdm9yaXRlcykge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAudXNlcklzTG9nZ2VkSW4oKVxuICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4gdGhpcy5pc0xvZ2dlZEluID0gcmVzdWx0KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZih0aGlzLmluRmF2b3JpdGVzKSB7XG4gICAgICB0aGlzLnJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkRGlzaFRvRmF2b3JpdGVzKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlzaFRvRmF2b3JpdGVzKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAuYWRkRGlzaFRvRmF2b3JpdGVzKHRoaXMuZGlzaClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZGVkVG9GYXZvcml0ZXMuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgIClcbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKCkge1xuICAgIHRoaXMubmdSZXN0b1VzZXJTZXJ2aWNlXG4gICAgICAucmVtb3ZlRGlzaEZyb21GYXZvcml0ZXModGhpcy5kaXNoKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlZEZyb21GYXZvcml0ZXMuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RlZCcpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy91cGRhdGUtcHJvZmlsZS1yZXF1ZXN0LWRhdGEnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwVXBkYXRlUHJvZmlsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGVtYWlsOnN0cmluZztcblxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxuICApIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBsZXQgZGF0YTpVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEgPSB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBwaG9uZTogdGhpcy5waG9uZSxcbiAgICAgIGVtYWlsOiB0aGlzLmVtYWlsXG4gICAgfTtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLnVwZGF0ZVByb2ZpbGUoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTaWduVXBEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2lnbi11cC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2lnbkluRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NpZ24taW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNpZ25PdXREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2lnbi1vdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVzZXQtcGFzc3dvcmQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3Jlc2V0LXBhc3N3b3JkLWNvZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEJhbGFuY2VEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYmFsYW5jZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVG9nZ2xlRGlzaFRvRmF2b3JpdGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RvZ2dsZS1kaXNoLXRvLWZhdm9yaXRlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy91cGRhdGUtcHJvZmlsZS5kaXJlY3RpdmUnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBTaWduVXBEaXJlY3RpdmUsXG4gIFNpZ25JbkRpcmVjdGl2ZSxcbiAgU2lnbk91dERpcmVjdGl2ZSxcbiAgUmVzZXRQYXNzd29yZERpcmVjdGl2ZSxcbiAgUmVzZXRQYXNzd29yZENvZGVEaXJlY3RpdmUsXG4gIEJhbGFuY2VEaXJlY3RpdmUsXG4gIFRvZ2dsZURpc2hUb0Zhdm9yaXRlc0RpcmVjdGl2ZSxcbiAgVXBkYXRlUHJvZmlsZURpcmVjdGl2ZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW10sXG4gIGRlY2xhcmF0aW9uczogWy4uLkRJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbLi4uRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgTmdVc2VyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cFJlcXVlc3QsXG4gIEh0dHBFcnJvclJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgTmdSZXN0b1VzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlKSB7fVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKSB7XG5cbiAgICBjb25zb2xlLmluZm8oJ0F1dGhJbnRlcmNlcHRvcicsIHJlcSk7XG5cbiAgICAvLyBHZXQgdGhlIGF1dGggdG9rZW4gZnJvbSB0aGUgc2VydmljZS5cbiAgICBjb25zdCBhdXRoVG9rZW4gPSB0aGlzLnVzZXJTZXJ2aWNlLmdldEF1dGhUb2tlbigpO1xuXG4gICAgaWYoYXV0aFRva2VuKSB7XG4gICAgICAvLyBDbG9uZSB0aGUgcmVxdWVzdCBhbmQgcmVwbGFjZSB0aGUgb3JpZ2luYWwgaGVhZGVycyB3aXRoXG4gICAgICAvLyBjbG9uZWQgaGVhZGVycywgdXBkYXRlZCB3aXRoIHRoZSBhdXRob3JpemF0aW9uLlxuICAgICAgY29uc3QgYXV0aFJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsIGBKV1QgJHthdXRoVG9rZW59YClcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZW5kIGNsb25lZCByZXF1ZXN0IHdpdGggaGVhZGVyIHRvIHRoZSBuZXh0IGhhbmRsZXIuXG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUoYXV0aFJlcSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKTtcbiAgfVxufSIsImltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBBdXRoSW50ZXJjZXB0b3IgfSBmcm9tICcuL2F1dGguaW50ZXJjZXB0b3InO1xuXG5leHBvcnQgY29uc3QgbmdVc2VySHR0cEludGVyY2VwdG9yUHJvdmlkZXJzID0gW1xuICB7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogQXV0aEludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSB9XG5dOyJdLCJuYW1lcyI6WyJCZWhhdmlvclN1YmplY3QiLCJ0YXAiLCJFdmVudE1lc3NhZ2UiLCJJbmplY3RhYmxlIiwiTmV0U2VydmljZSIsIkV2ZW50ZXJTZXJ2aWNlIiwiRXZlbnRFbWl0dGVyIiwiRGlyZWN0aXZlIiwiSW5wdXQiLCJPdXRwdXQiLCJIb3N0TGlzdGVuZXIiLCJSZW5kZXJlcjIiLCJFbGVtZW50UmVmIiwiTmdNb2R1bGUiLCJIVFRQX0lOVEVSQ0VQVE9SUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0lBNEJBLElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQzs7UUFhNUIsNEJBRVUsS0FDQTtZQUhWLGlCQWdDQztZQTlCUyxRQUFHLEdBQUgsR0FBRztZQUNILFlBQU8sR0FBUCxPQUFPOzhCQVJZLEtBQUs7WUFVaEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJQSxvQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSUEsb0JBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUlBLG9CQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3JELElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLFVBQVU7Z0JBQ2xDLElBQUcsVUFBVSxFQUFFO29CQUNiLFVBQVUsQ0FBQzt3QkFDVCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ2hDLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztxQkFDL0IsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDVDthQUNGLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxPQUFPO2lCQUNULGlCQUFpQixFQUFFO2lCQUNuQixTQUFTLENBQUMsVUFBQSxPQUFPO2dCQUNoQixRQUFPLE9BQU8sQ0FBQyxJQUFJO29CQUNqQixLQUFL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