(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@webresto/ng-core/dist'), require('@webresto/ng-core')) :
    typeof define === 'function' && define.amd ? define('@webresto/ng-user', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@webresto/ng-core/dist', '@webresto/ng-core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.webresto = global.webresto || {}, global.webresto['ng-user'] = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.dist, global.i1));
}(this, (function (exports, i0, rxjs, operators, dist, i1) { 'use strict';

    var LS_TOKEN_NAME = 'gf:tkn:v2';
    var NgRestoUserService = /** @class */ (function () {
        function NgRestoUserService(net) {
            var _this = this;
            this.net = net;
            this.authToken = localStorage.getItem(LS_TOKEN_NAME);
            this.rememberMe = false;
            this.user = new rxjs.BehaviorSubject({});
            this.isLoggedIn = new rxjs.BehaviorSubject(this.authToken ? true : false);
            this.favorites = new rxjs.BehaviorSubject([]);
            this.addresses = new rxjs.BehaviorSubject([]);
            this.historyItems = new rxjs.BehaviorSubject([]);
            this.historyTransactions = new rxjs.BehaviorSubject([]);
            this.bonusSystems = new rxjs.BehaviorSubject([]);
            this.isLoggedSubscription = this.isLoggedIn.pipe(operators.filter(function (isLoggedIn) { return isLoggedIn === true; }), operators.switchMap(function () { return _this.getFavorites(); }), operators.switchMap(function () { return _this.getProfile(); }), operators.switchMap(function () { return _this.getAddresses(); }), operators.switchMap(function () { return _this.getBonuses(); }), operators.switchMap(function () { return _this.getHistory(); })).subscribe(function () { }, function () { }, function () { return _this.isLoggedSubscription.unsubscribe(); });
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
            return this.net.get('/user/get/user-info').pipe(operators.tap(function (result) {
                _this.user.next(result);
            }, function () { }));
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
            return this.net.get('/user/get/location').pipe(operators.tap(function (addresses) {
                _this.addresses.next(addresses);
            }, function () { }));
        };
        NgRestoUserService.prototype.addAddress = function (address) {
            var _this = this;
            return this.net.post('/user/add/location', address).pipe(operators.tap(function (addresses) {
                _this.addresses.next(addresses);
            }, function () { }));
        };
        NgRestoUserService.prototype.deleteAddress = function (address) {
            var _this = this;
            var reqBody = {
                id: address.id,
                street: address.street,
                home: address.home
            };
            return this.net.post('/user/remove/location', reqBody).pipe(operators.tap(function (addresses) {
                _this.addresses.next(addresses);
            }, function () { }));
        };
        NgRestoUserService.prototype.signUp = function (data) {
            return this.net.post('/signup', data).pipe(operators.tap(function (result) {
                //this.setAuthToken(result.token, false);
                //this.user.next(result.user);
            }, function () { }));
        };
        NgRestoUserService.prototype.signOut = function () {
            return this.deleteAuthToken();
        };
        NgRestoUserService.prototype.getBonuses = function () {
            var _this = this;
            return this.net.post('/bonus/get', {}).pipe(operators.tap(function (result) { return _this.bonusSystems.next(result); }, function () { }));
        };
        NgRestoUserService.prototype.resetPassword = function (data) {
            return this.net.post('/reset', data).pipe(operators.tap(function () { }, function () { }));
        };
        NgRestoUserService.prototype.resetPasswordCode = function (data) {
            return this.net.post('/code', data).pipe(operators.tap(function () { }, function () { }));
        };
        NgRestoUserService.prototype.getFavorites = function () {
            var _this = this;
            return this.net.get('/user/get/favorites').pipe(operators.tap(function (result) {
                console.info('getFavorites result', result);
                _this.favorites.next(result);
            }, function () { }));
        };
        NgRestoUserService.prototype.addDishToFavorites = function (dish) {
            var _this = this;
            var data = {
                dishId: dish.id
            };
            return this.net.post('/user/add/favorites ', data).pipe(operators.tap(function (result) {
                var favoritesUpdated = _this.favorites.getValue();
                favoritesUpdated.push(dish);
                _this.favorites.next(result);
            }, function () { }));
        };
        NgRestoUserService.prototype.removeDishFromFavorites = function (dish) {
            var _this = this;
            var data = {
                dishId: dish.id
            };
            return this.net.post('/user/remove/favorites ', data).pipe(operators.tap(function (result) {
                console.info('Было=>>>', _this.favorites.getValue().length);
                var favoritesUpdated = _this.favorites
                    .getValue()
                    .filter(function (item) { return item.id != dish.id; });
                console.info('Стало=>>>', favoritesUpdated.length);
                _this.favorites.next(result);
            }, function () { }));
        };
        NgRestoUserService.prototype.userProfile = function () {
            return this.user;
        };
        NgRestoUserService.prototype.userIsLoggedIn = function () {
            return this.isLoggedIn;
        };
        NgRestoUserService.prototype.userFavorites = function () {
            return this.favorites.pipe();
        };
        NgRestoUserService.prototype.userAddresses = function () {
            return this.addresses.pipe();
        };
        NgRestoUserService.prototype.userHistory = function () {
            return this.historyItems.pipe();
        };
        NgRestoUserService.prototype.userTransactionsHistory = function () {
            return this.historyTransactions.pipe();
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
    NgRestoUserService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgRestoUserService_Factory() { return new NgRestoUserService(i0.ɵɵinject(i1.NetService)); }, token: NgRestoUserService, providedIn: "root" });
    NgRestoUserService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NgRestoUserService.ctorParameters = function () { return [
        { type: dist.NetService }
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
            this.addedToFavorites = new i0.EventEmitter();
            this.removedFromFavorites = new i0.EventEmitter();
            this.change = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        ToggleDishToFavoritesDirective.prototype.ngOnInit = function () {
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
                _this.addedToFavorites.emit();
                _this.change.emit(true);
                _this.renderer.addClass(_this.element.nativeElement, 'selected');
            }, function (error) { return _this.error.emit(error); });
        };
        ToggleDishToFavoritesDirective.prototype.removeDishFromFavorites = function () {
            var _this = this;
            this.ngRestoUserService
                .removeDishFromFavorites(this.dish)
                .subscribe(function () {
                _this.removedFromFavorites.emit();
                _this.change.emit(false);
                _this.renderer.removeClass(_this.element.nativeElement, 'selected');
            }, function (error) { return _this.error.emit(error); });
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
        addedToFavorites: [{ type: i0.Output }],
        removedFromFavorites: [{ type: i0.Output }],
        change: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
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
                birthday: this.birthday
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
            if (!this.home) {
                this.error.emit('Необходимо указать номер дома');
                return;
            }
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
