import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, LoginUser } from 'src/app/Models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7200/user'; 

  private loggedInUserId = new BehaviorSubject<number | null>(this.getUserIdFromLocalStorage());
  currentUserId = this.loggedInUserId.asObservable();

  private getUserIdFromLocalStorage(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : null;
  }

  private storeUserIdInLocalStorage(userId: number): void {
    localStorage.setItem('userId', userId.toString());
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put(url, user);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  loginUser(user: LoginUser): Observable<User> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<User>(url, user).pipe(
      tap(user => {
        if (user?.id) {
          this.storeUserIdInLocalStorage(user.id);
          this.loggedInUserId.next(user.id);
        }
      })
    );
  }

  registerUser(user: Partial<User>): Observable<User> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<User>(url, user);
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<User>(url);
  }

  constructor(private http: HttpClient) { }
}
