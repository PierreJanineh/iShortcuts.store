import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Shortcut} from '../../models/shortcut';
import {FirebaseService} from '../../services/firebase.service';
import {Observable} from 'rxjs';
import {AppService} from '../../services/app.service';

@Component({
    selector: 'app-shortcut',
    templateUrl: 'shortcutPage.component.html'
})

export class ShortcutPageComponent implements OnInit, OnDestroy {
  item: Observable<Shortcut> = new Observable<Shortcut>();
  id: string;

  constructor(private route: ActivatedRoute, private firebase: FirebaseService, private service: AppService) {}

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');

    this.id = this.route.snapshot.paramMap.get("id");
    this.item = this.firebase.getShortcutById(this.id);
  }

  ngOnDestroy(): void {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('landing-page');
  }

  itemDownloaded(id: string) {
    this.service.shortcutDownloaded(id, this.firebase);
  }
}
