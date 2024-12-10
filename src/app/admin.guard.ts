
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { Observable, of,from } from 'rxjs';
import { catchError,switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (user) {
          return of(true); // اگه کاربر لاگین کرده باشه، دسترسی رو بده
        } else {
          return from(this.authService.isAuthenticated()).pipe(
            switchMap(isAuth => {
              if (isAuth) {
                return of(true); // اگر کاربر احراز هویت شد، دسترسی بده
              } else {
                this.router.navigate(['/login']);
                return of(false);
              }
            }),
          );
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }


}

  // canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.authService.user$.pipe(
  //     map(user => {
  //       if (user) {
  //         return true; // اگر کاربر لاگین کرده باشد اجازه دسترسی بده
  //       } else {
  //         this.router.navigate(['/login']); // در غیر این صورت به صفحه ورود هدایت کن
  //         return false;
  //       }
  //     }),
  //     catchError((error) => {
  //       console.error('Error in authGuard:', error);
  //       this.router.navigate(['/login']);
  //       return of(false);
  //     })
  //   );
  // }