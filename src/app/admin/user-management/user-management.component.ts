import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { MOCK_USERS } from '../../data/mock-users';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [FormsModule,CommonModule,ProductListComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {


}
