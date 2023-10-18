import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Story } from 'src/app/models/story';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})

export class StoryListComponent implements OnInit {
  stories: Story[] = [];

  constructor(private apiService: ApiCallService) {}

  ngOnInit() {
    this.apiService.getStories().subscribe((stories: Story[]) => {
      this.stories = stories;
      console.log(typeof(stories['0'].user));
      
    });
  }
}
