import { Food } from "./Food";

export class CartItem{

  price: number;
  quantity:number = 1;
  
  constructor(public food:Food){ 
    this.price = food.price;
  }
}