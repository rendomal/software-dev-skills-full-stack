import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./guards/auth.guard";
import {ShopComponent} from "./shop/shop.component";
import {VideoSurveillanceComponent} from "./video-surveillance/video-surveillance.component";

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'register', component: RegisterComponent },
  { path:'login', component: LoginComponent },
  { path:'shop', component: ShopComponent },
  { path:'video-surveillance', component: VideoSurveillanceComponent, canActivate: [AuthGuard] },
  { path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path:'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
