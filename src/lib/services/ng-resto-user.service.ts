import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { EventerService, EventMessage, NetService } from '@webresto/ng-core';
import {
  Address, SignInRequestData, SignInResponseData, User, UpdateProfileRequestData,
  UpdateProfileResponseData, AddAddressRequestData, RemoveAddressRequestData, SignUpRequestData,
  SignUpResponseData, ResetPasswordRequestData, ResetPasswordResponseData, ResetPasswordCodeRequestData,
  ResetPasswordCodeResponseData, AddDishToFavoritesRequestData, RemoveDishFromFavoritesRequestData
} from '../../models';

const LS_TOKEN_NAME = 'gf:tkn:v2';

@Injectable({
  providedIn: 'root'
})
export class NgRestoUserService {

  private authToken: string = localStorage.getItem(LS_TOKEN_NAME);
  private rememberMe: boolean = false;
  private user: BehaviorSubject<any> = new BehaviorSubject({});
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.authToken ? true : false);
  private favorites: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private addresses: BehaviorSubject<Address[]> = new BehaviorSubject([]);
  private historyItems: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private historyTransactions: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private bonusSystems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private isLoggedSubscription = this.isLoggedIn.pipe(
    filter(isLoggedIn => isLoggedIn === true),
    switchMap(() => this.getFavorites()),
    switchMap(() => this.getProfile()),
    switchMap(() => this.getAddresses()),
    switchMap(() => this.getBonuses()),
    switchMap(() => this.getHistory())
  ).subscribe(() => { }, () => { }, () => this.isLoggedSubscription.unsubscribe());

  constructor(
    //private restoStorageService:RestoStorageService,
    private net: NetService,
    private eventer: EventerService
  ) { }

  signIn(data: SignInRequestData, rememberMe: boolean = false) {

    this.rememberMe = rememberMe;

    return this.net.post('/signin', data).pipe(
      tap(
        (result: SignInResponseData) => {
          this.setAuthToken(result.token);
          this.user.next(result.user);
          this.isLoggedIn.next(true);
          this.eventer.emitMessageEvent(
            new EventMessage('success', 'Успех', 'Успешно авторизирован')
          );
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );

  }

  getProfile() {
    return this.net.get('/user/get/user-info').pipe(
      tap(
        (result: User) => {
          this.user.next(result);
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }

  getHistory() {
    return this.net.get('/user/get/history').pipe(
      tap(
        (historyItems) => {
          this.historyItems.next(historyItems);
        },
        error => {
          this.eventer.emitMessageEvent(
            new EventMessage(error?.type, error?.title, error?.body)
          );
          if (error?.type === "Unauthorized") {
            this.deleteAuthToken();
          };
        })
    );
  }

  getHistoryTransactions(bonusSystem: string = "local", limit: number = 15, set: number = 0) {
    return this.net.get(`/bonus/transactions?bonussystem=${bonusSystem}&limit=${limit}&number=${set}`).pipe(
      tap(
        (transactions) => {
          this.historyTransactions.next(transactions);
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }

  updateProfile(data: UpdateProfileRequestData) {
    return this.net.post('/user/set/user-info', {
      user: data
    }).pipe(
      tap(
        (result: UpdateProfileResponseData) => {
          this.user.next(result);
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    )
  }

  getAddresses() {
    return this.net.get('/user/get/location').pipe(
      tap(
        (addresses: Address[]) => {
          this.addresses.next(addresses);
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }

  addAddress(address: AddAddressRequestData) {
    return this.net.post('/user/add/location', address).pipe(
      tap(
        (addresses: Address[]) => {
          this.addresses.next(addresses);
        },

        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }

  deleteAddress(address: Address) {
    var reqBody: RemoveAddressRequestData = {
      id: address.id,
      street: address.street,
      home: address.home
    };

    return this.net.post('/user/remove/location', reqBody).pipe(
      tap(
        (addresses: Address[]) => {
          this.addresses.next(addresses);
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }

  signUp(data: SignUpRequestData) {
    return this.net.post('/signup', data).pipe(
      tap(
        (result) => {
          //this.setAuthToken(result.token, false);
          //this.user.next(result.user);
          this.eventer.emitMessageEvent(
            new EventMessage(result?.message?.type, result?.message?.title, result?.message?.body)
          );
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }

  signOut() {
    return this.deleteAuthToken();
  }


  getBonuses() {
    return this.net.post('/bonus/get', {}).pipe(
      tap(
        (result: any) => {
          this.bonusSystems.next(result);
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }

  resetPassword(data: ResetPasswordRequestData) {
    return this.net.post('/reset', data).pipe(
      tap(
        (result: ResetPasswordResponseData) => {

        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }

  resetPasswordCode(data: ResetPasswordCodeRequestData) {
    return this.net.post('/code', data).pipe(
      tap(
        (result: ResetPasswordCodeResponseData) => {

        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }


  getFavorites() {
    return this.net.get('/user/get/favorites').pipe(
      tap(
        (result: any[]) => {
          console.info('getFavorites result', result);
          this.favorites.next(result);
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }

  addDishToFavorites(dish: any) {
    let data: AddDishToFavoritesRequestData = {
      dishId: dish.id
    };
    return this.net.post<AddDishToFavoritesRequestData, any[]>('/user/add/favorites ', data).pipe(
      tap(
        result => {
          let favoritesUpdated: any[] = this.favorites.getValue();
          favoritesUpdated.push(dish);

          this.favorites.next(result);
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }

  removeDishFromFavorites(dish: any) {
    let data: RemoveDishFromFavoritesRequestData = {
      dishId: dish.id
    };
    return this.net.post('/user/remove/favorites ', data).pipe(
      tap(
        (result: any[]) => {
          console.info('Было=>>>', this.favorites.getValue().length);
          let favoritesUpdated: any[] = this.favorites
            .getValue()
            .filter(item => item.id != dish.id);
          console.info('Стало=>>>', favoritesUpdated.length);
          this.favorites.next(result);
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );
  }

  userProfile(): BehaviorSubject<User> {
    return this.user;
  }

  userIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  userFavorites(): Observable<any[]> {
    return this.favorites.pipe();
  }

  userAddresses(): Observable<Address[]> {
    return this.addresses.pipe();
  }

  userHistory(): Observable<any[]> {
    return this.historyItems.pipe();
  }
  userTransactionsHistory(): Observable<any[]> {
    return this.historyTransactions.pipe();
  }

  getAuthToken(): string {
    return this.authToken;
  }

  setAuthToken(authToken: string): void {
    if (this.rememberMe) {
      localStorage.setItem(LS_TOKEN_NAME, authToken);
    };
    this.authToken = authToken;
    this.isLoggedIn.next(true);
    /*if(updateProfile) {
      this.getProfile().subscribe();
      this.getFavorites().subscribe();
      this.getAddresses().subscribe();
      this.getHistory().subscribe();
    }*/
  }

  deleteAuthToken(): void {
    this.authToken = null;
    localStorage.removeItem(LS_TOKEN_NAME);
    this.isLoggedIn.next(false);
  }

  saveAvatar(avatar: File) {
    const data = new FormData();
    data.append('avatar', avatar, avatar.name);
    return this.net.post('/user/avatar/upload', data, true, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).pipe(
      tap(
        (result) => {
          this.user.next(result.user);
          this.eventer.emitMessageEvent(
            new EventMessage('success', 'Успех', 'Аватар загружен')
          );
        },
        error => this.eventer.emitMessageEvent(
          new EventMessage(error?.type, error?.title, error?.body)
        )
      )
    );

  }

}
