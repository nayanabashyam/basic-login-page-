import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }
  
  login(username: string, password: string, rememberMe: boolean = false): Observable<User> {
    // This would be an actual API call in a real application
    return of({
      id: '1',
      username,
      firstName: 'John',
      lastName: 'Doe',
      email: `${username}@example.com`
    }).pipe(
      delay(1000), // Simulate network delay
      tap(user => {
        if (rememberMe) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
  
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  
  forgotPassword(email: string): Observable<boolean> {
    // This would be an actual API call in a real application
    return of(true).pipe(delay(1000));
  }
  
  forgotUsername(email: string): Observable<boolean> {
    // This would be an actual API call in a real application
    return of(true).pipe(delay(1000));
  }
}