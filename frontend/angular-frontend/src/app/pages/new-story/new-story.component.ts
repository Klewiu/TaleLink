import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Story } from 'src/app/models/story';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.css']
})
export class NewStoryComponent implements OnInit {
  storyForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiCallService, private router: Router) {}

  ngOnInit() {
    this.createForm()

  }

  createForm() {
    this.storyForm = this.formBuilder.group({
      title: ['', Validators.required],
      isEdit: [false],
      text: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  // observer object method, alternatively use switchMap from rxjs
  onSubmit() {
    this.markFormControlsAsTouched();
    if (this.storyForm.valid) {
      const newStory: Story = this.storyForm.value;
  
      this.apiService.addStory(newStory).subscribe({
        next: response => {
          // Handle the success response (e.g., show a success message, reset the form, etc.)
          this.storyForm.reset();
          this.router.navigate(['']);
        },
        error: err => {
          // Handle the error response (e.g., display an error message)
        },
        complete: () => {
          // Handle the completion of the observable (e.g., log a message)
          console.log('Story added successfully');
        }
      });
    }
  }

  markFormControlsAsTouched() {
    Object.values(this.storyForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

}
