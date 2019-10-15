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
const LS_TOKEN_NAME = 'ghtke';
export class NgRestoUserService {
    /**
     * @param {?} net
     * @param {?} eventer
     */
    constructor(net, eventer) {
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
        this.isLoggedIn.subscribe(isLoggedIn => {
            if (isLoggedIn) {
                setTimeout(() => {
                    this.getFavorites().subscribe();
                    this.getProfile().subscribe();
                    this.getAddresses().subscribe();
                    this.getHistory().subscribe();
                }, 500);
            }
        });
        this.eventer
            .getMessageEmitter()
            .subscribe(message => {
            switch (message.type) {
                case "Unauthorized":
                    this.deleteAuthToken();
                    break;
            }
        });
    }
    /**
     * @param {?} data
     * @param {?=} rememberMe
     * @return {?}
     */
    signIn(data, rememberMe = false) {
        this.rememberMe = rememberMe;
        return this.net.post('/signin', data)
            .pipe(tap((result) => {
            this.setAuthToken(result.token, false);
            this.user.next(result.user);
            this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Успешно авторизирован'));
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @return {?}
     */
    getProfile() {
        return this.net.get('/user/get/user-info')
            .pipe(tap((result) => {
            this.user.next(result);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @return {?}
     */
    getHistory() {
        return this.net.get('/user/get/history')
            .pipe(tap((historyItems) => {
            this.historyItems.next(historyItems);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    updateProfile(data) {
        return this.net.post('/user/set/user-info', {
            user: data
        })
            .pipe(tap((result) => {
            this.user.next(result);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @return {?}
     */
    getAddresses() {
        return this.net.get('/user/get/location')
            .pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} address
     * @return {?}
     */
    addAddress(address) {
        return this.net.post('/user/add/location', address)
            .pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} address
     * @return {?}
     */
    deleteAddress(address) {
        /** @type {?} */
        var reqBody = {
            id: address.id,
            street: address.street,
            home: address.home
        };
        return this.net.post('/user/remove/location', reqBody)
            .pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    signUp(data) {
        return this.net.post('/signup', data)
            .pipe(tap((result) => {
            this.setAuthToken(result.token, false);
            this.user.next(result.user);
            this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Успешно зарегистирован'));
        }, error => {
            this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error));
        }));
    }
    /**
     * @return {?}
     */
    signOut() {
        return this.deleteAuthToken();
    }
    /**
     * @param {?} data
     * @return {?}
     */
    resetPassword(data) {
        return this.net.post('/reset', data)
            .pipe(tap((result) => {
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    resetPasswordCode(data) {
        return this.net.post('/code', data)
            .pipe(tap((result) => {
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @return {?}
     */
    getFavorites() {
        return this.net.get('/user/get/favorites ')
            .pipe(tap((result) => {
            console.info('getFavorites result', result);
            this.favorites.next(result);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} dish
     * @return {?}
     */
    addDishToFavorites(dish) {
        /** @type {?} */
        let data = {
            dishId: dish.id
        };
        return this.net.post('/user/add/favorites ', data)
            .pipe(tap((result) => {
            /** @type {?} */
            let favoritesUpdated = this.favorites.getValue();
            favoritesUpdated.push(dish);
            this.favorites.next(favoritesUpdated);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @param {?} dish
     * @return {?}
     */
    removeDishFromFavorites(dish) {
        /** @type {?} */
        let data = {
            dishId: dish.id
        };
        return this.net.post('/user/remove/favorites ', data)
            .pipe(tap((result) => {
            console.info('Было=>>>', this.favorites.getValue().length);
            /** @type {?} */
            let favoritesUpdated = this.favorites
                .getValue()
                .filter(item => item.id != dish.id);
            console.info('Стало=>>>', favoritesUpdated.length);
            this.favorites.next(favoritesUpdated);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    /**
     * @return {?}
     */
    userProfile() {
        return this.user;
    }
    /**
     * @return {?}
     */
    userIsLoggedIn() {
        return this.isLoggedIn;
    }
    /**
     * @return {?}
     */
    userFavorites() {
        return this.favorites;
    }
    /**
     * @return {?}
     */
    userAddresses() {
        return this.addresses;
    }
    /**
     * @return {?}
     */
    userHistory() {
        return this.historyItems;
    }
    /**
     * @return {?}
     */
    getAuthToken() {
        return this.authToken;
    }
    /**
     * @param {?} authToken
     * @param {?=} updateProfile
     * @return {?}
     */
    setAuthToken(authToken, updateProfile = true) {
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
    }
    /**
     * @return {?}
     */
    deleteAuthToken() {
        this.authToken = undefined;
        localStorage.removeItem(LS_TOKEN_NAME);
        this.isLoggedIn.next(false);
    }
}
NgRestoUserService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
NgRestoUserService.ctorParameters = () => [
    { type: NetService },
    { type: EventerService }
];
/** @nocollapse */ NgRestoUserService.ngInjectableDef = i0.defineInjectable({ factory: function NgRestoUserService_Factory() { return new NgRestoUserService(i0.inject(i1.NetService), i0.inject(i1.EventerService)); }, token: NgRestoUserService, providedIn: "root" });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVzdG8tdXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFDTCxVQUFVLEVBQ1YsY0FBYyxFQUNkLFlBQVksRUFDYixNQUFNLG1CQUFtQixDQUFDOzs7O0FBdUIzQixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUM7QUFLOUIsTUFBTTs7Ozs7SUFXSixZQUVVLEtBQ0E7UUFEQSxRQUFHLEdBQUgsR0FBRztRQUNILFlBQU8sR0FBUCxPQUFPOzBCQVhZLEtBQUs7UUFhaEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRCxJQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7UUFF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LENBQUMsQ0FBQztLQUM3Qjs7O1lBOVVGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQTlCQyxVQUFVO1lBQ1YsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBOZXRTZXJ2aWNlLFxuICBFdmVudGVyU2VydmljZSxcbiAgRXZlbnRNZXNzYWdlXG59IGZyb20gJ0B3ZWJyZXN0by9uZy1jb3JlJztcblxuaW1wb3J0IHsgU2lnbkluUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24taW4tcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFNpZ25VcFJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLXVwLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBBZGREaXNoVG9GYXZvcml0ZXNSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvYWRkLWRpc2gtdG8tZmF2b3JpdGVzLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBSZW1vdmVEaXNoRnJvbUZhdm9yaXRlc1JlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW1vdmUtZGlzaC1mcm9tLWZhdm9yaXRlcy1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUHJvZmlsZVJlc3BvbnNlRGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcHJvZmlsZS1yZXNwb25zZS1kYXRhJztcblxuaW1wb3J0IHsgU2lnbkluUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLWluLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHsgU2lnblVwUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLXVwLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZFJlc3BvbnNlRGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29kZVJlc3BvbnNlRGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtY29kZS1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7IFVwZGF0ZVByb2ZpbGVSZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VwZGF0ZS1wcm9maWxlLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy91cGRhdGUtcHJvZmlsZS1yZXF1ZXN0LWRhdGEnO1xuXG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VzZXInO1xuaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2FkZHJlc3NcIjtcbmltcG9ydCB7IFJlbW92ZUFkZHJlc3NSZXF1ZXN0RGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3JlbW92ZS1hZGRyZXNzLXJlcXVlc3QtZGF0YVwiO1xuaW1wb3J0IHtBZGRBZGRyZXNzUmVxdWVzdERhdGF9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2FkZC1hZGRyZXNzLXJlcXVlc3QtZGF0YVwiO1xuXG5jb25zdCBMU19UT0tFTl9OQU1FID0gJ2dodGtlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdSZXN0b1VzZXJTZXJ2aWNlIHtcblxuICBwcml2YXRlIGF1dGhUb2tlbjpzdHJpbmc7XG4gIHByaXZhdGUgcmVtZW1iZXJNZTpib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgdXNlcjpCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgcHJpdmF0ZSBpc0xvZ2dlZEluOkJlaGF2aW9yU3ViamVjdDxib29sZWFuPjtcbiAgcHJpdmF0ZSBmYXZvcml0ZXM6QmVoYXZpb3JTdWJqZWN0PGFueVtdPjtcbiAgcHJpdmF0ZSBhZGRyZXNzZXM6QmVoYXZpb3JTdWJqZWN0PEFkZHJlc3NbXT47XG4gIHByaXZhdGUgc3RyZWV0czpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xuICBwcml2YXRlIGhpc3RvcnlJdGVtczpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIC8vcHJpdmF0ZSByZXN0b1N0b3JhZ2VTZXJ2aWNlOlJlc3RvU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZXQ6TmV0U2VydmljZSxcbiAgICBwcml2YXRlIGV2ZW50ZXI6RXZlbnRlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy51c2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gICAgdGhpcy5pc0xvZ2dlZEluID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gICAgdGhpcy5mYXZvcml0ZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgICB0aGlzLmFkZHJlc3NlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMuaGlzdG9yeUl0ZW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG5cbiAgICB0aGlzLmF1dGhUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKExTX1RPS0VOX05BTUUpO1xuICAgIGlmKHRoaXMuYXV0aFRva2VuKSB7XG4gICAgICB0aGlzLmlzTG9nZ2VkSW4ubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzTG9nZ2VkSW4uc3Vic2NyaWJlKGlzTG9nZ2VkSW4gPT4ge1xuICAgICAgaWYoaXNMb2dnZWRJbikge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmdldEZhdm9yaXRlcygpLnN1YnNjcmliZSgpO1xuICAgICAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpLnN1YnNjcmliZSgpO1xuICAgICAgICAgIHRoaXMuZ2V0QWRkcmVzc2VzKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRIaXN0b3J5KCkuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmV2ZW50ZXJcbiAgICAgIC5nZXRNZXNzYWdlRW1pdHRlcigpXG4gICAgICAuc3Vic2NyaWJlKG1lc3NhZ2UgPT4ge1xuICAgICAgICBzd2l0Y2gobWVzc2FnZS50eXBlKSB7XG4gICAgICAgICAgY2FzZSBcIlVuYXV0aG9yaXplZFwiOlxuICAgICAgICAgICAgdGhpcy5kZWxldGVBdXRoVG9rZW4oKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHNpZ25JbihkYXRhOlNpZ25JblJlcXVlc3REYXRhLCByZW1lbWJlck1lOmJvb2xlYW4gPSBmYWxzZSkge1xuXG4gICAgdGhpcy5yZW1lbWJlck1lID0gcmVtZW1iZXJNZTtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvc2lnbmluJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogU2lnbkluUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QXV0aFRva2VuKHJlc3VsdC50b2tlbiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0LnVzZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9Cj0YHQv9C10YjQvdC+INCw0LLRgtC+0YDQuNC30LjRgNC+0LLQsNC9JylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuXG4gIH1cblxuICBnZXRQcm9maWxlKCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5nZXQoJy91c2VyL2dldC91c2VyLWluZm8nKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBVc2VyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIubmV4dChyZXN1bHQpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGdldEhpc3RvcnkoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2hpc3RvcnknKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAoaGlzdG9yeUl0ZW1zKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpc3RvcnlJdGVtcy5uZXh0KGhpc3RvcnlJdGVtcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgdXBkYXRlUHJvZmlsZShkYXRhOlVwZGF0ZVByb2ZpbGVSZXF1ZXN0RGF0YSkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9zZXQvdXNlci1pbmZvJywge1xuICAgICAgdXNlcjogZGF0YVxuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFVwZGF0ZVByb2ZpbGVSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICB9XG5cbiAgZ2V0QWRkcmVzc2VzKCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5nZXQoJy91c2VyL2dldC9sb2NhdGlvbicpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChhZGRyZXNzZXM6IEFkZHJlc3NbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRyZXNzZXMubmV4dChhZGRyZXNzZXMpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGFkZEFkZHJlc3MoYWRkcmVzczogQWRkQWRkcmVzc1JlcXVlc3REYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL2FkZC9sb2NhdGlvbicsIGFkZHJlc3MpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChhZGRyZXNzZXM6IEFkZHJlc3NbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRyZXNzZXMubmV4dChhZGRyZXNzZXMpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGRlbGV0ZUFkZHJlc3MoYWRkcmVzczogQWRkcmVzcykge1xuXG4gICAgdmFyIHJlcUJvZHk6IFJlbW92ZUFkZHJlc3NSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIGlkOiBhZGRyZXNzLmlkLFxuICAgICAgc3RyZWV0OiBhZGRyZXNzLnN0cmVldCxcbiAgICAgIGhvbWU6IGFkZHJlc3MuaG9tZVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvcmVtb3ZlL2xvY2F0aW9uJywgcmVxQm9keSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgc2lnblVwKGRhdGE6U2lnblVwUmVxdWVzdERhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3NpZ251cCcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFNpZ25VcFJlc3BvbnNlRGF0YSkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnNldEF1dGhUb2tlbihyZXN1bHQudG9rZW4sIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdC51c2VyKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAn0KPRgdC/0LXRhScsICfQo9GB0L/QtdGI0L3QviDQt9Cw0YDQtdCz0LjRgdGC0LjRgNC+0LLQsNC9JylcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4geyB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgICl9XG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBzaWduT3V0KCkge1xuICAgIHJldHVybiB0aGlzLmRlbGV0ZUF1dGhUb2tlbigpO1xuICB9XG5cbiAgcmVzZXRQYXNzd29yZChkYXRhOlJlc2V0UGFzc3dvcmRSZXF1ZXN0RGF0YSkge1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9yZXNldCcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFJlc2V0UGFzc3dvcmRSZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHJlc2V0UGFzc3dvcmRDb2RlKGRhdGE6UmVzZXRQYXNzd29yZENvZGVSZXF1ZXN0RGF0YSkge1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9jb2RlJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogUmVzZXRQYXNzd29yZENvZGVSZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG5cbiAgZ2V0RmF2b3JpdGVzKCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5nZXQoJy91c2VyL2dldC9mYXZvcml0ZXMgJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogYW55W10pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnZ2V0RmF2b3JpdGVzIHJlc3VsdCcsIHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmZhdm9yaXRlcy5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGFkZERpc2hUb0Zhdm9yaXRlcyhkaXNoOmFueSkge1xuICAgIGxldCBkYXRhOkFkZERpc2hUb0Zhdm9yaXRlc1JlcXVlc3REYXRhID0ge1xuICAgICAgZGlzaElkOiBkaXNoLmlkXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvYWRkL2Zhdm9yaXRlcyAnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBmYXZvcml0ZXNVcGRhdGVkOiBhbnlbXSA9IHRoaXMuZmF2b3JpdGVzLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBmYXZvcml0ZXNVcGRhdGVkLnB1c2goZGlzaCk7XG5cbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQoZmF2b3JpdGVzVXBkYXRlZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKGRpc2g6YW55KSB7XG4gICAgbGV0IGRhdGE6UmVtb3ZlRGlzaEZyb21GYXZvcml0ZXNSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIGRpc2hJZDogZGlzaC5pZFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL3JlbW92ZS9mYXZvcml0ZXMgJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ9CR0YvQu9C+PT4+PicsIHRoaXMuZmF2b3JpdGVzLmdldFZhbHVlKCkubGVuZ3RoKTtcbiAgICAgICAgICAgIGxldCBmYXZvcml0ZXNVcGRhdGVkOiBhbnlbXSA9IHRoaXMuZmF2b3JpdGVzXG4gICAgICAgICAgICAgIC5nZXRWYWx1ZSgpXG4gICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9IGRpc2guaWQpO1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCfQodGC0LDQu9C+PT4+PicsIGZhdm9yaXRlc1VwZGF0ZWQubGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQoZmF2b3JpdGVzVXBkYXRlZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHVzZXJQcm9maWxlKCk6QmVoYXZpb3JTdWJqZWN0PFVzZXI+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyO1xuICB9XG5cbiAgdXNlcklzTG9nZ2VkSW4oKTpCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzTG9nZ2VkSW47XG4gIH1cblxuICB1c2VyRmF2b3JpdGVzKCk6QmVoYXZpb3JTdWJqZWN0PGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZmF2b3JpdGVzO1xuICB9XG5cbiAgdXNlckFkZHJlc3NlcygpOkJlaGF2aW9yU3ViamVjdDxBZGRyZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5hZGRyZXNzZXM7XG4gIH1cblxuICB1c2VySGlzdG9yeSgpOkJlaGF2aW9yU3ViamVjdDxhbnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlJdGVtcztcbiAgfVxuXG5cbiAgZ2V0QXV0aFRva2VuKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hdXRoVG9rZW47XG4gIH1cblxuICBzZXRBdXRoVG9rZW4oYXV0aFRva2VuOiBzdHJpbmcsIHVwZGF0ZVByb2ZpbGU6IGJvb2xlYW4gPSB0cnVlKTp2b2lkIHtcbiAgICBpZih0aGlzLnJlbWVtYmVyTWUpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExTX1RPS0VOX05BTUUsIGF1dGhUb2tlbik7XG4gICAgfVxuICAgIHRoaXMuYXV0aFRva2VuID0gYXV0aFRva2VuO1xuICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KHRydWUpO1xuXG4gICAgLyppZih1cGRhdGVQcm9maWxlKSB7XG4gICAgICB0aGlzLmdldFByb2ZpbGUoKS5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuZ2V0RmF2b3JpdGVzKCkuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmdldEFkZHJlc3NlcygpLnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5nZXRIaXN0b3J5KCkuc3Vic2NyaWJlKCk7XG4gICAgfSovXG4gIH1cblxuICBkZWxldGVBdXRoVG9rZW4oKTp2b2lkIHtcbiAgICB0aGlzLmF1dGhUb2tlbiA9IHVuZGVmaW5lZDtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShMU19UT0tFTl9OQU1FKTtcbiAgICB0aGlzLmlzTG9nZ2VkSW4ubmV4dChmYWxzZSk7XG4gIH1cblxufVxuIl19