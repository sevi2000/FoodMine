import { CartService } from './../../../services/cart.service';
import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartItem } from '../../../shared/models/CartItem';
import { Food } from '../../../shared/models/Food';
import { TitleComponent } from '../../partials/title/title.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [TitleComponent, RouterLink, CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  options:number[] = [1,2,3,4,5];
  cart!: Cart;
  constructor(private cartService:CartService) {
    this.cartService.getCartObservable().subscribe((cart:Cart)=>{
      this.cart = cart;
    })
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
