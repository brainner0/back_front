import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = []; // Você pode substituir 'any' por sua interface Item se tiver

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: (items) => this.items = items,
      error: (err) => console.error('Erro ao carregar itens:', err)
    });
  }

  deleteItem(id: number): void {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.itemService.deleteItem(id).subscribe({
        next: () => this.loadItems(), // Recarrega a lista após exclusão
        error: (err) => console.error('Erro ao excluir item:', err)
      });
    }
  }
}