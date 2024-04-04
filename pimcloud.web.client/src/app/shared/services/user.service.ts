import { Injectable, signal, WritableSignal } from "@angular/core";
import { IUserInfo } from "../interface/user.interface";

Injectable();

export class UserService {
  private userInfo: WritableSignal<IUserInfo | null>;
  constructor() {
    this.userInfo = signal(null);
  }
  get userDetail(): IUserInfo | null {
    return this.userInfo();
  }
  public createUser(user: IUserInfo): void {
    this.userInfo.set(user);
  }
}