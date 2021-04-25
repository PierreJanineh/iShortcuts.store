import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Shortcut} from '../../models/shortcut';
import {FirebaseService} from '../../services/firebase.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-shortcut',
    templateUrl: 'shortcutPage.component.html'
})

export class ShortcutPageComponent implements OnInit, OnDestroy {
  item: Observable<Shortcut> = new Observable<Shortcut>();


  constructor(private route: ActivatedRoute, private firebase: FirebaseService) {

  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');

    const id: string = this.route.snapshot.paramMap.get("id");
    this.item = this.firebase.getShortcutById(id);
  }

  ngOnDestroy(): void {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('landing-page');
  }
}
