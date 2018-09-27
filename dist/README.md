# @sails-resto/ng-user
## Установка модуля
Модуль устанавливается с Git репозитория, в папку node_modules
## Подключение модуля в проект
Добавьте следующие в ваш app.module.ts

~~~ javascript
import { NgUserModule } from '@sails-resto/ng-user';
import { ngCoreHttpInterceptorProviders } from '@sails-resto/ng-core';
import { ngUserHttpInterceptorProviders } from '@sails-resto/ng-user';
~~~
~~~ javascript  
imports: [
  .......... 
  NgUserModule 
],
providers: [
  ..........
  ngCoreHttpInterceptorProviders,
  ngUserHttpInterceptorProviders
],
~~~


## Использование сервиса
~~~ javascript
import { NgRestoUserService } from '@sails-resto/ng-user';
..........
constructor(
    private userService: NgRestoUserService
) {
    // Проверить авторизирован ли, и подписатся на изменения
    this.userService
      .userIsLoggedIn()
      .subscribe(isLoggedIn => {
        ...........
      });
    
    // Получить данные профиля и подписатся на изменения  
    this.userService
      .userProfile()
      .subscribe(user => {
        this.user = user;
        ...........
      });
      
    // Прописать токен авторизации принудительно
    // Автоматически подменятся данные профиля и избранные
    this.usrtService.setAuthToken(token)
}
~~~

## Директивы


### [appSignIn] - Вход по логин/паролю
Пример использования в компоненте:

~~~ html
 <input #phone type="text">
 <input #password type="password">
 <input #rememberMe type="checkbox">
 ........
 <button appSignIn
        [phone]="phone.value"
        [password]="password.value"
        [captcha]="captcha"
        [rememberMe]="rememberMe.value"
    
        (success)="...."
        (error)="....">Войти</button>
~~~

### [appSignUp] - Регистрация
Пример использования в компоненте:

~~~ html
 <input #name type="text">
 <input #phone type="text">
 <input #email type="text">
 <input #password type="password">
 ........
 <button appSignUp
        [name]="name.value"
        [phone]="phone.value"
        [email]="email.value"
        [password]="password.value"
        [captcha]="captcha"
    
        (success)="...."
        (error)="....">Регистрация</button>
~~~

### [appBalance]  - добавляет значение текущего баланса
Пример использования в компоненте:

~~~ html
<span appBalance></span>
~~~
Директива добавит внутрь контейнера строку с текущим балансом

### [appSignOut] - выход со своего аккаунта
Пример использования в компоненте:

~~~ html
<button appSignOut class="btn-yellow-hollow align-center">Выход</button>
~~~

### [appToggleDishToFavorites] - Добавить/удалить в списке Избранных
Пример использования в компоненте:

~~~ html
 ........
 <button appToggleDishToFavorites
        [dish]="dish"
        
        (change)="...."
        (addedToFavorites)="...."
        (removedFromFavorites)="...."
        (error)="....">Регистрация</button>
~~~

Также в случае, если товар в избранных - добавляется автоматом класс selected. После удаления из списка избранных удаляется и класс selected.

Событие change происходит при добавлении и удалении товара в избранные со значением true/false
Событие addedToFavorites - при добавлении товара в избранное
Событие removedFromFavorites - при удалении из избранных