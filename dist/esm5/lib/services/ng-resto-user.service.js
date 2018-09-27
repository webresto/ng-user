/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NetService, EventerService, EventMessage } from '@sails-resto/ng-core';
import * as i0 from "@angular/core";
import * as i1 from "@sails-resto/ng-core";
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
            .pipe(tap(function (result) {
            _this.user.next(result);
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
        }, function (error) { return _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)); }));
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
    NgRestoUserService.prototype.net;
    /** @type {?} */
    NgRestoUserService.prototype.eventer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVzdG8tdXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNhaWxzLXJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFDTCxVQUFVLEVBQ1YsY0FBYyxFQUNkLFlBQVksRUFDYixNQUFNLHNCQUFzQixDQUFDOzs7O0FBb0I5QixJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUM7O0lBYTVCLDRCQUVVLEtBQ0E7UUFIVixpQkFnQ0M7UUE5QlMsUUFBRyxHQUFILEdBQUc7UUFDSCxZQUFPLEdBQVAsT0FBTzswQkFSWSxLQUFLO1FBVWhDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRCxJQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLFVBQVU7WUFDbEMsSUFBRyxVQUFVLEVBQUU7Z0JBQ2IsVUFBVSxDQUFDO29CQUNULEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FB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RCx5Q0FBWTs7Ozs7SUFBWixVQUFhLFNBQWlCLEVBQUUsYUFBNkI7UUFBN0IsOEJBQUEsRUFBQSxvQkFBNkI7UUFDM0QsSUFBRyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xCLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWhDLElBQUcsYUFBYSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUMvQjtLQUNGOzs7O0lBRUQsNENBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3Qjs7Z0JBelBGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBM0JDLFVBQVU7Z0JBQ1YsY0FBYzs7OzZCQU5oQjs7U0FpQ2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIE5ldFNlcnZpY2UsXG4gIEV2ZW50ZXJTZXJ2aWNlLFxuICBFdmVudE1lc3NhZ2Vcbn0gZnJvbSAnQHNhaWxzLXJlc3RvL25nLWNvcmUnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgU2lnblVwUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLWNvZGUtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IEFkZERpc2hUb0Zhdm9yaXRlc1JlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hZGQtZGlzaC10by1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFJlbW92ZURpc2hGcm9tRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbW92ZS1kaXNoLWZyb20tZmF2b3JpdGVzLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBQcm9maWxlUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9wcm9maWxlLXJlc3BvbnNlLWRhdGEnO1xuXG5pbXBvcnQgeyBTaWduSW5SZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24taW4tcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBTaWduVXBSZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb2RlUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZVJlc3BvbnNlRGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXBkYXRlLXByb2ZpbGUtcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VwZGF0ZS1wcm9maWxlLXJlcXVlc3QtZGF0YSc7XG5cblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXNlcic7XG5cbmNvbnN0IExTX1RPS0VOX05BTUUgPSAnZ2h0a2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvVXNlclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgYXV0aFRva2VuOnN0cmluZztcbiAgcHJpdmF0ZSByZW1lbWJlck1lOmJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB1c2VyOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBwcml2YXRlIGlzTG9nZ2VkSW46QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xuICBwcml2YXRlIGZhdm9yaXRlczpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIC8vcHJpdmF0ZSByZXN0b1N0b3JhZ2VTZXJ2aWNlOlJlc3RvU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZXQ6TmV0U2VydmljZSxcbiAgICBwcml2YXRlIGV2ZW50ZXI6RXZlbnRlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy51c2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gICAgdGhpcy5pc0xvZ2dlZEluID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gICAgdGhpcy5mYXZvcml0ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcblxuICAgIHRoaXMuYXV0aFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTFNfVE9LRU5fTkFNRSk7XG4gICAgaWYodGhpcy5hdXRoVG9rZW4pIHtcbiAgICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuaXNMb2dnZWRJbi5zdWJzY3JpYmUoaXNMb2dnZWRJbiA9PiB7XG4gICAgICBpZihpc0xvZ2dlZEluKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0RmF2b3JpdGVzKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRQcm9maWxlKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmV2ZW50ZXJcbiAgICAgIC5nZXRNZXNzYWdlRW1pdHRlcigpXG4gICAgICAuc3Vic2NyaWJlKG1lc3NhZ2UgPT4ge1xuICAgICAgICBzd2l0Y2gobWVzc2FnZS50eXBlKSB7XG4gICAgICAgICAgY2FzZSBcIlVuYXV0aG9yaXplZFwiOlxuICAgICAgICAgICAgdGhpcy5kZWxldGVBdXRoVG9rZW4oKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHNpZ25JbihkYXRhOlNpZ25JblJlcXVlc3REYXRhLCByZW1lbWJlck1lOmJvb2xlYW4gPSBmYWxzZSkge1xuXG4gICAgdGhpcy5yZW1lbWJlck1lID0gcmVtZW1iZXJNZTtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvc2lnbmluJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogU2lnbkluUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QXV0aFRva2VuKHJlc3VsdC50b2tlbiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0LnVzZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9Cj0YHQv9C10YjQvdC+INCw0LLRgtC+0YDQuNC30LjRgNC+0LLQsNC9JylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuXG4gIH1cblxuICBnZXRQcm9maWxlKCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5nZXQoJy91c2VyL2dldC91c2VyLWluZm8nKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBVc2VyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIubmV4dChyZXN1bHQpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHVwZGF0ZVByb2ZpbGUoZGF0YTpVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvc2V0L3VzZXItaW5mbycsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFVwZGF0ZVByb2ZpbGVSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICB9XG5cbiAgc2lnblVwKGRhdGE6U2lnblVwUmVxdWVzdERhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3NpZ251cCcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFNpZ25VcFJlc3BvbnNlRGF0YSkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnNldEF1dGhUb2tlbihyZXN1bHQudG9rZW4sIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdC51c2VyKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAn0KPRgdC/0LXRhScsICfQo9GB0L/QtdGI0L3QviDQt9Cw0YDQtdCz0LjRgdGC0LjRgNC+0LLQsNC9JylcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBzaWduT3V0KCkge1xuICAgIHJldHVybiB0aGlzLmRlbGV0ZUF1dGhUb2tlbigpO1xuICB9XG5cbiAgcmVzZXRQYXNzd29yZChkYXRhOlJlc2V0UGFzc3dvcmRSZXF1ZXN0RGF0YSkge1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9sb2dpbicsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFJlc2V0UGFzc3dvcmRSZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHJlc2V0UGFzc3dvcmRDb2RlKGRhdGE6UmVzZXRQYXNzd29yZENvZGVSZXF1ZXN0RGF0YSkge1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9jb2RlJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogUmVzZXRQYXNzd29yZENvZGVSZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG5cbiAgZ2V0RmF2b3JpdGVzKCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5nZXQoJy91c2VyL2dldC9mYXZvcml0ZXMgJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogYW55W10pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnZ2V0RmF2b3JpdGVzIHJlc3VsdCcsIHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmZhdm9yaXRlcy5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGFkZERpc2hUb0Zhdm9yaXRlcyhkaXNoOmFueSkge1xuICAgIGxldCBkYXRhOkFkZERpc2hUb0Zhdm9yaXRlc1JlcXVlc3REYXRhID0ge1xuICAgICAgZGlzaElkOiBkaXNoLmlkXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvYWRkL2Zhdm9yaXRlcyAnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBmYXZvcml0ZXNVcGRhdGVkOiBhbnlbXSA9IHRoaXMuZmF2b3JpdGVzLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBmYXZvcml0ZXNVcGRhdGVkLnB1c2goZGlzaCk7XG5cbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQoZmF2b3JpdGVzVXBkYXRlZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKGRpc2g6YW55KSB7XG4gICAgbGV0IGRhdGE6UmVtb3ZlRGlzaEZyb21GYXZvcml0ZXNSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIGRpc2hJZDogZGlzaC5pZFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL3JlbW92ZS9mYXZvcml0ZXMgJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ9CR0YvQu9C+PT4+PicsIHRoaXMuZmF2b3JpdGVzLmdldFZhbHVlKCkubGVuZ3RoKTtcbiAgICAgICAgICAgIGxldCBmYXZvcml0ZXNVcGRhdGVkOiBhbnlbXSA9IHRoaXMuZmF2b3JpdGVzXG4gICAgICAgICAgICAgIC5nZXRWYWx1ZSgpXG4gICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9IGRpc2guaWQpO1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCfQodGC0LDQu9C+PT4+PicsIGZhdm9yaXRlc1VwZGF0ZWQubGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQoZmF2b3JpdGVzVXBkYXRlZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHVzZXJQcm9maWxlKCk6QmVoYXZpb3JTdWJqZWN0PFVzZXI+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyO1xuICB9XG5cbiAgdXNlcklzTG9nZ2VkSW4oKTpCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzTG9nZ2VkSW47XG4gIH1cblxuICB1c2VyRmF2b3JpdGVzKCk6QmVoYXZpb3JTdWJqZWN0PGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZmF2b3JpdGVzO1xuICB9XG5cblxuXG4gIGdldEF1dGhUb2tlbigpOnN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aFRva2VuO1xuICB9XG5cbiAgc2V0QXV0aFRva2VuKGF1dGhUb2tlbjogc3RyaW5nLCB1cGRhdGVQcm9maWxlOiBib29sZWFuID0gdHJ1ZSk6dm9pZCB7XG4gICAgaWYodGhpcy5yZW1lbWJlck1lKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMU19UT0tFTl9OQU1FLCBhdXRoVG9rZW4pO1xuICAgIH1cbiAgICB0aGlzLmF1dGhUb2tlbiA9IGF1dGhUb2tlbjtcbiAgICB0aGlzLmlzTG9nZ2VkSW4ubmV4dCh0cnVlKTtcbiAgICB0aGlzLmdldEZhdm9yaXRlcygpLnN1YnNjcmliZSgpO1xuXG4gICAgaWYodXBkYXRlUHJvZmlsZSkge1xuICAgICAgdGhpcy5nZXRQcm9maWxlKCkuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlQXV0aFRva2VuKCk6dm9pZCB7XG4gICAgdGhpcy5hdXRoVG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oTFNfVE9LRU5fTkFNRSk7XG4gICAgdGhpcy5pc0xvZ2dlZEluLm5leHQoZmFsc2UpO1xuICB9XG5cbn1cbiJdfQ==