import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Account} from '../models/account';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {Glyphs} from '../models/glyphs';
import {Colors} from '../models/colors';
import {Shortcut} from '../models/shortcut';

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

  logInFromLocalStorage(username: string, password: string, firebase: FirebaseService){
    firebase.getUserByUsername(username).subscribe((user) => {
      this.account.login(user);
    });
  }

  register(username: string, password: string, email: string, url: string, firebase: FirebaseService){
    username = username.toLowerCase();
    const user = new User(username, password, url, email);
    firebase.createUser(user);
    this.account.register(user);
  }

  createShortcut(shortcut: Shortcut, firebase: FirebaseService){
    shortcut.name.toLowerCase();
    shortcut.uniqueName.toLowerCase();
    firebase.createShortcut(shortcut);
  }

  checkUsernameExists(username: string, firebase: FirebaseService, usernameExists$: BehaviorSubject<boolean>){
    username = username.toLowerCase();
    firebase.getAllUsersObservable().subscribe((users) => {
      for (const user of users){
        let reg = new RegExp('^[\\dA-Za-z]*$');
        if (!reg.test(username)){
          usernameExists$.next(true);
        } else {
          usernameExists$.next(true);
        }
      }
    });
  }

  checkShortcutNameErrors(name: string, firebase: FirebaseService, shortcutNameError$: BehaviorSubject<boolean>){
    name = name.toLowerCase();
    let reg = new RegExp('^[\\s\\dA-Za-z]*$');
    if (!reg.test(name)){
      console.log(reg.test(name));
      shortcutNameError$.next(true);
    } else {
      shortcutNameError$.next(false);
    }
  }

  checkShortcutUniqueNameExists(uniqueName: string, firebase: FirebaseService, shortcutUniqueNameExists$: BehaviorSubject<boolean>){
    uniqueName = uniqueName.toLowerCase();let reg = new RegExp('^[\\dA-Za-z]*$');
    if (!reg.test(uniqueName)){
      shortcutUniqueNameExists$.next(true);
      return;
    }
    firebase.getAllShortcutsObservable().subscribe((shortcuts) => {
      for (const short of shortcuts){
        if (short.uniqueName === uniqueName){
          shortcutUniqueNameExists$.next(true);
        }else {
          shortcutUniqueNameExists$.next(false);
        }
      }
    });
  }

  checkShortcutUrlErrors(url: string, firebase: FirebaseService, shortcutUrlError$: BehaviorSubject<boolean>){
    url = url.toLowerCase();
    if (url.search("https://www.icloud.com/shortcuts/") > -1 ||
      url.search("https://icloud.com/shortcuts/") > -1){
      shortcutUrlError$.next(false);
    }else {
      shortcutUrlError$.next(true);
    }
  }

  logout(){
    this.account.logout();
  }

  updateAccountInfo(user: User, firebase: FirebaseService){
    firebase.updateUser(user);
    this.account.user = user;
  }

  danger(groupS: string, controlS: string) {
    const group = document.getElementById(groupS);
    const control = document.getElementById(controlS);
    if (control.classList.contains('form-control-success')) {
      control.classList.replace('form-control-success', 'form-control-danger');
      group.classList.replace('has-success', 'has-danger');
    } else if (!control.classList.contains('form-control-danger')) {
      control.classList.add('form-control-danger');
      group.classList.add('has-danger');
    }
  }

  success(groupS: string, controlS: string) {
    const group = document.getElementById(groupS);
    const control = document.getElementById(controlS);
    if (control.classList.contains('form-control-danger')) {
      control.classList.replace('form-control-danger', 'form-control-success');
      group.classList.replace('has-danger', 'has-success');
    } else if (!control.classList.contains('form-control-success')) {
      control.classList.add('form-control-success');
      group.classList.add('has-success');
    }
  }

  getAllGlyphs(): string[] {
    let glyphs: string[] = [];
    for (const g in Glyphs){
      glyphs[glyphs.length] = Glyphs[g];
    }
    return glyphs;
  }

  getAllColors(): string[] {
    let colors: string[] = [];
    for (const c in Colors){
      colors[colors.length] = Colors[c];
    }
    return colors;
  }
}
