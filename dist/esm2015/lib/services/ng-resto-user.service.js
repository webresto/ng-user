/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
import * as i0 from "@angular/core";
import * as i1 from "@webresto/ng-core";
/** @type {?} */
const LS_TOKEN_NAME = 'gf:tkn:v2';
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
        this.isLoggedIn.subscribe((/**
         * @param {?} isLoggedIn
         * @return {?}
         */
        isLoggedIn => {
            if (isLoggedIn) {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.getFavorites().subscribe();
                    this.getProfile().subscribe();
                    this.getAddresses().subscribe();
                    this.getHistory().subscribe();
                }), 500);
            }
        }));
        this.eventer
            .getMessageEmitter()
            .subscribe((/**
         * @param {?} message
         * @return {?}
         */
        message => {
            switch (message.type) {
                case "Unauthorized":
                    this.deleteAuthToken();
                    break;
            }
        }));
    }
    /**
     * @param {?} data
     * @param {?=} rememberMe
     * @return {?}
     */
    signIn(data, rememberMe = false) {
        this.rememberMe = rememberMe;
        return this.net.post('/signin', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            this.setAuthToken(result.token, false);
            this.user.next(result.user);
            this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Успешно авторизирован'));
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
    }
    /**
     * @return {?}
     */
    getProfile() {
        return this.net.get('/user/get/user-info')
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            this.user.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
    }
    /**
     * @return {?}
     */
    getHistory() {
        return this.net.get('/user/get/history')
            .pipe(tap((/**
         * @param {?} historyItems
         * @return {?}
         */
        (historyItems) => {
            this.historyItems.next(historyItems);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    updateProfile(data) {
        return this.net.post('/user/set/user-info', {
            user: data
        })
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            this.user.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
    }
    /**
     * @return {?}
     */
    getAddresses() {
        return this.net.get('/user/get/location')
            .pipe(tap((/**
         * @param {?} addresses
         * @return {?}
         */
        (addresses) => {
            this.addresses.next(addresses);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
    }
    /**
     * @param {?} address
     * @return {?}
     */
    addAddress(address) {
        return this.net.post('/user/add/location', address)
            .pipe(tap((/**
         * @param {?} addresses
         * @return {?}
         */
        (addresses) => {
            this.addresses.next(addresses);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
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
            .pipe(tap((/**
         * @param {?} addresses
         * @return {?}
         */
        (addresses) => {
            this.addresses.next(addresses);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    signUp(data) {
        return this.net.post('/signup', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            //this.setAuthToken(result.token, false);
            //this.user.next(result.user);
            this.eventer.emitMessageEvent(new EventMessage('success', 'Регистрация', 'Ваш пароль был отправлен на указанный номер телефона'));
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error));
        })));
    }
    /**
     * @return {?}
     */
    signOut() {
        return this.deleteAuthToken();
    }
    /**
     * @return {?}
     */
    getBonuses() {
        return this.net.post('/bonus/get', {})
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    resetPassword(data) {
        return this.net.post('/reset', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    resetPasswordCode(data) {
        return this.net.post('/code', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
    }
    /**
     * @return {?}
     */
    getFavorites() {
        return this.net.get('/user/get/favorites ')
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            console.info('getFavorites result', result);
            this.favorites.next(result);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
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
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            /** @type {?} */
            let favoritesUpdated = this.favorites.getValue();
            favoritesUpdated.push(dish);
            this.favorites.next(favoritesUpdated);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
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
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            console.info('Было=>>>', this.favorites.getValue().length);
            /** @type {?} */
            let favoritesUpdated = this.favorites
                .getValue()
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            item => item.id != dish.id));
            console.info('Стало=>>>', favoritesUpdated.length);
            this.favorites.next(favoritesUpdated);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error)))));
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
    }
    /**
     * @return {?}
     */
    deleteAuthToken() {
        this.authToken = undefined;
        localStorage.removeItem(LS_TOKEN_NAME);
        localStorage.removeItem('gf:login:phone');
        this.isLoggedIn.next(false);
    }
}
NgRestoUserService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
NgRestoUserService.ctorParameters = () => [
    { type: NetService },
    { type: EventerService }
];
/** @nocollapse */ NgRestoUserService.ngInjectableDef = i0.defineInjectable({ factory: function NgRestoUserService_Factory() { return new NgRestoUserService(i0.inject(i1.NetService), i0.inject(i1.EventerService)); }, token: NgRestoUserService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgRestoUserService.prototype.authToken;
    /**
     * @type {?}
     * @private
     */
    NgRestoUserService.prototype.rememberMe;
    /**
     * @type {?}
     * @private
     */
    NgRestoUserService.prototype.user;
    /**
     * @type {?}
     * @private
     */
    NgRestoUserService.prototype.isLoggedIn;
    /**
     * @type {?}
     * @private
     */
    NgRestoUserService.prototype.favorites;
    /**
     * @type {?}
     * @private
     */
    NgRestoUserService.prototype.addresses;
    /**
     * @type {?}
     * @private
     */
    NgRestoUserService.prototype.streets;
    /**
     * @type {?}
     * @private
     */
    NgRestoUserService.prototype.historyItems;
    /**
     * @type {?}
     * @private
     */
    NgRestoUserService.prototype.net;
    /**
     * @type {?}
     * @private
     */
    NgRestoUserService.prototype.eventer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVzdG8tdXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLXVzZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFDTCxVQUFVLEVBQ1YsY0FBYyxFQUNkLFlBQVksRUFDYixNQUFNLG1CQUFtQixDQUFDOzs7O01BdUJyQixhQUFhLEdBQUcsV0FBVztBQUtqQyxNQUFNOzs7OztJQVdKLFlBRVUsR0FBYyxFQUNkLE9BQXNCO1FBRHRCLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBWHhCLGVBQVUsR0FBVyxLQUFLLENBQUM7UUFhakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRCxJQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENB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WUFBWSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFHRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7OztJQUVELFlBQVksQ0FBQyxTQUFpQixFQUFFLGdCQUF5QixJQUFJO1FBQzNELElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQixZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMvQyxZQUFZLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDM0M7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQjs7Ozs7V0FLRztJQUNMLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QyxZQUFZLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7O1lBaFdGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBOUJDLFVBQVU7WUFDVixjQUFjOzs7Ozs7OztJQWdDZCx1Q0FBeUI7Ozs7O0lBQ3pCLHdDQUFtQzs7Ozs7SUFDbkMsa0NBQWtDOzs7OztJQUNsQyx3Q0FBNEM7Ozs7O0lBQzVDLHVDQUF5Qzs7Ozs7SUFDekMsdUNBQTZDOzs7OztJQUM3QyxxQ0FBdUM7Ozs7O0lBQ3ZDLDBDQUE0Qzs7Ozs7SUFJMUMsaUNBQXNCOzs7OztJQUN0QixxQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgTmV0U2VydmljZSxcbiAgRXZlbnRlclNlcnZpY2UsXG4gIEV2ZW50TWVzc2FnZVxufSBmcm9tICdAd2VicmVzdG8vbmctY29yZSc7XG5cbmltcG9ydCB7IFNpZ25JblJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaWduLWluLXJlcXVlc3QtZGF0YSc7XG5pbXBvcnQgeyBTaWduVXBSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi11cC1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZFJlcXVlc3REYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvZGVSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtY29kZS1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgQWRkRGlzaFRvRmF2b3JpdGVzUmVxdWVzdERhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FkZC1kaXNoLXRvLWZhdm9yaXRlcy1yZXF1ZXN0LWRhdGEnO1xuaW1wb3J0IHsgUmVtb3ZlRGlzaEZyb21GYXZvcml0ZXNSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVtb3ZlLWRpc2gtZnJvbS1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcbmltcG9ydCB7IFByb2ZpbGVSZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Byb2ZpbGUtcmVzcG9uc2UtZGF0YSc7XG5cbmltcG9ydCB7IFNpZ25JblJlc3BvbnNlRGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7IFNpZ25VcFJlc3BvbnNlRGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi11cC1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRSZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLXJlc3BvbnNlLWRhdGEnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvZGVSZXNwb25zZURhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLWNvZGUtcmVzcG9uc2UtZGF0YSc7XG5pbXBvcnQgeyBVcGRhdGVQcm9maWxlUmVzcG9uc2VEYXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy91cGRhdGUtcHJvZmlsZS1yZXNwb25zZS1kYXRhJztcbmltcG9ydCB7IFVwZGF0ZVByb2ZpbGVSZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXBkYXRlLXByb2ZpbGUtcmVxdWVzdC1kYXRhJztcblxuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy91c2VyJztcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9hZGRyZXNzXCI7XG5pbXBvcnQgeyBSZW1vdmVBZGRyZXNzUmVxdWVzdERhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9yZW1vdmUtYWRkcmVzcy1yZXF1ZXN0LWRhdGFcIjtcbmltcG9ydCB7QWRkQWRkcmVzc1JlcXVlc3REYXRhfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9hZGQtYWRkcmVzcy1yZXF1ZXN0LWRhdGFcIjtcblxuY29uc3QgTFNfVE9LRU5fTkFNRSA9ICdnZjp0a246djInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvVXNlclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgYXV0aFRva2VuOnN0cmluZztcbiAgcHJpdmF0ZSByZW1lbWJlck1lOmJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB1c2VyOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBwcml2YXRlIGlzTG9nZ2VkSW46QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xuICBwcml2YXRlIGZhdm9yaXRlczpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xuICBwcml2YXRlIGFkZHJlc3NlczpCZWhhdmlvclN1YmplY3Q8QWRkcmVzc1tdPjtcbiAgcHJpdmF0ZSBzdHJlZXRzOkJlaGF2aW9yU3ViamVjdDxhbnlbXT47XG4gIHByaXZhdGUgaGlzdG9yeUl0ZW1zOkJlaGF2aW9yU3ViamVjdDxhbnlbXT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy9wcml2YXRlIHJlc3RvU3RvcmFnZVNlcnZpY2U6UmVzdG9TdG9yYWdlU2VydmljZSxcbiAgICBwcml2YXRlIG5ldDpOZXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLnVzZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICB0aGlzLmlzTG9nZ2VkSW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgICB0aGlzLmZhdm9yaXRlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMuYWRkcmVzc2VzID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgdGhpcy5oaXN0b3J5SXRlbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcblxuICAgIHRoaXMuYXV0aFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTFNfVE9LRU5fTkFNRSk7XG4gICAgaWYodGhpcy5hdXRoVG9rZW4pIHtcbiAgICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuaXNMb2dnZWRJbi5zdWJzY3JpYmUoaXNMb2dnZWRJbiA9PiB7XG4gICAgICBpZihpc0xvZ2dlZEluKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0RmF2b3JpdGVzKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRQcm9maWxlKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5nZXRBZGRyZXNzZXMoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmdldEhpc3RvcnkoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZXZlbnRlclxuICAgICAgLmdldE1lc3NhZ2VFbWl0dGVyKClcbiAgICAgIC5zdWJzY3JpYmUobWVzc2FnZSA9PiB7XG4gICAgICAgIHN3aXRjaChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwiVW5hdXRob3JpemVkXCI6XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUF1dGhUb2tlbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgc2lnbkluKGRhdGE6U2lnbkluUmVxdWVzdERhdGEsIHJlbWVtYmVyTWU6Ym9vbGVhbiA9IGZhbHNlKSB7XG5cbiAgICB0aGlzLnJlbWVtYmVyTWUgPSByZW1lbWJlck1lO1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9zaWduaW4nLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBTaWduSW5SZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnVzZXIubmV4dChyZXN1bHQudXNlcik7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ9Cj0YHQv9C10YUnLCAn0KPRgdC/0LXRiNC90L4g0LDQstGC0L7RgNC40LfQuNGA0L7QstCw0L0nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgfVxuXG4gIGdldFByb2ZpbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L3VzZXItaW5mbycpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFVzZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgZ2V0SGlzdG9yeSgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0KCcvdXNlci9nZXQvaGlzdG9yeScpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChoaXN0b3J5SXRlbXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeUl0ZW1zLm5leHQoaGlzdG9yeUl0ZW1zKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVQcm9maWxlKGRhdGE6VXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL3NldC91c2VyLWluZm8nLCB7XG4gICAgICB1c2VyOiBkYXRhXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogVXBkYXRlUHJvZmlsZVJlc3BvbnNlRGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyLm5leHQocmVzdWx0KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gIH1cblxuICBnZXRBZGRyZXNzZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2xvY2F0aW9uJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgYWRkQWRkcmVzcyhhZGRyZXNzOiBBZGRBZGRyZXNzUmVxdWVzdERhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvYWRkL2xvY2F0aW9uJywgYWRkcmVzcylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgZGVsZXRlQWRkcmVzcyhhZGRyZXNzOiBBZGRyZXNzKSB7XG5cbiAgICB2YXIgcmVxQm9keTogUmVtb3ZlQWRkcmVzc1JlcXVlc3REYXRhID0ge1xuICAgICAgaWQ6IGFkZHJlc3MuaWQsXG4gICAgICBzdHJlZXQ6IGFkZHJlc3Muc3RyZWV0LFxuICAgICAgaG9tZTogYWRkcmVzcy5ob21lXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9yZW1vdmUvbG9jYXRpb24nLCByZXFCb2R5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAoYWRkcmVzc2VzOiBBZGRyZXNzW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc2VzLm5leHQoYWRkcmVzc2VzKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBzaWduVXAoZGF0YTpTaWduVXBSZXF1ZXN0RGF0YSkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvc2lnbnVwJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogU2lnblVwUmVzcG9uc2VEYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIC8vdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICAvL3RoaXMudXNlci5uZXh0KHJlc3VsdC51c2VyKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAn0KDQtdCz0LjRgdGC0YDQsNGG0LjRjycsICfQktCw0Ygg0L/QsNGA0L7Qu9GMINCx0YvQuyDQvtGC0L/RgNCw0LLQu9C10L0g0L3QsCDRg9C60LDQt9Cw0L3QvdGL0Lkg0L3QvtC80LXRgCDRgtC10LvQtdGE0L7QvdCwJylcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZXJyb3IgPT4geyB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgICl9XG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBzaWduT3V0KCkge1xuICAgIHJldHVybiB0aGlzLmRlbGV0ZUF1dGhUb2tlbigpO1xuICB9XG5cblxuICBnZXRCb251c2VzKCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvYm9udXMvZ2V0Jywge30pXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcmVzZXRQYXNzd29yZChkYXRhOlJlc2V0UGFzc3dvcmRSZXF1ZXN0RGF0YSkge1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9yZXNldCcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIChyZXN1bHQ6IFJlc2V0UGFzc3dvcmRSZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHJlc2V0UGFzc3dvcmRDb2RlKGRhdGE6UmVzZXRQYXNzd29yZENvZGVSZXF1ZXN0RGF0YSkge1xuXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9jb2RlJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogUmVzZXRQYXNzd29yZENvZGVSZXNwb25zZURhdGEpID0+IHtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG5cbiAgZ2V0RmF2b3JpdGVzKCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5nZXQoJy91c2VyL2dldC9mYXZvcml0ZXMgJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogYW55W10pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnZ2V0RmF2b3JpdGVzIHJlc3VsdCcsIHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmZhdm9yaXRlcy5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGFkZERpc2hUb0Zhdm9yaXRlcyhkaXNoOmFueSkge1xuICAgIGxldCBkYXRhOkFkZERpc2hUb0Zhdm9yaXRlc1JlcXVlc3REYXRhID0ge1xuICAgICAgZGlzaElkOiBkaXNoLmlkXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvYWRkL2Zhdm9yaXRlcyAnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBmYXZvcml0ZXNVcGRhdGVkOiBhbnlbXSA9IHRoaXMuZmF2b3JpdGVzLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBmYXZvcml0ZXNVcGRhdGVkLnB1c2goZGlzaCk7XG5cbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQoZmF2b3JpdGVzVXBkYXRlZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKGRpc2g6YW55KSB7XG4gICAgbGV0IGRhdGE6UmVtb3ZlRGlzaEZyb21GYXZvcml0ZXNSZXF1ZXN0RGF0YSA9IHtcbiAgICAgIGRpc2hJZDogZGlzaC5pZFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL3JlbW92ZS9mYXZvcml0ZXMgJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ9CR0YvQu9C+PT4+PicsIHRoaXMuZmF2b3JpdGVzLmdldFZhbHVlKCkubGVuZ3RoKTtcbiAgICAgICAgICAgIGxldCBmYXZvcml0ZXNVcGRhdGVkOiBhbnlbXSA9IHRoaXMuZmF2b3JpdGVzXG4gICAgICAgICAgICAgIC5nZXRWYWx1ZSgpXG4gICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9IGRpc2guaWQpO1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCfQodGC0LDQu9C+PT4+PicsIGZhdm9yaXRlc1VwZGF0ZWQubGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQoZmF2b3JpdGVzVXBkYXRlZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHVzZXJQcm9maWxlKCk6QmVoYXZpb3JTdWJqZWN0PFVzZXI+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyO1xuICB9XG5cbiAgdXNlcklzTG9nZ2VkSW4oKTpCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzTG9nZ2VkSW47XG4gIH1cblxuICB1c2VyRmF2b3JpdGVzKCk6QmVoYXZpb3JTdWJqZWN0PGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZmF2b3JpdGVzO1xuICB9XG5cbiAgdXNlckFkZHJlc3NlcygpOkJlaGF2aW9yU3ViamVjdDxBZGRyZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5hZGRyZXNzZXM7XG4gIH1cblxuICB1c2VySGlzdG9yeSgpOkJlaGF2aW9yU3ViamVjdDxhbnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlJdGVtcztcbiAgfVxuXG5cbiAgZ2V0QXV0aFRva2VuKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hdXRoVG9rZW47XG4gIH1cblxuICBzZXRBdXRoVG9rZW4oYXV0aFRva2VuOiBzdHJpbmcsIHVwZGF0ZVByb2ZpbGU6IGJvb2xlYW4gPSB0cnVlKTp2b2lkIHtcbiAgICBpZih0aGlzLnJlbWVtYmVyTWUpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExTX1RPS0VOX05BTUUsIGF1dGhUb2tlbik7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZ2Y6bG9naW46cGhvbmUnKTtcbiAgICB9XG4gICAgdGhpcy5hdXRoVG9rZW4gPSBhdXRoVG9rZW47XG4gICAgdGhpcy5pc0xvZ2dlZEluLm5leHQodHJ1ZSk7XG5cbiAgICAvKmlmKHVwZGF0ZVByb2ZpbGUpIHtcbiAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpLnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5nZXRGYXZvcml0ZXMoKS5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuZ2V0QWRkcmVzc2VzKCkuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmdldEhpc3RvcnkoKS5zdWJzY3JpYmUoKTtcbiAgICB9Ki9cbiAgfVxuXG4gIGRlbGV0ZUF1dGhUb2tlbigpOnZvaWQge1xuICAgIHRoaXMuYXV0aFRva2VuID0gdW5kZWZpbmVkO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKExTX1RPS0VOX05BTUUpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdnZjpsb2dpbjpwaG9uZScpO1xuICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KGZhbHNlKTtcbiAgfVxuXG59XG4iXX0=