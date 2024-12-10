import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cart);

  constructor(){}

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product) {
    this.cart.push(product);
    this.cartSubject.next(this.cart);
  }

  removeFromCart(product: Product) {
    this.cart = this.cart.filter(item => item.id !== product.id);
    this.cartSubject.next(this.cart);
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  updateQuantity(product: Product, quantity: number): void {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.cart[index].quantity = quantity;
      this.cartSubject.next(this.cart);
    }
  }
}
