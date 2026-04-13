import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JewelleryItem {
  id?: number;
  name: string;
  metalType: string;
  weight: number;
  makingCharges: number;
  taxPercent: number;
  availability: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:8080/api/items';

  constructor(private http: HttpClient) { }

  // GET
  getItems(): Observable<JewelleryItem[]> {
    return this.http.get<JewelleryItem[]>(this.apiUrl);
  }

  // POST
  addItem(item: JewelleryItem) {
    return this.http.post(this.apiUrl, item);
  }

  // PUT (UPDATE) ✅ FIXED
  updateItem(id: number, item: JewelleryItem) {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  // DELETE
  deleteItem(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}