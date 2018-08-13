import { User } from "./user";

export interface SignInResponseData {
  token: string,
  user: User
}