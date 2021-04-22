import {EventEmitter, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { ListPageComponent } from './pages/listPage/listPage.component';
import { ShortcutListItemComponent } from './views/listItems/shortcutListItem.component';
import { ShortcutPageComponent } from './pages/shortcutPage/shortcutPage.component';
import { NavComponentComponent } from './views/navComponent/navComponent.component';
import { FooterComponentComponent } from './views/footerComponent/footerComponent.component';
import { ProfilePageComponent } from './pages/profilePage/profilePage.component';
import { Page404Component } from './pages/page404/page404.component';
import { CategoriesPageComponent } from './pages/categoriesPage/categoriesPage.component';
import { CategoryListItemComponent } from './views/listItems/categoryListItem.component';
import { RegisterPageComponent } from './pages/registerPage/registerPage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: IndexComponent },
  { path: 'list/:category', component: ListPageComponent },
  { path: 'item', component: ShortcutListItemComponent },
  { path: 'shortcut/:id', component: ShortcutPageComponent },
  { path: 'nav', component: NavComponentComponent },
  { path: 'footer', component: FooterComponentComponent },
  { path: 'profile/:username', component: ProfilePageComponent },
  { path: '404', component: Page404Component },
  { path: 'categories', component: CategoriesPageComponent },
  { path: 'categoriesitem', component: CategoryListItemComponent },
  { path: 'register', component: RegisterPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
