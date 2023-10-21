import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryListComponent } from './pages/story-list/story-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewStoryComponent } from './pages/new-story/new-story.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteModalComponent } from './utils/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    NewStoryComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
