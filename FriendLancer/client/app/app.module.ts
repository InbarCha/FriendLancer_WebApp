import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import 'd3';
import 'nvd3'
import {NvD3Module} from "ng2-nvd3";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ForumsComponent } from './forums/forums.component';
import { MyZoneComponent } from './my-zone/my-zone.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { PostsComponent } from './posts/posts.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UsersComponent } from './users/users.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ForumsCreateComponent } from './forums/forums-create/forums-create.component';
import { ForumsUpdateComponent } from './forums/forums-update/forums-update.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostsUpdateComponent } from './posts/posts-update/posts-update.component';
import { MeetPlaceComponent } from './meet-place/meet-place.component';
import { MeetPlaceCreateComponent } from './meet-place/meet-place-create/meet-place-create.component';
import { MeetPlaceUpdateComponent } from './meet-place/meet-place-update/meet-place-update.component';
import { AgmCoreModule} from '@agm/core';
import { PieChartComponent } from './statistics/pie-chart/pie-chart.component';
import { DiscreteBarChartComponent } from './statistics/discrete-bar-chart/discrete-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ForumsComponent,
    MyZoneComponent,
    HomePageComponent,
    LoginPageComponent,
    PostsComponent,
    RegisterPageComponent,
    UsersComponent,
    StatisticsComponent,
    ForumsCreateComponent,
    ForumsUpdateComponent,
    PostsCreateComponent,
    PostsUpdateComponent,
    MeetPlaceComponent,
    MeetPlaceCreateComponent,
    MeetPlaceUpdateComponent,
    PieChartComponent,
    DiscreteBarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NvD3Module,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAZZ9aZlzB6HrnlFffFzRGGTFJBSetevpk'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }

