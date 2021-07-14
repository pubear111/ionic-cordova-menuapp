import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {

  constructor(public http: Http) {
  }

  getCategories(){
  	return [
  		{
  			id: 1,
  			title: 'Soups',
  			icon: ''
  		},
  		{
  			id: 2,
  			title: 'Salads',
  			icon: ''
  		},
  		{
  			id: 3,
  			title: 'Main courses',
  			icon: ''
  		},
  		{
  			id: 4,
  			title: 'Side dishes',
  			icon: ''
  		},
  		{
  			id: 5,
  			title: 'Burgers',
  			icon: ''
  		},
  		{
  			id: 6,
  			title: 'Pizza',
  			icon: ''
  		},
  		{
  			id: 7,
  			title: 'Desserts',
  			icon: ''
  		},
  		{
  			id: 8,
  			title: 'Drinks',
  			icon: ''
  		},
  		{
  			id: 9,
  			title: 'Shisha',
  			icon: ''
  		},
  		{
  			id: 10,
  			title: 'Pasta',
  			icon: ''
  		},
  		{
  			id: 11,
  			title: 'Local Food',
  			icon: ''
  		},
  		{
  			id: 12,
  			title: 'Wine List',
  			icon: ''
  		},
  	];
  }

  getProducts(){
    return [
      {
        id: 1,
        title: "Spinach Sweet Crisp Salad",
        image: '',
        price: 10,
        itemPrice: null,
        category: 1,
        type: '',
        reviews: this.getTempReviews()
      },
      {
        id: 2,
        title: "Chicken Caesar Salad",
        image: '',
        price: 10,
        itemPrice: null,
        category: 1,
        type: '',
        reviews: this.getTempReviews()
      },
      {
        id: 3,
        title: "The Trio – Soup & Salad",
        image: '',
        price: 12.5,
        itemPrice: null,
        category: 1,
        type: '',
        reviews: this.getTempReviews()
      },
      {
        id: 4,
        title: "Fattoush salad",
        image: '',
        price: 12.5,
        itemPrice: null,
        category: 1,
        type: '',
        reviews: this.getTempReviews()
      },
      {
        id: 5,
        title: "Chopped Salad",
        image: '',
        price: 8.5,
        itemPrice: null,
        category: 1,
        type: '',
        reviews: this.getTempReviews()
      },
      {
        id: 6,
        title: "Greek Salad",
        image: '',
        price: 8.5,
        itemPrice: null,
        category: 1,
        type: '',
        reviews: this.getTempReviews()
      },
      {
        id: 7,
        title: "Halloumi Cheese salad",
        image: '',
        price: 8.5,
        itemPrice: null,
        category: 1,
        type: '',
        reviews: this.getTempReviews()
      },
      {
        id: 8,
        title: "Russian Salad",
        image: '',
        price: 8.5,
        itemPrice: null,
        category: 1,
        type: '',
        reviews: this.getTempReviews()
      }

    ];
    
  }

  private getTempReviews(){

    return [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, laudantium laborum dolor, itaque sunt eaque magnam, deleniti aspernatur, corporis omnis assumenda hic explicabo quaerat. Maxime minus facere impedit iste delectus.',
        rating: 4
      },
      {
        id: 2,
        first_name: 'John',
        last_name: 'Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, quia minus magnam temporibus officia voluptatem ratione molestiae in facilis rerum nisi, ipsa quo deleniti vel a praesentium expedita. Ut, maiores.',
        rating: 4
      },
      {
        id: 3,
        first_name: 'John',
        last_name: 'Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos tenetur, sunt debitis placeat provident pariatur id accusantium quis quae! Voluptate soluta iure quisquam tempora quo voluptatibus voluptas nobis optio repellendus.',
        rating: 5
      },
      {
        id: 4,
        first_name: 'John',
        last_name: 'Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nobis nemo placeat! Expedita dicta asperiores accusantium dolore, rem saepe voluptas non ex illo reprehenderit quidem earum, a. Neque, expedita, adipisci.',
        rating: 5
      },
      {
        id: 5,
        first_name: 'John',
        last_name: 'Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At inventore maiores, quaerat quidem esse magnam ipsum assumenda illum ipsam deleniti laborum, commodi odit corrupti iste, minus ad. Repellat, magnam, nihil.',
        rating: 4
      },
      {
        id: 6,
        first_name: 'John',
        last_name: 'Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur alias magni reiciendis cupiditate, exercitationem ut corporis expedita. Dolorum, ducimus architecto non saepe, consequatur facere reiciendis quidem. Libero sed minima eius.',
        rating: 5
      },
      {
        id: 7,
        first_name: 'John',
        last_name: 'Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident suscipit possimus vero cumque accusamus facilis fuga voluptate doloribus necessitatibus, porro accusantium nesciunt doloremque, neque, deleniti architecto. At incidunt culpa, fugiat.',
        rating: 5
      }

    ];

  }

}
