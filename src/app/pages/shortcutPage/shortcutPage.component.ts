import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import {BasePagesComponent, Shortcut} from '../base-pages.component';

@Component({
    selector: 'app-shortcut',
    templateUrl: 'shortcutPage.component.html'
})

export class ShortcutPageComponent implements OnInit, OnDestroy {
  item: Shortcut;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');

    const id: string = this.route.snapshot.paramMap.get("id");

    //get item from all items by id TODO
    const items = BasePagesComponent.getAllItems();
    for (const item of items){
      if (item.id === id){
        this.item = item;
      }
    }
    const glyphContainer = document.getElementById('glyph');
    glyphContainer.insertAdjacentHTML('afterbegin', this.item.icon);
    glyphContainer.firstElementChild.classList.add('glyph');
  }

  ngOnDestroy(): void {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('landing-page');

      const glyphContainer = document.getElementById('glyph');
      glyphContainer.firstElementChild.remove();
  }
}
