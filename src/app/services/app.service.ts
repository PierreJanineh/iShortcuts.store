import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Account} from '../models/account';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  account = Account.getInstance();

  constructor() { }

  logIn(username: string, password: string, firebase: FirebaseService, usernameAlert$: BehaviorSubject<boolean>, passwordAlert$: BehaviorSubject<boolean>) {
    username = username.toLowerCase();
    console.log(username);
    firebase.getUserByUsername(username).subscribe((user) => {
      if (user != null){
        if (user.password === password){
          usernameAlert$.next(false);
          passwordAlert$.next(false);
          this.account.login(user);
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
              this.account.login(usr);
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
    username = username.toLowerCase();
    const user = new User(username, password, url, email);
    firebase.createUser(user);
    this.account.register(user);
  }

  checkUsernameExists(username: string, firebase: FirebaseService, usernameExists$: BehaviorSubject<boolean>){
    username = username.toLowerCase();
    firebase.getAllUsersObservable().subscribe((users) => {
      for (const user of users){
        if (user.username === username){
          usernameExists$.next(true);
        }
      }
    })
  }

  logout(){
    this.account.logout();
  }

  updateAccountInfo(user: User, firebase: FirebaseService){
    firebase.updateUser(user);
    this.account.user = user;
  }
}
