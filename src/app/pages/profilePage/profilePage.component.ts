import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from '../../models/user';
import {FirebaseService} from '../../services/firebase.service';
import {Account} from '../../models/account';
import {BehaviorSubject, Observable} from 'rxjs';
import {Shortcut} from '../../models/shortcut';

@Component({
  selector: "app-profilepage",
  templateUrl: "profilePage.component.html"
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  user: Observable<User>;
  items$: BehaviorSubject<Shortcut[]> = new BehaviorSubject<Shortcut[]>([]);
  isCollapsed = true;
  constructor(private route: ActivatedRoute, private router: Router, private firebase: FirebaseService) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');

    const username = this.route.snapshot.paramMap.get("username");
    this.user = this.firebase.getUserByUsername(username);
    this.user.subscribe(user => {
      this.getShortcuts(user.username);
    });
    // go home if logged out while on profile.
    Account.getInstance().loggedIn$.subscribe((bool) => {
      if (!bool) {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }

  getShortcuts(username: string){
    this.firebase.getShortcutsForAuthor(username, this.items$);
  }
}
