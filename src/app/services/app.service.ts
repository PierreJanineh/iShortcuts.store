import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Account} from '../models/account';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  account = Account.getInstance();

  constructor() { }

  logIn(username: string, password: string, firebase: FirebaseService, usernameAlert$: BehaviorSubject<boolean>, passwordAlert$: BehaviorSubject<boolean>) {
    firebase.getUserByUsername(username).subscribe((user) => {
      if (user != null){
        if (user.password === password){
          usernameAlert$.next(false);
          passwordAlert$.next(false);
          this.account.loggedIn$.next(true);
          this.account.user = user;
          return true;
        }
        usernameAlert$.next(false);
        passwordAlert$.next(true);
        this.account.loggedIn$.next(false);
        return false;
      } else {
        firebase.getAllUsersObservable().subscribe((users) => {
          for (const usr of users) {
            if (usr.email === username /*as email*/ && usr.password === password) {
              usernameAlert$.next(false);
              passwordAlert$.next(false);
              this.account.loggedIn$.next(true);
              this.account.user = usr;
              return true;
            }
            passwordAlert$.next(true);
          }
          usernameAlert$.next(true);
        });
      }
      this.account.loggedIn$.next(false);
      return false; //true for successful
    });
  }

  register(username: string, password: string, email: string, url: string, firebase: FirebaseService){

  }

  logout(){
    this.account.logout();
  }
}
