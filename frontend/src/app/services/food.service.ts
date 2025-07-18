import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}
  
  getAll(): Food[] {
    return sample_foods;
  }

  getAllFoodsBySearchTerm(searchTerm: string): Food[] {
    return sample_foods.filter((food) => {
      return food.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag === "All" ? this.getAll():
    this.getAll().filter((food: Food)=>{return food.tags?.includes(tag)});
  }

  getFoodById(id: string): Food {
    return this.getAll().find((food:Food) => {return food.id === id}) ?? new Food();
  }
}
