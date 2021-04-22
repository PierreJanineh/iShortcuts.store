import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import {BasePagesComponent, Category, Constants} from '../base-pages.component';

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html'
})

export class IndexComponent implements OnInit, OnDestroy {
  title = Constants.title;
  store = Constants.store;

  popularCate: Category = BasePagesComponent.getCategoryFromString("Popular");
  newCate: Category = BasePagesComponent.getCategoryFromString("New");

  constructor() {}

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
 }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }
}
