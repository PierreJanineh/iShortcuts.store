import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Account} from '../models/account';
import {BehaviorSubject} from 'rxjs';
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
    const sub = firebase.getUserByUsername(username).subscribe((user) => {
      if (user != null){
        if (user.password === password){
          usernameAlert$.next(false);
          passwordAlert$.next(false);
          this.account.login(user);
          sub.unsubscribe();
          return true;
        }
        usernameAlert$.next(false);
        passwordAlert$.next(true);
        this.account.loggedIn$.next(false);
        sub.unsubscribe();
        return false;
      } else {
        const subr = firebase.getAllUsersObservable().subscribe((users) => {
          subr.unsubscribe();
          for (const usr of users) {
            if (usr.email === username /*as email*/ && usr.password === password) {
              usernameAlert$.next(false);
              passwordAlert$.next(false);
              this.account.login(usr);
              sub.unsubscribe();
              return true;
            }
            passwordAlert$.next(true);
          }
          usernameAlert$.next(true);
        });
      }
      this.account.loggedIn$.next(false);
      sub.unsubscribe();
      return false; //true for successful
    });
  }

  logInFromLocalStorage(encryptedUsername: string, encryptedPassword: string, firebase: FirebaseService){
    const username = this.account.decrypt(true, encryptedUsername);
    const password = this.account.decrypt(false, encryptedPassword);
    const sub = firebase.getUserByUsername(username).subscribe((user) => {
      if (user.password === password){
        this.account.login(user);
      }
      sub.unsubscribe();
    });
  }

  register(username: string, password: string, email: string, url: string, firebase: FirebaseService){
    username = username.toLowerCase();
    const user = new User(username, password, url, email);
    firebase.createUser(user);
    this.account.register(user);
  }

  createShortcut(shortcut: Shortcut, firebase: FirebaseService){
    shortcut.uniqueName = shortcut.uniqueName.toLowerCase();
    firebase.createShortcut(shortcut);
  }

  editShortcut(shortcut: Shortcut, firebase: FirebaseService){
    shortcut.uniqueName = shortcut.uniqueName.toLowerCase();
    firebase.updateShortcut(shortcut.id, shortcut);
  }

  shortcutDownloaded(id: string, firebase: FirebaseService){
    firebase.updateShortcutDownloaded(id);
  }

  makeShortcutsPopular(firebase: FirebaseService, numberOfDownloads: number){
    const sub = firebase.getAllShortcutsObservable().subscribe((shorts) => {
      for (const short of shorts){
        if (short.downloaded > numberOfDownloads && !short.categories.includes("Popular")){
          short.categories[short.categories.length] = "Popular";
          firebase.updateShortcut(short.id, short);
        }
      }
      sub.unsubscribe();
    });
  }

  downgradePopularShortcutsWith(numberOfDownloads: number, firebase: FirebaseService){
    const sub = firebase.getAllShortcutsObservable().subscribe((shorts) => {
      for (const short of shorts){
        if (short.categories.includes("Popular") && short.downloaded < numberOfDownloads){
          short.categories.splice(short.categories.indexOf("Popular"));
          firebase.updateShortcut(short.id, short);
        }
      }
      sub.unsubscribe();
    });
  }

  getSearchResults(words: string, firebase: FirebaseService, searchIsComplete$: BehaviorSubject<boolean>, searchItems$: BehaviorSubject<Shortcut[]>) {
    const sub = firebase.getAllShortcutsObservable().subscribe((shorts) => {
      const shortcuts: Shortcut[] = [];
      for (const short of shorts){
        if (words.split(" ").length > 0){
          for (const word of words.split(" ")){
            searchForWord(word);
          }
        }else {
          searchForWord(words);
        }

        function searchForWord(word: string) {
          if (short.uniqueName.includes(word)){
            shortcuts[shortcuts.length] = short;
          }else if (short.id.includes(word)){
            shortcuts[shortcuts.length] = short;
          }
        }
      }
      searchItems$.next(shortcuts);
      searchIsComplete$.next(true);
      sub.unsubscribe();
    });
  }

  checkUsernameExists(username: string, firebase: FirebaseService, usernameExists$: BehaviorSubject<boolean>){
    username = username.toLowerCase();
    const sub = firebase.getAllUsersObservable().subscribe((users) => {
      for (const user of users){
        let reg = new RegExp('^[\\dA-Za-z]*$');
        if (!reg.test(username)){
          usernameExists$.next(true);
        } else {
          usernameExists$.next(true);
        }
        sub.unsubscribe();
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
    uniqueName = uniqueName.toLowerCase();
    let reg = new RegExp('^[\\dA-Za-z]*$');
    if (!reg.test(uniqueName)){
      shortcutUniqueNameExists$.next(true);
      return;
    }
    const sub = firebase.getAllShortcutsObservable().subscribe((shortcuts) => {
      for (const short of shortcuts){
        if (short.uniqueName === uniqueName){
          shortcutUniqueNameExists$.next(true);
        }else {
          shortcutUniqueNameExists$.next(false);
        }
        sub.unsubscribe();
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

  deleteShortcutFromDB(id: string, firebase: FirebaseService){
    firebase.deleteShortcut(id);
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

  processErrors(groupS: string, controlS: string, bool: boolean){
    if (bool) {
      this.danger(groupS, controlS);
    } else {
      this.success(groupS, controlS);
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
