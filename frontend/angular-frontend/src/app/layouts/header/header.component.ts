import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiCallService } from 'src/app/services/api-call.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user_login_text = {
    user_name:'',
    login_text:''
  }

  constructor(
    private apiService: ApiCallService, 
    private config: NgbPaginationConfig, 
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.user_login_text.user_name = user.username;
      this.user_login_text.login_text = 'You are logged in as : '
    }
  }

  logout(){
    this.authService.logout()
    this.user_login_text.user_name = '';
      this.user_login_text.login_text = 'You are logged out. Please log in...'
  }

}
