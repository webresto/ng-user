(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@webresto/ng-core'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@webresto/ng-user', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@webresto/ng-core', '@angular/common/http'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.webresto = global.webresto || {}, global.webresto['ng-user'] = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.i1, global.ng.common.http));
}(this, (function (exports, i0, rxjs, operators, i1, http) { 'use strict';

    var LS_TOKEN_NAME = 'gf:tkn:v2';
    var NgRestoUserService = /** @class */ (function () {
        function NgRestoUserService(
        //private restoStorageService:RestoStorageService,
        net, eventer) {
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
        NgRestoUserService.prototype.signIn = function (data, rememberMe) {
            var _this = this;
            if (rememberMe === void 0) { rememberMe = false; }
            this.rememberMe = rememberMe;
            return this.net.post('/signin', data)
                .pipe(operators.tap(function (result) {
                _this.setAuthToken(result.token, false);
                _this.user.next(result.user);
                _this.eventer.emitMessageEvent(new i1.EventMessage('success', 'Успех', 'Успешно авторизирован'));
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.getProfile = function () {
            var _this = this;
            return this.net.get('/user/get/user-info')
                .pipe(operators.tap(function (result) {
                _this.user.next(result);
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.getHistory = function () {
            var _this = this;
            return this.net.get('/user/get/history')
                .pipe(operators.tap(function (historyItems) {
                _this.historyItems.next(historyItems);
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.getHistoryTransactions = function (bonusSystem, limit, set) {
            var _this = this;
            if (bonusSystem === void 0) { bonusSystem = "local"; }
            if (limit === void 0) { limit = 15; }
            if (set === void 0) { set = 0; }
            return this.net.get("/bonus/transactions?bonussystem=" + bonusSystem + "&limit=" + limit + "&number=" + set)
                .pipe(operators.tap(function (transactions) {
                _this.historyTransactions.next(transactions);
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.updateProfile = function (data) {
            var _this = this;
            return this.net.post('/user/set/user-info', {
                user: data
            })
                .pipe(operators.tap(function (result) {
                _this.user.next(result);
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.getAddresses = function () {
            var _this = this;
            return this.net.get('/user/get/location')
                .pipe(operators.tap(function (addresses) {
                _this.addresses.next(addresses);
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.addAddress = function (address) {
            var _this = this;
            return this.net.post('/user/add/location', address)
                .pipe(operators.tap(function (addresses) {
                _this.addresses.next(addresses);
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.deleteAddress = function (address) {
            var _this = this;
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
        NgRestoUserService.prototype.signUp = function (data) {
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
        NgRestoUserService.prototype.signOut = function () {
            return this.deleteAuthToken();
        };
        NgRestoUserService.prototype.getBonuses = function () {
            var _this = this;
            return this.net.post('/bonus/get', {})
                .pipe(operators.tap(function (result) {
                _this.bonusSystems.next(result);
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.resetPassword = function (data) {
            var _this = this;
            return this.net.post('/reset', data)
                .pipe(operators.tap(function (result) {
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.resetPasswordCode = function (data) {
            var _this = this;
            return this.net.post('/code', data)
                .pipe(operators.tap(function (result) {
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.getFavorites = function () {
            var _this = this;
            return this.net.get('/user/get/favorites ')
                .pipe(operators.tap(function (result) {
                console.info('getFavorites result', result);
                _this.favorites.next(result);
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.addDishToFavorites = function (dish) {
            var _this = this;
            var data = {
                dishId: dish.id
            };
            return this.net.post('/user/add/favorites ', data)
                .pipe(operators.tap(function (result) {
                var favoritesUpdated = _this.favorites.getValue();
                favoritesUpdated.push(dish);
                _this.favorites.next(favoritesUpdated);
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.removeDishFromFavorites = function (dish) {
            var _this = this;
            var data = {
                dishId: dish.id
            };
            return this.net.post('/user/remove/favorites ', data)
                .pipe(operators.tap(function (result) {
                console.info('Было=>>>', _this.favorites.getValue().length);
                var favoritesUpdated = _this.favorites
                    .getValue()
                    .filter(function (item) { return item.id != dish.id; });
                console.info('Стало=>>>', favoritesUpdated.length);
                _this.favorites.next(favoritesUpdated);
            }, function (error) { return _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', error)); }));
        };
        NgRestoUserService.prototype.userProfile = function () {
            return this.user.pipe();
        };
        NgRestoUserService.prototype.userIsLoggedIn = function () {
            return this.isLoggedIn.pipe();
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
        NgRestoUserService.prototype.setAuthToken = function (authToken, updateProfile) {
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
        NgRestoUserService.prototype.deleteAuthToken = function () {
            this.authToken = undefined;
            localStorage.removeItem(LS_TOKEN_NAME);
            localStorage.removeItem('gf:login:phone');
            this.isLoggedIn.next(false);
        };
        return NgRestoUserService;
    }());
    NgRestoUserService.ɵfac = function NgRestoUserService_Factory(t) { return new (t || NgRestoUserService)(i0.ɵɵinject(i1.NetService), i0.ɵɵinject(i1.EventerService)); };
    NgRestoUserService.ɵprov = i0.ɵɵdefineInjectable({ token: NgRestoUserService, factory: NgRestoUserService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NgRestoUserService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return [{ type: i1.NetService }, { type: i1.EventerService }]; }, null);
    })();

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
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
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
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
    SignUpDirective.ɵfac = function SignUpDirective_Factory(t) { return new (t || SignUpDirective)(i0.ɵɵdirectiveInject(NgRestoUserService)); };
    SignUpDirective.ɵdir = i0.ɵɵdefineDirective({ type: SignUpDirective, selectors: [["", "appSignUp", ""]], hostBindings: function SignUpDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function SignUpDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { name: "name", phone: "phone", email: "email", password: "password", captcha: "captcha" }, outputs: { success: "success", error: "error" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SignUpDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[appSignUp]'
                    }]
            }], function () { return [{ type: NgRestoUserService }]; }, { name: [{
                    type: i0.Input
                }], phone: [{
                    type: i0.Input
                }], email: [{
                    type: i0.Input
                }], password: [{
                    type: i0.Input
                }], captcha: [{
                    type: i0.Input
                }], success: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
    SignInDirective.ɵfac = function SignInDirective_Factory(t) { return new (t || SignInDirective)(i0.ɵɵdirectiveInject(NgRestoUserService)); };
    SignInDirective.ɵdir = i0.ɵɵdefineDirective({ type: SignInDirective, selectors: [["", "appSignIn", ""]], hostBindings: function SignInDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function SignInDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { phone: "phone", password: "password", captcha: "captcha", rememberMe: "rememberMe" }, outputs: { success: "success", error: "error" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SignInDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[appSignIn]'
                    }]
            }], function () { return [{ type: NgRestoUserService }]; }, { phone: [{
                    type: i0.Input
                }], password: [{
                    type: i0.Input
                }], captcha: [{
                    type: i0.Input
                }], rememberMe: [{
                    type: i0.Input
                }], success: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

    var SignOutDirective = /** @class */ (function () {
        function SignOutDirective(ngRestoUserService) {
            this.ngRestoUserService = ngRestoUserService;
        }
        SignOutDirective.prototype.onClick = function () {
            this.ngRestoUserService.signOut();
        };
        return SignOutDirective;
    }());
    SignOutDirective.ɵfac = function SignOutDirective_Factory(t) { return new (t || SignOutDirective)(i0.ɵɵdirectiveInject(NgRestoUserService)); };
    SignOutDirective.ɵdir = i0.ɵɵdefineDirective({ type: SignOutDirective, selectors: [["", "appSignOut", ""]], hostBindings: function SignOutDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function SignOutDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SignOutDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[appSignOut]'
                    }]
            }], function () { return [{ type: NgRestoUserService }]; }, { onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
    ResetPasswordDirective.ɵfac = function ResetPasswordDirective_Factory(t) { return new (t || ResetPasswordDirective)(i0.ɵɵdirectiveInject(NgRestoUserService)); };
    ResetPasswordDirective.ɵdir = i0.ɵɵdefineDirective({ type: ResetPasswordDirective, selectors: [["", "appResetPassword", ""]], hostBindings: function ResetPasswordDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function ResetPasswordDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { phone: "phone", captcha: "captcha" }, outputs: { success: "success", error: "error" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResetPasswordDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[appResetPassword]'
                    }]
            }], function () { return [{ type: NgRestoUserService }]; }, { phone: [{
                    type: i0.Input
                }], captcha: [{
                    type: i0.Input
                }], success: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
    ResetPasswordCodeDirective.ɵfac = function ResetPasswordCodeDirective_Factory(t) { return new (t || ResetPasswordCodeDirective)(i0.ɵɵdirectiveInject(NgRestoUserService)); };
    ResetPasswordCodeDirective.ɵdir = i0.ɵɵdefineDirective({ type: ResetPasswordCodeDirective, selectors: [["", "appResetPasswordCode", ""]], hostBindings: function ResetPasswordCodeDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function ResetPasswordCodeDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { userId: "userId", code: "code", password: "password" }, outputs: { success: "success", error: "error" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResetPasswordCodeDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[appResetPasswordCode]'
                    }]
            }], function () { return [{ type: NgRestoUserService }]; }, { userId: [{
                    type: i0.Input
                }], code: [{
                    type: i0.Input
                }], password: [{
                    type: i0.Input
                }], success: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
    BalanceDirective.ɵfac = function BalanceDirective_Factory(t) { return new (t || BalanceDirective)(i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(NgRestoUserService)); };
    BalanceDirective.ɵdir = i0.ɵɵdefineDirective({ type: BalanceDirective, selectors: [["", "appBalance", ""]] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BalanceDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[appBalance]'
                    }]
            }], function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: NgRestoUserService }]; }, null);
    })();

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
    ToggleDishToFavoritesDirective.ɵfac = function ToggleDishToFavoritesDirective_Factory(t) { return new (t || ToggleDishToFavoritesDirective)(i0.ɵɵdirectiveInject(NgRestoUserService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
    ToggleDishToFavoritesDirective.ɵdir = i0.ɵɵdefineDirective({ type: ToggleDishToFavoritesDirective, selectors: [["", "appToggleDishToFavorites", ""]], hostBindings: function ToggleDishToFavoritesDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function ToggleDishToFavoritesDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { dish: "dish" }, outputs: { addedToFavorites: "addedToFavorites", removedFromFavorites: "removedFromFavorites", change: "change", error: "error" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ToggleDishToFavoritesDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[appToggleDishToFavorites]'
                    }]
            }], function () { return [{ type: NgRestoUserService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { dish: [{
                    type: i0.Input
                }], addedToFavorites: [{
                    type: i0.Output
                }], removedFromFavorites: [{
                    type: i0.Output
                }], change: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
                email: this.email
            };
            this.ngRestoUserService
                .updateProfile(data)
                .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
        };
        return UpdateProfileDirective;
    }());
    UpdateProfileDirective.ɵfac = function UpdateProfileDirective_Factory(t) { return new (t || UpdateProfileDirective)(i0.ɵɵdirectiveInject(NgRestoUserService)); };
    UpdateProfileDirective.ɵdir = i0.ɵɵdefineDirective({ type: UpdateProfileDirective, selectors: [["", "appUpdateProfile", ""]], hostBindings: function UpdateProfileDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function UpdateProfileDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { name: "name", phone: "phone", email: "email" }, outputs: { success: "success", error: "error" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(UpdateProfileDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[appUpdateProfile]'
                    }]
            }], function () { return [{ type: NgRestoUserService }]; }, { name: [{
                    type: i0.Input
                }], phone: [{
                    type: i0.Input
                }], email: [{
                    type: i0.Input
                }], success: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
    AddAddressDirective.ɵfac = function AddAddressDirective_Factory(t) { return new (t || AddAddressDirective)(i0.ɵɵdirectiveInject(NgRestoUserService)); };
    AddAddressDirective.ɵdir = i0.ɵɵdefineDirective({ type: AddAddressDirective, selectors: [["", "appAddAddress", ""]], hostBindings: function AddAddressDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function AddAddressDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { street: "street", home: "home", name: "name", housing: "housing", index: "index", entrance: "entrance", floor: "floor", apartment: "apartment", doorphone: "doorphone" }, outputs: { success: "success", error: "error" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AddAddressDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[appAddAddress]'
                    }]
            }], function () { return [{ type: NgRestoUserService }]; }, { street: [{
                    type: i0.Input
                }], home: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], housing: [{
                    type: i0.Input
                }], index: [{
                    type: i0.Input
                }], entrance: [{
                    type: i0.Input
                }], floor: [{
                    type: i0.Input
                }], apartment: [{
                    type: i0.Input
                }], doorphone: [{
                    type: i0.Input
                }], success: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
    DeleteAddressDirective.ɵfac = function DeleteAddressDirective_Factory(t) { return new (t || DeleteAddressDirective)(i0.ɵɵdirectiveInject(NgRestoUserService)); };
    DeleteAddressDirective.ɵdir = i0.ɵɵdefineDirective({ type: DeleteAddressDirective, selectors: [["", "appDeleteAddress", ""]], hostBindings: function DeleteAddressDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function DeleteAddressDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { address: "address" }, outputs: { success: "success", error: "error" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DeleteAddressDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[appDeleteAddress]'
                    }]
            }], function () { return [{ type: NgRestoUserService }]; }, { address: [{
                    type: i0.Input
                }], success: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
        return NgUserModule;
    }());
    NgUserModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgUserModule });
    NgUserModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgUserModule_Factory(t) { return new (t || NgUserModule)(); }, providers: [], imports: [[]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgUserModule, { declarations: [SignUpDirective,
                SignInDirective,
                SignOutDirective,
                ResetPasswordDirective,
                ResetPasswordCodeDirective,
                BalanceDirective,
                ToggleDishToFavoritesDirective,
                UpdateProfileDirective,
                AddAddressDirective,
                DeleteAddressDirective], exports: [SignUpDirective,
                SignInDirective,
                SignOutDirective,
                ResetPasswordDirective,
                ResetPasswordCodeDirective,
                BalanceDirective,
                ToggleDishToFavoritesDirective,
                UpdateProfileDirective,
                AddAddressDirective,
                DeleteAddressDirective] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NgUserModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [],
                        providers: [],
                        declarations: __spread(DIRECTIVES),
                        exports: __spread(DIRECTIVES)
                    }]
            }], null, null);
    })();

    var AuthInterceptor = /** @class */ (function () {
        function AuthInterceptor(userService) {
            this.userService = userService;
        }
        AuthInterceptor.prototype.intercept = function (req, next) {
            console.info('AuthInterceptor', req);
            // Get the auth token from the service.
            var authToken = this.userService.getAuthToken();
            if (authToken) {
                // Clone the request and replace the original headers with
                // cloned headers, updated with the authorization.
                var authReq = req.clone({
                    headers: req.headers.set('Authorization', "JWT " + authToken)
                });
                // send cloned request with header to the next handler.
                return next.handle(authReq);
            }
            return next.handle(req);
        };
        return AuthInterceptor;
    }());
    AuthInterceptor.ɵfac = function AuthInterceptor_Factory(t) { return new (t || AuthInterceptor)(i0.ɵɵinject(NgRestoUserService)); };
    AuthInterceptor.ɵprov = i0.ɵɵdefineInjectable({ token: AuthInterceptor, factory: AuthInterceptor.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AuthInterceptor, [{
                type: i0.Injectable
            }], function () { return [{ type: NgRestoUserService }]; }, null);
    })();

    var ngUserHttpInterceptorProviders = [
        { provide: http.HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ];

    /*
     * Public API Surface of ng-user
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AddAddressDirective = AddAddressDirective;
    exports.AuthInterceptor = AuthInterceptor;
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
    exports.ngUserHttpInterceptorProviders = ngUserHttpInterceptorProviders;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=webresto-ng-user.umd.js.map
