/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
import * as i0 from "@angular/core";
import * as i1 from "@webresto/ng-core";
/** @type {?} */
var LS_TOKEN_NAME = 'ghtke';
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
        this.isLoggedIn.subscribe(function (isLoggedIn) {
            if (isLoggedIn) {
                setTimeout(function () {
                    _this.getFavorites().subscribe();
                    _this.getProfile().subscribe();
                    _this.getAddresses().subscribe();
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
            _this.setAuthToken(result.token, false);
            _this.user.next(result.user);
            _this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Успешно зарегистирован'));
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
        this.isLoggedIn.next(false);
    };
    NgRestoUserService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
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
    NgRestoUserService.prototype.net;
    /** @type {?} */
    NgRestoUserService.prototype.eventer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVzdG8tdXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFDTCxVQUFVLEVBQ1YsY0FBYyxFQUNkLFlBQVksRUFDYixNQUFNLG1CQUFtQixDQUFDOzs7O0FBdUIzQixJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUM7O0lBZ0I1Qiw0QkFFVSxLQUNBO1FBSFYsaUJBb0NDO1FBbENTLFFBQUcsR0FBSCxHQUFHO1FBQ0gsWUFBTyxHQUFQLE9BQU87MEJBWFksS0FBSztRQWFoQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtR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QixFQUFFLGFBQTZCO1FBQTdCLDhCQUFBLEVBQUEsb0JBQTZCO1FBQzNELElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQixZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNoRDtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0tBUTVCOzs7O0lBRUQsNENBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3Qjs7Z0JBOVVGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBOUJDLFVBQVU7Z0JBQ1YsY0FBYzs7OzZCQU5oQjs7U0FvQ2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIE5ldFNlcnZpY2UsXG4gIEV2ZW50ZXJTZXJ2aWNlLFxuICBFdmVudE1lc3NhZ2Vcbn0gZnJvbSAnQHdlYnJlc3RvL25nLWNvcmUnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgU2lnblVwUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLWNvZGUtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IEFkZERpc2hUb0Zhdm9yaXRlc1JlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hZGQtZGlzaC10by1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlbW92ZURpc2hGcm9tRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbW92ZS1kaXNoLWZyb20tZmF2b3JpdGVzLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBQcm9maWxlUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9wcm9maWxlLXJlc3BvbnNlLWRhdGEnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24taW4tcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBTaWduVXBSZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZVJlc3BvbnNlRGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXBkYXRlLXByb2ZpbGUtcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VwZGF0ZS1wcm9maWxlLXJlcXVlc3QtZGF0YSc7XG5cblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXNlcic7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYWRkcmVzc1wiO1xuaW1wb3J0IHsgUmVtb3ZlQWRkcmVzc1JlcXVlc3REYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcmVtb3ZlLWFkZHJlc3MtcmVxdWVzdC1kYXRhXCI7XG5pbXBvcnQge0FkZEFkZHJlc3NSZXF1ZXN0RGF0YX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYWRkLWFkZHJlc3MtcmVxdWVzdC1kYXRhXCI7XG5cbmNvbnN0IExTX1RPS0VOX05BTUUgPSAnZ2h0a2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvVXNlclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgYXV0aFRva2VuOnN0cmluZztcbiAgcHJpdmF0ZSByZW1lbWJlck1lOmJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB1c2VyOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBwcml2YXRlIGlzTG9nZ2VkSW46QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xuICBwcml2YXRlIGZhdm9yaXRlczpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xuICBwcml2YXRlIGFkZHJlc3NlczpCZWhhdmlvclN1YmplY3Q8QWRkcmVzc1tdPjtcbiAgcHJpdmF0ZSBzdHJlZXRzOkJlaGF2aW9yU3ViamVjdDxhbnlbXT47XG4gIHByaXZhdGUgaGlzdG9yeUl0ZW1zOkJlaGF2aW9yU3ViamVjdDxhbnlbXT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy9wcml2YXRlIHJlc3RvU3RvcmFnZVNlcnZpY2U6UmVzdG9TdG9yYWdlU2VydmljZSxcbiAgICBwcml2YXRlIG5ldDpOZXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLnVzZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgICB0aGlzLmZhdm9yaXRlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMuYWRkcmVzc2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgdGhpcy5oaXN0b3J5SXRlbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcblxuICAgIHRoaXMuYXV0aFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTFNfVE9LRU5fTkFNRSk7XG4gICAgaWYodGhpcy5hdXRoVG9rZW4pIHtcbiAgICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuaXNMb2dnZWRJbi5zdWJzY3JpYmUoaXNMb2dnZWRJbiA9PiB7XG4gICAgICBpZihpc0xvZ2dlZEluKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0RmF2b3JpdGVzKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRQcm9maWxlKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRBZGRyZXNzZXMoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmdldEhpc3RvcnkoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZXZlbnRlclxuICAgICAgLmdldE1lc3NhZ2VFbWl0dGVyKClcbiAgICAgIC5zdWJzY3JpYmUobWVzc2FnZSA9PiB7XG4gICAgICAgIHN3aXRjaChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwiVW5hdXRob3JpemVkXCI6XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUF1dGhUb2tlbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgc2lnbkluKGRhdGE6U2lnbkluUmVxdWVzdERhdGEsIHJlbWVtYmVyTWU6Ym9vbGVhbiA9IGZhbHNlKSB7XG5cbiAgICB0aGlzLnJlbWVtYmVyTWUgPSByZW1lbWJlck1lO1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9zaWduaW4nLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBTaWduSW5SZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnVzZXIubmV4dChyZXN1bHQudXNlcik7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ9Cj0YHQv9C10YUnLCAn0KPRgdC/0LXRiNC90L4g0LDQstGC0L7RgNC40LfQuNGA0L7QstCw0L0nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgfVxuXG4gIGdldFByb2ZpbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L3VzZXItaW5mbycpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFVzZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgZ2V0SGlzdG9yeSgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0KCcvdXNlci9nZXQvaGlzdG9yeScpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChoaXN0b3J5SXRlbXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeUl0ZW1zLm5leHQoaGlzdG9yeUl0ZW1zKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVQcm9maWxlKGRhdGE6VXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL3NldC91c2VyLWluZm8nLCB7XG4gICAgICB1c2VyOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogVXBkYXRlUHJvZmlsZVJlc3BvbnNlRGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gIH1cblxuICBnZXRBZGRyZXNzZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2xvY2F0aW9uJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgYWRkQWRkcmVzcyhhZGRyZXNzOiBBZGRBZGRyZXNzUmVxdWVzdERhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvYWRkL2xvY2F0aW9uJywgYWRkcmVzcylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgZGVsZXRlQWRkcmVzcyhhZGRyZXNzOiBBZGRyZXNzKSB7XG5cbiAgICB2YXIgcmVxQm9keTogUmVtb3ZlQWRkcmVzc1JlcXVlc3REYXRhID0ge1xuICAgICAgaWQ6IGFkZHJlc3MuaWQsXG4gICAgICBzdHJlZXQ6IGFkZHJlc3Muc3RyZWV0LFxuICAgICAgaG9tZTogYWRkcmVzcy5ob21lXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9yZW1vdmUvbG9jYXRpb24nLCByZXFCb2R5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAoYWRkcmVzc2VzOiBBZGRyZXNzW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc2VzLm5leHQoYWRkcmVzc2VzKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBzaWduVXAoZGF0YTpTaWduVXBSZXF1ZXN0RGF0YSkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvc2lnbnVwJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogU2lnblVwUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QXV0aFRva2VuKHJlc3VsdC50b2tlbiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0LnVzZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9Cj0YHQv9C10YjQvdC+INC30LDRgNC10LPQuNGB0YLQuNGA0L7QstCw0L0nKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB7IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKX1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHNpZ25PdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlQXV0aFRva2VuKCk7XG4gIH1cblxuICByZXNldFBhc3N3b3JkKGRhdGE6UmVzZXRQYXNzd29yZFJlcXVlc3REYXRhKSB7XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3Jlc2V0JywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogUmVzZXRQYXNzd29yZFJlc3BvbnNlRGF0YSkgPT4ge1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcmVzZXRQYXNzd29yZENvZGUoZGF0YTpSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhKSB7XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NvZGUnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBSZXNldFBhc3N3b3JkQ29kZVJlc3BvbnNlRGF0YSkgPT4ge1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cblxuICBnZXRGYXZvcml0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2Zhdm9yaXRlcyAnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdnZXRGYXZvcml0ZXMgcmVzdWx0JywgcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgYWRkRGlzaFRvRmF2b3JpdGVzKGRpc2g6YW55KSB7XG4gICAgbGV0IGRhdGE6QWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGEgPSB7XG4gICAgICBkaXNoSWQ6IGRpc2guaWRcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9hZGQvZmF2b3JpdGVzICcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IGZhdm9yaXRlc1VwZGF0ZWQ6IGFueVtdID0gdGhpcy5mYXZvcml0ZXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGZhdm9yaXRlc1VwZGF0ZWQucHVzaChkaXNoKTtcblxuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXMubmV4dChmYXZvcml0ZXNVcGRhdGVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21GYXZvcml0ZXMoZGlzaDphbnkpIHtcbiAgICBsZXQgZGF0YTpSZW1vdmVEaXNoRnJvbUZhdm9yaXRlc1JlcXVlc3REYXRhID0ge1xuICAgICAgZGlzaElkOiBkaXNoLmlkXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvcmVtb3ZlL2Zhdm9yaXRlcyAnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygn0JHRi9C70L49Pj4+JywgdGhpcy5mYXZvcml0ZXMuZ2V0VmFsdWUoKS5sZW5ndGgpO1xuICAgICAgICAgICAgbGV0IGZhdm9yaXRlc1VwZGF0ZWQ6IGFueVtdID0gdGhpcy5mYXZvcml0ZXNcbiAgICAgICAgICAgICAgLmdldFZhbHVlKClcbiAgICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0uaWQgIT0gZGlzaC5pZCk7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ9Ch0YLQsNC70L49Pj4+JywgZmF2b3JpdGVzVXBkYXRlZC5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXMubmV4dChmYXZvcml0ZXNVcGRhdGVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgdXNlclByb2ZpbGUoKTpCZWhhdmlvclN1YmplY3Q8VXNlcj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXI7XG4gIH1cblxuICB1c2VySXNMb2dnZWRJbigpOkJlaGF2aW9yU3ViamVjdDxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNMb2dnZWRJbjtcbiAgfVxuXG4gIHVzZXJGYXZvcml0ZXMoKTpCZWhhdmlvclN1YmplY3Q8YW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5mYXZvcml0ZXM7XG4gIH1cblxuICB1c2VyQWRkcmVzc2VzKCk6QmVoYXZpb3JTdWJqZWN0PEFkZHJlc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmFkZHJlc3NlcztcbiAgfVxuXG4gIHVzZXJIaXN0b3J5KCk6QmVoYXZpb3JTdWJqZWN0PGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeUl0ZW1zO1xuICB9XG5cblxuICBnZXRBdXRoVG9rZW4oKTpzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmF1dGhUb2tlbjtcbiAgfVxuXG4gIHNldEF1dGhUb2tlbihhdXRoVG9rZW46IHN0cmluZywgdXBkYXRlUHJvZmlsZTogYm9vbGVhbiA9IHRydWUpOnZvaWQge1xuICAgIGlmKHRoaXMucmVtZW1iZXJNZSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTFNfVE9LRU5fTkFNRSwgYXV0aFRva2VuKTtcbiAgICB9XG4gICAgdGhpcy5hdXRoVG9rZW4gPSBhdXRoVG9rZW47XG4gICAgdGhpcy5pc0xvZ2dlZEluLm5leHQodHJ1ZSk7XG5cbiAgICAvKmlmKHVwZGF0ZVByb2ZpbGUpIHtcbiAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpLnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5nZXRGYXZvcml0ZXMoKS5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuZ2V0QWRkcmVzc2VzKCkuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmdldEhpc3RvcnkoKS5zdWJzY3JpYmUoKTtcbiAgICB9Ki9cbiAgfVxuXG4gIGRlbGV0ZUF1dGhUb2tlbigpOnZvaWQge1xuICAgIHRoaXMuYXV0aFRva2VuID0gdW5kZWZpbmVkO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKExTX1RPS0VOX05BTUUpO1xuICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KGZhbHNlKTtcbiAgfVxuXG59XG4iXX0=