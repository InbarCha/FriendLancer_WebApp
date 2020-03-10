import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { ForumsComponent } from "./forums/forums.component";
import { MyZoneComponent } from "./my-zone/my-zone.component";
import { PostsComponent } from "./posts/posts.component";
import { UsersComponent } from "./users/users.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { ForumsCreateComponent } from "./forums/forums-create/forums-create.component";
import { ForumsUpdateComponent } from "./forums/forums-update/forums-update.component";
import { PostsCreateComponent } from "./posts/posts-create/posts-create.component";
import { PostsUpdateComponent } from "./posts/posts-update/posts-update.component";
import { MeetPlaceComponent } from "./meet-place/meet-place.component";
import {MeetPlaceCreateComponent} from "./meet-place/meet-place-create/meet-place-create.component";
import { MeetPlaceUpdateComponent} from "./meet-place/meet-place-update/meet-place-update.component";
import {AuthGuard} from "./guards/auth.guard";
import {D3Service} from "d3-ng2-service";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'forums', component: ForumsComponent, canActivate: [AuthGuard] },
  { path: 'forums/create', component: ForumsCreateComponent, canActivate: [AuthGuard] },
  { path: 'forums/update', component: ForumsUpdateComponent, canActivate: [AuthGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'posts/create', component: PostsCreateComponent, canActivate: [AuthGuard] },
  { path: 'posts/update', component: PostsUpdateComponent, canActivate: [AuthGuard] },
  { path: 'myZone', component: MyZoneComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'meetPlaces', component: MeetPlaceComponent, canActivate: [AuthGuard] },
  { path: 'meetPlaces/create', component: MeetPlaceCreateComponent, canActivate: [AuthGuard] },
  { path: 'meetPlaces/update', component: MeetPlaceUpdateComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
