import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Languages } from '../languages/languages';
import { Api } from '../../providers/api';
import { Utils } from '../../providers/utils';
import { Events } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
	code: string;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private storage: Storage,
		private apiService: Api,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
    private utils: Utils,
    public events: Events
    ) {
  }

  onLogin(form: any){
  	let loader = this.loadingCtrl.create({
  		content: 'Logging in'
  	});
  	loader.present();

  	this.code = form.value.code;
  	this.apiService.auth(this.code).subscribe(result => {
  		if(result){
  			this.storage.ready().then(()=> {
		      this.storage.set('restaurant', result).then(restaurant => {
		      	loader.dismiss();

            // Notify components that restaurant has been changed
            this.events.publish('restaurant:change');

		        this.navCtrl.setRoot(Languages, {restaurant: restaurant});
		      }).catch(console.log);
		  	});
  			
  		}else{
  			loader.dismiss();
  			let alert = this.alertCtrl.create({
  				message: 'The code is not valid.',
					buttons: ['OK']
  			});
  			alert.onWillDismiss(()=>{
  				this.code = '';
  			})
  			alert.present();
  		}
	  });
  }

}
