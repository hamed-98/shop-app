import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,CommonModule,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[]
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  priceRange = { min: 0, max: 0 };
  selectedMinPrice: number = 0;
  selectedMaxPrice: number = 0;
  categories: string[] = [];

  constructor(private cartService: CartService,private productService: ProductService,) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
      this.categories = this.productService.getCategories(data);
      const priceRange = this.productService.getPriceRange(data);
      this.priceRange = priceRange;
      this.selectedMinPrice = priceRange.min;
      this.selectedMaxPrice = priceRange.max;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} به سبد خرید اضافه شد!`);
  }


  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      return (
        (product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || this.searchTerm === '') &&
        (this.selectedCategory === '' || product.category === this.selectedCategory) &&
        product.price >= this.selectedMinPrice &&
        product.price <= this.selectedMaxPrice
      );
    });
  }


}
