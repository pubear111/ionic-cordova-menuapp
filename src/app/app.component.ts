import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { Languages } from '../pages/languages/languages';
import { Login } from '../pages/login/login';
import { Logout } from '../pages/logout/logout';
import { Categories } from '../pages/categories/categories';
import { Specials } from '../pages/specials/specials';
import { About } from '../pages/about/about';
import { Contact } from '../pages/contact/contact';
import { Feedback } from '../pages/feedback/feedback';

import { LanguageService } from '../providers/language';
import { Utils } from '../providers/utils';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, component: any}>;
  restaurant;
  defaultLanguage;
  menuTitle = 'Menu';

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private storage: Storage,
    private utils: Utils,
    private translate: TranslateService,
    private languageService: LanguageService,
    public events: Events
    ) {

    storage.ready().then(()=> {
      storage.get('restaurant').then(restaurant => {

        if ( restaurant ) {
          this.restaurant = restaurant;
          this.initTranslate();

          storage.get('language').then(language => {
            this.languageService.setLanguage(language);
            this.rootPage = Categories;
            
            if(!language){
              this.rootPage = Languages;      
            }

          });

        } 
        else {
          this.initTranslate();
          this.rootPage = Login;
        }
      }).catch(console.log);
    });

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.hide();
      this.splashScreen.hide();

      // Listen for restaurant changes
      this.events.subscribe('restaurant:change', () => {
        this.storage.get('restaurant').then(restaurant => {
          this.restaurant = restaurant;
        });
      });

    });
  }

  openPage(page) {
    if(this.restaurant){
      this.nav.setRoot(page.component, {restaurant: this.restaurant});
    }
    else{
      this.storage.get('restaurant').then(restaurant => {
        if ( restaurant ) {
          this.restaurant = restaurant;
          this.nav.setRoot(page.component, {restaurant: this.restaurant});
        }
        else{
          this.nav.setRoot(Login);
        }
      });
    }
  }


  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.addLangs(["en", "ar", "ku"]);
    this.translate.setDefaultLang('en');

    this.pages = [];
    this.updateMenu();

    // navigation pages
    this.events.subscribe('language:change', () => {
      this.updateMenu();
    });

  }

  private updateMenu(){
    this.pages = [];
    this.translate.get('SPECIAL_OFFERS').subscribe(title => {
      this.pages.push({ title: title , component: Specials });
    });
    this.translate.get('CHANGE_LANGUAGE').subscribe(title => {
      this.pages.push({ title: title , component: Languages });
    });
    this.translate.get('ABOUT_US').subscribe(title => {
      this.pages.push({ title: title , component: About });
    });
    this.translate.get('LEAVE_FEEDBACK').subscribe(title => {
      this.pages.push({ title: title , component: Feedback });
    });
    this.translate.get('CONTACT_US').subscribe(title => {
      this.pages.push({ title: title , component: Contact });
    });
    this.translate.get('CATEGORIES').subscribe(title => {
      this.pages.push( { title: title , component: Categories });
    });
    this.translate.get('LOGOUT').subscribe(title => {
      this.pages.push( { title: title , component: Logout });
    });

    this.translate.get('MENU').subscribe(menuTitle => {
      this.menuTitle = menuTitle;
    });
  }

}
