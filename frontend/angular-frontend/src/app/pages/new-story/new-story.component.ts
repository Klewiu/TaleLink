import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Story } from 'src/app/models/story';
import { ApiCallService } from 'src/app/services/api-call.service';
import { UserCallService } from 'src/app/services/user-call.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.css']
})
export class NewStoryComponent implements OnInit {
  storyForm!: FormGroup;
  categories!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiCallService,
    private userCallService: UserCallService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.loadCategories();
  }

  createForm() {
    this.storyForm = this.formBuilder.group({
      title: ['', Validators.required],
      isEdit: [false],
      text: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit() {
    this.markFormControlsAsTouched();
    if (this.storyForm.valid) {
      this.userCallService.getUserProfile().subscribe({
        next: (user) => {
          const newStory: Story = this.storyForm.value;
          newStory.user = user.username; // Sets user property to the username from the user profile
  
          this.apiService.addStory(newStory).subscribe({
            next: (response) => {
              this.storyForm.reset();
              this.router.navigate(['']);
            },
            error: (err) => {
            },
            complete: () => {
              console.log(newStory);
            }
          });
        },
        error: (err) => {
        },
      });
    }
  }
  
  loadCategories() {
    this.categoryService.getCategories().subscribe((categories: string[]) => {
      // Assign the fetched categories to your form control or variable
      this.categories = categories;
      console.log(categories);
    });
  }
  
  

  markFormControlsAsTouched() {
    Object.values(this.storyForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
