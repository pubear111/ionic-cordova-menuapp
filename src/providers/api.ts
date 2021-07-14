
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Api {
	public API_URL = 'http://menu.diamonderbil.com/api';
  constructor(
  	private http: Http,
    ){
  }

  auth(code: string){
    return this.http.get(this.API_URL+'/code/'+code)
      .map((response: Response) => {
        return response.json();
      });
  }

  getCategories(code){

    return this.http.get(this.API_URL+'/categories/'+code)
      .map((response: Response) => {
        return response.json();
      });
  }

  getProducts(category, code){
    return this.http.get(this.API_URL+'/products/'+category+'/'+code)
      .map((response: Response) => {
        return response.json();
      });
  }

  getSpecials(code){
    return this.http.get(this.API_URL+'/restaurant/'+code+'/specialoffers')
      .map((response: Response) => {
        return response.json();
      });
  }

  postReview(data){
    return this.http.post(this.API_URL+'/reviews', data)
      .map((response: Response) => {
        return response.json();
      });
  }

  getReviews(id){
    return this.http.get(this.API_URL+'/reviews/'+id)
      .map((response: Response) => {
        return response.json();
      });
  }

  addNewLike(id){
    return this.http.post(this.API_URL+'/product/likes/'+id, {})
      .map((response: Response) => {
        return response.json();
      });
  }

  submitContact(data){
    return this.http.get(this.API_URL+'/contact?name='+data.name+'&surname='+data.surname+'&description='+data.description+'&restaurant_email='+data.restaurant_email)
     .map((response: Response) => {
       return response.json();
     });
  }

  sendFeedback(data){
    return this.http.post(this.API_URL+'/feedback', data)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }

}
