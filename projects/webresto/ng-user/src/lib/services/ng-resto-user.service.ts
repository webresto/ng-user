import { Injectable } from '@angular/core';
import { NetService } from '@webresto/ng-core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private user: BehaviorSubject<any> = new BehaviorSubject(null);
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.authToken ? true : false);
  private favorites: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private addresses: BehaviorSubject<Address[]> = new BehaviorSubject([]);
  private historyItems: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private historyTransactions: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private bonusSystems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

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
    return this.net.get('/user/get/user-info').pipe(
      tap(
        (result: User) => {
          this.user.next(result);
        },
        () => { }
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
    return this.net.get('/user/get/location').pipe(
      tap(
        (addresses: Address[]) => {
          this.addresses.next(addresses);
        },
        () => { }
      )
    );
  }

  addAddress(address: AddAddressRequestData) {
    return this.net.post('/user/add/location', address).pipe(
      tap(
        (addresses: Address[]) => {
          this.addresses.next(addresses);
        },
        () => { }
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
        () => { }
      )
    );
  }

  signUp(data: SignUpRequestData) {
    return this.net.post('/signup', data).pipe(
      tap(
        (result) => {
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
    return this.net.post('/bonus/get', {}).pipe(
      tap(
        result => this.bonusSystems.next(result),
        () => { }
      )
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
    return this.net.get<any[]>('/user/get/favorites').pipe(
      tap(
        result => {
          console.info('getFavorites result', result);
          this.favorites.next(result);
        },
        () => { }
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
        () => { }
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
        () => { }
      )
    );
  }

  userProfile(): Observable<User> {
    return !!this.user.value ? this.user : this.getProfile().pipe(
      switchMap(() => this.getProfile()),
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
        result => this.user.next(result.user),
        () => { }
      )
    );
  }
}
