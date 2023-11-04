import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Story } from 'src/app/models/story';
import { UserCallService } from 'src/app/services/user-call.service';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})

export class StoryDetailComponent implements OnInit {
  story: Story = {} as Story;
  loading: boolean = true;
  error: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiCallService,
    private userCallService: UserCallService
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

  updateStory() {
    if (this.story.newText) {
      // gets user info
      this.userCallService.getUserProfile().subscribe({
        next: (user) => {
          // sets username to 'updatedBy'
          this.story.updatedBy = user.username;

          this.apiService.updateStory(this.story).subscribe({
            next: (updatedStory) => {
              this.story = updatedStory;
              // clears text field
              this.story.newText = '';
  
              console.log('Story updated:', updatedStory);
            },
            error: (err) => {
              console.error('Error updating story:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error fetching user information:', err);
        }
      });
    }
  }
}
