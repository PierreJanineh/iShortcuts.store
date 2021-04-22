import { Component, OnInit, OnDestroy } from '@angular/core';
import {Account, BasePagesComponent, Constants} from '../../pages/base-pages.component';

@Component({
  selector: 'app-nav',
  templateUrl: 'navComponent.component.html'
})

export class NavComponentComponent implements OnInit, OnDestroy {
  title = Constants.title;
  store = Constants.store;
  isCollapsed = true;
  account: Account = Account.getInstance();

  categories: string[] = BasePagesComponent.allCategories();

  constructor() {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
