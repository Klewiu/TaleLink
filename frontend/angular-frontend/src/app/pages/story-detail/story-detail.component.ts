import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Story } from 'src/app/models/story';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})

export class StoryDetailComponent implements OnInit {
  story: Story = {} as Story; // Initialize as an empty Story object
  loading: boolean = true;
  error: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiCallService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const storyId = +params['id'];
      this.loadStory(storyId);
    });
  }

  loadStory(storyId: number) {
    this.apiService.getStoryById(storyId).subscribe({
      next: (story) => {
        this.story = story;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading story details';
        this.loading = false;
      }
    });
  }
}
