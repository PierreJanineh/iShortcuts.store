import {Component, OnInit, OnDestroy, OnChanges, HostListener, SimpleChanges} from '@angular/core';
import {Constants} from '../base-pages.component';
import {FirebaseService} from '../../services/firebase.service';
import {AppService} from '../../services/app.service';
import {BehaviorSubject} from 'rxjs';
import {Account} from '../../models/account';
import {Router} from '@angular/router';

@Component({
  selector: "app-registerpage",
  templateUrl: "registerPage.component.html"
})
export class RegisterPageComponent implements OnInit, OnDestroy, OnChanges {
  title = Constants.title;
  store = Constants.store;

  isLogin = true;
  alertTerms = false;
  usernameAlert$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  passwordAlert$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$ = Account.getInstance().loggedIn$;
  usernameExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  username: string;
  focus;
  focus1;
  focus2;
  focus3;

  constructor(private firebase: FirebaseService, private service: AppService, private router: Router) { }
  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
  }

  login(username: string, password: string){
    //logs in and changes behaviours values.
    this.username = username;
    this.service.logIn(username, password, this.firebase, this.usernameAlert$, this.passwordAlert$);
  }

  register(username: string, password: string, url:string, email: string){
    //registers and changes behaviours values.
    this.service.register(username, password, email, url, this.firebase);
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

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    const subscription = this.loggedIn$.subscribe((bool) => {
      if (bool) {
        this.router.navigate(['/profile', this.username]);
        subscription.unsubscribe();
      }
    });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
  ngOnChanges(changes: SimpleChanges) {
    this.onMouseMove(window.event);
  }
}
