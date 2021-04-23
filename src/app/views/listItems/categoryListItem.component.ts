import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-categoryitem',
  templateUrl: 'categoryListItem.component.html'
})
export class CategoryListItemComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() public category: string;

  constructor() {}
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }
}
