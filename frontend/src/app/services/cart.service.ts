import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(food: Food):void {
     let cartItem:CartItem | undefined = this.cart.items
      .find((item: CartItem) => item.food.id === food.id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string):void {
    this.cart.items = this.cart.items
    .filter((item: CartItem)=>item.food.id != foodId)
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem: CartItem | undefined = this.cart.items
    .find((item:CartItem) => {return item.food.id === foodId});
    if(!cartItem) return;
    
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart(): void {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable(); // send it as observable so the cart is modified only in this class
  }

  private setCartToLocalStorage():void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevTotalPrice: number, currentItem:CartItem)=>
      prevTotalPrice + currentItem.price
      ,0);
      this.cart.totalCount = this.cart.items.reduce(
        (prevTotalCount:number, currentItem:CartItem) => prevTotalCount + currentItem.quantity,
        0);
    
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem("Cart", cartJson);
    this.cartSubject.next(this.cart); // notify observers
  }

  private getCartFromLocalStorage():Cart {
    const cartJson = localStorage.getItem("Cart");
    return cartJson ?JSON.parse(cartJson) : new Cart();
  }
}
