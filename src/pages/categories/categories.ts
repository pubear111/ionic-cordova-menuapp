import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CategoryModel } from '../../models/category';
import { ProductsService } from '../../providers/products';

import { Products } from '../products/products';
import { Wines } from '../wines/wines';
import { Subcategories } from '../subcategories/subcategories';

import { Api } from '../../providers/api';
import { Utils } from '../../providers/utils';


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class Categories {
	categories: CategoryModel[];
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

      this.storage.ready().then(()=>{

        if(!thisClass.language){

          this.storage.get('language').then(language => {
            if(language){
              thisClass.language = language;
            }        
          });
        }
      });

  }

  ionViewWillEnter(){
    this.selectedCategory = null;
    // if(this.navParams.get('pullLanguagesPage')) {
    //   this.navCtrl.setRoot(Categories);
    // }
  }

  ionViewDidLoad(){

    if( !this.restaurant ){
      this.storage.ready().then(()=>{

        this.storage.get('restaurant').then(restaurant => {

          this.restaurant = restaurant;

          this.apiService.getCategories(this.restaurant.code).subscribe((categories: CategoryModel[]) => {
            this.categories = categories;
          });

        });

      });
    }

    else{

      this.apiService.getCategories(this.restaurant.code).subscribe((categories: CategoryModel[]) => {
        this.categories = categories;
      });
    }

    let thisClass = this;
    this.setBg();


  }

  onSelectCategory(category: CategoryModel){
    this.selectedCategory = category;
    if(this.selectedCategory.subcategories && this.selectedCategory.subcategories.length){
      this.navCtrl.push(Subcategories, {
        subcategories: category.subcategories, 
        restaurant: this.restaurant,
        language: this.language
      });
    }
    else{
      let temp = this;
      if(category.type){
        temp.navCtrl.push(Wines, {category: category, restaurant: this.restaurant});
      }else{
        temp.navCtrl.push(Products, {category: category, restaurant: this.restaurant});
      }
    }
  }

  private setBg(){
    let thisClass = this;
    let bgInterval = setInterval(() => {
      
      if (thisClass.restaurant){

         if (this.background != this.restaurant.app_color){
          let elem = <HTMLElement>document.querySelector('page-categories .fixed-content');
          elem.style.backgroundColor = this.utils.convertHex(this.restaurant.app_color);
        }

        this.background = this.restaurant.app_color;
        clearInterval(bgInterval);
      }

    }, 100);
  }

}
