import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiCallService } from 'src/app/services/api-call.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user_login_text = {
    user_name: '',
    login_text: ''
  };
  loggedIn = false; // Add a loggedIn property

  constructor(
    private apiService: ApiCallService,
    private config: NgbPaginationConfig,
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((status) => {
      this.loggedIn = status;

      const userData = localStorage.getItem('currentUser');
      if (status && userData) {
        const user = JSON.parse(userData);
        this.user_login_text.user_name = user.username;
        this.user_login_text.login_text = 'USER: ';
      } else {
        this.user_login_text.user_name = '';
        this.user_login_text.login_text = 'You are logged out';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
