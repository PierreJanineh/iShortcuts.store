import { Component, OnInit, OnDestroy } from '@angular/core';
import {Constants} from '../base-pages.component';

@Component({
  selector: 'app-aboutPage',
  templateUrl: 'aboutPage.component.html'
})

export class AboutPageComponent implements OnInit, OnDestroy {
  title = Constants.title;
  store = Constants.store;

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
