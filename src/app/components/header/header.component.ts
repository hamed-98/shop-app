import { Component, OnInit,Renderer2,OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,MatIconModule,MatCommonModule,MatButtonModule,MatMenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  showSubmenu:boolean=false;
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  showModal: boolean = false;

  constructor(private cartService: CartService,private productService: ProductService,private renderer:Renderer2) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((cart) => {
      this.cartCount = cart.length;  
    });

    
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      const isClickInsideModal = event.target instanceof HTMLElement && event.target.closest('.search-modal');
      const isClickInsideInput = event.target instanceof HTMLElement && event.target.closest('.search-input');

      if (!isClickInsideModal && !isClickInsideInput) {
        this.clearSearch(); 
      }
    });

  }

  toggleSubmenu(){
    this.showSubmenu = !this.showSubmenu
  }

  filterProducts() {
    if (this.searchTerm.trim()) {
      this.productService.getProducts().subscribe((products) => {
        this.filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
      this.showModal = true;  
    } else {
      this.filteredProducts = []; 
      this.showModal = false;  
    }
  }

  clearSearch() {
    this.searchTerm = ''; 
    this.filteredProducts = []; 
    this.showModal = false; 
  }

  closeModal() {
    this.showModal = false;
  }

  isMenuOpen: boolean = false; 

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false; 
  }

}
