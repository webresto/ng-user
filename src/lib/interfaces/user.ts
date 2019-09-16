export interface User {
  id: number,
  name: string,
  email: string,
  phone: string,

  createdAt: string,
  updatedAt: string,

  verified: boolean,

  captcha?: string
}