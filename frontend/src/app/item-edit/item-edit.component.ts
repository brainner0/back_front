import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  id: number = 0;
  name: string = '';
  description: string = '';

  // Torna o Router público para acesso no template
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    public router: Router // Alterado de private para public
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : 0;

    if (this.id) {
      this.itemService.getItem(this.id).subscribe({
        next: (item) => {
          if (item) {
            this.name = item.name;
            this.description = item.description;
          }
        },
        error: (err) => console.error('Erro ao carregar item:', err)
      });
    }
  }

  onSubmit(): void {
    const updatedItem = {
      name: this.name,
      description: this.description
    };

    this.itemService.updateItem(this.id, updatedItem).subscribe({
      next: () => this.router.navigate(['/items']),
      error: (err) => console.error('Erro ao atualizar item:', err)
    });
  }

  // Adicionando método para cancelar
  onCancel(): void {
    this.router.navigate(['/items']);
  }
}