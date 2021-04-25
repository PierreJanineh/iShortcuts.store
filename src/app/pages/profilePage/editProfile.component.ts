import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from '../../models/user';
import {FirebaseService} from '../../services/firebase.service';
import {Account} from '../../models/account';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppService} from '../../services/app.service';

@Component({
  selector: "app-editprofilepage",
  templateUrl: "editProfile.component.html"
})
export class EditProfilePageComponent implements OnInit, OnDestroy {

  user: User;
  usernameExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  focus3;

  constructor(private route: ActivatedRoute, private router: Router, private firebase: FirebaseService, private service: AppService) {}

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

  checkUsernameExists(username: string){
    const group = document.getElementById("group");
    const control = document.getElementById("control");

    function danger() {
      if (control.classList.contains('form-control-success')) {
        control.classList.replace('form-control-success', 'form-control-danger');
        group.classList.replace('has-success', 'has-danger');
      } else if (!control.classList.contains('form-control-danger')) {
        control.classList.add('form-control-danger');
        group.classList.add('has-danger');
      }
    }

    function success() {
      if (control.classList.contains('form-control-danger')) {
        control.classList.replace('form-control-danger', 'form-control-success');
        group.classList.replace('has-danger', 'has-success');
      } else if (!control.classList.contains('form-control-success')) {
        control.classList.add('form-control-success');
        group.classList.add('has-success');
      }
    }

    if (username === " " || username === ""){
      danger();
      return;
    }
    this.service.checkUsernameExists(username, this.firebase, this.usernameExists$);

    this.usernameExists$.subscribe((bool) => {
      if (bool) {
        danger();
      } else {
        success();
      }
    });
  }

  updateInfo(username: string, email: string, url: string, pass: string){
    this.service.updateAccountInfo(new User(username, pass, url, email), this.firebase);
  }
}
