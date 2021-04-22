import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import {BasePagesComponent, User} from '../base-pages.component';

@Component({
  selector: "app-profilepage",
  templateUrl: "profilePage.component.html"
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  user: User = BasePagesComponent.getRandomUser();
  isCollapsed = true;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');

    const username = this.route.snapshot.paramMap.get("username");
    this.user = User.getUserFromUsername(username);
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }
}
