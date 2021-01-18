export declare interface User {
  id: number,
  name: string,
  email: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
  verified: boolean,
  birthday?:string;
  additionalInfo?:any;
  avatar?:string;
  captcha?: string
}
export declare interface ProfileResponseData {
  token: string,
  user: User
}
export declare interface Address {
  id: string;
  street?: string;
  streetId?:string;
  home: string;
  name?: string;
  housing?: string;
  index?: string;
  entrance?: string;
  floor?: string;
  apartment?: string;
  doorphone?: string;
}
export declare interface AddDishToFavoritesRequestData {
  dishId: string
}
export declare interface AddAddressRequestData {
  street: string,
  streetId: string,
  home: string,
  name?: string,
  housing?: string,
  index?: string,
  entrance?: string,
  floor?: string,
  apartment?: string,
  doorphone?: string
}
export declare interface SignUpResponseData {
  token: string,
  user: User
}
export declare interface UpdateProfileRequestData {
  name: string,
  birthday?:string;
  additionalInfo?:any;
  phone?: string,
  email: string
}
export declare interface UpdateProfileResponseData {
  token: string,
  user: User
}

export declare interface SignInRequestData {
  phone: string,
  password: string,
  captcha: string
}

export declare interface SignInResponseData {
  token: string,
  user: User
}
export declare interface SignUpRequestData {
  name: string,
  phone: string,
  email: string,
  password: string,
  captcha: string
}
export declare interface ResetPasswordRequestData {
  phone: string,
  captcha: string
}
export declare interface ResetPasswordResponseData {
  userId: string
}
export declare interface ResetPasswordCodeResponseData {
  token: string,
  user: User
}
export declare interface ResetPasswordCodeRequestData {
}
export declare interface RemoveAddressRequestData {
  id: string,
  street: string,
  home: string
}
export declare interface RemoveDishFromFavoritesRequestData {
  dishId: string
}
