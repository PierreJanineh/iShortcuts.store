import { Component, OnInit, OnDestroy } from '@angular/core';
import {Constants} from '../../pages/base-pages.component';
import {Account} from '../../models/account';
import {Category} from '../../models/category';
import {AppService} from '../../services/app.service';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-nav',
  templateUrl: 'navComponent.component.html'
})

export class NavComponentComponent implements OnInit, OnDestroy {
  title = Constants.title;
  store = Constants.store;
  isCollapsed = true;
  loggedIn: boolean;

  categories: string[] = Category.categories;

  constructor(private service: AppService, private firebase: FirebaseService) {}
  ngOnInit(): void {
    Account.getInstance().loggedIn$.subscribe((bool) => {
      this.loggedIn = bool;
    });
    if (localStorage.getItem('currentUser')){
      const username = localStorage.getItem('currentUser');
      this.firebase.getUserByUsername(username).subscribe((user) => {
        Account.getInstance().login(user);
      });
    }
  }
  ngOnDestroy(): void {}

  logout() {
    this.service.logout();
  }
}
