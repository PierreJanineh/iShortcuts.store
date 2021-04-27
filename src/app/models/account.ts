import {User} from './user';
import {BehaviorSubject} from 'rxjs';
import * as CryptoJS from 'crypto-js';

export class Account {
  private USERKEY = "user𛱹name𛱐";
  private PASSKEY = "user𛱹pass𛱐";
  public loggedIn$: BehaviorSubject<boolean>;
  public user: User;

  public static account: Account;

  constructor() {
    this.loggedIn$ = new BehaviorSubject<boolean>(false);
    this.user = null;
  }

  public static getInstance() {
    if (this.account == null) {
      this.account = new Account();
    }
    return this.account;
  }

  register(user: User){
    this.login(user);
  }

  login(user: User){
    this.addToLocalStorage(user);
    this.loggedIn$.next(true);
    this.user = user;
  }

  logout(){
    this.removeFromLocalStorage();
    this.loggedIn$.next(false);
    this.user = null;
  }

  checkIfUsernameIsMyOwn(username: string): boolean{
    return this.user.username === username;
  }

  checkIfShortcutIsMine(shortcutId: string): boolean{
    const segments = shortcutId.split("-");
    return this.user.username === segments[segments.length-1];
  }

  private addToLocalStorage(user: User) {
    const username = this.encrypt(this.USERKEY, user.username);
    const password = this.encrypt(this.PASSKEY, user.password);
    localStorage.setItem('currentUser', username);
    localStorage.setItem('password', password);
  }

  private removeFromLocalStorage() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("password");
  }

  encrypt(keys: string, value: string ): string {
    let key = CryptoJS.enc.Utf8.parse(keys);
    let iv = CryptoJS.enc.Utf8.parse(keys);
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }

  decrypt(b: boolean, value: string): string {
    //true for username false for password
    const keys = b? this.USERKEY : this.PASSKEY;
    let key = CryptoJS.enc.Utf8.parse(keys);
    let iv = CryptoJS.enc.Utf8.parse(keys);
    let decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
