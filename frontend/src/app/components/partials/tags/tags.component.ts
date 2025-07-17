import { Component } from '@angular/core';
import { Tag } from '../../../shared/models/Tag';
import { FoodService } from '../../../services/food.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tags',
  imports: [RouterLink],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  tags?: Tag[];
  selected?: Tag;

  constructor(foodService: FoodService) {
    this.tags = foodService.getAllTags();
    this.selected = this.tags.find((tag:Tag ) => tag.name === "All");
  }

}
