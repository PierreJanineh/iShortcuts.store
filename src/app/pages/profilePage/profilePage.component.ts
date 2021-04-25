import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: "app-profilepage",
  templateUrl: "profilePage.component.html"
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  user: User = User.getRandomUser();
  isCollapsed = true;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');

    const username = this.route.snapshot.paramMap.get("username");
    // this.user = User.getUserFromUsername(username);
    this.user = User.getRandomUser();
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }
}
