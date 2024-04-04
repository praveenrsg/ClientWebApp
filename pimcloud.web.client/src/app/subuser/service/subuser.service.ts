import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { IUserDetails, IUserInviteDetails } from "../interface/subuser.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class UserDetailsService {
  private baseURL = environment.BASE_URL;
  newEmptyModal: IUserDetails = {
    id: 0,
    name: "",
    email: "",
    mobileNumber: "",
    countryCode: "",
    accesses: [],
    createdAt: "",
    editedAt: "",
    status: [],
    role: []
    , fileUpload: ""
  };
  private selectedItemSubject = new BehaviorSubject<IUserDetails>(this.newEmptyModal);

  selectedItem$ = this.selectedItemSubject.asObservable();

  constructor(private http: HttpClient) { }

  setSelectedItem(item: any) {
    this.selectedItemSubject.next(item);
  }

  public getAllSubUserDetails(): Observable<IUserDetails[]> {
    return this.http.get<IUserDetails[]>(`${this.baseURL}/User`);
  }
  public getUserRolePermission(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}subuser/roles`);
  }
  public inviteUser(payload: IUserInviteDetails): Observable<any> {
    if (payload.id > 0) {
      return this.http.put(`${this.baseURL}subuser/` + payload.id, payload);
    } else {
      return this.http.post(`${this.baseURL}subuser/invite`, payload);
    }
  }
  public deleteSubuser(payload: any): Observable<any> {
    return this.http.delete(`${this.baseURL}subuser/${payload.id}`, payload);
  }
  public reinviteSubuser(payload: any): Observable<any> {
    return this.http.get(`${this.baseURL}subuser/reinvite/${payload.id}`, payload);
  }
}