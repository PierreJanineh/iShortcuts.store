import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import {BasePagesComponent} from '../base-pages.component';

@Component({
  selector: 'app-categoriespage',
  templateUrl: 'categoriesPage.component.html'
})

export class CategoriesPageComponent implements OnInit, OnDestroy {

  categories: string[] = BasePagesComponent.categories;

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
