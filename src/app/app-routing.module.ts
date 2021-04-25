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
import { AboutPageComponent } from './pages/aboutPage/aboutPage.component';
import { LoadingSpinnerComponent } from './views/loadingSpinnerComponent/loadingSpinner.component';
import { EditProfilePageComponent } from './pages/profilePage/editProfile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: IndexComponent },
  { path: 'list/:category', component: ListPageComponent },
  { path: 'shortcut/:id', component: ShortcutPageComponent },
  { path: 'profile/:username', component: ProfilePageComponent },
  { path: 'editProfile/:username', component: EditProfilePageComponent },
  { path: 'categories', component: CategoriesPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '**', component: Page404Component },
  //Components
  { path: 'nav', component: NavComponentComponent },
  { path: 'footer', component: FooterComponentComponent },
  { path: 'spinner', component: LoadingSpinnerComponent },
  { path: 'item', component: ShortcutListItemComponent },
  { path: 'categoriesitem', component: CategoryListItemComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: []
})
export class AppRoutingModule {}
