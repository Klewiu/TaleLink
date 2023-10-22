import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserCallService {
  private api_url: string = 'http://localhost:8000/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserProfile(): Observable<User> {
    // Retrieve the authentication token from AuthService
    const token = this.authService.getToken();

    // If the token is available, include it in the request headers
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      });
      return this.http.get<User>(this.api_url + 'accounts/profile/', { headers });
    }

    // Handle the case when the token is not available (e.g., user is not logged in)
    return new Observable<User>();
  }

}
