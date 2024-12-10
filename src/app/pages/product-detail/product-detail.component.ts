import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: Product[] = []


  product: Product | undefined;

  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private productService:ProductService) {}

  ngOnInit(): void {

    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProducts().subscribe((products) => {
      this.product = products.find((p) => p.id === productId) as Product;
    });

    
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert(`${this.product.name} به سبد خرید اضافه شد!`);
    }
  }
}