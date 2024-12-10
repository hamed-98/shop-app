import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,FormsModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
 
  

  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }


  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price,0);
  }

  updateQuantity(product: Product, quantity: number): void {
    this.cartService.updateQuantity(product, quantity);
    this.calculateTotal();
  }
}
