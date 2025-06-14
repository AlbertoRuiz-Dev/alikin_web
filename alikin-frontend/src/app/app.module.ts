import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./core/jwt.interceptor";
import { FeedComponent } from './feed/feed.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {PostItemComponent} from "./post/post-item/post-item.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { CommunityDetailComponent } from './community-detail/community-detail.component';
import { DeleteCommunityModalComponent } from './delete-community-modal/delete-community-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommunityMembersComponent } from './community-members/community-members.component';
import { CommunityFeedComponent } from './community-feed/community-feed.component';
import {DraggableDirective} from "./shared/directives/draggable.directive";

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PostItemComponent,
    CommunityDetailComponent,
    DeleteCommunityModalComponent,
    CommunityMembersComponent,
    CommunityFeedComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    DraggableDirective,
    HttpClientModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
