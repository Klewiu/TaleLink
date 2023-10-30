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

      // Call your service to send the registration data to the server
      this.authService.registerUser(formData).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // You can add a success message or redirection logic here
          this.router.navigate(['/login'])
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle registration error, display an error message, etc.
        }
      );
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
