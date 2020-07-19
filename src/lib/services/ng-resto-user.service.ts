import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';

import {EventerService, EventMessage, NetService} from '@webresto/ng-core';

import {SignInRequestData} from '../interfaces/sign-in-request-data';
import {SignUpRequestData} from '../interfaces/sign-up-request-data';
import {ResetPasswordRequestData} from '../interfaces/reset-password-request-data';
import {ResetPasswordCodeRequestData} from '../interfaces/reset-password-code-request-data';
import {AddDishToFavoritesRequestData} from '../interfaces/add-dish-to-favorites-request-data';
import {RemoveDishFromFavoritesRequestData} from '../interfaces/remove-dish-from-favorites-request-data';
import {SignInResponseData} from '../interfaces/sign-in-response-data';
import {SignUpResponseData} from '../interfaces/sign-up-response-data';
import {ResetPasswordResponseData} from '../interfaces/reset-password-response-data';
import {ResetPasswordCodeResponseData} from '../interfaces/reset-password-code-response-data';
import {UpdateProfileResponseData} from '../interfaces/update-profile-response-data';
import {UpdateProfileRequestData} from '../interfaces/update-profile-request-data';
import {Address, User} from '../interfaces';
import {RemoveAddressRequestData} from "../interfaces/remove-address-request-data";
import {AddAddressRequestData} from "../interfaces/add-address-request-data";

const LS_TOKEN_NAME = 'gf:tkn:v2';

@Injectable({
  providedIn: 'root'
})
export class NgRestoUserService {

  private authToken: string;
  private rememberMe:boolean = false;
  private historyTransactions: BehaviorSubject<any[]>;
  private user:BehaviorSubject<any>;
  private isLoggedIn:BehaviorSubject<boolean>;
  private favorites:BehaviorSubject<any[]>;
  private addresses:BehaviorSubject<Address[]>;
  private streets:BehaviorSubject<any[]>;
  private historyItems:BehaviorSubject<any[]>;
  private bonusSystems: BehaviorSubject<any[]>;

