import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../providers/utils';
// import { Api } from '../../providers/api';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class About {
	restaurant;

  constructor(
		private navCtrl: NavController, 
  	private navParams: NavParams,
  	private utils: Utils,
    // private apiService: Api
    ) {

  	  this.restaurant = this.navParams.get('restaurant');
      // console.log(this.restaurant);
  }

}
