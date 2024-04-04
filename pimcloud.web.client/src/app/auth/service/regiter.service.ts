import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IRegister, IRegisterResponse } from "../interface/register.interface";

@Injectable({
  providedIn: "root"
})

export class RegisterService {
  private baseURL = environment.BASE_URL;
  constructor(private http: HttpClient) {

  }

  public register(request: IRegister): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(`${this.baseURL}/register`, request);
  }

}
