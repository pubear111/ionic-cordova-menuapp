import { ReviewModel } from './review';

export class ProductModel{
	id: number;
  name_english: string;
  name_kurdish: string;
  name_arabic: string;
  featured_image: string;
 	description_english: string;
  description_kurdish: string;
  description_arabic: string;
  price: number;
  item_price: number;
  category_id: number;
  type: string;
  images: any[];
  reviews: ReviewModel[];
  likes: number;
}