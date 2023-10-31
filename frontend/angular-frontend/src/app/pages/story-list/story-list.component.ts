import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Story } from 'src/app/models/story';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from 'src/app/utils/delete-modal/delete-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
  
})

export class StoryListComponent implements OnInit {
  stories: Story[] = [];
  page = 1;
  pageSize = 6;
  user_login_text = {
    user_name:'',
    login_text:''
  }
  dragonCollapsed = false;

  constructor(
    private apiService: ApiCallService, 
    private config: NgbPaginationConfig, 
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {
    this.loadStories()

    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.user_login_text.user_name = user.username;
      this.user_login_text.login_text = 'You are logged in as : '
    }
  }


  loadStories() {    this.apiService.getStories().subscribe((stories: Story[]) => {
    this.stories = stories;
    // console.log(typeof(stories['0'].user));
    
  });}

  logout(){
    this.authService.logout()
    this.user_login_text.user_name = '';
      this.user_login_text.login_text = 'You are logged out. Please log in...'
  }


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

  viewStory(storyId: number) {
    this.router.navigate(['/tale', storyId]);
  }

  
  toggleDragonCollapse() {
    this.dragonCollapsed = !this.dragonCollapsed;
  }


}

