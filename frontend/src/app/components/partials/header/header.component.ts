import { UserService } from './../../../services/user.service';
import { CartService } from './../../../services/cart.service';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../../../shared/models/Cart';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartQuantity:number = 0;
  user!:User;
  constructor(cartService:CartService, private userService: UserService) {
    cartService.getCartObservable().subscribe((newCart:Cart)=> {
      this.cartQuantity = newCart.totalCount
    });

    userService.userObservable.subscribe((user: User) => {
      this.user = user;
    });


  }

  logout() :void {
    this.userService.logout();
  }
}
