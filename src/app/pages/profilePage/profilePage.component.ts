import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from '../../models/user';
import {FirebaseService} from '../../services/firebase.service';
import {Account} from '../../models/account';
import {Observable} from 'rxjs';

@Component({
  selector: "app-profilepage",
  templateUrl: "profilePage.component.html"
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  user: User;
  isCollapsed = true;
  constructor(private route: ActivatedRoute, private router: Router, private firebase: FirebaseService) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');

    const username = this.route.snapshot.paramMap.get("username");
    this.firebase.getUserByUsername(username).subscribe(user => {
      this.user = new User(user.username, user.password, user.url, user.email);
    });
    // go home if logged out while on profile.
    const subscription = Account.getInstance().loggedIn$.subscribe((bool) => {
      if (!bool) {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }

  print(s:string){
    console.log(s);
  }
}
