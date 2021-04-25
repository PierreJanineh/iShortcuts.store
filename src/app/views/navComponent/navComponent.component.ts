import { Component, OnInit, OnDestroy } from '@angular/core';
import {Constants} from '../../pages/base-pages.component';
import {Account} from '../../models/account';
import {Category} from '../../models/category';
import {AppService} from '../../services/app.service';

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

  constructor(private service: AppService) {}
  ngOnInit(): void {
    Account.getInstance().loggedIn$.subscribe((bool) => {
      this.loggedIn = bool;
    })
  }
  ngOnDestroy(): void {}

  logout() {
    this.service.logout();
  }
}
