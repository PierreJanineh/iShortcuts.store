import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AppService} from '../../services/app.service';
import {FirebaseService} from '../../services/firebase.service';
import {Category} from '../../models/category';
import {Shortcut} from '../../models/shortcut';
import {Account} from '../../models/account';
import {Router} from '@angular/router';

@Component({
  selector: "app-upload",
  templateUrl: "uploadPage.component.html"
})
export class UploadPageComponent implements OnInit, OnDestroy {

  pageError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  shortcutNameError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  shortcutUniqueNameExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  shortcutUrlError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  focus;
  focus1;
  focus2;
  focus3;
  private control = "control";
  private control1 = "control1";
  private control2 = "control2";
  private group = "group";
  private group1 = "group1";
  private group2 = "group2";

  categories: string[] = Category.categories;
  glyphs: string[] = this.service.getAllGlyphs();
  colors: string[] = this.service.getAllColors();

  selectedCates: string[] = [];
  selectedGlyph: string;
  selectedColor: string;

  constructor(private service: AppService, private firebase: FirebaseService, private router: Router) {}

  ngOnInit() {

    this.shortcutNameError$.subscribe((bool) => {
      if (bool) {
        this.service.danger(this.group, this.control);
      } else {
        this.service.success(this.group, this.control);
      }
    });

    this.shortcutUniqueNameExists$.subscribe((bool) => {
      if (bool) {
        this.service.danger(this.group1, this.control1);
      } else {
        this.service.success(this.group1, this.control1);
      }
    });

    this.shortcutUrlError$.subscribe((bool) => {
      if (bool) {
        this.service.danger(this.group2, this.control2);
      } else {
        this.service.success(this.group2, this.control2);
      }
    });

  }
  ngOnDestroy() {
  }

  checkStringExists(s: string, i: number){

    if (s === " " || s === ""){
      this.service.danger(i===0? "group": "group"+i, i===0? "control": "control"+i);
      return;
    } else if ( i === 0) {
      this.service.checkShortcutNameErrors(s, this.firebase, this.shortcutNameError$);
    } else if (i === 1) {
      this.service.checkShortcutUniqueNameExists(s, this.firebase, this.shortcutUniqueNameExists$);
    } else if (i === 2) {
      this.service.checkShortcutUrlErrors(s, this.firebase, this.shortcutUrlError$);
    }
  }

  addCategory(cate: string){
    this.selectedCates[this.selectedCates.length] = cate;
  }

  removeCategory(cate: string){
    this.selectedCates.splice(this.selectedCates.indexOf(cate));
  }

  selectGlyph(gName: string, selectedItem: HTMLInputElement, parent: HTMLDivElement){
    this.selectedGlyph = gName;

    //process radio functioning
    let inputsHTML = parent.getElementsByTagName("input");
    for (let i = 0; i < inputsHTML.length; i++) {
      if (inputsHTML[i].name != selectedItem.name) {
        if (inputsHTML[i].checked){
          inputsHTML[i].checked = false;
        }
      }
    }
  }

  selectColor(c: string){
    this.selectedColor = c;
  }

  saveShortcut(uniqueName: string, name: string, description: string, icloud: string, requiredApps: string){
    let hasDanger = document.getElementsByClassName("has-danger");
    if (hasDanger != null && document.getElementsByClassName("has-danger").length > 0){
      this.pageError$.next(true);
      console.log(hasDanger);
      return;
    }
    let short = new Shortcut(uniqueName, name, description, icloud, this.selectedCates, requiredApps.split(","), this.selectedGlyph, this.selectedColor, Account.getInstance().user.username);
    this.service.createShortcut(short, this.firebase);
    this.router.navigate(['/success', short.id]);
  }
}
