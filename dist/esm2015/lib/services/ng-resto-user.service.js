import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventerService, EventMessage, NetService } from '@webresto/ng-core';
import * as i0 from "@angular/core";
import * as i1 from "@webresto/ng-core";
const LS_TOKEN_NAME = 'gf:tkn:v2';
export class NgRestoUserService {
    constructor(
    //private restoStorageService:RestoStorageService,
    net, eventer) {
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
        this.isLoggedIn.subscribe(isLoggedIn => {
            if (isLoggedIn) {
                setTimeout(() => {
                    this.getFavorites().subscribe();
                    this.getProfile().subscribe();
                    this.getAddresses().subscribe();
                    this.getBonuses().subscribe();
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
    signIn(data, rememberMe = false) {
        this.rememberMe = rememberMe;
        return this.net.post('/signin', data)
            .pipe(tap((result) => {
            this.setAuthToken(result.token, false);
            this.user.next(result.user);
            this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Успешно авторизирован'));
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    getProfile() {
        return this.net.get('/user/get/user-info')
            .pipe(tap((result) => {
            this.user.next(result);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    getHistory() {
        return this.net.get('/user/get/history')
            .pipe(tap((historyItems) => {
            this.historyItems.next(historyItems);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    getHistoryTransactions(bonusSystem = "local", limit = 15, set = 0) {
        return this.net.get(`/bonus/transactions?bonussystem=${bonusSystem}&limit=${limit}&number=${set}`)
            .pipe(tap((transactions) => {
            this.historyTransactions.next(transactions);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    updateProfile(data) {
        return this.net.post('/user/set/user-info', {
            user: data
        })
            .pipe(tap((result) => {
            this.user.next(result);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    getAddresses() {
        return this.net.get('/user/get/location')
            .pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    addAddress(address) {
        return this.net.post('/user/add/location', address)
            .pipe(tap((addresses) => {
            this.addresses.next(addresses);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    deleteAddress(address) {
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
    signUp(data) {
        return this.net.post('/signup', data)
            .pipe(tap((result) => {
            //this.setAuthToken(result.token, false);
            //this.user.next(result.user);
            this.eventer.emitMessageEvent(new EventMessage('success', 'Регистрация', 'Ваш пароль был отправлен на указанный номер телефона'));
        }, error => {
            this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error));
        }));
    }
    signOut() {
        return this.deleteAuthToken();
    }
    getBonuses() {
        return this.net.post('/bonus/get', {})
            .pipe(tap((result) => {
            this.bonusSystems.next(result);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    resetPassword(data) {
        return this.net.post('/reset', data)
            .pipe(tap((result) => {
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    resetPasswordCode(data) {
        return this.net.post('/code', data)
            .pipe(tap((result) => {
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    getFavorites() {
        return this.net.get('/user/get/favorites ')
            .pipe(tap((result) => {
            console.info('getFavorites result', result);
            this.favorites.next(result);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    addDishToFavorites(dish) {
        let data = {
            dishId: dish.id
        };
        return this.net.post('/user/add/favorites ', data)
            .pipe(tap((result) => {
            let favoritesUpdated = this.favorites.getValue();
            favoritesUpdated.push(dish);
            this.favorites.next(favoritesUpdated);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    removeDishFromFavorites(dish) {
        let data = {
            dishId: dish.id
        };
        return this.net.post('/user/remove/favorites ', data)
            .pipe(tap((result) => {
            console.info('Было=>>>', this.favorites.getValue().length);
            let favoritesUpdated = this.favorites
                .getValue()
                .filter(item => item.id != dish.id);
            console.info('Стало=>>>', favoritesUpdated.length);
            this.favorites.next(favoritesUpdated);
        }, error => this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', error))));
    }
    userProfile() {
        return this.user.pipe();
    }
    userIsLoggedIn() {
        return this.isLoggedIn.pipe();
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
    deleteAuthToken() {
        this.authToken = undefined;
        localStorage.removeItem(LS_TOKEN_NAME);
        localStorage.removeItem('gf:login:phone');
        this.isLoggedIn.next(false);
    }
}
NgRestoUserService.ɵfac = function NgRestoUserService_Factory(t) { return new (t || NgRestoUserService)(i0.ɵɵinject(i1.NetService), i0.ɵɵinject(i1.EventerService)); };
NgRestoUserService.ɵprov = i0.ɵɵdefineInjectable({ token: NgRestoUserService, factory: NgRestoUserService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgRestoUserService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.NetService }, { type: i1.EventerService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVzdG8tdXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2xhcmNoZW5rb3YvZnJvbnRlbmQvcHJvamVjdHMvd2VicmVzdG8vbmctdXNlci9zcmMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbmctcmVzdG8tdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGVBQWUsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkMsT0FBTyxFQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7OztBQWtCM0UsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDO0FBS2xDLE1BQU0sT0FBTyxrQkFBa0I7SUFhN0I7SUFDRSxrREFBa0Q7SUFDMUMsR0FBYyxFQUNkLE9BQXNCO1FBRHRCLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBYnhCLGVBQVUsR0FBVyxLQUFLLENBQUM7UUFlakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBUSxFQUFFLENBQUMsQ0FBQztRQUMx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Z0JBQWdCLENBQUMsQ0FBQztTQUMzQztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNCOzs7OztXQUtHO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDOztvRkFwWFUsa0JBQWtCOzBEQUFsQixrQkFBa0IsV0FBbEIsa0JBQWtCLG1CQUZqQixNQUFNO2tEQUVQLGtCQUFrQjtjQUg5QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7dGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQge0V2ZW50ZXJTZXJ2aWNlLCBFdmVudE1lc3NhZ2UsIE5ldFNlcnZpY2V9IGZyb20gJ0B3ZWJyZXN0by9uZy1jb3JlJztcclxuXHJcbmltcG9ydCB7U2lnbkluUmVxdWVzdERhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvc2lnbi1pbi1yZXF1ZXN0LWRhdGEnO1xyXG5pbXBvcnQge1NpZ25VcFJlcXVlc3REYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVxdWVzdC1kYXRhJztcclxuaW1wb3J0IHtSZXNldFBhc3N3b3JkUmVxdWVzdERhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvcmVzZXQtcGFzc3dvcmQtcmVxdWVzdC1kYXRhJztcclxuaW1wb3J0IHtSZXNldFBhc3N3b3JkQ29kZVJlcXVlc3REYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Jlc2V0LXBhc3N3b3JkLWNvZGUtcmVxdWVzdC1kYXRhJztcclxuaW1wb3J0IHtBZGREaXNoVG9GYXZvcml0ZXNSZXF1ZXN0RGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hZGQtZGlzaC10by1mYXZvcml0ZXMtcmVxdWVzdC1kYXRhJztcclxuaW1wb3J0IHtSZW1vdmVEaXNoRnJvbUZhdm9yaXRlc1JlcXVlc3REYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbW92ZS1kaXNoLWZyb20tZmF2b3JpdGVzLXJlcXVlc3QtZGF0YSc7XHJcbmltcG9ydCB7U2lnbkluUmVzcG9uc2VEYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24taW4tcmVzcG9uc2UtZGF0YSc7XHJcbmltcG9ydCB7U2lnblVwUmVzcG9uc2VEYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpZ24tdXAtcmVzcG9uc2UtZGF0YSc7XHJcbmltcG9ydCB7UmVzZXRQYXNzd29yZFJlc3BvbnNlRGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1yZXNwb25zZS1kYXRhJztcclxuaW1wb3J0IHtSZXNldFBhc3N3b3JkQ29kZVJlc3BvbnNlRGF0YX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZXNldC1wYXNzd29yZC1jb2RlLXJlc3BvbnNlLWRhdGEnO1xyXG5pbXBvcnQge1VwZGF0ZVByb2ZpbGVSZXNwb25zZURhdGF9IGZyb20gJy4uL2ludGVyZmFjZXMvdXBkYXRlLXByb2ZpbGUtcmVzcG9uc2UtZGF0YSc7XHJcbmltcG9ydCB7VXBkYXRlUHJvZmlsZVJlcXVlc3REYXRhfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VwZGF0ZS1wcm9maWxlLXJlcXVlc3QtZGF0YSc7XHJcbmltcG9ydCB7QWRkcmVzcywgVXNlcn0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7UmVtb3ZlQWRkcmVzc1JlcXVlc3REYXRhfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9yZW1vdmUtYWRkcmVzcy1yZXF1ZXN0LWRhdGFcIjtcclxuaW1wb3J0IHtBZGRBZGRyZXNzUmVxdWVzdERhdGF9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2FkZC1hZGRyZXNzLXJlcXVlc3QtZGF0YVwiO1xyXG5cclxuY29uc3QgTFNfVE9LRU5fTkFNRSA9ICdnZjp0a246djInO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdSZXN0b1VzZXJTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBhdXRoVG9rZW46IHN0cmluZztcclxuICBwcml2YXRlIHJlbWVtYmVyTWU6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgaGlzdG9yeVRyYW5zYWN0aW9uczogQmVoYXZpb3JTdWJqZWN0PGFueVtdPjtcclxuICBwcml2YXRlIHVzZXI6QmVoYXZpb3JTdWJqZWN0PGFueT47XHJcbiAgcHJpdmF0ZSBpc0xvZ2dlZEluOkJlaGF2aW9yU3ViamVjdDxib29sZWFuPjtcclxuICBwcml2YXRlIGZhdm9yaXRlczpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xyXG4gIHByaXZhdGUgYWRkcmVzc2VzOkJlaGF2aW9yU3ViamVjdDxBZGRyZXNzW10+O1xyXG4gIHByaXZhdGUgc3RyZWV0czpCZWhhdmlvclN1YmplY3Q8YW55W10+O1xyXG4gIHByaXZhdGUgaGlzdG9yeUl0ZW1zOkJlaGF2aW9yU3ViamVjdDxhbnlbXT47XHJcbiAgcHJpdmF0ZSBib251c1N5c3RlbXM6IEJlaGF2aW9yU3ViamVjdDxhbnlbXT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgLy9wcml2YXRlIHJlc3RvU3RvcmFnZVNlcnZpY2U6UmVzdG9TdG9yYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV0Ok5ldFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGV2ZW50ZXI6RXZlbnRlclNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMudXNlciA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pO1xyXG4gICAgdGhpcy5pc0xvZ2dlZEluID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcbiAgICB0aGlzLmZhdm9yaXRlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG4gICAgdGhpcy5hZGRyZXNzZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuICAgIHRoaXMuaGlzdG9yeUl0ZW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcbiAgICB0aGlzLmhpc3RvcnlUcmFuc2FjdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueVtdPihbXSk7XHJcbiAgICB0aGlzLmJvbnVzU3lzdGVtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcclxuXHJcbiAgICB0aGlzLmF1dGhUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKExTX1RPS0VOX05BTUUpO1xyXG4gICAgaWYodGhpcy5hdXRoVG9rZW4pIHtcclxuICAgICAgdGhpcy5pc0xvZ2dlZEluLm5leHQodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc0xvZ2dlZEluLnN1YnNjcmliZShpc0xvZ2dlZEluID0+IHtcclxuICAgICAgaWYoaXNMb2dnZWRJbikge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5nZXRGYXZvcml0ZXMoKS5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpLnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgdGhpcy5nZXRBZGRyZXNzZXMoKS5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgIHRoaXMuZ2V0Qm9udXNlcygpLnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgdGhpcy5nZXRIaXN0b3J5KCkuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5ldmVudGVyXHJcbiAgICAgIC5nZXRNZXNzYWdlRW1pdHRlcigpXHJcbiAgICAgIC5zdWJzY3JpYmUobWVzc2FnZSA9PiB7XHJcbiAgICAgICAgc3dpdGNoKG1lc3NhZ2UudHlwZSkge1xyXG4gICAgICAgICAgY2FzZSBcIlVuYXV0aG9yaXplZFwiOlxyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUF1dGhUb2tlbigpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2lnbkluKGRhdGE6U2lnbkluUmVxdWVzdERhdGEsIHJlbWVtYmVyTWU6Ym9vbGVhbiA9IGZhbHNlKSB7XHJcblxyXG4gICAgdGhpcy5yZW1lbWJlck1lID0gcmVtZW1iZXJNZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3NpZ25pbicsIGRhdGEpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcChcclxuICAgICAgICAgIChyZXN1bHQ6IFNpZ25JblJlc3BvbnNlRGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdC51c2VyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAn0KPRgdC/0LXRhScsICfQo9GB0L/QtdGI0L3QviDQsNCy0YLQvtGA0LjQt9C40YDQvtCy0LDQvScpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcblxyXG4gIH1cclxuXHJcbiAgZ2V0UHJvZmlsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5ldC5nZXQoJy91c2VyL2dldC91c2VyLWluZm8nKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YXAoXHJcbiAgICAgICAgICAocmVzdWx0OiBVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdCk7XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRIaXN0b3J5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2hpc3RvcnknKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YXAoXHJcbiAgICAgICAgICAoaGlzdG9yeUl0ZW1zKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeUl0ZW1zLm5leHQoaGlzdG9yeUl0ZW1zKTtcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGdldEhpc3RvcnlUcmFuc2FjdGlvbnMoYm9udXNTeXN0ZW06IHN0cmluZz0gXCJsb2NhbFwiLCBsaW1pdDogbnVtYmVyID0gMTUsIHNldDogbnVtYmVyID0gMCkge1xyXG4gICAgIHJldHVybiB0aGlzLm5ldC5nZXQoYC9ib251cy90cmFuc2FjdGlvbnM/Ym9udXNzeXN0ZW09JHtib251c1N5c3RlbX0mbGltaXQ9JHtsaW1pdH0mbnVtYmVyPSR7c2V0fWApXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcChcclxuICAgICAgICAgICh0cmFuc2FjdGlvbnMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oaXN0b3J5VHJhbnNhY3Rpb25zLm5leHQodHJhbnNhY3Rpb25zKTtcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVByb2ZpbGUoZGF0YTpVcGRhdGVQcm9maWxlUmVxdWVzdERhdGEpIHtcclxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvdXNlci9zZXQvdXNlci1pbmZvJywge1xyXG4gICAgICB1c2VyOiBkYXRhXHJcbiAgICB9KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YXAoXHJcbiAgICAgICAgICAocmVzdWx0OiBVcGRhdGVQcm9maWxlUmVzcG9uc2VEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlci5uZXh0KHJlc3VsdCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gIH1cclxuXHJcbiAgZ2V0QWRkcmVzc2VzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmV0LmdldCgnL3VzZXIvZ2V0L2xvY2F0aW9uJylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFwKFxyXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc2VzLm5leHQoYWRkcmVzc2VzKTtcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGFkZEFkZHJlc3MoYWRkcmVzczogQWRkQWRkcmVzc1JlcXVlc3REYXRhKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvYWRkL2xvY2F0aW9uJywgYWRkcmVzcylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFwKFxyXG4gICAgICAgICAgKGFkZHJlc3NlczogQWRkcmVzc1tdKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc2VzLm5leHQoYWRkcmVzc2VzKTtcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUFkZHJlc3MoYWRkcmVzczogQWRkcmVzcykge1xyXG5cclxuICAgIHZhciByZXFCb2R5OiBSZW1vdmVBZGRyZXNzUmVxdWVzdERhdGEgPSB7XHJcbiAgICAgIGlkOiBhZGRyZXNzLmlkLFxyXG4gICAgICBzdHJlZXQ6IGFkZHJlc3Muc3RyZWV0LFxyXG4gICAgICBob21lOiBhZGRyZXNzLmhvbWVcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL3JlbW92ZS9sb2NhdGlvbicsIHJlcUJvZHkpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcChcclxuICAgICAgICAgIChhZGRyZXNzZXM6IEFkZHJlc3NbXSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5uZXh0KGFkZHJlc3Nlcyk7XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBzaWduVXAoZGF0YTpTaWduVXBSZXF1ZXN0RGF0YSkge1xyXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9zaWdudXAnLCBkYXRhKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YXAoXHJcbiAgICAgICAgICAocmVzdWx0OiBTaWduVXBSZXNwb25zZURhdGEpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5zZXRBdXRoVG9rZW4ocmVzdWx0LnRva2VuLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy51c2VyLm5leHQocmVzdWx0LnVzZXIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQoNC10LPQuNGB0YLRgNCw0YbQuNGPJywgJ9CS0LDRiCDQv9Cw0YDQvtC70Ywg0LHRi9C7INC+0YLQv9GA0LDQstC70LXQvSDQvdCwINGD0LrQsNC30LDQvdC90YvQuSDQvdC+0LzQtdGAINGC0LXQu9C10YTQvtC90LAnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIGVycm9yID0+IHsgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxyXG4gICAgICAgICAgKX1cclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBzaWduT3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlQXV0aFRva2VuKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0Qm9udXNlcygpIHtcclxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvYm9udXMvZ2V0Jywge30pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcChcclxuICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJvbnVzU3lzdGVtcy5uZXh0KHJlc3VsdCk7XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICByZXNldFBhc3N3b3JkKGRhdGE6UmVzZXRQYXNzd29yZFJlcXVlc3REYXRhKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9yZXNldCcsIGRhdGEpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcChcclxuICAgICAgICAgIChyZXN1bHQ6IFJlc2V0UGFzc3dvcmRSZXNwb25zZURhdGEpID0+IHtcclxuXHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIGVycm9yID0+IHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCBlcnJvcilcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICByZXNldFBhc3N3b3JkQ29kZShkYXRhOlJlc2V0UGFzc3dvcmRDb2RlUmVxdWVzdERhdGEpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NvZGUnLCBkYXRhKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YXAoXHJcbiAgICAgICAgICAocmVzdWx0OiBSZXNldFBhc3N3b3JkQ29kZVJlc3BvbnNlRGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG5cclxuICBnZXRGYXZvcml0ZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uZXQuZ2V0KCcvdXNlci9nZXQvZmF2b3JpdGVzICcpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcChcclxuICAgICAgICAgIChyZXN1bHQ6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnZ2V0RmF2b3JpdGVzIHJlc3VsdCcsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQocmVzdWx0KTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcclxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgYWRkRGlzaFRvRmF2b3JpdGVzKGRpc2g6YW55KSB7XHJcbiAgICBsZXQgZGF0YTpBZGREaXNoVG9GYXZvcml0ZXNSZXF1ZXN0RGF0YSA9IHtcclxuICAgICAgZGlzaElkOiBkaXNoLmlkXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy91c2VyL2FkZC9mYXZvcml0ZXMgJywgZGF0YSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFwKFxyXG4gICAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmYXZvcml0ZXNVcGRhdGVkOiBhbnlbXSA9IHRoaXMuZmF2b3JpdGVzLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIGZhdm9yaXRlc1VwZGF0ZWQucHVzaChkaXNoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVzLm5leHQoZmF2b3JpdGVzVXBkYXRlZCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsIGVycm9yKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZURpc2hGcm9tRmF2b3JpdGVzKGRpc2g6YW55KSB7XHJcbiAgICBsZXQgZGF0YTpSZW1vdmVEaXNoRnJvbUZhdm9yaXRlc1JlcXVlc3REYXRhID0ge1xyXG4gICAgICBkaXNoSWQ6IGRpc2guaWRcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL3VzZXIvcmVtb3ZlL2Zhdm9yaXRlcyAnLCBkYXRhKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YXAoXHJcbiAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKCfQkdGL0LvQvj0+Pj4nLCB0aGlzLmZhdm9yaXRlcy5nZXRWYWx1ZSgpLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGxldCBmYXZvcml0ZXNVcGRhdGVkOiBhbnlbXSA9IHRoaXMuZmF2b3JpdGVzXHJcbiAgICAgICAgICAgICAgLmdldFZhbHVlKClcclxuICAgICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCAhPSBkaXNoLmlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKCfQodGC0LDQu9C+PT4+PicsIGZhdm9yaXRlc1VwZGF0ZWQubGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZXMubmV4dChmYXZvcml0ZXNVcGRhdGVkKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcclxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgZXJyb3IpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgdXNlclByb2ZpbGUoKTpPYnNlcnZhYmxlPFVzZXI+IHtcclxuICAgIHJldHVybiB0aGlzLnVzZXIucGlwZSgpO1xyXG4gIH1cclxuXHJcbiAgdXNlcklzTG9nZ2VkSW4oKTpPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLmlzTG9nZ2VkSW4ucGlwZSgpO1xyXG4gIH1cclxuXHJcbiAgdXNlckZhdm9yaXRlcygpOk9ic2VydmFibGU8YW55W10+IHtcclxuICAgIHJldHVybiB0aGlzLmZhdm9yaXRlcy5waXBlKCk7XHJcbiAgfVxyXG5cclxuICB1c2VyQWRkcmVzc2VzKCk6T2JzZXJ2YWJsZTxBZGRyZXNzW10+IHtcclxuICAgIHJldHVybiB0aGlzLmFkZHJlc3Nlcy5waXBlKCk7XHJcbiAgfVxyXG5cclxuICB1c2VySGlzdG9yeSgpOk9ic2VydmFibGU8YW55W10+IHtcclxuICAgIHJldHVybiB0aGlzLmhpc3RvcnlJdGVtcy5waXBlKCk7XHJcbiAgfVxyXG4gIHVzZXJUcmFuc2FjdGlvbnNIaXN0b3J5KCk6T2JzZXJ2YWJsZTxhbnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVRyYW5zYWN0aW9ucy5waXBlKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0QXV0aFRva2VuKCk6c3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmF1dGhUb2tlbjtcclxuICB9XHJcblxyXG4gIHNldEF1dGhUb2tlbihhdXRoVG9rZW46IHN0cmluZywgdXBkYXRlUHJvZmlsZTogYm9vbGVhbiA9IHRydWUpOnZvaWQge1xyXG4gICAgaWYodGhpcy5yZW1lbWJlck1lKSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExTX1RPS0VOX05BTUUsIGF1dGhUb2tlbik7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdnZjpsb2dpbjpwaG9uZScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hdXRoVG9rZW4gPSBhdXRoVG9rZW47XHJcbiAgICB0aGlzLmlzTG9nZ2VkSW4ubmV4dCh0cnVlKTtcclxuXHJcbiAgICAvKmlmKHVwZGF0ZVByb2ZpbGUpIHtcclxuICAgICAgdGhpcy5nZXRQcm9maWxlKCkuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMuZ2V0RmF2b3JpdGVzKCkuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMuZ2V0QWRkcmVzc2VzKCkuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMuZ2V0SGlzdG9yeSgpLnN1YnNjcmliZSgpO1xyXG4gICAgfSovXHJcbiAgfVxyXG5cclxuICBkZWxldGVBdXRoVG9rZW4oKTp2b2lkIHtcclxuICAgIHRoaXMuYXV0aFRva2VuID0gdW5kZWZpbmVkO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oTFNfVE9LRU5fTkFNRSk7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZ2Y6bG9naW46cGhvbmUnKTtcclxuICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KGZhbHNlKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==