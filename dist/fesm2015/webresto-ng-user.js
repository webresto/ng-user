import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, EventEmitter, ɵɵdirectiveInject, ɵɵdefineDirective, ɵɵlistener, Directive, Input, Output, HostListener, Renderer2, ElementRef, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { NetService, EventerService } from '@webresto/ng-core';

const LS_TOKEN_NAME = 'gf:tkn:v2';
class NgRestoUserService {
    constructor(
    //private restoStorageService:RestoStorageService,
    net, eventer) {
        this.net = net;
        this.eventer = eventer;
        this.authToken = localStorage.getItem(LS_TOKEN_NAME);
        this.rememberMe = false;
        this.user = new BehaviorSubject({});
        this.isLoggedIn = new BehaviorSubject(this.authToken ? true : false);
        this.favorites = new BehaviorSubject([]);
        this.addresses = new BehaviorSubject([]);
        this.historyItems = new BehaviorSubject([]);
        this.historyTransactions = new BehaviorSubject([]);
        this.bonusSystems = new BehaviorSubject([]);
        this.isLoggedSubscription = this.isLoggedIn.pipe(filter(isLoggedIn => isLoggedIn === true), switchMap(() => this.getFavorites()), switchMap(() => this.getProfile()), switchMap(() => this.getAddresses()), switchMap(() => this.getBonuses()), switchMap(() => this.getHistory())).subscribe(() => { }, () => { }, () => this.isLoggedSubscription.unsubscribe());
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
        return this.net.get('/user/get/user-info').pipe(tap((result) => {
            this.user.next(result);
        }, () => { }));
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
            this.user.next(result);
        }, () => { }));
    }
    getAddresses() {
        return this.net.get('/user/get/location').pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, () => { }));
    }
    addAddress(address) {
        return this.net.post('/user/add/location', address).pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, () => { }));
    }
    deleteAddress(address) {
        var reqBody = {
            id: address.id,
            street: address.street,
            home: address.home
        };
        return this.net.post('/user/remove/location', reqBody).pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, () => { }));
    }
    signUp(data) {
        return this.net.post('/signup', data).pipe(tap((result) => {
            //this.setAuthToken(result.token, false);
            //this.user.next(result.user);
        }, () => { }));
    }
    signOut() {
        return this.deleteAuthToken();
    }
    getBonuses() {
        return this.net.post('/bonus/get', {}).pipe(tap(result => this.bonusSystems.next(result), () => { }));
    }
    resetPassword(data) {
        return this.net.post('/reset', data).pipe(tap(() => { }, () => { }));
    }
    resetPasswordCode(data) {
        return this.net.post('/code', data).pipe(tap(() => { }, () => { }));
    }
    getFavorites() {
        return this.net.get('/user/get/favorites').pipe(tap(result => {
            console.info('getFavorites result', result);
            this.favorites.next(result);
        }, () => { }));
    }
    addDishToFavorites(dish) {
        let data = {
            dishId: dish.id
        };
        return this.net.post('/user/add/favorites ', data).pipe(tap(result => {
            let favoritesUpdated = this.favorites.getValue();
            favoritesUpdated.push(dish);
            this.favorites.next(result);
        }, () => { }));
    }
    removeDishFromFavorites(dish) {
        let data = {
            dishId: dish.id
        };
        return this.net.post('/user/remove/favorites ', data).pipe(tap((result) => {
            console.info('Было=>>>', this.favorites.getValue().length);
            let favoritesUpdated = this.favorites
                .getValue()
                .filter(item => item.id != dish.id);
            console.info('Стало=>>>', favoritesUpdated.length);
            this.favorites.next(result);
        }, () => { }));
    }
    userProfile() {
        return this.user;
    }
    userIsLoggedIn() {
        return this.isLoggedIn;
    }
    userFavorites() {
        return this.favorites.pipe();
    }
    userAddresses() {
        return this.addresses.pipe();
    }
    userHistory() {
        return this.historyItems.pipe();
    }
    userTransactionsHistory() {
        return this.historyTransactions.pipe();
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
NgRestoUserService.ɵfac = function NgRestoUserService_Factory(t) { return new (t || NgRestoUserService)(ɵɵinject(NetService), ɵɵinject(EventerService)); };
NgRestoUserService.ɵprov = ɵɵdefineInjectable({ token: NgRestoUserService, factory: NgRestoUserService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgRestoUserService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: NetService }, { type: EventerService }]; }, null); })();

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
SignUpDirective.ɵfac = function SignUpDirective_Factory(t) { return new (t || SignUpDirective)(ɵɵdirectiveInject(NgRestoUserService)); };
SignUpDirective.ɵdir = ɵɵdefineDirective({ type: SignUpDirective, selectors: [["", "appSignUp", ""]], hostBindings: function SignUpDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function SignUpDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { name: "name", phone: "phone", email: "email", password: "password", captcha: "captcha" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SignUpDirective, [{
        type: Directive,
        args: [{
                selector: '[appSignUp]'
            }]
    }], function () { return [{ type: NgRestoUserService }]; }, { name: [{
            type: Input
        }], phone: [{
            type: Input
        }], email: [{
            type: Input
        }], password: [{
            type: Input
        }], captcha: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

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
SignInDirective.ɵfac = function SignInDirective_Factory(t) { return new (t || SignInDirective)(ɵɵdirectiveInject(NgRestoUserService)); };
SignInDirective.ɵdir = ɵɵdefineDirective({ type: SignInDirective, selectors: [["", "appSignIn", ""]], hostBindings: function SignInDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function SignInDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { phone: "phone", password: "password", captcha: "captcha", rememberMe: "rememberMe" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SignInDirective, [{
        type: Directive,
        args: [{
                selector: '[appSignIn]'
            }]
    }], function () { return [{ type: NgRestoUserService }]; }, { phone: [{
            type: Input
        }], password: [{
            type: Input
        }], captcha: [{
            type: Input
        }], rememberMe: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

class SignOutDirective {
    constructor(ngRestoUserService) {
        this.ngRestoUserService = ngRestoUserService;
    }
    onClick() {
        this.ngRestoUserService.signOut();
    }
}
SignOutDirective.ɵfac = function SignOutDirective_Factory(t) { return new (t || SignOutDirective)(ɵɵdirectiveInject(NgRestoUserService)); };
SignOutDirective.ɵdir = ɵɵdefineDirective({ type: SignOutDirective, selectors: [["", "appSignOut", ""]], hostBindings: function SignOutDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function SignOutDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SignOutDirective, [{
        type: Directive,
        args: [{
                selector: '[appSignOut]'
            }]
    }], function () { return [{ type: NgRestoUserService }]; }, { onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

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
ResetPasswordDirective.ɵfac = function ResetPasswordDirective_Factory(t) { return new (t || ResetPasswordDirective)(ɵɵdirectiveInject(NgRestoUserService)); };
ResetPasswordDirective.ɵdir = ɵɵdefineDirective({ type: ResetPasswordDirective, selectors: [["", "appResetPassword", ""]], hostBindings: function ResetPasswordDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function ResetPasswordDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { phone: "phone", captcha: "captcha" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResetPasswordDirective, [{
        type: Directive,
        args: [{
                selector: '[appResetPassword]'
            }]
    }], function () { return [{ type: NgRestoUserService }]; }, { phone: [{
            type: Input
        }], captcha: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

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
ResetPasswordCodeDirective.ɵfac = function ResetPasswordCodeDirective_Factory(t) { return new (t || ResetPasswordCodeDirective)(ɵɵdirectiveInject(NgRestoUserService)); };
ResetPasswordCodeDirective.ɵdir = ɵɵdefineDirective({ type: ResetPasswordCodeDirective, selectors: [["", "appResetPasswordCode", ""]], hostBindings: function ResetPasswordCodeDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function ResetPasswordCodeDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { userId: "userId", code: "code", password: "password" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResetPasswordCodeDirective, [{
        type: Directive,
        args: [{
                selector: '[appResetPasswordCode]'
            }]
    }], function () { return [{ type: NgRestoUserService }]; }, { userId: [{
            type: Input
        }], code: [{
            type: Input
        }], password: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

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
BalanceDirective.ɵfac = function BalanceDirective_Factory(t) { return new (t || BalanceDirective)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgRestoUserService)); };
BalanceDirective.ɵdir = ɵɵdefineDirective({ type: BalanceDirective, selectors: [["", "appBalance", ""]] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BalanceDirective, [{
        type: Directive,
        args: [{
                selector: '[appBalance]'
            }]
    }], function () { return [{ type: Renderer2 }, { type: ElementRef }, { type: NgRestoUserService }]; }, null); })();

class ToggleDishToFavoritesDirective {
    constructor(ngRestoUserService, element, renderer) {
        this.ngRestoUserService = ngRestoUserService;
        this.element = element;
        this.renderer = renderer;
        this.addedToFavorites = new EventEmitter();
        this.removedFromFavorites = new EventEmitter();
        this.change = new EventEmitter();
        this.error = new EventEmitter();
    }
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
            this.addedToFavorites.emit();
            this.change.emit(true);
            this.renderer.addClass(this.element.nativeElement, 'selected');
        }, error => this.error.emit(error));
    }
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
ToggleDishToFavoritesDirective.ɵfac = function ToggleDishToFavoritesDirective_Factory(t) { return new (t || ToggleDishToFavoritesDirective)(ɵɵdirectiveInject(NgRestoUserService), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2)); };
ToggleDishToFavoritesDirective.ɵdir = ɵɵdefineDirective({ type: ToggleDishToFavoritesDirective, selectors: [["", "appToggleDishToFavorites", ""]], hostBindings: function ToggleDishToFavoritesDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function ToggleDishToFavoritesDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { dish: "dish" }, outputs: { addedToFavorites: "addedToFavorites", removedFromFavorites: "removedFromFavorites", change: "change", error: "error" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ToggleDishToFavoritesDirective, [{
        type: Directive,
        args: [{
                selector: '[appToggleDishToFavorites]'
            }]
    }], function () { return [{ type: NgRestoUserService }, { type: ElementRef }, { type: Renderer2 }]; }, { dish: [{
            type: Input
        }], addedToFavorites: [{
            type: Output
        }], removedFromFavorites: [{
            type: Output
        }], change: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

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
            birthday: this.birthday
        };
        this.ngRestoUserService
            .updateProfile(data)
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
}
UpdateProfileDirective.ɵfac = function UpdateProfileDirective_Factory(t) { return new (t || UpdateProfileDirective)(ɵɵdirectiveInject(NgRestoUserService)); };
UpdateProfileDirective.ɵdir = ɵɵdefineDirective({ type: UpdateProfileDirective, selectors: [["", "appUpdateProfile", ""]], hostBindings: function UpdateProfileDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function UpdateProfileDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { name: "name", phone: "phone", email: "email", additionalInfo: "additionalInfo", birthday: "birthday" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(UpdateProfileDirective, [{
        type: Directive,
        args: [{
                selector: '[appUpdateProfile]'
            }]
    }], function () { return [{ type: NgRestoUserService }]; }, { name: [{
            type: Input
        }], phone: [{
            type: Input
        }], email: [{
            type: Input
        }], additionalInfo: [{
            type: Input
        }], birthday: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

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
        if (!this.home) {
            this.error.emit('Необходимо указать номер дома');
            return;
        }
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
AddAddressDirective.ɵfac = function AddAddressDirective_Factory(t) { return new (t || AddAddressDirective)(ɵɵdirectiveInject(NgRestoUserService)); };
AddAddressDirective.ɵdir = ɵɵdefineDirective({ type: AddAddressDirective, selectors: [["", "appAddAddress", ""]], hostBindings: function AddAddressDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function AddAddressDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { street: "street", home: "home", name: "name", housing: "housing", index: "index", entrance: "entrance", floor: "floor", apartment: "apartment", doorphone: "doorphone" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AddAddressDirective, [{
        type: Directive,
        args: [{
                selector: '[appAddAddress]'
            }]
    }], function () { return [{ type: NgRestoUserService }]; }, { street: [{
            type: Input
        }], home: [{
            type: Input
        }], name: [{
            type: Input
        }], housing: [{
            type: Input
        }], index: [{
            type: Input
        }], entrance: [{
            type: Input
        }], floor: [{
            type: Input
        }], apartment: [{
            type: Input
        }], doorphone: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

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
DeleteAddressDirective.ɵfac = function DeleteAddressDirective_Factory(t) { return new (t || DeleteAddressDirective)(ɵɵdirectiveInject(NgRestoUserService)); };
DeleteAddressDirective.ɵdir = ɵɵdefineDirective({ type: DeleteAddressDirective, selectors: [["", "appDeleteAddress", ""]], hostBindings: function DeleteAddressDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function DeleteAddressDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { address: "address" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(DeleteAddressDirective, [{
        type: Directive,
        args: [{
                selector: '[appDeleteAddress]'
            }]
    }], function () { return [{ type: NgRestoUserService }]; }, { address: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

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
NgUserModule.ɵmod = ɵɵdefineNgModule({ type: NgUserModule });
NgUserModule.ɵinj = ɵɵdefineInjector({ factory: function NgUserModule_Factory(t) { return new (t || NgUserModule)(); }, providers: [], imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgUserModule, { declarations: [SignUpDirective,
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
        DeleteAddressDirective] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgUserModule, [{
        type: NgModule,
        args: [{
                imports: [],
                providers: [],
                declarations: [...DIRECTIVES],
                exports: [...DIRECTIVES]
            }]
    }], null, null); })();

/*
 * Public API Surface of ng-user
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AddAddressDirective, BalanceDirective, DeleteAddressDirective, NgRestoUserService, NgUserModule, ResetPasswordCodeDirective, ResetPasswordDirective, SignInDirective, SignOutDirective, SignUpDirective, ToggleDishToFavoritesDirective, UpdateProfileDirective };
//# sourceMappingURL=webresto-ng-user.js.map
