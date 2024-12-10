import { AfterViewInit, Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import Swiper from 'swiper';
import { CartService } from '../../services/cart.service';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent {

  products: Product[] = [];

  topSellingProducts: Product[] = [];
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService,private cartService:CartService,private router: Router) {}

  ngOnInit() {
    // دریافت محصولات از سرویس
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data; // مقداردهی به متغیر products
      this.topSellingProducts = this.products.slice(0, 4);
      this.featuredProducts = this.products.slice(4, 8);
    });

    // انتخاب 8 محصول پرفروش
    
  }

  ngAfterViewInit() {
    new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} به سبد خرید اضافه شد!`);
  }


  viewProduct(product: Product): void {
    this.router.navigate(['/product', product.id]);
  }

  
}
