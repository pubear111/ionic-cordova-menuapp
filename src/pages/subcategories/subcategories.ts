import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CategoryModel } from '../../models/category';
import { ProductsService } from '../../providers/products';

import { Products } from '../products/products';
import { Wines } from '../wines/wines';

import { Api } from '../../providers/api';
import { Utils } from '../../providers/utils';


@Component({
  selector: 'page-subcategories',
  templateUrl: 'subcategories.html',
})
export class Subcategories {
	subcategories: CategoryModel[];
	selectedCategory: CategoryModel;
  restaurant;
  language = 'en';
  background: string;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private apiService: Api,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private utils: Utils
    ) {
    
      let thisClass = this;
      this.restaurant = this.navParams.get('restaurant');

      this.language = this.navParams.get('language');      

      this.subcategories = this.navParams.get('subcategories');

  }

  ionViewWillEnter(){
    this.selectedCategory = null;
  }

  ionViewDidLoad(){
    let thisClass = this;
    let interval = setInterval(()=>{
      if(thisClass.restaurant){
        let elem = <HTMLElement>document.querySelector('page-subcategories .fixed-content');
        elem.style.backgroundColor = thisClass.utils.convertHex(thisClass.restaurant.app_color);
        clearInterval(interval);
      }
    }, 200);

    this.reloadRestaurant();

    this.setBg();

  }

  onSelectCategory(category: CategoryModel){
    this.selectedCategory = category;
    let temp = this;
    if(category.type){
      temp.navCtrl.push(Wines, {category: category, restaurant: this.restaurant});
    }else{
      temp.navCtrl.push(Products, {category: category, restaurant: this.restaurant});
    }
  }

  reloadRestaurant(){
    let thisClass = this;
    let tempInterval = setInterval(()=>{
      if ( thisClass.restaurant ) {
        thisClass.apiService.auth(thisClass.restaurant.code)
          .subscribe(restaurant => {
            thisClass.restaurant = restaurant;
          });

        clearInterval(tempInterval);
      }
    }, 200);
  }

  private setBg(){
    let thisClass = this;
    let bgInterval = setInterval(() => {
      
      if (thisClass.restaurant){

         if (this.background != this.restaurant.app_color){
          let elem = <HTMLElement>document.querySelector('page-subcategories .fixed-content');
          elem.style.backgroundColor = this.utils.convertHex(this.restaurant.app_color);
        }

        this.background = this.restaurant.app_color;
        clearInterval(bgInterval);
      }

    }, 100);
  }

}
