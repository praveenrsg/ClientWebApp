import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private baseURL = environment.BASE_URL;
  constructor(private http: HttpClient) {
  }
  public getUser() {
    return this.http.get(`${this.baseURL}auth/userInfoDetails`);
  }
  public isAuthenticated(): boolean {
    if (localStorage.getItem("access_token")) {
      const token = JSON.stringify(localStorage.getItem("access_token"));
      const token_status = this.check_token_status(token);
      return token_status ? true : false;
    } else {
      return false;
    }
  }
  private check_token_status(access_token: string): boolean {
    const t = access_token.split(".")[1];
    const token = JSON.parse(decodeURIComponent(atob(t)));
    const today = new Date();
    const today_sec = Math.round(today.getTime() / 1000);
    const active = token.exp - today_sec;
    return active ? true : false;
  }
  public verifyOTP(payload: { email: string, otp: string }): Observable<any> {
    return this.http.post(`${this.baseURL}auth/verifyotp`, payload);
  }
  // used for forgot password verification
  public verifyOTPv2(payload: { email: string, otp: string }): Observable<any> {
    return this.http.post(`${this.baseURL}auth/forgotpasswordverifyotp`, payload);
  }
  public resendOTP(email: string): Observable<any> {
    return this.http.post(`${this.baseURL}auth/resentotp`, { email });
  }
  public forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseURL}auth/forgotpassword`, { email });
  }
  public changePassword(payload: { token: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseURL}auth/changepassword`, payload);
  }
}