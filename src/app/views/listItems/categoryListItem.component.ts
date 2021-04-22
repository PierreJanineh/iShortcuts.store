import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output } from '@angular/core';
import {BasePagesComponent, Category} from '../../pages/base-pages.component';

@Component({
  selector: 'app-categoryitem',
  templateUrl: 'categoryListItem.component.html'
})
export class CategoryListItemComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() public category: string;
  cate: Category;

  constructor() {}
  ngOnInit(): void {
    this.cate = BasePagesComponent.getCategoryFromString(this.category);
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }
}
