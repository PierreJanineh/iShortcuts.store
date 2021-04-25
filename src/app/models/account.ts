import {User} from './user';
import {BehaviorSubject} from 'rxjs';

export class Account {
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
    localStorage.setItem("currentUser", user.username);
    this.loggedIn$.next(true);
    this.user = user;
  }

  logout(){
    localStorage.removeItem("currentUser");
    this.loggedIn$.next(false);
    this.user = null;
  }
}
