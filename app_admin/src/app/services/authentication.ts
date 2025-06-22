import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  // auth respose variable
  authResp: AuthResponse = new AuthResponse();
  
  // Setup Storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  // Get token from storage provider
  public getToken(): string {
    const out = this.storage.getItem('travlr-token'); // token name
    // return string even if no token
    return out || '';
  }

  // save token to storage provider
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Logout of app and remove JWT from storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Determ if logged in and active token
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    return false;
  }

  // Retrieve the current user
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // Login method
  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.login(user, passwd).pipe(
      tap((value: AuthResponse) => {
        if (value && value.token) {
          this.authResp =  value;
          this.saveToken(value.token);
        }
      })
    );
  }

  // Register method 
  public register(user: User, passwd: string): Observable<AuthResponse> {
  return this.tripDataService.register(user, passwd).pipe(
    tap((value: AuthResponse) => {
      console.log('AUTH RESPONSE:', value);
      if (value?.token) {
        this.authResp = value;
        this.saveToken(value.token);
      }
    })
  );
}
}
