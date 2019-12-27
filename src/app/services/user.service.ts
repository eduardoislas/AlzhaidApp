import { Injectable } from '@angular/core';
import { User } from '../user/user.module'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserLoggedIn;
  public userLogged:User;

  constructor() { 
    this.isUserLoggedIn = false;
  }

  setUserLogged(user:User) {
    this.isUserLoggedIn = true;
    this.userLogged = user;
    localStorage.setItem('CurrentUser', JSON.stringify(user));
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('CurrentUser'));
  }
}
