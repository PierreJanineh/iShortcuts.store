import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Category} from '../../models/category';

@Component({
  selector: 'app-categoriespage',
  templateUrl: 'categoriesPage.component.html'
})

export class CategoriesPageComponent implements OnInit, OnDestroy {

  categories: string[] = Category.categories;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }

}
