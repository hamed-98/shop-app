import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private supabaseUrl = 'https://xvezgvwhnmyqedcruitr.supabase.co'; 
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2ZXpndndobm15cWVkY3J1aXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3Mzk5MjUsImV4cCI6MjA0OTMxNTkyNX0.yiVRfY1QJYXCFljoalJ07dF-XhDoFNN2TE-e1BEKk0k'; // کلید API
  private table = 'products'; 

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      apikey: this.supabaseKey,
      Authorization: `Bearer ${this.supabaseKey}`,
    });
  }

  // گرفتن همه محصولات
  getProducts(): Observable<Product[]> {
    const url = `${this.supabaseUrl}/rest/v1/${this.table}`;
    return this.http.get<Product[]>(url, { headers: this.getHeaders() });
  }

  // گرفتن محصول بر اساس ID
  getProductById(id: number): Observable<Product | undefined> {
    const url = `${this.supabaseUrl}/rest/v1/${this.table}?id=eq.${id}`;
    return this.http.get<Product[]>(url, { headers: this.getHeaders() }).pipe(
      map((products) => products[0]) // چون نتیجه یک آرایه است، اولین مقدار را برمی‌گرداند
    );
  }

  // گرفتن محصولات با قیمت کمتر از مقدار مشخص
  getProductsByPrice(maxPrice: number): Observable<Product[]> {
    const url = `${this.supabaseUrl}/rest/v1/${this.table}?price=lte.${maxPrice}`;
    return this.http.get<Product[]>(url, { headers: this.getHeaders() });
  }

  // گرفتن محصولات بر اساس کلمه کلیدی نام
  getProductsByName(keyword: string): Observable<Product[]> {
    const url = `${this.supabaseUrl}/rest/v1/${this.table}?name=ilike.%${keyword}%`;
    return this.http.get<Product[]>(url, { headers: this.getHeaders() });
  }

  // استخراج دسته‌بندی‌ها
  getCategories(products: Product[]): string[] {
    return Array.from(new Set(products.map(product => product.category)));
  }

  // محاسبه حداقل و حداکثر قیمت
  getPriceRange(products: Product[]): { min: number; max: number } {
    const prices = products.map(product => product.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }
}
