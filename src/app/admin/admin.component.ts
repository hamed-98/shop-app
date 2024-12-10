import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MaterialModule,RouterOutlet,RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
  async logout() {
    if (confirm('Are you sure you want to log out?')) {
      await this.authService.logout();
      this.router.navigate(['/login']); 
    }
  }

}
