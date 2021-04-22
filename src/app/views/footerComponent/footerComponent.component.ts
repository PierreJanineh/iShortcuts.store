import { Component, OnInit, OnDestroy } from '@angular/core';
import {Account, Constants} from '../../pages/base-pages.component';

@Component({
  selector: 'app-footer',
  templateUrl: 'footerComponent.component.html'
})

export class FooterComponentComponent implements OnInit, OnDestroy {
  title = Constants.title;
  store = Constants.store;
  account: Account = Account.getInstance();

  constructor() {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
