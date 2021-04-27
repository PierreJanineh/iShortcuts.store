import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Shortcut} from '../../models/shortcut';
import {Category} from '../../models/category';
import {FirebaseService} from '../../services/firebase.service';
import {BehaviorSubject} from 'rxjs';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-listpage',
  templateUrl: 'listPage.component.html'
})

export class ListPageComponent implements OnInit, OnDestroy {

  isLoading = true;
  isSearch = false;
  category: Category;
  search: string;
  searchItems$: BehaviorSubject<Shortcut[]> = new BehaviorSubject<Shortcut[]>(null);
  items: Shortcut[];
  categoryAlert$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchAlert$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  itemsCount$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchIsComplete$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private route: ActivatedRoute, private firebase: FirebaseService, private service: AppService) {}

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    this.route.params.subscribe(
      params => {
        let cate: string = params['category'];
        if (cate === "Popular"){
          //get all shortcuts from firestore and check downloads and add popular category for evey one
          this.service.makeShortcutsPopular(this.firebase, 5);
        } else if (cate === "All") {

        }
        //Check if the path is a category or a search query (search queries start with '$').
        if (cate.charAt(0) != "$"){
          this.categoryFunc(cate);
          this.isSearch = false;
          this.isLoading = false;
        }else {
          this.isSearch = true;
          this.search = cate.substring(1);
          this.searchFunc(this.search);
        }
      }
    );
  }

  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }

  itemCheck(){
    return (!this.isSearch && this.category.items != null && this.category.items.length > 0) || (this.isSearch && this.searchItems$.getValue() != null && this.searchItems$.getValue().length > 0);
  }

  searchCheck(){
    return this.isSearch && (this.searchItems$.getValue() == null || this.searchItems$.getValue().length <= 0);
  }

  categoryCheck(){
    return !this.isSearch && (this.category.items == null || this.category.items.length <= 0);
  }

  private categoryFunc(cate: string) {
    this.category = new Category(cate);
    const sub = this.category.getAllItems(this.firebase).subscribe((shortcuts) => {
      this.category.getAllItemsForCategoryFromAllItems(cate, shortcuts);
      this.items = this.category.items;
      this.itemsCount$.next(this.itemCheck());
      this.categoryAlert$.next(this.categoryCheck());
      sub.unsubscribe();
    });
  }

  searchFunc(words: string) {
    this.service.getSearchResults(words, this.firebase, this.searchIsComplete$, this.searchItems$);
    this.searchIsComplete$.subscribe((bool) => {
      if (bool) {
        this.items = this.searchItems$.getValue();
        this.searchAlert$.next(this.searchCheck());
        this.itemsCount$.next(this.itemCheck());
        this.isLoading = false;
      }
    });
  }

}
