import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserCallService } from 'src/app/services/user-call.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User | null;

  constructor(private userCallService: UserCallService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userCallService.getUserProfile().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (err) => {
        console.log("Error loading user profile:", err);
      }
    });
  }
}
