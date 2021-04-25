import {Component, OnInit, OnDestroy, AfterViewInit, Input} from '@angular/core';
import {Shortcut} from '../../models/shortcut';

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
    //Use @Input items
  }

  ngOnDestroy(): void {

  }
}
