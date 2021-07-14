import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { CategoryModel } from '../../models/category';
import { ProductModel } from '../../models/product';
import { Product } from '../product/product';
import { Api } from '../../providers/api';
import { Utils } from '../../providers/utils';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class Products {
	category: CategoryModel;
	products: ProductModel[];
  restaurant;
  gradientbg;
  language;
  background: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private apiService: Api,
    private utils: Utils,
    private loadingCtrl: LoadingController,
    private _sanitizer: DomSanitizer,
    private translate: TranslateService

  ) {
  	this.category = this.navParams.get('category');
    this.restaurant = this.navParams.get('restaurant');
  }


  ionViewDidLoad(){
     this.apiService.getProducts(this.category.id, this.restaurant.code)
      .subscribe((products: ProductModel[])=>{
        this.products = products;
      });

    this.gradientbg = this._sanitizer.bypassSecurityTrustStyle('-webkit-gradient(linear, left top, right top, from(#'+this.restaurant.app_color+'), to('+this.utils.convertHex(this.restaurant.app_color, '.1')+'))');

    this.language = this.translate.currentLang;
    this.setBg();
  }

  onGoToProduct(product){
  	this.navCtrl.push(Product, {
      product: product, 
      restaurant: this.restaurant,
      products: this.products
    });
  }

  private setBg(){
    let thisClass = this;
    let bgInterval = setInterval(() => {
      
      if (thisClass.restaurant){

         if (this.background != this.restaurant.app_color){
          let elem = <HTMLElement>document.querySelector('page-products .fixed-content');
          elem.style.backgroundColor = this.utils.convertHex(this.restaurant.app_color);
        }

        this.background = this.restaurant.app_color;
        clearInterval(bgInterval);
      }

    }, 100);
  }

}
