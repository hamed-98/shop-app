import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink,CurrencyPipe,CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category: string | null = '';
  products: Product[] = [
    { id: 1, name: 'تی‌شرت مردانه', category: 'مردانه', price: 250000, image: 'assets/tshirt-men.jpg' },
    { id: 2, name: 'پیراهن زنانه', category: 'زنانه', price: 450000, image: 'assets/dress-women.jpg' },
    // محصولات نمونه دیگر
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
    this.filterProductsByCategory();
  }

  filterProductsByCategory() {
    if (this.category) {
      this.products = this.products.filter(product => product.category === this.category);
    }
  }
}
