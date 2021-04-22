import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output } from '@angular/core';
import {Shortcut} from '../../pages/base-pages.component';

@Component({
    selector: 'app-shortcutitem',
    templateUrl: 'shortcutListItem.component.html'
})
export class ShortcutListItemComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() public item: Shortcut;
  @Input() public num: number;

  constructor() {}
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const header = document.getElementById('header'+this.num);
    if (!header.hasChildNodes()){
      header.insertAdjacentHTML('afterbegin', this.item.icon);
      header.firstElementChild.classList.add('glyph');
      header.style.color = this.item.color;
    }
  }

  ngOnDestroy(): void {
    // const header = document.getElementById('header');
    // header.firstElementChild.remove();
  }
}
