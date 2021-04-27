import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Constants} from '../../pages/base-pages.component';
import {Account} from '../../models/account';
import {Category} from '../../models/category';
import {AppService} from '../../services/app.service';
import {FirebaseService} from '../../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: 'navComponent.component.html'
})

export class NavComponentComponent implements OnInit, OnDestroy {
  title = Constants.title;
  store = Constants.store;
  isCollapsed = true;
  loggedIn: boolean;
  @Input() isInEditOrUpload = false;
  @Input() isInShortcut = false;
  @Input() isInProfile = false;
  @Output() shortcutSaveSelected = new EventEmitter<boolean>();
  shortcutId: string;
  myOwn: boolean;
  account = Account.getInstance();

  categories: string[] = Category.categories;

  constructor(private service: AppService, private firebase: FirebaseService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    Account.getInstance().loggedIn$.subscribe((bool) => {
      this.loggedIn = bool;
    });
    //login immediately if localstorage has username
    if (localStorage.getItem('currentUser')){
      const encryptedUsername = localStorage.getItem('currentUser');
      if (localStorage.getItem("password")){
        const encryptedPassword = localStorage.getItem('password');
        this.service.logInFromLocalStorage(encryptedUsername, encryptedPassword, this.firebase);
      }
    }
    if (this.isInShortcut){
      this.shortcutId = this.route.snapshot.paramMap.get("id");
      this.myOwn = this.account.checkIfShortcutIsMine(this.shortcutId);
    }
  }
  ngOnDestroy(): void {}

  logout() {
    this.service.logout();
  }
}
