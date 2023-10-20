import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryListComponent } from './pages/story-list/story-list.component';
import { NewStoryComponent } from './pages/new-story/new-story.component';

const routes: Routes = [
  { path: '', component: StoryListComponent },
  {path:'new-tale', component: NewStoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
