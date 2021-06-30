(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@webresto/ng-core'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@webresto/ng-user', ['exports', '@angular/core', '@webresto/ng-core', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.webresto = global.webresto || {}, global.webresto['ng-user'] = {}), global.ng.core, global['@webresto/ng-core'], global.rxjs, global.rxjs.operators, global.ng.common));
}(this, (function (exports, i0, i1, rxjs, operators, common) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var LS_TOKEN_NAME = 'gf:tkn:v2';
    var NgRestoUserService = /** @class */ (function () {
        function NgRestoUserService(net) {
            var _this = this;
            this.net = net;
            this.authToken = localStorage.getItem(LS_TOKEN_NAME);
            this.rememberMe = false;
            this.isLoggedIn = new rxjs.BehaviorSubject(this.authToken ? true : false);
            this.historyItems = new rxjs.BehaviorSubject([]);
            this.historyTransactions = new rxjs.BehaviorSubject([]);
            var isLoggedSubscription = this.isLoggedIn.pipe(operators.filter(function (isLoggedIn) { return !!isLoggedIn; }), operators.switchMap(function () { return _this.getFavorites(); }), operators.switchMap(function () { return _this.getProfile(); }), operators.switchMap(function () { return _this.getAddresses(); }), operators.switchMap(function () { return _this.getBonuses(); })).subscribe(function () { }, function () { }, function () { return isLoggedSubscription.unsubscribe(); });
        }
        NgRestoUserService.prototype.signIn = function (data, rememberMe) {
            var _this = this;
            if (rememberMe === void 0) { rememberMe = false; }
            this.rememberMe = rememberMe;
            return this.net.post('/signin', data).pipe(operators.tap(function (result) {
                _this.setAuthToken(result.token);
                _this.user.next(result.user);
                _this.isLoggedIn.next(true);
            }, function () { }));
        };
        NgRestoUserService.prototype.getProfile = function () {
            var _this = this;
            return this.user ? this.user : this.net.get('/user/get/user-info').pipe(operators.switchMap(function (result) {
                _this.user = new rxjs.BehaviorSubject(result);
                return _this.user;
            }));
        };
        NgRestoUserService.prototype.getHistory = function () {
            var _this = this;
            return this.net.get('/user/get/history').pipe(operators.tap(function (historyItems) {
                _this.historyItems.next(historyItems);
            }, function (error) {
                if ((error === null || error === void 0 ? void 0 : error.type) === "Unauthorized") {
                    _this.deleteAuthToken();
                }
                ;
            }));
        };
        NgRestoUserService.prototype.getHistoryTransactions = function (bonusSystem, limit, set) {
            var _this = this;
            if (bonusSystem === void 0) { bonusSystem = "local"; }
            if (limit === void 0) { limit = 15; }
            if (set === void 0) { set = 0; }
            return this.net.get("/bonus/transactions?bonussystem=" + bonusSystem + "&limit=" + limit + "&number=" + set).pipe(operators.tap(function (transactions) {
                _this.historyTransactions.next(transactions);
            }, function () { }));
        };
        NgRestoUserService.prototype.updateProfile = function (data) {
            var _this = this;
            return this.net.post('/user/set/user-info', {
                user: data
            }).pipe(operators.tap(function (result) {
                _this.user.next(result.user);
            }, function () { }));
        };
        NgRestoUserService.prototype.getAddresses = function () {
            var _this = this;
            return this.addresses ? this.addresses : this.net.get('/user/get/location').pipe(operators.switchMap(function (addresses) {
                _this.addresses = new rxjs.BehaviorSubject(addresses);
                return _this.addresses;
            }));
        };
        NgRestoUserService.prototype.addAddress = function (address) {
            var _this = this;
            return this.net.post('/user/add/location', address).pipe(operators.switchMap(function (addresses) {
                _this.addresses.next(addresses);
                return _this.addresses;
            }));
        };
        NgRestoUserService.prototype.deleteAddress = function (address) {
            var _this = this;
            return this.net.post('/user/remove/location', {
                id: address.id,
                street: address.street,
                home: address.home
            }).pipe(operators.tap(function (addresses) {
                _this.addresses.next(addresses);
            }, function () { }));
        };
        NgRestoUserService.prototype.signUp = function (data) {
            return this.net.post('/signup', data).pipe(operators.tap(function () {
                //this.setAuthToken(result.token, false);
                //this.user.next(result.user);
            }, function () { }));
        };
        NgRestoUserService.prototype.signOut = function () {
            return this.deleteAuthToken();
        };
        NgRestoUserService.prototype.getBonuses = function () {
            var _this = this;
            return this.bonusSystems ? this.bonusSystems : this.net.post('/bonus/get', {}).pipe(operators.switchMap(function (result) {
                _this.bonusSystems = new rxjs.BehaviorSubject(result);
                return _this.bonusSystems;
            }));
        };
        NgRestoUserService.prototype.resetPassword = function (data) {
            return this.net.post('/reset', data).pipe(operators.tap(function () { }, function () { }));
        };
        NgRestoUserService.prototype.resetPasswordCode = function (data) {
            return this.net.post('/code', data).pipe(operators.tap(function () { }, function () { }));
        };
        NgRestoUserService.prototype.getFavorites = function () {
            var _this = this;
            return this.favorites ? this.favorites : this.net.get('/user/get/favorites').pipe(operators.switchMap(function (result) {
                console.info('getFavorites result', result);
                _this.favorites = new rxjs.BehaviorSubject(result);
                return _this.favorites;
            }));
        };
        NgRestoUserService.prototype.addDishToFavorites = function (dish) {
            var _this = this;
            return this.net.post('/user/add/favorites ', {
                dishId: dish.id
            }).pipe(operators.map(function (result) { return _this.favorites.next(result); }));
        };
        NgRestoUserService.prototype.removeDishFromFavorites = function (dish) {
            var _this = this;
            return this.net.post('/user/remove/favorites ', {
                dishId: dish.id
            }).pipe(operators.tap(function (result) {
                console.info('Было=>>>', _this.favorites.getValue().length);
                var favoritesUpdated = _this.favorites
                    .getValue()
                    .filter(function (item) { return item.id != dish.id; });
                console.info('Стало=>>>', favoritesUpdated.length);
                _this.favorites.next(result);
            }, function () { }));
        };
        NgRestoUserService.prototype.userProfile = function () {
            var _this = this;
            return this.user ? this.user : this.getProfile().pipe(operators.switchMap(function () { return _this.getFavorites(); }), operators.switchMap(function () { return _this.getAddresses(); }), operators.switchMap(function () { return _this.getBonuses(); }), operators.switchMap(function () { return _this.user; }));
        };
        NgRestoUserService.prototype.userIsLoggedIn = function () {
            return this.isLoggedIn;
        };
        NgRestoUserService.prototype.userFavorites = function () {
            return this.favorites ? this.favorites.asObservable() : rxjs.of([]);
        };
        NgRestoUserService.prototype.userAddresses = function () {
            return this.addresses ? this.addresses.asObservable() : rxjs.of([]);
        };
        NgRestoUserService.prototype.userHistory = function () {
            return this.historyItems ? this.historyItems.asObservable() : rxjs.of([]);
        };
        NgRestoUserService.prototype.userTransactionsHistory = function () {
            return this.historyTransactions ? this.historyTransactions.asObservable() : rxjs.of([]);
        };
        NgRestoUserService.prototype.getAuthToken = function () {
            return this.authToken;
        };
        NgRestoUserService.prototype.setAuthToken = function (authToken) {
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
        };
        NgRestoUserService.prototype.deleteAuthToken = function () {
            this.authToken = null;
            localStorage.removeItem(LS_TOKEN_NAME);
            this.isLoggedIn.next(false);
        };
        NgRestoUserService.prototype.saveAvatar = function (avatar) {
            var _this = this;
            var data = new FormData();
            data.append('avatar', avatar, avatar.name);
            return this.net.post('/user/avatar/upload', data, true, {
                headers: { 'Content-Type': 'multipart/form-data' },
            }).pipe(operators.tap(function (result) { return _this.user.next(result.user); }, function () { }));
        };
        return NgRestoUserService;
    }());
    NgRestoUserService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function NgRestoUserService_Factory() { return new NgRestoUserService(i0__namespace.ɵɵinject(i1__namespace.NetService)); }, token: NgRestoUserService, providedIn: "root" });
    NgRestoUserService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NgRestoUserService.ctorParameters = function () { return [
        { type: i1.NetService }
    ]; };

    var SignUpDirective = /** @class */ (function () {
        function SignUpDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        SignUpDirective.prototype.onClick = function () {
            var _this = this;
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
        SignUpDirective.prototype.preparePhone = function (phone) {
            phone = '+' + phone.replace(/[^0-9]/gim, '');
            return phone.replace('+8', '');
        };
        return SignUpDirective;
    }());
    SignUpDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstSignUp]'
                },] }
    ];
    SignUpDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
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

    var SignInDirective = /** @class */ (function () {
        function SignInDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        SignInDirective.prototype.onClick = function () {
            var _this = this;
            var data = {
                phone: this.preparePhone(this.phone),
                password: this.password,
                captcha: this.captcha
            };
            this.ngRestoUserService
                .signIn(data, this.rememberMe)
                .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
        };
        SignInDirective.prototype.preparePhone = function (phone) {
            phone = '+' + phone.replace(/[^0-9]/gim, '');
            return phone.replace('+8', '');
        };
        return SignInDirective;
    }());
    SignInDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstSignIn]'
                },] }
    ];
    SignInDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    SignInDirective.propDecorators = {
        phone: [{ type: i0.Input }],
        password: [{ type: i0.Input }],
        captcha: [{ type: i0.Input }],
        rememberMe: [{ type: i0.Input }],
        success: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var SignOutDirective = /** @class */ (function () {
        function SignOutDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
        }
        SignOutDirective.prototype.onClick = function () {
            this.ngRestoUserService.signOut();
        };
        return SignOutDirective;
    }());
    SignOutDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstSignOut]'
                },] }
    ];
    SignOutDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    SignOutDirective.propDecorators = {
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var ResetPasswordDirective = /** @class */ (function () {
        function ResetPasswordDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        ResetPasswordDirective.prototype.onClick = function () {
            var _this = this;
            var data = {
                phone: this.phone,
                captcha: this.captcha
            };
            this.ngRestoUserService
                .resetPassword(data)
                .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
        };
        return ResetPasswordDirective;
    }());
    ResetPasswordDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstResetPassword]'
                },] }
    ];
    ResetPasswordDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    ResetPasswordDirective.propDecorators = {
        phone: [{ type: i0.Input }],
        captcha: [{ type: i0.Input }],
        success: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var ResetPasswordCodeDirective = /** @class */ (function () {
        function ResetPasswordCodeDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        ResetPasswordCodeDirective.prototype.onClick = function () {
            var _this = this;
            var data = {
                userId: this.userId,
                code: this.code,
                password: this.password
            };
            this.ngRestoUserService
                .resetPasswordCode(data)
                .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
        };
        return ResetPasswordCodeDirective;
    }());
    ResetPasswordCodeDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstResetPasswordCode]'
                },] }
    ];
    ResetPasswordCodeDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    ResetPasswordCodeDirective.propDecorators = {
        userId: [{ type: i0.Input }],
        code: [{ type: i0.Input }],
        password: [{ type: i0.Input }],
        success: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var BalanceDirective = /** @class */ (function () {
        function BalanceDirective(renderer, el, ngRestoUserService) {
            var _this = this;
            this.renderer = renderer;
            this.el = el;
            this.ngRestoUserService = ngRestoUserService;
            var balance = 0;
            this.ngRestoUserService
                .getBonuses()
                .subscribe(function (bonuses) {
                for (var name in bonuses) {
                    var data = bonuses[name];
                    if (data.state == 'active') {
                        balance += data.balance;
                    }
                }
                _this.amount = "" + balance;
                _this.renderer.setProperty(_this.el.nativeElement, 'innerHTML', _this.amount);
            });
        }
        return BalanceDirective;
    }());
    BalanceDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstBalance]'
                },] }
    ];
    BalanceDirective.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.ElementRef },
        { type: NgRestoUserService }
    ]; };

    var ToggleDishToFavoritesDirective = /** @class */ (function () {
        function ToggleDishToFavoritesDirective(ngRestoUserService, element, renderer) {
            this.ngRestoUserService = ngRestoUserService;
            this.element = element;
            this.renderer = renderer;
            this.change = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        Object.defineProperty(ToggleDishToFavoritesDirective.prototype, "inFavorites", {
            get: function () {
                var _this = this;
                return !!this.favorites.find(function (dish) { return dish.id == _this.dish.id; });
            },
            enumerable: false,
            configurable: true
        });
        ;
        ToggleDishToFavoritesDirective.prototype.ngOnDestroy = function () {
            [this.change, this.error].forEach(function (emitter) { return emitter.complete(); });
        };
        ToggleDishToFavoritesDirective.prototype.ngOnChanges = function () {
            if (this.inFavorites) {
                this.renderer.addClass(this.element.nativeElement, 'selected');
            }
            else {
                this.renderer.removeClass(this.element.nativeElement, 'selected');
            }
            ;
        };
        ToggleDishToFavoritesDirective.prototype.onClick = function () {
            if (this.inFavorites) {
                this.removeDishFromFavorites();
            }
            else {
                this.addDishToFavorites();
            }
        };
        ToggleDishToFavoritesDirective.prototype.addDishToFavorites = function () {
            var _this = this;
            this.ngRestoUserService
                .addDishToFavorites(this.dish)
                .subscribe(function () {
                console.log('toggle dish');
                _this.change.emit(true);
                _this.renderer.addClass(_this.element.nativeElement, 'selected');
            }, function (error) { return _this.error.emit(error); });
        };
        ToggleDishToFavoritesDirective.prototype.removeDishFromFavorites = function () {
            var _this = this;
            var req = this.ngRestoUserService.removeDishFromFavorites(this.dish).subscribe(function () {
                _this.change.emit(false);
                _this.renderer.removeClass(_this.element.nativeElement, 'selected');
            }, function (error) { return _this.error.emit(error); }, function () { return req.unsubscribe(); });
        };
        return ToggleDishToFavoritesDirective;
    }());
    ToggleDishToFavoritesDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstToggleDishToFavorites]'
                },] }
    ];
    ToggleDishToFavoritesDirective.ctorParameters = function () { return [
        { type: NgRestoUserService },
        { type: i0.ElementRef },
        { type: i0.Renderer2 }
    ]; };
    ToggleDishToFavoritesDirective.propDecorators = {
        dish: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        isLoggedIn: [{ type: i0.Input }],
        favorites: [{ type: i0.Input }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var UpdateProfileDirective = /** @class */ (function () {
        function UpdateProfileDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        UpdateProfileDirective.prototype.onClick = function () {
            var _this = this;
            var data = {
                name: this.name,
                //phone: this.phone,
                email: this.email,
                additionalInfo: this.additionalInfo,
                birthday: this.birthday ? common.formatDate(this.birthday, 'yyyy-MM-dd', 'en') : this.birthday
            };
            this.ngRestoUserService
                .updateProfile(data)
                .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
        };
        return UpdateProfileDirective;
    }());
    UpdateProfileDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstUpdateProfile]'
                },] }
    ];
    UpdateProfileDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    UpdateProfileDirective.propDecorators = {
        name: [{ type: i0.Input }],
        phone: [{ type: i0.Input }],
        email: [{ type: i0.Input }],
        additionalInfo: [{ type: i0.Input }],
        birthday: [{ type: i0.Input }],
        success: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var AddAddressDirective = /** @class */ (function () {
        function AddAddressDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        AddAddressDirective.prototype.onClick = function () {
            var _this = this;
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
            var data = {
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
            var req = this.ngRestoUserService.addAddress(data).subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); }, function () { return req.unsubscribe(); });
        };
        return AddAddressDirective;
    }());
    AddAddressDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstAddAddress]'
                },] }
    ];
    AddAddressDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    AddAddressDirective.propDecorators = {
        street: [{ type: i0.Input }],
        streetId: [{ type: i0.Input }],
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

    var DeleteAddressDirective = /** @class */ (function () {
        function DeleteAddressDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        DeleteAddressDirective.prototype.onClick = function () {
            var _this = this;
            this.ngRestoUserService
                .deleteAddress(this.address)
                .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
        };
        return DeleteAddressDirective;
    }());
    DeleteAddressDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstDeleteAddress]'
                },] }
    ];
    DeleteAddressDirective.ctorParameters = function () { return [
        { type: NgRestoUserService }
    ]; };
    DeleteAddressDirective.propDecorators = {
        address: [{ type: i0.Input }],
        success: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var NgUserModule = /** @class */ (function () {
        function NgUserModule() {
        }
        return NgUserModule;
    }());
    NgUserModule.decorators = [
        { type: i0.NgModule, args: [{
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

    exports.AddAddressDirective = AddAddressDirective;
    exports.BalanceDirective = BalanceDirective;
    exports.DeleteAddressDirective = DeleteAddressDirective;
    exports.NgRestoUserService = NgRestoUserService;
    exports.NgUserModule = NgUserModule;
    exports.ResetPasswordCodeDirective = ResetPasswordCodeDirective;
    exports.ResetPasswordDirective = ResetPasswordDirective;
    exports.SignInDirective = SignInDirective;
    exports.SignOutDirective = SignOutDirective;
    exports.SignUpDirective = SignUpDirective;
    exports.ToggleDishToFavoritesDirective = ToggleDishToFavoritesDirective;
    exports.UpdateProfileDirective = UpdateProfileDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=webresto-ng-user.umd.js.map
