import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {AlertModule} from 'ngx-bootstrap/alert';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ModalModule} from 'ngx-bootstrap/modal';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {PopoverModule} from 'ngx-bootstrap/popover';

import {PagesModule} from './pages/pages.module';
import {IndexComponent} from './pages/index/index.component';
import {ListPageComponent} from './pages/listPage/listPage.component';
import {ShortcutListItemComponent} from './views/listItems/shortcutListItem.component';
import {ShortcutPageComponent} from './pages/shortcutPage/shortcutPage.component';
import {NavComponentComponent} from './views/navComponent/navComponent.component';
import {FooterComponentComponent} from './views/footerComponent/footerComponent.component';
import {ProfilePageComponent} from './pages/profilePage/profilePage.component';
import {Page404Component} from './pages/page404/page404.component';
import {CategoriesPageComponent} from './pages/categoriesPage/categoriesPage.component';
import {CategoryListItemComponent} from './views/listItems/categoryListItem.component';
import {RegisterPageComponent} from './pages/registerPage/registerPage.component';
import {AboutPageComponent} from './pages/aboutPage/aboutPage.component';
import {MatInputModule} from '@angular/material/input';
import {LoadingSpinnerComponent} from './views/loadingSpinnerComponent/loadingSpinner.component';
import {EditProfilePageComponent} from './pages/profilePage/editProfile.component';
import {UploadPageComponent} from './pages/uploadPage/uploadPage.component';
import {EditShortcutPageComponent} from './pages/shortcutPage/editShortcutPage.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ListPageComponent,
    ShortcutListItemComponent,
    ShortcutPageComponent,
    NavComponentComponent,
    FooterComponentComponent,
    ProfilePageComponent,
    Page404Component,
    CategoriesPageComponent,
    CategoryListItemComponent,
    RegisterPageComponent,
    AboutPageComponent,
    LoadingSpinnerComponent,
    EditProfilePageComponent,
    UploadPageComponent,
    EditShortcutPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    PagesModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
