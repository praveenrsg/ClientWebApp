export interface IRegister {
  password: string;
  confirmPassword?: string;
  email: string,
}
export interface IRegisterResponse {
  msg_code: string;
  message: string;
}
export interface IGioLocation {
  IPv4: string,
  city: string,
  country_code: string,
  country_name: string,
  postal: string,
  state: string,
}
