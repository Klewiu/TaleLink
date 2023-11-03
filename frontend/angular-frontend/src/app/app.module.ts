import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryListComponent } from './pages/story-list/story-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewStoryComponent } from './pages/new-story/new-story.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalComponent } from './utils/delete-modal/delete-modal.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StoryDetailComponent } from './pages/story-detail/story-detail.component';
import { HeaderComponent } from './layouts/header/header.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    NewStoryComponent,
    DeleteModalComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    StoryDetailComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
