import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Api } from '../../providers/api';

declare var google;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class Contact {
	restaurant;
	contactInfo;
  language;

  constructor(
		public navCtrl: NavController, 
  	public navParams: NavParams,
  	private apiService: Api,
  	private alertCtrl: AlertController,
  	private toastCtrl: ToastController,
  	private loadingCtrl: LoadingController,
    private translate: TranslateService) {

	  	this.restaurant = this.navParams.get('restaurant');
	  	this.resetContactInfo();
      this.language = this.translate.currentLang;
  }

  ionViewDidLoad() {
		let latitude = Number(36.2394358);
    let longitude = Number(43.9931493);
    let mapReady = false;
    let mapInterval = setInterval(function(){
      if( document.getElementById('map') !== null ) mapReady = true;
      if( mapReady ) {
        var uluru = {lat: latitude, lng: longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        new google.maps.Marker({
          position: uluru,
          map: map
        });
        clearInterval(mapInterval);
      }
    }, 200);
  }

  onSubmit(form: any){
  	if(!this.contactInfo.name || !this.contactInfo.surname || !this.contactInfo.description){

	  	let alert = this.alertCtrl.create({
	  		message: 'Please fill all the fields',
	  		buttons: ['OK']
	  	});
	  	alert.present();
  	}
  	else{

  		let loader = this.loadingCtrl.create({
  			content: 'Sending your message'
  		});
  		loader.present();

  		let data = form.value;
  		data.restaurant_email = this.restaurant.email;
  		this.apiService.submitContact(data)
  			.subscribe(response => {
  				if(response){
  					loader.dismiss();
  					let toast = this.toastCtrl.create({
  						message: 'Your message was sent',
  						duration: 3000
  					});
  					toast.present();
  					this.resetContactInfo();
  				}
  				else{
  					let alert = this.alertCtrl.create({
  						message: ''
  					})
  				}

  			});
  	}

  }

  private resetContactInfo(){
		this.contactInfo = {
			name: '',
			surname: '',
			description: ''
		};
	}


}


