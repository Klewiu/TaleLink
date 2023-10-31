import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  registrationForm!: FormGroup;
  isUsernameAvailable:Boolean = true; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid && this.isUsernameAvailable) {
      const formData = this.registrationForm.value;

      this.authService.registerUser(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    }
  }

  checkUsernameAvailability() {
    const username = this.registrationForm.value.username;
    if (username) {
      this.authService.checkUsernameAvailability(username).subscribe((response) => {
        if (response.exists) {
          // Username is already taken
          this.isUsernameAvailable = false;
  // Rest of the function
          // You can add error handling or show a message to the user
        } else {
          // Username is available
          this.isUsernameAvailable = true;
          // Clear any error message or hide the message
        }
      });
    }
  }
}
