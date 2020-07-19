/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventerService, EventMessage, NetService } from '@webresto/ng-core';
import * as i0 from "@angular/core";
import * as i1 from "@webresto/ng-core";
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
        this.historyTransactions = new BehaviorSubject([]);
        this.bonusSystems = new BehaviorSubject([]);
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
        if (rememberMe === void 0) { rememberMe = false; }
        this.rememberMe = rememberMe;
        return this.net.post('/signin', data)
            .pipe(tap(function (result) {
            _this.setAuthToken(result.token, false);
            _this.user.next(result.user);
            _this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Успешно авторизирован'));
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (result) {
            _this.user.next(result);
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (historyItems) {
            _this.historyItems.next(historyItems);
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
        if (bonusSystem === void 0) { bonusSystem = "local"; }
        if (limit === void 0) { limit = 15; }
        if (set === void 0) { set = 0; }
        return this.net.get("/bonus/transactions?bonussystem=" + bonusSystem + "&limit=" + limit + "&number=" + set)
            .pipe(tap(function (transactions) {
            _this.historyTransactions.next(transactions);
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (result) {
            _this.user.next(result);
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (addresses) {
            _this.addresses.next(addresses);
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (addresses) {
            _this.addresses.next(addresses);
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (addresses) {
            _this.addresses.next(addresses);
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (result) {
            //this.setAuthToken(result.token, false);
            //this.user.next(result.user);
            _this.eventer.emitMessageEvent(new EventMessage('success', 'Регистрация', 'Ваш пароль был отправлен на указанный номер телефона'));
        }, function (error) {
            _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error));
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
            .pipe(tap(function (result) {
            _this.bonusSystems.next(result);
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (result) {
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (result) {
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (result) {
            console.info('getFavorites result', result);
            _this.favorites.next(result);
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (result) {
            /** @type {?} */
            var favoritesUpdated = _this.favorites.getValue();
            favoritesUpdated.push(dish);
            _this.favorites.next(favoritesUpdated);
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
            .pipe(tap(function (result) {
            console.info('Было=>>>', _this.favorites.getValue().length);
            /** @type {?} */
            var favoritesUpdated = _this.favorites
                .getValue()
                .filter(function (item) { return item.id != dish.id; });
            console.info('Стало=>>>', favoritesUpdated.length);
            _this.favorites.next(favoritesUpdated);
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
    /** @nocollapse */ NgRestoUserService.ngInjectableDef = i0.defineInjectable({ factory: function NgRestoUserService_Factory() { return new NgRestoUserService(i0.inject(i1.NetService), i0.inject(i1.EventerService)); }, token: NgRestoUserService, providedIn: "root" });
    return NgRestoUserService;
}());
export { NgRestoUserService };
if (false) {
    /** @type {?} */
    NgRestoUserService.prototype.authToken;
    /** @type {?} */
    NgRestoUserService.prototype.rememberMe;
    /** @type {?} */
    NgRestoUserService.prototype.historyTransactions;
    /** @type {?} */
    NgRestoUserService.prototype.user;
    /** @type {?} */
    NgRestoUserService.prototype.isLoggedIn;
    /** @type {?} */
    NgRestoUserService.prototype.favorites;
    /** @type {?} */
    NgRestoUserService.prototype.addresses;
    /** @type {?} */
    NgRestoUserService.prototype.streets;
    /** @type {?} */
    NgRestoUserService.prototype.historyItems;
    /** @type {?} */
    NgRestoUserService.prototype.bonusSystems;
    /** @type {?} */
    NgRestoUserService.prototype.net;
    /** @type {?} */
    NgRestoUserService.prototype.eventer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVzdG8tdXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE9BQU8sRUFBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7O0lBa0JyRSxhQUFhLEdBQUcsV0FBVztBQUVqQztJQWdCRSw0QkFFVSxHQUFjLEVBQ2QsT0FBc0I7UUFIaEMsaUJBdUNDO1FBckNTLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBYnhCLGVBQVUsR0FBVyxLQUFLLENBQUM7UUFlakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBUSxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRW5E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cUNBQXVDOztJQUN2QywwQ0FBNEM7O0lBQzVDLDBDQUE2Qzs7SUFJM0MsaUNBQXNCOztJQUN0QixxQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtFdmVudGVyU2VydmljZSwgRXZlbnRNZXNzYWdlLCBOZXRTZXJ2aWNlfSBmcm9tICdAd2VicmVzdG8vbmctY29yZSc7XG5cbmltcG9ydCB7U2lnbkluUmVxdWVzdERhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHtTaWduVXBSZXF1ZXN0RGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLXVwLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQge1Jlc2V0UGFzc3dvcmRSZXF1ZXN0RGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHtSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLWNvZGUtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7QWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvYWRkLWRpc2gtdG8tZmF2b3JpdGVzLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQge1JlbW92ZURpc2hGcm9tRmF2b3JpdGVzUmVxdWVzdERhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVtb3ZlLWRpc2gtZnJvbS1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7U2lnbkluUmVzcG9uc2VEYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24taW4tcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQge1NpZ25VcFJlc3BvbnNlRGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLXVwLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHtSZXNldFBhc3N3b3JkUmVzcG9uc2VEYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHtSZXNldFBhc3N3b3JkQ29kZVJlc3BvbnNlRGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHtVcGRhdGVQcm9maWxlUmVzcG9uc2VEYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VwZGF0ZS1wcm9maWxlLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHtVcGRhdGVQcm9maWxlUmVxdWVzdERhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvdXBkYXRlLXByb2ZpbGUtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7QWRkcmVzcywgVXNlcn0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge1JlbW92ZUFkZHJlc3NSZXF1ZXN0RGF0YX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcmVtb3ZlLWFkZHJlc3MtcmVxdWVzdC1kYXRhXCI7XG5pbXBvcnQge0FkZEFkZHJlc3NSZXF1ZXN0RGF0YX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYWRkLWFkZHJlc3MtcmVxdWVzdC1kYXRhXCI7XG5cbmNvbnN0IExTX1RPS0VOX05BTUUgPSAnZ2Y6dGtuOnYyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdSZXN0b1VzZXJTZXJ2aWNlIHtcblxuICBwcml2YXRlIGF1dGhUb2tlbjogc3RyaW5nO1xuICBwcml2YXRlIHJlbWVtYmVyTWU6Ym9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGhpc3RvcnlUcmFuc2FjdGlvbnM6IEJlaGF2aW9yU3ViamVjdDxhbnlbXT47XG4gIHByaXZhdGUgdXNlcjpCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgcHJpdmF0ZSBpc0xvZ2dlZEluOkJlaGF2aW9yU3ViamVjdDxib29sZWFuPjtcbiAgcHJpdmF0ZSBmYXZvcml0ZXM6QmVoYXZpb3JTdWJqZWN0PGFueVtdPjtcbiAgcHJpdmF0ZSBhZGRyZXNzZXM6QmVoYXZpb3JTdWJqZWN0PEFkZHJlc3NbXT47XG4gIHByaXZhdGUgc3RyZWV0czpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xuICBwcml2YXRlIGhpc3RvcnlJdGVtczpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xuICBwcml2YXRlIGJvbnVzU3lzdGVtczogQmVoYXZpb3JTdWJqZWN0PGFueVtdPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAvL3ByaXZhdGUgcmVzdG9TdG9yYWdlU2VydmljZTpSZXN0b1N0b3JhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgbmV0Ok5ldFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBldmVudGVyOkV2ZW50ZXJTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMudXNlciA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pO1xuICAgIHRoaXMuaXNMb2dnZWRJbiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICAgIHRoaXMuZmF2b3JpdGVzID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgdGhpcy5hZGRyZXNzZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgICB0aGlzLmhpc3RvcnlJdGVtcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMuaGlzdG9yeVRyYW5zYWN0aW9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcbiAgICB0aGlzLmJvbnVzU3lzdGVtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcblxuICAgIHRoaXMuYXV0aFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTFNfVE9LRU5fTkFNRSk7XG4gICAgaWYodGhpcy5hdXRoVG9rZW4pIHtcbiAgICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuaXNMb2dnZWRJbi5zdWJzY3JpYmUoaXNMb2dnZWRJbiA9PiB7XG4gICAgICBpZihpc0xvZ2dlZEluKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0RmF2b3JpdGVzKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRQcm9maWxlKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRBZGRyZXNzZXMoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmdldEJvbnVzZXMoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmdldEhpc3RvcnkoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZXZlbnRlclxuICAgICAgLmdldE1lc3NhZ2VFbWl0dGVyKClcbiAgICAgIC5zdWJzY3JpYmUobWVzc2FnZSA9PiB7XG4gICAgICAgIHN3aXRjaChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwiVW5hdXRob3JpemVkXCI6XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUF1dGhUb2tlbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgc2lnbkluKGRhdGE6U2lnbkluUmVxdWVzdERhdGEsIHJlbWVtYmVyTWU6Ym9vbGVhbiA9IGZhbHNlKSB7XG5cbiAgICB0aGlzLnJlbWVtYmVyTWUgPSByZW1lbWJlck1lO1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9zaWduaW4nLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBTaWduSW5SZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnVzZXIubmV4dChyZXN1bHQudXNlcik7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ9Cj0YHQv9C10YUnLCAn0KPRgdC/0LXRiNC90L4g0LDQstGC0L7RgNC40LfQuNGA0L7QstCw0L0nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgfVxuXG4gIGdldFByb2ZpbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L3VzZXItaW5mbycpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFVzZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgZ2V0SGlzdG9yeSgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0KCcvdXNlci9nZXQvaGlzdG9yeScpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChoaXN0b3J5SXRlbXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeUl0ZW1zLm5leHQoaGlzdG9yeUl0ZW1zKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBnZXRIaXN0b3J5VHJhbnNhY3Rpb25zKGJvbnVzU3lzdGVtOiBzdHJpbmc9IFwibG9jYWxcIiwgbGltaXQ6IG51bWJlciA9IDE1LCBzZXQ6IG51bWJlciA9IDApIHtcbiAgICAgcmV0dXJuIHRoaXMubmV0LmdldChgL2JvbnVzL3RyYW5zYWN0aW9ucz9ib251c3N5c3RlbT0ke2JvbnVzU3lzdGVtfSZsaW1pdD0ke2xpbWl0fSZudW1iZXI9JHtzZXR9YClcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHRyYW5zYWN0aW9ucykgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5VHJhbnNhY3Rpb25zLm5leHQodHJhbnNhY3Rpb25zKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVQcm9maWxlKGRhdGE6VXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL3NldC91c2VyLWluZm8nLCB7XG4gICAgICB1c2VyOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogVXBkYXRlUHJvZmlsZVJlc3BvbnNlRGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gIH1cblxuICBnZXRBZGRyZXNzZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2xvY2F0aW9uJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgYWRkQWRkcmVzcyhhZGRyZXNzOiBBZGRBZGRyZXNzUmVxdWVzdERhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvYWRkL2xvY2F0aW9uJywgYWRkcmVzcylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgZGVsZXRlQWRkcmVzcyhhZGRyZXNzOiBBZGRyZXNzKSB7XG5cbiAgICB2YXIgcmVxQm9keTogUmVtb3ZlQWRkcmVzc1JlcXVlc3REYXRhID0ge1xuICAgICAgaWQ6IGFkZHJlc3MuaWQsXG4gICAgICBzdHJlZXQ6IGFkZHJlc3Muc3RyZWV0LFxuICAgICAgaG9tZTogYWRkcmVzcy5ob21lXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9yZW1vdmUvbG9jYXRpb24nLCByZXFCb2R5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAoYWRkcmVzc2VzOiBBZGRyZXNzW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc2VzLm5leHQoYWRkcmVzc2VzKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBzaWduVXAoZGF0YTpTaWduVXBSZXF1ZXN0RGF0YSkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvc2lnbnVwJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogU2lnblVwUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIC8vdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICAvL3RoaXMudXNlci5uZXh0KHJlc3VsdC51c2VyKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAn0KDQtdCz0LjRgdGC0YDQsNGG0LjRjycsICfQktCw0Ygg0L/QsNGA0L7Qu9GMINCx0YvQuyDQvtGC0L/RgNCw0LLQu9C10L0g0L3QsCDRg9C60LDQt9Cw0L3QvdGL0Lkg0L3QvtC80LXRgCDRgtC10LvQtdGE0L7QvdCwJylcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4geyB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgICl9XG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBzaWduT3V0KCkge1xuICAgIHJldHVybiB0aGlzLmRlbGV0ZUF1dGhUb2tlbigpO1xuICB9XG5cblxuICBnZXRCb251c2VzKCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvYm9udXMvZ2V0Jywge30pXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ib251c1N5c3RlbXMubmV4dChyZXN1bHQpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHJlc2V0UGFzc3dvcmQoZGF0YTpSZXNldFBhc3N3b3JkUmVxdWVzdERhdGEpIHtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvcmVzZXQnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBSZXNldFBhc3N3b3JkUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICByZXNldFBhc3N3b3JkQ29kZShkYXRhOlJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEpIHtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvY29kZScsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFJlc2V0UGFzc3dvcmRDb2RlUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuXG4gIGdldEZhdm9yaXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0KCcvdXNlci9nZXQvZmF2b3JpdGVzICcpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ2dldEZhdm9yaXRlcyByZXN1bHQnLCByZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXMubmV4dChyZXN1bHQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBhZGREaXNoVG9GYXZvcml0ZXMoZGlzaDphbnkpIHtcbiAgICBsZXQgZGF0YTpBZGREaXNoVG9GYXZvcml0ZXNSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIGRpc2hJZDogZGlzaC5pZFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL2FkZC9mYXZvcml0ZXMgJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgZmF2b3JpdGVzVXBkYXRlZDogYW55W10gPSB0aGlzLmZhdm9yaXRlcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgZmF2b3JpdGVzVXBkYXRlZC5wdXNoKGRpc2gpO1xuXG4gICAgICAgICAgICB0aGlzLmZhdm9yaXRlcy5uZXh0KGZhdm9yaXRlc1VwZGF0ZWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUZhdm9yaXRlcyhkaXNoOmFueSkge1xuICAgIGxldCBkYXRhOlJlbW92ZURpc2hGcm9tRmF2b3JpdGVzUmVxdWVzdERhdGEgPSB7XG4gICAgICBkaXNoSWQ6IGRpc2guaWRcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9yZW1vdmUvZmF2b3JpdGVzICcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCfQkdGL0LvQvj0+Pj4nLCB0aGlzLmZhdm9yaXRlcy5nZXRWYWx1ZSgpLmxlbmd0aCk7XG4gICAgICAgICAgICBsZXQgZmF2b3JpdGVzVXBkYXRlZDogYW55W10gPSB0aGlzLmZhdm9yaXRlc1xuICAgICAgICAgICAgICAuZ2V0VmFsdWUoKVxuICAgICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCAhPSBkaXNoLmlkKTtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygn0KHRgtCw0LvQvj0+Pj4nLCBmYXZvcml0ZXNVcGRhdGVkLmxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLmZhdm9yaXRlcy5uZXh0KGZhdm9yaXRlc1VwZGF0ZWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICB1c2VyUHJvZmlsZSgpOkJlaGF2aW9yU3ViamVjdDxVc2VyPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlcjtcbiAgfVxuXG4gIHVzZXJJc0xvZ2dlZEluKCk6QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pc0xvZ2dlZEluO1xuICB9XG5cbiAgdXNlckZhdm9yaXRlcygpOkJlaGF2aW9yU3ViamVjdDxhbnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmZhdm9yaXRlcztcbiAgfVxuXG4gIHVzZXJBZGRyZXNzZXMoKTpCZWhhdmlvclN1YmplY3Q8QWRkcmVzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRkcmVzc2VzO1xuICB9XG5cbiAgdXNlckhpc3RvcnkoKTpCZWhhdmlvclN1YmplY3Q8YW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5SXRlbXM7XG4gIH1cbiAgdXNlclRyYW5zYWN0aW9uc0hpc3RvcnkoKTpCZWhhdmlvclN1YmplY3Q8YW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5VHJhbnNhY3Rpb25zO1xuICB9XG5cblxuICBnZXRBdXRoVG9rZW4oKTpzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmF1dGhUb2tlbjtcbiAgfVxuXG4gIHNldEF1dGhUb2tlbihhdXRoVG9rZW46IHN0cmluZywgdXBkYXRlUHJvZmlsZTogYm9vbGVhbiA9IHRydWUpOnZvaWQge1xuICAgIGlmKHRoaXMucmVtZW1iZXJNZSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTFNfVE9LRU5fTkFNRSwgYXV0aFRva2VuKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdnZjpsb2dpbjpwaG9uZScpO1xuICAgIH1cbiAgICB0aGlzLmF1dGhUb2tlbiA9IGF1dGhUb2tlbjtcbiAgICB0aGlzLmlzTG9nZ2VkSW4ubmV4dCh0cnVlKTtcblxuICAgIC8qaWYodXBkYXRlUHJvZmlsZSkge1xuICAgICAgdGhpcy5nZXRQcm9maWxlKCkuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmdldEZhdm9yaXRlcygpLnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5nZXRBZGRyZXNzZXMoKS5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuZ2V0SGlzdG9yeSgpLnN1YnNjcmliZSgpO1xuICAgIH0qL1xuICB9XG5cbiAgZGVsZXRlQXV0aFRva2VuKCk6dm9pZCB7XG4gICAgdGhpcy5hdXRoVG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oTFNfVE9LRU5fTkFNRSk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2dmOmxvZ2luOnBob25lJyk7XG4gICAgdGhpcy5pc0xvZ2dlZEluLm5leHQoZmFsc2UpO1xuICB9XG5cbn1cbiJdfQ==