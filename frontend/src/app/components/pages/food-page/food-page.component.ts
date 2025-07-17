import { FoodService } from './../../../services/food.service';
import { Component } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent {

  food!:Food;

  constructor(foodService: FoodService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params)=>{
      if(params['id']){
        this.food = foodService.getFoodById(params['id']);
      }
    });
  }

}
