import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ILogin, ILoginResponse } from "../interface/login.interface";

@Injectable({
  providedIn: "root"
})

export class LoginService {
  private baseURL = environment.BASE_URL;
  constructor(private http: HttpClient) {
  }

  public login(request: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.baseURL}/login`, request);
  }

}
