export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  tokenType: string;
  status: string,
  accountEnabled: boolean,
  accountExpired: boolean,
  accountVerified: boolean,
  expiryDate: number,
  passwordExpired: false,
  message: string;
  msg_code: string;
}