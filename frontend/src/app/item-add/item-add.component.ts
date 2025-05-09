import { Component } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent {
  name: string = '';
  description: string = '';

  constructor(private itemService: ItemService) {}

  addItem(): void {
    const newItem = { name: this.name, description: this.description };
    this.itemService.addItem(newItem).subscribe();
  }
}
