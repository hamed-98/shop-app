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

  // products: Product[] = [
  //   { id: 1, name: 'تی‌شرت مردانه', category: 'مردانه', price: 250000, image: 'assets/tshirt-men.jpg', description: 'این تی‌شرت مناسب استفاده روزمره و دارای کیفیت بالا می‌باشد ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.' },
  //   { id: 2, name: 'پیراهن زنانه', category: 'زنانه', price: 450000, image: 'assets/dress-women.jpg', description: 'یک پیراهن شیک و راحت مناسب مهمانی و مجالس ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.' },
  //   { id: 3, name: 'شلوار جین', category: 'مردانه', price: 300000, image: 'assets/jeans-men.jpg', description: 'شلواری با کیفیت عالی که برای استفاده طولانی مدت طراحی شده است ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.' },
  //   { id: 4, name: 'کت زنانه', category: 'زنانه', price: 550000, image: 'assets/jacket-women.jpg', description: 'این کت با طراحی مدرن مناسب فصل‌های سرد سال است ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.' },
  //   { id: 5, name: 'کلاه مردانه', category: 'مردانه', price: 150000, image: 'assets/hat-men.jpg', description: 'کلاهی شیک و کاربردی برای استایل روزمره ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.' },
  //   { id: 6, name: 'کیف زنانه', category: 'زنانه', price: 350000, image: 'assets/bag-women.jpg', description: 'یک کیف جادار و زیبا که به راحتی نیازهای شما را برآورده می‌کند ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.' }
  // ];

  product: Product | undefined;

  constructor(private route: ActivatedRoute,
    private cartService: CartService,
    private productService:ProductService) {}

  ngOnInit(): void {

    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProducts().subscribe((products) => {
      this.product = products.find((p) => p.id === productId) as Product;
    });

    // const productId = Number(this.route.snapshot.paramMap.get('id'));
    // this.product = this.products.find(p => p.id === productId);

    // this.productService.getProducts().subscribe((data)=>{
    // this.products=data})

    
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert(`${this.product.name} به سبد خرید اضافه شد!`);
    }
  }
}