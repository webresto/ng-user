import { User } from "./user";
export interface ResetPasswordCodeResponseData {
    token: string;
    user: User;
}
