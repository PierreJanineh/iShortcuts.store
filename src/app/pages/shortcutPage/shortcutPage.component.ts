import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Shortcut} from '../../models/shortcut';

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
    const items = Shortcut.getAllItems();
    for (const item of items){
      if (item.id === id){
        this.item = item;
      }
    }
  }

  ngOnDestroy(): void {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('landing-page');
  }
}
