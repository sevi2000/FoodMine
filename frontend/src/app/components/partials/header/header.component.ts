import { CartService } from './../../../services/cart.service';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../../../shared/models/Cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartQuantity:number = 0;
  constructor(cartService:CartService) {
    cartService.getCartObservable().subscribe((newCart:Cart)=> {
      this.cartQuantity = newCart.totalCount
    });
  }
}
