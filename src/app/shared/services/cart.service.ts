import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ProductInCart} from "../../../types/product-in-cart.type";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ProductInCart[] = [];
  private cartSubject = new BehaviorSubject<ProductInCart[]>(this.loadCartFromStorage());
  cart$ = this.cartSubject.asObservable(); // 👈 reactive observable for live updates

  constructor() {}

  private loadCartFromStorage(): ProductInCart[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  private saveCartToStorage(cart: ProductInCart[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(product: ProductInCart): void {
    const items = [...this.cartSubject.value];

    // check for duplicate (same id + size + color)
    const existing = items.find(
      i => i.name === product.name && i.size === product.size && i.color === product.color
    );

    if (existing) {
      existing.quantity += product.quantity;
    } else {
      items.push(product);
    }

    this.cartSubject.next(items);
    this.saveToLocalStorage(items);
  }

  private saveToLocalStorage(items: ProductInCart[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  removeFromCart(index: number): void {
    const current = [...this.cartSubject.value];
    current.splice(index, 1);
    this.cartSubject.next(current);
    this.saveCartToStorage(current);
  }

  getTotalCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateQuantity(index: number, quantity: number): void {
    const items = [...this.cartSubject.value];
    if (items[index]) {
      items[index].quantity = quantity;
    }
    this.cartSubject.next(items);
    this.saveToLocalStorage(items);
  }

  clearCart(): void {
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }

  getCart(): ProductInCart[] {
    return this.cartSubject.value;
  }
}