  constructor(
    //private restoStorageService:RestoStorageService,
    private net:NetService,
    private eventer:EventerService
  ) {
    this.user = new BehaviorSubject({});
    this.isLoggedIn = new BehaviorSubject(false);
    this.favorites = new BehaviorSubject([]);
    this.addresses = new BehaviorSubject([]);
    this.historyItems = new BehaviorSubject([]);
    this.historyTransactions = new BehaviorSubject<any[]>([]);
    this.bonusSystems = new BehaviorSubject<any[]>([]);

    this.authToken = localStorage.getItem(LS_TOKEN_NAME);
    if(this.authToken) {
      this.isLoggedIn.next(true);
    }

    this.isLoggedIn.subscribe(isLoggedIn => {
      if(isLoggedIn) {
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
        switch(message.type) {
          case "Unauthorized":
            this.deleteAuthToken();
            break;
        }
      });
  }

  signIn(data:SignInRequestData, rememberMe:boolean = false) {

    this.rememberMe = rememberMe;

    return this.net.post('/signin', data)
      .pipe(
        tap(
          (result: SignInResponseData) => {

            this.setAuthToken(result.token, false);
            this.user.next(result.user);

            this.eventer.emitMessageEvent(
              new EventMessage('success', 'Успех', 'Успешно авторизирован')
            );
          },

          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );

  }

  getProfile() {
    return this.net.get('/user/get/user-info')
      .pipe(
        tap(
          (result: User) => {
            this.user.next(result);
          },

          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  getHistory() {
    return this.net.get('/user/get/history')
      .pipe(
        tap(
          (historyItems) => {
            this.historyItems.next(historyItems);
          },

          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  getHistoryTransactions(bonusSystem: string= "local", limit: number = 15, set: number = 0) {
     return this.net.get(`/bonus/transactions?bonussystem=${bonusSystem}&limit=${limit}&number=${set}`)
      .pipe(
        tap(
          (transactions) => {
            this.historyTransactions.next(transactions);
          },

          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  updateProfile(data:UpdateProfileRequestData) {
    return this.net.post('/user/set/user-info', {
      user: data
    })
      .pipe(
        tap(
          (result: UpdateProfileResponseData) => {
            this.user.next(result);
          },
          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      )
  }

  getAddresses() {
    return this.net.get('/user/get/location')
      .pipe(
        tap(
          (addresses: Address[]) => {
            this.addresses.next(addresses);
          },

          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  addAddress(address: AddAddressRequestData) {
    return this.net.post('/user/add/location', address)
      .pipe(
        tap(
          (addresses: Address[]) => {
            this.addresses.next(addresses);
          },

          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
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

    return this.net.post('/user/remove/location', reqBody)
      .pipe(
        tap(
          (addresses: Address[]) => {
            this.addresses.next(addresses);
          },

          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  signUp(data:SignUpRequestData) {
    return this.net.post('/signup', data)
      .pipe(
        tap(
          (result: SignUpResponseData) => {

            //this.setAuthToken(result.token, false);
            //this.user.next(result.user);

            this.eventer.emitMessageEvent(
              new EventMessage('success', 'Регистрация', 'Ваш пароль был отправлен на указанный номер телефона')
            )
          },

          error => { this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )}
        )
      );
  }

  signOut() {
    return this.deleteAuthToken();
  }


  getBonuses() {
    return this.net.post('/bonus/get', {})
      .pipe(
        tap(
          (result: any) => {
            this.bonusSystems.next(result);
          },

          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  resetPassword(data:ResetPasswordRequestData) {

    return this.net.post('/reset', data)
      .pipe(
        tap(
          (result: ResetPasswordResponseData) => {

          },

          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  resetPasswordCode(data:ResetPasswordCodeRequestData) {

    return this.net.post('/code', data)
      .pipe(
        tap(
          (result: ResetPasswordCodeResponseData) => {

          },

          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }


  getFavorites() {
    return this.net.get('/user/get/favorites ')
      .pipe(
        tap(
          (result: any[]) => {
            console.info('getFavorites result', result);
            this.favorites.next(result);
          },
          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  addDishToFavorites(dish:any) {
    let data:AddDishToFavoritesRequestData = {
      dishId: dish.id
    };
    return this.net.post('/user/add/favorites ', data)
      .pipe(
        tap(
          (result: any) => {
            let favoritesUpdated: any[] = this.favorites.getValue();
            favoritesUpdated.push(dish);

            this.favorites.next(favoritesUpdated);
          },
          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  removeDishFromFavorites(dish:any) {
    let data:RemoveDishFromFavoritesRequestData = {
      dishId: dish.id
    };
    return this.net.post('/user/remove/favorites ', data)
      .pipe(
        tap(
          (result: any) => {
            console.info('Было=>>>', this.favorites.getValue().length);
            let favoritesUpdated: any[] = this.favorites
              .getValue()
              .filter(item => item.id != dish.id);
            console.info('Стало=>>>', favoritesUpdated.length);
            this.favorites.next(favoritesUpdated);
          },
          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  userProfile():BehaviorSubject<User> {
    return this.user;
  }

  userIsLoggedIn():BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  userFavorites():BehaviorSubject<any[]> {
    return this.favorites;
  }

  userAddresses():BehaviorSubject<Address[]> {
    return this.addresses;
  }

  userHistory():BehaviorSubject<any[]> {
    return this.historyItems;
  }
  userTransactionsHistory():BehaviorSubject<any[]> {
    return this.historyTransactions;
  }


  getAuthToken():string {
    return this.authToken;
  }

  setAuthToken(authToken: string, updateProfile: boolean = true):void {
    if(this.rememberMe) {
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

  deleteAuthToken():void {
    this.authToken = undefined;
    localStorage.removeItem(LS_TOKEN_NAME);
    localStorage.removeItem('gf:login:phone');
    this.isLoggedIn.next(false);
  }

}
