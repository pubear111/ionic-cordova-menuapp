import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ProductModel } from '../../models/product';

import { Utils } from '../../providers/utils';
import { Api } from '../../providers/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-wine',
  templateUrl: 'wine.html',
})
export class Wine {
	restaurant;
	product: ProductModel;
	liked: boolean = false;
  language;
  likeLimitMessage = 'You can like only once';

  constructor(
		public navCtrl: NavController, 
  	public navParams: NavParams,
  	private utils: Utils,
  	private apiService: Api,
    private translate: TranslateService,
  	private alertCtrl: AlertController) {

  		this.restaurant = this.navParams.get('restaurant');
  		this.product = this.navParams.get('product');
      this.language = translate.currentLang;

      this.translate.get('LIKE_ONLY_ONCE').subscribe(message => {
        this.likeLimitMessage = message;
      });
  }

  onLike(){
    if(!this.liked){
      this.apiService.addNewLike(this.product.id)
        .subscribe(result => {
          this.liked = true;
          this.product.likes++;
        });
    }
    else{
      let msg = this.likeLimitMessage;
      let alert = this.alertCtrl.create({
        message: msg,
        buttons: ['OK']
      });
      alert.present();
    }
  }


}
