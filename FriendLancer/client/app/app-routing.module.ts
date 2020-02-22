import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import { ForumsComponent } from "./forums/forums.component";
import { MyZoneComponent } from "./my-zone/my-zone.component";
import { PostsComponent } from "./posts/posts.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'forums', component: ForumsComponent, canActivate: [AuthGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'myZone', component: MyZoneComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
