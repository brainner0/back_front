import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  id: number; // Mantenha como number para consistência com APIs REST
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/items'; // Ajuste para sua API

  constructor(private http: HttpClient) {}

  // Todos os métodos mantêm number como tipo de ID
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItem(id: number): Observable<Item> {
  return this.http.get<Item>(`${this.apiUrl}/${id}`);
}

  addItem(item: Omit<Item, 'id'>): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItem(id: number, item: { name: string, description: string }): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, item);
}

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}