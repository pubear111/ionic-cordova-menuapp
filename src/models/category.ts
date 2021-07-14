export class CategoryModel{
  id: number;
  title: string;
  icon: string;
  type: number;
  subcategories: CategoryModel[];
}