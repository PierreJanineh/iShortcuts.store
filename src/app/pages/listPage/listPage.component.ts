import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Shortcut} from '../../models/shortcut';
import {Category} from '../../models/category';

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
          this.category = Category.getCategoryFromString(cate);
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
