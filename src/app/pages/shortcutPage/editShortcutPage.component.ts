import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppService} from '../../services/app.service';
import {FirebaseService} from '../../services/firebase.service';
import {Category} from '../../models/category';
import {Shortcut} from '../../models/shortcut';
import {Account} from '../../models/account';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: "app-shortcutEdit",
  templateUrl: "editShortcutPage.component.html"
})
export class EditShortcutPageComponent implements OnInit, OnDestroy {

  id: string;
  pageError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  shortcutNameError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  shortcutUniqueNameExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  shortcutUrlError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  shortcut: Observable<Shortcut> = new Observable<Shortcut>();
  item: Shortcut;
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

  constructor(private service: AppService, private firebase: FirebaseService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get("id");
    this.shortcut = this.firebase.getShortcutById(this.id);

    this.shortcutNameError$.subscribe((bool) => {
      this.service.processErrors(this.group, this.control, bool);
    });

    this.shortcutUniqueNameExists$.subscribe((bool) => {
      this.service.processErrors(this.group1, this.control1, bool);
    });

    this.shortcutUrlError$.subscribe((bool) => {
      this.service.processErrors(this.group2, this.control2, bool);
    });

    this.shortcut.subscribe((shortcut) => {
      this.item = shortcut;
      this.selectGlyph(shortcut.icon, document.getElementById("glyph-parent"));
      this.selectColor(shortcut.color);
    })
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

  selectGlyph(gName: string, parent: HTMLElement){
    this.selectedGlyph = gName;
    //process radio functioning
    if (parent == null) {
      return;
    }
    let inputsHTML = parent.getElementsByTagName("input");
    if (inputsHTML != null){
      for (let i = 0; i < inputsHTML.length; i++) {
        {
          if (inputsHTML[i].name != gName){
            if (inputsHTML[i].checked){
              inputsHTML[i].checked = false;
            }
          } else {
            inputsHTML[i].checked = true;
          }
        }
      }
    }
  }

  selectColor(c: string){
    this.selectedColor = c;
  }

  saveShortcut(uniqueName: string, name: string, description: string, icloud: string, requiredApps: string){

    //return if has danger
    let hasDanger = document.getElementsByClassName("has-danger");
    if (hasDanger != null && document.getElementsByClassName("has-danger").length > 0){
      this.pageError$.next(true);
      return;
    }
    let short = new Shortcut(uniqueName, name, description, icloud, this.selectedCates, requiredApps.split(","), this.selectedGlyph, this.selectedColor, Account.getInstance().user.username);
    short.id = this.item.id;
    this.service.editShortcut(short, this.firebase);
    this.router.navigate(['/shortcut', this.item.id]);
  }

  isSelected(cate: string){
    if (this.item != null && this.item.categories.indexOf(cate) > -1){
      this.selectedCates = this.item.categories;
      return true;
    }
  }

  deleteShortcutFromDB(){
    if (window.confirm("Are you sure you want to delete this shortcut forever?")){
      this.service.deleteShortcutFromDB(this.id, this.firebase);
    }
  }
}
