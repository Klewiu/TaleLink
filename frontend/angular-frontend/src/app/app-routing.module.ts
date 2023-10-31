import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryListComponent } from './pages/story-list/story-list.component';
import { NewStoryComponent } from './pages/new-story/new-story.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StoryDetailComponent } from './pages/story-detail/story-detail.component';

const routes: Routes = [
  { path: '', component: StoryListComponent },
  { path:'new-tale', component: NewStoryComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'register', component: SignupComponent},
  { path: 'tale/:id', component: StoryDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
