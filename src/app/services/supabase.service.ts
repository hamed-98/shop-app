// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('products') 
        .select('*'); 

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return data || [];
    } catch (err) {
      console.error('Unexpected error:', err);
      throw err;
    }
  }


    
  
  async addProduct(product: Product) {
    try {
      const { error } = await supabase
        .from('products') 
        .insert([product]); 

      if (error) {
        console.error('Error adding product:', error);
        throw error;
      }

      console.log('محصول با موفقیت اضافه شد!');
      return true;
    } catch (err) {
      console.error('Unexpected error during product addition:', err);
      throw err;
    }
  }

  // حذف محصول 
  async deleteProduct(id: number) {
    try {
      const { error } = await supabase
        .from('products') 
        .delete()
        .match({ id }); 

      if (error) {
        console.error('Error deleting product:', error);
        throw error;
      }

      console.log('محصول با موفقیت حذف شد!');
      return true;
    } catch (err) {
      console.error('Unexpected error during product deletion:', err);
      throw err;
    }
  }

  async uploadImage(imageFile: File) {
    const filePath = `products/${Date.now()}_${imageFile.name}`;
    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, imageFile, {
        cacheControl: '3600',
        upsert: true, 
      });
  
    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  
    const publicUrl = supabase.storage
  .from('product-images')
  .getPublicUrl(filePath).data.publicUrl;
  
    
      return publicUrl; // بازگشت لینک عمومی
  }

  async updateProduct(product: Product) {
    let imageURL = product.image;
  
    // بررسی که آیا باید تصویر آپلود شود
    if (product.image instanceof File) {
      imageURL = await this.uploadImage(product.image); // ذخیره و بازگشت URL
    }
  
    const { error } = await supabase
      .from('products')
      .update({
        name: product.name,
        category: product.category,
        price: product.price,
        description:product.description,
        image: imageURL, 
      })
      .eq('id', product.id);
  
    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  
    console.log('Product updated successfully');
    return true;
  }
  
  
}
