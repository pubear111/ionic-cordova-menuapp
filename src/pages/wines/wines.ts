import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { CategoryModel } from '../../models/category';
import { ProductModel } from '../../models/product';

import { Wine } from '../wine/wine';

import { Api } from '../../providers/api';
import { Utils } from '../../providers/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-wines',
  templateUrl: 'wines.html',
})
export class Wines {
	activeFilter: string = 'all';
  category: CategoryModel;
  products: ProductModel[];
  filteredProducts;
  restaurant;
  language;
  background: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private apiService: Api,
    private utils: Utils,
    private translate: TranslateService,
    private loadingCtrl: LoadingController
    ) {

      this.category = this.navParams.get('category');
      this.restaurant = this.navParams.get('restaurant');
      this.language = translate.currentLang;
  }

  ionViewDidLoad(){

    let loader = this.loadingCtrl.create({
      content: 'Loading products' 
    });
    loader.present();

    this.apiService.getProducts(this.category.id, this.restaurant.code)
      .subscribe((products: ProductModel[])=>{
        this.products = products;
        this.filteredProducts = this.products.slice();
        loader.dismiss();
      });
      
    this.setBg();
  }

  onSelectFilter(filter: string){
  	this.activeFilter = filter;
    if ( filter !== 'all' ){    
      for ( let i = 0; i < this.products.length; i++ ) {
        this.filteredProducts = this.products.filter((item) => {
          return (item.type.toLowerCase().indexOf(filter) > -1);
        });
      }
    }
    else{
      this.filteredProducts = this.products.slice();
    }
  }

  onGoToWine(product){
  	this.navCtrl.push(Wine, {product: product, restaurant: this.restaurant});
  }

  private setBg(){
    let thisClass = this;
    let bgInterval = setInterval(() => {
      
      if (thisClass.restaurant){

         if (this.background != this.restaurant.app_color){
          let elem = <HTMLElement>document.querySelector('page-wines .fixed-content');
          elem.style.backgroundColor = this.utils.convertHex(this.restaurant.app_color);
        }

        this.background = this.restaurant.app_color;
        clearInterval(bgInterval);
      }

    }, 100);
  }

}
