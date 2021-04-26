import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Constants} from '../../pages/base-pages.component';
import {Account} from '../../models/account';
import {Category} from '../../models/category';
import {AppService} from '../../services/app.service';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: 'navComponent.component.html'
})

export class NavComponentComponent implements OnInit, OnDestroy {
  title = Constants.title;
  store = Constants.store;
  isCollapsed = true;
  loggedIn: boolean;
  @Input() isInEditOrUpload = false;
  @Input() isInShortcut = false;
  @Output() shortcutSaveSelected = new EventEmitter<boolean>();

  categories: string[] = Category.categories;

  constructor(private service: AppService, private firebase: FirebaseService, private router: Router) {}
  ngOnInit(): void {
    Account.getInstance().loggedIn$.subscribe((bool) => {
      this.loggedIn = bool;
    });
    //login immediately if localstorage has username
    if (localStorage.getItem('currentUser')){
      const username = localStorage.getItem('currentUser');
      if (localStorage.getItem("password")){
        const password = localStorage.getItem('password');
        this.service.logInFromLocalStorage(username, password, this.firebase);
      }
    }
  }
  ngOnDestroy(): void {}

  logout() {
    this.service.logout();
  }
}
