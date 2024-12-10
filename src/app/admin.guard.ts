
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
          return of(true); 
        } else {
          return from(this.authService.isAuthenticated()).pipe(
            switchMap(isAuth => {
              if (isAuth) {
                return of(true); 
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

