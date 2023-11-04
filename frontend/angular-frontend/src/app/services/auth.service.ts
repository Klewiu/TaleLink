import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  api_url: string = 'http://localhost:8000/'

  constructor( private http: HttpClient) {
     // Check if the user is already logged in (e.g., by checking local storage).
     const userData = localStorage.getItem('currentUser');
     if (userData) {
       this.loggedIn.next(true);
     }
   }

  login(username:string, password:string) {
    return this.http.post<any>(this.api_url + `accounts/api/auth/`,
    {username, password}, httpOptions).pipe(
      map(user=>{
        if (user && user.token){
          localStorage.setItem("currentUser", JSON.stringify(user));
          console.log('Pisze z locacl Storage');
          this.loggedIn.next(true);
        }
        return user;
      })
    );
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem('currentUser');
    return !!user; // Returns true if user is authenticated, false otherwise
  }

  getToken(): string | null {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      return userData.token;
    }
    return null;
  }

  registerUser(userData:any):Observable<any>{
    const url = `${this.api_url}accounts/api/register/`; // Replace with your registration endpoint
    return this.http.post(url, userData);
  }

  checkUsernameAvailability(username: string): Observable<any> {
    const url = `${this.api_url}accounts/api/check-username/${username}`;
    return this.http.get(url);
  }

}
