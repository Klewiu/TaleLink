import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../models/story';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private apiUrl = 'http://127.0.0.1:8000/'

  constructor(private http: HttpClient) {}


  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(`${this.apiUrl}story/`);
  }

  addStory(newStory: Story): Observable<Story> {
    return this.http.post<Story>(`${this.apiUrl}story/`, newStory);
  }

  deleteStory(id: number): Observable<Story> {
    return this.http.delete<Story>(`${this.apiUrl}story/${id}`);
  }
}
