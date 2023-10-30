import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8000/story-categories/';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<string[]>(this.apiUrl);
  }
}
