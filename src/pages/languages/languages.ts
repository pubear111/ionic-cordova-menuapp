import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Categories } from '../categories/categories';
import { LanguageService } from '../../providers/language';
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-languages',
  templateUrl: 'languages.html',
})
export class Languages {
	selectedLanguage: any;

	languages: any[] = [{ short: 'en', long: 'English'}, {short: 'ar', long: 'Arabic'},{short: 'ku', long: 'Kurdish'}];
  restaurant;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private langService: LanguageService,
    private toastCtrl: ToastController,
    private utils: Utils,
    private storage: Storage
    ) {

    	this.restaurant = this.navParams.get('restaurant');
      if (!this.restaurant){
        storage.get('restaurant').then(restaurant => {
          this.restaurant = restaurant;
        })
      }
  }

  onSelectLanguage(language){
  	this.selectedLanguage = language.toLowerCase();
  }  

  onSetLanguage(){
    if ( this.selectedLanguage ){
      this.langService.setLanguage(this.selectedLanguage);
      this.navCtrl.push(Categories, {pullLanguagesPage: true, restaurant: this.restaurant});
    } 
    else {
      let toast = this.toastCtrl.create({
        message: 'Please select a language',
        duration: 3000 
      });
      toast.present();
    }
  }  

}
