import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Login } from '../login/login';
import { Utils } from '../../providers/utils';
import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class Logout {
	code: string;
  restaurant;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private storage: Storage,
		private alertCtrl: AlertController,
    private utils: Utils,
    private translate: TranslateService
    ) {

    this.restaurant = this.navParams.get('restaurant');
  }

  onlogout(form: any){

  	this.code = form.value.code;
  	this.storage.ready().then(()=> {
      this.storage.get('restaurant').then(restaurant => {

        if(this.code.toLowerCase() !== restaurant.code.toLowerCase()){
          this.translate.get('CODE_INCORRECT').subscribe(title => {
            let alert = this.alertCtrl.create({
              title: title,
              buttons: ['OK']
            });
            alert.present();
          });
        } 
        else{
          let alert = this.alertCtrl.create({
            title: 'Logged Out',
            message: "You're now logged out! Please login to continue using the app.",
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.storage.remove('restaurant');
                  this.navCtrl.setRoot(Login);
                }
              }
            ],
            enableBackdropDismiss: false
          });
          alert.present();
        }

      }).catch(console.log);
    });
  }

}
