import {Component, OnInit, OnDestroy, Output, EventEmitter, HostListener} from '@angular/core';
import {Account, Constants} from '../../pages/base-pages.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: 'footerComponent.component.html'
})

export class FooterComponentComponent implements OnInit, OnDestroy {

  title = Constants.title;
  store = Constants.store;
  account: Account = Account.getInstance();

  constructor(private router: Router) {}
  @HostListener("document:keydown.enter", ["$event.target"])
  onKeyUp(t){
    if (t.id == 'input'){
      this.router.navigate(['/list', "$"+t.value]);
    }
  }

  ngOnInit(): void {
    var input = document.getElementById("input");

  }

  ngOnDestroy(): void {}
}
