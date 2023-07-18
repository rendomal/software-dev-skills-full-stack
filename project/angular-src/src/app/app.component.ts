import { Component } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-src';

  constructor(
    public authService: AuthService
  ) {
    if (authService.isLoggedIn())
    {
      authService.getProfile().subscribe((profile: any) => {
        authService.user.name = profile.name;
        authService.user.email = profile.email;
        authService.user.username = profile.username;
        authService.user.subscription = profile.subscription;
      }, err => {
        return false;
      });
    }
  }

  ngOnInit() {

  }

}
