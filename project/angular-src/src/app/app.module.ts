import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavBarComponent} from "./nav-bar/nav-bar.component";

import { ValidateService } from "./validate.service";

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService} from "./auth.service";

import { AuthGuard } from "./guards/auth.guard";
import { ShopComponent } from './shop/shop.component';
import { VideoSurveillanceComponent } from './video-surveillance/video-surveillance.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    VideoSurveillanceComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NavBarComponent,
        HttpClientModule
    ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
