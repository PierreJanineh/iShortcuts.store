import { Component, OnInit, OnDestroy } from '@angular/core';
import {Constants} from '../base-pages.component';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html'
})

export class IndexComponent implements OnInit, OnDestroy {
  title = Constants.title;
  store = Constants.store;

  popularCate = "Popular";
  newCate = "New";

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
