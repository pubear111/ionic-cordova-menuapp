import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ProductModel } from '../../models/product';
import { ReviewModel } from '../../models/review';
import { Api } from '../../providers/api';
import { Utils } from '../../providers/utils';


@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class Product {
	activeTab: string = 'description';
	product: ProductModel;
  formReview: ReviewModel;
  restaurant;
  liked: boolean = false;
  language;
  relatedProducts: ProductModel[];
  gradientbg;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private apiService: Api,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private _sanitizer: DomSanitizer,
    private utils: Utils) {

      this.product = this.navParams.get('product');
      this.relatedProducts = this.navParams.get('products');
      this.resetReviewForm();
      
      this.restaurant = this.navParams.get('restaurant');
      this.language = translate.currentLang;
  }

  ionViewWillEnter(){
    this.apiService.getReviews(this.product.id)
      .subscribe(reviews => {
        this.product.reviews = reviews;
      });

    this.gradientbg = this._sanitizer.bypassSecurityTrustStyle('-webkit-gradient(linear, left top, right top, from(#'+this.restaurant.app_color+'), to('+this.utils.convertHex(this.restaurant.app_color, '.1')+'))');
      
  }

  ionViewDidEnter(){
    let recents = document.querySelector('#related');
    document.getElementsByTagName('page-product')[0].appendChild(recents);
  }

  ionViewWillLeave(){
    let recents = document.querySelector('#related');
    document.querySelector('#productContent').appendChild(recents);
  }

  onShowTab(tab){
  	this.activeTab = tab;
  }

  onSubmitReview(form: any){
    let data = { 
      reviewer_first_name: form.value.reviewer_first_name,
      reviewer_last_name: form.value.reviewer_last_name,
      review_content: form.value.review_content,
      product_id: this.product.id,
      rating: this.formReview.rating
    };

    if( !this.formReview.rating ){
      let toast = this.toastCtrl.create({
        message: 'Please select the stars',
        duration: 3000
      });
      toast.present();
      return false;
    } 
    else if (!this.formReview.reviewer_first_name.length || !this.formReview.reviewer_last_name.length || !this.formReview.review_content.length){
      let toast = this.toastCtrl.create({
        message: 'Please fill all the fields',
        duration: 3000
      });
      toast.present();
      return false;
    }

    this.apiService.postReview(data)
      .subscribe(result => {
        if (result.status) {
          let toast = this.toastCtrl.create({
            message: 'Your review has been posted',
            duration: 3000
          });
          toast.present();
          this.resetReviewForm();
        }else{
          let toast = this.toastCtrl.create({
            message: 'Server problems while adding your review. Please try again later!',
            duration: 3000
          });
          toast.present();
        }
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
      let alert = this.alertCtrl.create({
        message: "You can like only once",
        buttons: ['OK']
      });
      alert.present();
    }
  }

  private resetReviewForm(){
    this.formReview = {
      reviewer_first_name: '',
      reviewer_last_name: '',
      review_content: '',
      product_id: this.product.id,
      rating: 0
    };
  }

  private changeProduct(product: ProductModel){
    this.product = product;
  }

}
