import { Injectable } from '@angular/core';
import { NetService } from '@webresto/ng-core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import {
  Address, SignInRequestData, SignInResponseData, User, UpdateProfileRequestData,
  UpdateProfileResponseData, AddAddressRequestData, RemoveAddressRequestData, SignUpRequestData,
  ResetPasswordRequestData, ResetPasswordCodeRequestData,
  AddDishToFavoritesRequestData, RemoveDishFromFavoritesRequestData
} from '../../models';

const LS_TOKEN_NAME = 'gf:tkn:v2';

@Injectable({
  providedIn: 'root'
})
export class NgRestoUserService {

  private authToken: string = localStorage.getItem(LS_TOKEN_NAME);
  private rememberMe: boolean = false;
  private user: BehaviorSubject<User>;
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.authToken ? true : false);
  private favorites: BehaviorSubject<any[]>;
  private addresses: BehaviorSubject<Address[]>;
  private historyItems: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private historyTransactions: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private bonusSystems: BehaviorSubject<any[]>;

  constructor(private net: NetService) {
    const isLoggedSubscription = this.isLoggedIn.pipe(
      filter(isLoggedIn => !!isLoggedIn),
      switchMap(() => this.getFavorites()),
      switchMap(() => this.getProfile()),
      switchMap(() => this.getAddresses()),
      switchMap(() => this.getBonuses()),
    ).subscribe(() => { }, () => { }, () => isLoggedSubscription.unsubscribe()
    );
  }

  signIn(data: SignInRequestData, rememberMe: boolean = false) {

    this.rememberMe = rememberMe;

    return this.net.post('/signin', data).pipe(
      tap(
        (result: SignInResponseData) => {
          this.setAuthToken(result.token);
          this.user.next(result.user);
          this.isLoggedIn.next(true);
        },
        () => { }
      )
    );

  }

  getProfile() {
    return this.user ? this.user : this.net.get<User>('/user/get/user-info').pipe(
      switchMap(
        result => {
          this.user = new BehaviorSubject(result);
          return this.user;
        })
    );
  }

  getHistory() {
    return this.net.get('/user/get/history').pipe(
      tap(
        (historyItems) => {
          this.historyItems.next(historyItems);
        },
        error => {
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
        () => { }
      )
    );
  }

  updateProfile(data: UpdateProfileRequestData) {
    return this.net.post('/user/set/user-info', {
      user: data
    }).pipe(
      tap(
        (result: UpdateProfileResponseData) => {
          this.user.next(result.user);
        },
        () => { }
      )
    )
  }

  getAddresses() {
    return this.addresses ? this.addresses : this.net.get<Address[]>('/user/get/location').pipe(
      switchMap(
        addresses => {
          this.addresses = new BehaviorSubject(addresses);
          return this.addresses;
        })
    );
  }

  addAddress(address: AddAddressRequestData) {
    return this.net.post<AddAddressRequestData, Address[]>('/user/add/location', address).pipe(
      switchMap(
        addresses => {
          this.addresses.next(addresses);
          return this.addresses;
        })
    );
  }

  deleteAddress(address: Address) {
    return this.net.post<RemoveAddressRequestData, Address[]>('/user/remove/location', {
      id: address.id,
      street: address.street,
      home: address.home
    }).pipe(
      tap(
        (addresses: Address[]) => {
          this.addresses.next(addresses);
        },
        () => { }
      )
    );
  }

  signUp(data: SignUpRequestData) {
    return this.net.post('/signup', data).pipe(
      tap(
        () => {
          //this.setAuthToken(result.token, false);
          //this.user.next(result.user);
        },
        () => { }
      )
    );
  }

  signOut() {
    return this.deleteAuthToken();
  }


  getBonuses() {
    return this.bonusSystems ? this.bonusSystems : this.net.post('/bonus/get', {}).pipe(
      switchMap(
        result => {
          this.bonusSystems = new BehaviorSubject(result);
          return this.bonusSystems;
        })
    );
  }

  resetPassword(data: ResetPasswordRequestData) {
    return this.net.post('/reset', data).pipe(
      tap(
        () => { },
        () => { }
      )
    );
  }

  resetPasswordCode(data: ResetPasswordCodeRequestData) {
    return this.net.post('/code', data).pipe(
      tap(
        () => { },
        () => { }
      )
    );
  }


  getFavorites() {
    return this.favorites ? this.favorites : this.net.get<any[]>('/user/get/favorites').pipe(
      switchMap(
        result => {
          console.info('getFavorites result', result);
          this.favorites = new BehaviorSubject(result);
          return this.favorites;
        })
    );
  }

  addDishToFavorites(dish: any) {
    return this.net.post<AddDishToFavoritesRequestData, any[]>('/user/add/favorites ', {
      dishId: dish.id
    }).pipe(
      tap(
        result => this.favorites.next(result),
        () => { }
      )
    );
  }

  removeDishFromFavorites(dish: any) {
    return this.net.post<RemoveDishFromFavoritesRequestData, any[]>('/user/remove/favorites ', {
      dishId: dish.id
    }).pipe(
      tap(
        result => {
          console.info('Было=>>>', this.favorites.getValue().length);
          let favoritesUpdated: any[] = this.favorites
            .getValue()
            .filter(item => item.id != dish.id);
          console.info('Стало=>>>', favoritesUpdated.length);
          this.favorites.next(result);
        },
        () => { }
      )
    );
  }

  userProfile(): Observable<User> {
    return this.user ? this.user : this.getProfile().pipe(
      switchMap(() => this.getFavorites()),
      switchMap(() => this.getAddresses()),
      switchMap(() => this.getBonuses()),
      switchMap(() => this.user)
    );
  }

  userIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  userFavorites(): Observable<any[]> {
    return this.favorites ? this.favorites.asObservable() : of([]);
  }

  userAddresses(): Observable<Address[]> {
    return this.addresses ? this.addresses.asObservable() : of([]);
  }

  userHistory(): Observable<any[]> {
    return this.historyItems ? this.historyItems.asObservable() : of([]);
  }

  userTransactionsHistory(): Observable<any[]> {
    return this.historyTransactions ? this.historyTransactions.asObservable() : of([]);
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
        result => this.user.next(result.user),
        () => { }
      )
    );
  }
}
