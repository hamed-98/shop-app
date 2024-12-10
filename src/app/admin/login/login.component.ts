import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService,private router: Router) {}

  async onSubmit() {
    this.errorMessage = '';
    try {
      const response = await this.authService.login(this.email, this.password);

      if (response?.user) {
        console.log('کاربر با موفقیت وارد شد:', response.user);
        this.router.navigate(['/admin/dashboard']); 
      } else {
        this.errorMessage = 'مشکلی در ورود وجود دارد.';
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'خطای ناشناسی رخ داده است.';
      }
    }
  }
}
