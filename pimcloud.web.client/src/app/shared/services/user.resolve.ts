import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/service/auth.service";

@Injectable({
  providedIn: "root"
})

export class UserDataResolve {
  constructor(private authService: AuthService) {

  }

  resolve(): Observable<any> {
    return this.authService.getUser();
  }
}
