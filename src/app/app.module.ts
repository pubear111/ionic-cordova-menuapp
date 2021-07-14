import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http, HttpModule } from '@angular/http';
import { IonicStorageModule  } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { MyApp } from './app.component';
import { Languages } from '../pages/languages/languages';
import { Login } from '../pages/login/login';
import { Logout } from '../pages/logout/logout';
import { Categories } from '../pages/categories/categories';
import { Subcategories } from '../pages/subcategories/subcategories';
import { Products } from '../pages/products/products';
import { Product } from '../pages/product/product';
import { Wines } from '../pages/wines/wines';
import { Wine } from '../pages/wine/wine';
import { Specials } from '../pages/specials/specials';
import { Special } from '../pages/special/special';
import { About } from '../pages/about/about';
import { Contact } from '../pages/contact/contact';
import { Feedback } from '../pages/feedback/feedback';

import { LanguageService } from '../providers/language';
import { Api } from '../providers/api';
import { Utils } from '../providers/utils';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    Login,
    Logout,
    Languages,
    Categories,
    Subcategories,
    Products,
    Product,
    Wines,
    Wine,
    Specials,
    Special,
    About,
    Contact,
    Feedback
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'arrow-dropleft',
      iconMode: 'ios'
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Logout,
    Languages,
    Categories,
    Subcategories,
    Products,
    Product,
    Wines,
    Wine,
    Specials,
    Special,
    About,
    Contact,
    Feedback
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LanguageService,
    Api,
    Utils,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
