import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import {BasePagesComponent, Category, Shortcut} from '../base-pages.component';

@Component({
  selector: 'app-listpage',
  templateUrl: 'listPage.component.html'
})

export class ListPageComponent implements OnInit, OnDestroy {

  isLoading = true;
  isSearch = false;
  category: Category;
  search: string;
  searchItems: Shortcut[];
  items: Shortcut[];

  constructor(private route: ActivatedRoute) {}

  searchFunc(word: string): Shortcut[] {
    //TODO get items from DB
    return null;
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    this.route.params.subscribe(
      params => {
        let cate: string = params['category'];
        if (cate.charAt(0) != "$"){
          this.category = BasePagesComponent.getCategoryFromString(cate);
          this.items = this.category.items;
          this.isSearch = false;
          this.isLoading = false;
        }else {
          this.search = cate.substring(1);
          this.isSearch = true;
          this.searchItems = this.searchFunc(this.search);
          this.items = this.searchItems;
          this.isLoading = false;
        }
      }
    );
    // const cate: string = this.route.snapshot.paramMap.get("category");


    // const listRow = document.getElementById('list_row');

  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }

}
