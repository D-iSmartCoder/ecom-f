import { Injectable } from '@angular/core';

const TOKEN_KEY = 'ecom-token';
const USER_KEY = 'ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor () { }

  public saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(user: any): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  static getUser(): any {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.userId : '';
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const role = this.getUserRole();
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const role = this.getUserRole();
    return role === 'CUSTOMER';
  }

  static signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
