import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { supabase } from '../../supabase-client';
import { ChartData } from 'chart.js';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  productCount: number = 0;
  monthlyProducts: number = 0;
  categories: { name: string; count: number }[] = [];
  loading = true;

  // نمودار مربوط به تحلیل آمار
  chartData: ChartData<'pie', number[]> = {
    labels: [],
    datasets: [],
  };

  async ngOnInit() {
    await this.loadDashboard();
  }

  async loadDashboard() {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;

      // محاسبه تعداد کل محصولات
      this.productCount = products?.length || 0;

      // محاسبه آمار ماه اخیر
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const recentProducts = products?.filter(
        (product: any) => new Date(product.created_at) >= firstDayOfMonth
      );

      this.monthlyProducts = recentProducts?.length || 0;

      // محاسبه آمار دسته‌بندی‌ها
      const categoryMap: Record<string, number> = {};
      products?.forEach((product: any) => {
        if (product.category) {
          categoryMap[product.category] = (categoryMap[product.category] || 0) + 1;
        }
      });

      this.categories = Object.keys(categoryMap).map((key) => ({
        name: key,
        count: categoryMap[key],
      }));

      this.updateChart();
    } catch (error) {
      console.error('Error loading dashboard data', error);
    } finally {
      this.loading = false;
    }
  }

  updateChart() {
    const labels = this.categories.map((item) => item.name);
    const counts = this.categories.map((item) => item.count);

    this.chartData = {
      labels,
      datasets: [
        {
          data: counts,
        },
      ],
    };
  }
}
