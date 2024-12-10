import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin-product-modal',
  standalone: true,
  imports: [MaterialModule, FormsModule, CommonModule, MatDialogModule],
  templateUrl: './admin-product-modal.component.html',
  styleUrls: ['./admin-product-modal.component.css']
})
export class AdminProductModalComponent {
  product: Product = {
    id: Date.now(),
    name: '',
    category: '',
    price: 0,
    image: null,
  };

  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<AdminProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private supabaseService: SupabaseService
  ) {
    if (data) {
      this.product = { ...data };
      if (data.image) this.imagePreview = data.image;
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.product.image = file;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveProduct() {
    try {
      if (this.product.image instanceof File) {
        const uploadResponse = await this.supabaseService.uploadImage(this.product.image);
        if (uploadResponse) {
          this.product.image = uploadResponse;
        }
      }

      const result = this.product.id
        ? await this.supabaseService.updateProduct(this.product)
        : await this.supabaseService.addProduct(this.product);

      if (result) {
        this.dialogRef.close(this.product);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}




