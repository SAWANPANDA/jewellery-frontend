import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService, JewelleryItem } from '../../services/item';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList implements OnInit {

  items: JewelleryItem[] = [];
  filteredItems: JewelleryItem[] = [];

  metalPrices: number[] = [];
  shippingCosts: number[] = [];
  finalPrices: number[] = [];

  isEditing: boolean = false;
  editingId: number | null = null;

  submitted: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  newItem: JewelleryItem = {
    name: '',
    metalType: '',
    weight: 0,
    makingCharges: 0,
    taxPercent: 0,
    availability: true
  };

  constructor(private service: ItemService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.service.getItems().subscribe(data => {
      this.items = data;
      this.filteredItems = data;
    });
  }

  isValidForm(): boolean {
    const nameValid = /^[A-Za-z ]+$/.test(this.newItem.name);

    return (
      nameValid &&
      this.newItem.metalType.trim() !== '' &&
      this.newItem.weight > 0 &&
      this.newItem.makingCharges >= 0 &&
      this.newItem.taxPercent >= 0
    );
  }

  addItem() {
    this.submitted = true;

    if (!this.isValidForm()) {
      this.errorMessage = 'Please fix validation errors';
      this.successMessage = '';
      return;
    }

    if (this.isEditing && this.editingId !== null) {
      this.service.updateItem(this.editingId, this.newItem).subscribe({
        next: () => {
          this.loadItems();
          this.resetForm();
          this.successMessage = 'Item updated successfully';
          this.errorMessage = '';
        },
        error: () => {
          this.errorMessage = 'Update failed';
          this.successMessage = '';
        }
      });

    } else {
      this.service.addItem(this.newItem).subscribe({
        next: () => {
          this.loadItems();
          this.resetForm();
          this.successMessage = 'Item added successfully';
          this.errorMessage = '';
        },
        error: () => {
          this.errorMessage = 'Add failed';
          this.successMessage = '';
        }
      });
    }

    this.submitted = false;
  }

  editItem(item: JewelleryItem) {
    this.isEditing = true;
    this.editingId = item.id ?? null;
    this.newItem = { ...item };
  }

  deleteItem(id: number | undefined) {
    if (!id) return;

    if (confirm('Are you sure you want to delete this item?')) {
      this.service.deleteItem(id).subscribe({
        next: () => {
          this.loadItems();
          this.successMessage = 'Item deleted successfully';
          this.errorMessage = '';
        },
        error: () => {
          this.errorMessage = 'Delete failed';
          this.successMessage = '';
        }
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.editingId = null;

    this.newItem = {
      name: '',
      metalType: '',
      weight: 0,
      makingCharges: 0,
      taxPercent: 0,
      availability: true
    };
  }

  onFilterChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (!value) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(
        item => item.metalType.toLowerCase() === value.toLowerCase()
      );
    }
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'name') {
      this.filteredItems = [...this.filteredItems].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (value === 'weight') {
      this.filteredItems = [...this.filteredItems].sort((a, b) =>
        a.weight - b.weight
      );
    }
  }

  calculate(item: JewelleryItem, i: number) {
    const metalPrice = this.metalPrices[i] || 0;
    const shipping = this.shippingCosts[i] || 0;

    const base = item.weight * metalPrice;
    const subtotal = base + item.makingCharges + shipping;
    const tax = subtotal * (item.taxPercent / 100);

    this.finalPrices[i] = subtotal + tax;
  }

  allowOnlyLetters(event: KeyboardEvent) {
    const char = event.key;

    if (!/^[A-Za-z ]$/.test(char)) {
      event.preventDefault();
    }
  }
}