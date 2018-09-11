import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  NetService,
  EventerService,
  EventMessage
} from '@sails-resto/ng-core';

import { SignInRequestData } from '../interfaces/sign-in-request-data';
import { SignUpRequestData } from '../interfaces/sign-up-request-data';
import { ResetPasswordRequestData } from '../interfaces/reset-password-request-data';
import { ResetPasswordCodeRequestData } from '../interfaces/reset-password-code-request-data';
import { AddDishToFavoritesRequestData } from '../interfaces/add-dish-to-favorites-request-data';
import { RemoveDishFromFavoritesRequestData } from '../interfaces/remove-dish-from-favorites-request-data';
import { ProfileResponseData } from '../interfaces/profile-response-data';

import { SignInResponseData } from '../interfaces/sign-in-response-data';
import { SignUpResponseData } from '../interfaces/sign-up-response-data';
import { ResetPasswordResponseData } from '../interfaces/reset-password-response-data';
import { ResetPasswordCodeResponseData } from '../interfaces/reset-password-code-response-data';
import { UpdateProfileResponseData } from '../interfaces/update-profile-response-data';
import { UpdateProfileRequestData } from '../interfaces/update-profile-request-data';


import { User } from '../interfaces/user';

const LS_TOKEN_NAME = 'ghtke';

@Injectable({
  providedIn: 'root'
})
export class NgRestoUserService {

  private authToken:string;
  private rememberMe:boolean = false;
  private user:BehaviorSubject<any>;
  private isLoggedIn:BehaviorSubject<boolean>;
  private favorites:BehaviorSubject<any[]>;

  constructor(
    //private restoStorageService:RestoStorageService,
    private net:NetService,
    private eventer:EventerService
  ) {
    this.user = new BehaviorSubject({});
    this.isLoggedIn = new BehaviorSubject(false);
    this.favorites = new BehaviorSubject([]);

    this.authToken = localStorage.getItem(LS_TOKEN_NAME);
    if(this.authToken) {
      this.isLoggedIn.next(true);
    }

    this.isLoggedIn.subscribe(isLoggedIn => {
      if(isLoggedIn) {
        setTimeout(() => {
          this.getFavorites().subscribe();
          this.getProfile().subscribe();
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

            this.setAuthToken(result.token);
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

  updateProfile(data:UpdateProfileRequestData) {
    return this.net.post('/user/set/user-info', data)
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

  signUp(data:SignUpRequestData) {
    return this.net.post('/signup', data)
      .pipe(
        tap(
          (result: SignUpResponseData) => {

            this.setAuthToken(result.token);
            this.user.next(result.user);

            this.eventer.emitMessageEvent(
              new EventMessage('success', 'Успех', 'Успешно зарегистирован')
            )
          },

          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  signOut() {
    return this.deleteAuthToken();
  }

  resetPassword(data:ResetPasswordRequestData) {

    return this.net.post('/login', data)
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

  addDishToFavorites(data:AddDishToFavoritesRequestData) {
    return this.net.post('/user/add/favorites ', data)
      .pipe(
        tap(
          (result: any) => {
            console.info('addDishToFavorites result', result);
          },
          error => this.eventer.emitMessageEvent(
            new EventMessage('error', 'Ошибка', error)
          )
        )
      );
  }

  removeDishFromFavorites(data:RemoveDishFromFavoritesRequestData) {
    return this.net.post('/user/remove/favorites ', data)
      .pipe(
        tap(
          (result: any) => {
            console.info('removeDishFromFavorites result', result);
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



  getAuthToken():string {
    return this.authToken;
  }

  setAuthToken(authToken: string):void {
    if(this.rememberMe) {
      localStorage.setItem(LS_TOKEN_NAME, authToken);
    }
    this.authToken = authToken;
    this.isLoggedIn.next(true);
  }

  deleteAuthToken():void {
    this.authToken = undefined;
    localStorage.removeItem(LS_TOKEN_NAME);
    this.isLoggedIn.next(false);
  }

}
