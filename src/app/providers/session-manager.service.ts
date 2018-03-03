import { Injectable } from '@angular/core';
import { UserData } from "../model/signin-user";

@Injectable()
export class SessionManagerService {
  private loggedInUser: UserData
  constructor() { }
  getLoggedInUser(): UserData {
    return this.loggedInUser;
  }

  setLoggedInUser(user: UserData) {
    this.loggedInUser = user;
  }


}
