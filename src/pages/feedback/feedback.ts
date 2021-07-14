import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../providers/utils';
import { Api } from '../../providers/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class Feedback {
	restaurant;
	feedback: any;
	maleLabel: string = 'male';
	femaleLabel: string = 'female';
	satisfactoryOptions: any[]; 
	poor = 'Poor';
	fair = 'Fair';
	average = 'Average';
	veryGood = 'Very Good';
	excellent = 'Excellent';
	language;

  constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		private utils: Utils,
  		private translate: TranslateService,
  		private apiService: Api
  	) {
	  	
	  	this.restaurant = this.navParams.get('restaurant');
	  	this.feedback = {
	  		gender: null,
	  		full_name: '',
	  		phone: '',
	  		email: '',
	  		taste: null,
	  		atmosphere: null,
	  		quality: null,
	  		overall_satisfaction: null,
	  		comment: '',
	  		restaurant_id: this.restaurant.id
  		}

  		this.language = this.translate.currentLang;

  		this.translate.get('POOR').subscribe(translation => {
	      this.poor = translation
	    });
  		this.translate.get('FAIR').subscribe(translation => {
	      this.fair = translation
	    });
  		this.translate.get('AVERAGE').subscribe(translation => {
	      this.average = translation
	    });
  		this.translate.get('VERY_GOOD').subscribe(translation => {
	      this.veryGood = translation
	    });
  		this.translate.get('EXCELLENT').subscribe(translation => {
	      this.excellent = translation
	    });


	  	this.satisfactoryOptions	= [
				{
					value: 1,
					label: this.poor
				},
				{
					value: 2,
					label: this.fair
				},
				{
					value: 3,
					label: this.average
				},
				{
					value: 4,
					label: this.veryGood
				},
				{
					value: 5,
					label: this.excellent
				}
			];

  }

  onSubmitFeedback(form: any){
  	console.log(this.feedback);
  	this.apiService.sendFeedback(this.feedback)
  		.subscribe(result => console.log(result));
  }

}
