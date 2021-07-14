import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';


import { Special } from '../special/special';

import { Api } from '../../providers/api';
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-specials',
  templateUrl: 'specials.html',
})
export class Specials {
	specials: any[];
	restaurant;
  language;
  background: string;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private apiService: Api,
  	private storage: Storage,
  	private loadingCtrl: LoadingController,
    private utils: Utils,
    private translate: TranslateService) {

    this.language = this.translate.currentLang;
  }

  ionViewDidLoad(){
    let loader = this.loadingCtrl.create({
      content: 'Getting special offers'
    });
    loader.present();

    this.storage.ready().then(()=>{
      this.storage.get('restaurant').then(restaurant => {
          this.restaurant = restaurant;
          this.apiService.getSpecials(this.restaurant.code).subscribe(specials => {
            this.specials = specials;
            loader.dismiss();
          });
        });
      });
  }

  ionViewDidEnter(){
    this.setBg();
  }

  onGoToSpecial(special){
  	this.navCtrl.push(Special, {restaurant: this.restaurant, special: special});
  }

  private setBg(){
    let thisClass = this;
    let bgInterval = setInterval(() => {
      
      if (thisClass.restaurant){

         if (this.background != this.restaurant.app_color){
          let elem = <HTMLElement>document.querySelector('page-specials .fixed-content');
          elem.style.backgroundColor = this.utils.convertHex(this.restaurant.app_color);
        }

        this.background = this.restaurant.app_color;
        clearInterval(bgInterval);
      }

    }, 100);
  }

}
