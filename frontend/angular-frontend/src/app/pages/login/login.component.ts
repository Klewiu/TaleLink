import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  loggedIn:boolean=false

  constructor( private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.authService.login(this.f['username'].value, this.f['password'].value).pipe(first()).subscribe(
      data =>{
        console.log(data);
        this.router.navigate([''])
        this.loggedIn=true
      }
    )
    
  }

}
