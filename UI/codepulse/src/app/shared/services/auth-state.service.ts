import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../../features/Auth/models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private userSubject = new BehaviorSubject<LoginResponse | undefined>(undefined);
  public user$: Observable<LoginResponse | undefined> = this.userSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const token = this.getCookie('authorization');
        if (token) {
          const user = this.decodeToken(token);
          this.userSubject.next(user);
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
      }
    }
  }

  private decodeToken(token: string): LoginResponse | undefined {
    try {
      const tokenValue = token.replace('Bearer ', '');
      const tokenPayload = JSON.parse(atob(tokenValue.split('.')[1]));
      
      let roles = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || [];
      
      // Ensure roles is always an array
      if (typeof roles === 'string') {
        roles = [roles];
      }

      return {
        email: tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || tokenPayload.email,
        token: token,
        roles: roles
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return undefined;
    }
  }

  setUser(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setCookie('authorization', `Bearer ${token}`);
      const user = this.decodeToken(`Bearer ${token}`);
      this.userSubject.next(user);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.deleteCookie('authorization');
      this.userSubject.next(undefined);
    }
  }

  getCurrentUser(): LoginResponse | undefined {
    return this.userSubject.value;
  }

  private getCookie(name: string): string {
    if (!isPlatformBrowser(this.platformId)) {
      return '';
    }

    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return '';
  }

  private setCookie(name: string, value: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const maxAge = 60 * 60 * 24 * 7; // 7 days
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Strict; Secure`;
  }

  private deleteCookie(name: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    document.cookie = `${name}=; path=/; max-age=0`;
  }
}
