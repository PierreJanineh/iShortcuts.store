import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import {Constants} from '../base-pages.component';

@Component({
  selector: 'app-404page',
  templateUrl: 'page404.component.html'
})

export class Page404Component implements OnInit, OnDestroy {
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
