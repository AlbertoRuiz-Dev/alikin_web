import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlaylistListComponent} from "./playlist-list/playlist-list.component";
import {PlaylistFormComponent} from "./playlist-form/playlist-form.component";
import {PlaylistDetailComponent} from "./playlist-detail/playlist-detail.component";


const routes: Routes = [
  {
    path: '',
    component: PlaylistListComponent,
    data: { listType: 'currentUser' }
  },
  {
    path: 'new',
    component: PlaylistFormComponent
  },
  {
    path: 'public',
    component: PlaylistListComponent,
    data: { listType: 'public' }
  },
  {
    path: 'user/:userId',
    component: PlaylistListComponent,
    data: { listType: 'userSpecific' }
  },
  {
    path: ':id',
    component: PlaylistDetailComponent
  },
  {
    path: ':id/edit',
    component: PlaylistFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }
