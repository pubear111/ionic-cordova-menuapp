import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-special',
  templateUrl: 'special.html',
})
export class Special {
	special;
	restaurant;
  language;

  constructor(
		public navCtrl: NavController, 
  	public navParams: NavParams,
  	private utils: Utils,
    private translate: TranslateService) 
  {
  	this.special = this.navParams.get('special');
  	this.restaurant = this.navParams.get('restaurant');
    this.language = this.translate.currentLang;
  }

}
