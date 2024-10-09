import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Verifica se o usuário está autenticado.
   * @returns Observable<boolean>
   */
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  /**
   * Realiza o login do usuário.
   * @param email string
   * @param password string
   * @returns Observable<any>
   */
  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = { email, password };

    return this.http.post<any>(url, body).pipe(
      tap((response) => {
        if (response && response.token) {
          this.setToken(response.token);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/']);
        }
      })
    );
  }

  /**
   * Realiza o logout do usuário.
   * @returns Observable<any>
   */
  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`;

    return this.http.post<any>(url, {}).pipe(
      tap({
        next: () => {
          this.clearToken();
          this.isAuthenticatedSubject.next(false);
        },
        error: () => {
          // Mesmo em caso de erro, limpe o token
          this.clearToken();
          this.isAuthenticatedSubject.next(false);
        },
      })
    );
  }

  /**
   * Armazena o token JWT no localStorage.
   * @param token string
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Remove o token JWT do localStorage.
   */
  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Obtém o token JWT armazenado.
   * @returns string | null
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Verifica se o token JWT está armazenado.
   * @returns boolean
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
