// product-management.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { AdminProductModalComponent } from '../admin-product-modal/admin-product-modal.component';


import { Product } from '../../models/product.model';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  products: Product[] = [];
  loading = false;

  constructor(private dialog: MatDialog, private supabase: SupabaseService) {
    this.loadProducts();
  }

  async loadProducts() {
    this.loading = true;
    try {
      this.products = await this.supabase.getProducts();
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      this.loading = false;
    }
  }

  openAddProductModal(): void {
    const dialogRef = this.dialog.open(AdminProductModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(async (result: Product | null) => {
      if (result) {
        try {
          await this.supabase.addProduct(result);
          this.loadProducts();
        } catch (error) {
          console.error('Error adding product:', error);
        }
      }
    });
  }

  openEditProductModal(product: Product): void {
    const dialogRef = this.dialog.open(AdminProductModalComponent, {
      width: '500px',
      data: { ...product },
    });

    dialogRef.afterClosed().subscribe(async (result: Product | null) => {
      if (result) {
        try {
          await this.supabase.updateProduct(result);
          this.loadProducts();
        } catch (error) {
          console.error('Error updating product:', error);
        }
      }
    });
  }

  async deleteProduct(productId: number) {
    if (confirm('آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟')) {
      try {
        await this.supabase.deleteProduct(productId);
        this.loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }
  

}
