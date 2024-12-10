import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null); // BehaviorSubject برای ذخیره وضعیت کاربری
  user$ = this.userSubject.asObservable(); // Observable برای ارتباط با کامپوننت‌ها

  constructor() {
    this.loadUser(); // بررسی سشن کاربر به محض بارگذاری اپ
  }
  

  // بارگذاری کاربر (در صورت داشتن سشن فعال)
  async loadUser() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error loading session:', error.message);
        console.log('Response از Supabase:', data);
        console.log('Error از Supabase:', error);
      }
      this.userSubject.next(data?.session?.user || null);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  // ورود ادمین
  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        throw new Error(error.message);
      }
      console.log('Response از Supabase login:', data);
      console.log('Error از Supabase login:', error);

      console.log('Login success:', data);
      this.userSubject.next(data.user); // ذخیره کاربر وارد شده
      return data; // بازگشت داده‌ها به کامپوننت
    } catch (error) {
      console.error('Unexpected login error:', error);
      throw new Error('خطا');
    }
  }

  // خروج ادمین
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
      }
      this.userSubject.next(null); // حذف کاربر
    } catch (error) {
      console.error('Unexpected logout error:', error);
    }
  }

  // بررسی وضعیت احراز هویت
  async isAuthenticated(): Promise<boolean> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('خطا در بررسی وضعیت سشن', error);
        return false;
      }
      return !!data?.session?.user; // بررسی سشن
    } catch (error) {
      console.error('خطای غیرمنتظره', error);
      return false;
    }

  }
}
    // const { data, error } = await supabase.auth.getSession();
    // if (error) {
    //   console.error('Session check error:', error);
    //   return false;
    // }

    // return !!data?.session?.user;