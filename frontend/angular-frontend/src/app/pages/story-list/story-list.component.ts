import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Story } from 'src/app/models/story';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from 'src/app/utils/delete-modal/delete-modal.component';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})

export class StoryListComponent implements OnInit {
  stories: Story[] = [];
  page = 1;
  pageSize = 6;

  constructor(
    private apiService: ApiCallService, 
    private config: NgbPaginationConfig, 
    private modalService: NgbModal) {}

  ngOnInit() {
    this.loadStories()
  }

  loadStories() {    this.apiService.getStories().subscribe((stories: Story[]) => {
    this.stories = stories;
    // console.log(typeof(stories['0'].user));
    
  });}

  deleteStory(storyId: number) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    // Use modal result
    modalRef.result.then(
      (result) => {
        if (result === 'delete') {
          this.apiService.deleteStory(storyId).subscribe({
            next: () => {
              this.stories = this.stories.filter((story) => story.id !== storyId);
            },
            error: (err) => {
              console.error('Error deleting story:', err);
            }
          });
        }
      },
      (reason) => {
        // Modal was dismissed (e.g., user clicked cancel)
        console.log('Modal dismissed with reason: ' + reason);
      }
    );
  }
}

