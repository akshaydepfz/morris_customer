import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  router = inject(Router)

  login(username: string, password: string): boolean {
    if (typeof localStorage !== 'undefined') {
      if (username === 'morries' && password === 'morries@admin') { // Replace with your credentials
        this.isAuthenticated = true;
        localStorage.setItem('auth', 'true');
        return true;
      }
    } else {
      return false;
    }

    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {

    if (typeof window !== 'undefined' && localStorage) {
      return this.isAuthenticated || localStorage.getItem('auth') === 'true';
    }
    return false;
  }


}
