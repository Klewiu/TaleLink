import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Story } from 'src/app/models/story';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})

export class StoryListComponent implements OnInit {
  stories: Story[] = [];
  page = 1;
  pageSize = 6;

  constructor(private apiService: ApiCallService, private config: NgbPaginationConfig) {}

  ngOnInit() {
    this.loadStories()
  }

  loadStories() {    this.apiService.getStories().subscribe((stories: Story[]) => {
    this.stories = stories;
    console.log(typeof(stories['0'].user));
    
  });}

}
