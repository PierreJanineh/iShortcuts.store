import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import {BasePagesComponent, Category} from '../base-pages.component';

@Component({
  selector: 'app-listpage',
  templateUrl: 'listPage.component.html'
})

export class ListPageComponent implements OnInit, OnDestroy {
  category: Category;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');

    const cate: string = this.route.snapshot.paramMap.get("category");
    this.category = BasePagesComponent.getCategoryFromString(cate);

    const listRow = document.getElementById('list_row');

  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }

}
