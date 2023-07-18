import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `

    <nav class="navbar navbar-expand-lg mb-3">
      <div class="container-fluid">

        <a class="navbar-brand" href="#">Secured.&trade;</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-between" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}" [routerLink]="['/']"
                 class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}" [routerLink]="['/shop']"
                 class="nav-link">Shop</a>
            </li>
          </ul>
          <ul class="navbar-nav mr-auto">
            <li *ngIf="authService.isLoggedIn() && authService.user.subscription !== 'None'" class="nav-item">
              <a [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}" [routerLink]="['/video-surveillance']"
                 class="nav-link">Video surveillance</a>
            </li>
<!--            <li *ngIf="authService.isLoggedIn()" class="nav-item">-->
<!--              <a [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}" [routerLink]="['/dashboard']"-->
<!--                 class="nav-link">Dashboard</a>-->
<!--            </li>-->
            <li *ngIf="authService.isLoggedIn()" class="nav-item">
              <a [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}" [routerLink]="['/profile']"
                 class="nav-link">Profile</a>
            </li>
            <li *ngIf="!authService.isLoggedIn()" class="nav-item">
              <a [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}" [routerLink]="['/login']"
                 class="nav-link">Login</a>
            </li>
            <li *ngIf="!authService.isLoggedIn()" class="nav-item">
              <a [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}" [routerLink]="['/register']"
                 class="nav-link">Register</a>
            </li>
            <li *ngIf="authService.isLoggedIn()" class="nav-item">
              <a (click)="onLogoutClick()" href="#" class="nav-link">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  `,
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['login']);
    return false;
  }
}
