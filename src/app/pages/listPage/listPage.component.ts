import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Shortcut} from '../../models/shortcut';
import {Category} from '../../models/category';
import {FirebaseService} from '../../services/firebase.service';
import {BehaviorSubject} from 'rxjs';

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
  categoryAlert$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchAlert$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  itemsCount$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private route: ActivatedRoute, private firebase: FirebaseService) {}

  searchFunc(word: string): Shortcut[] {
    //TODO get items from DB
    this.searchAlert$.next(this.searchCheck());
    this.itemsCount$.next(this.itemCheck());
    return null;
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    this.route.params.subscribe(
      params => {
        let cate: string = params['category'];
        if (cate === "Popular"){
          //get all shortcuts from firestore and check downloads and add popular category for evey one
        }
        //Check if the path is a category or a search query (search queries start with '$').
        if (cate.charAt(0) != "$"){
          this.category = new Category(cate);
          this.category.getAllItems(this.firebase).subscribe((shortcuts) => {
            this.category.getAllItemsForCategoryFromAllItems(cate, shortcuts);
            this.items = this.category.items;
            this.itemsCount$.next(this.itemCheck());
            this.categoryAlert$.next(this.categoryCheck());
          });
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

  itemCheck(){
    return (!this.isSearch && this.category.items != null && this.category.items.length > 0) || (this.isSearch && this.searchItems != null && this.searchItems.length > 0);
  }

  searchCheck(){
    return this.isSearch && (this.searchItems == null || this.searchItems.length <= 0);
  }

  categoryCheck(){
    return !this.isSearch && (this.category.items == null || this.category.items.length <= 0);
  }

}
