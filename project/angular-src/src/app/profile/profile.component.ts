import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `

    <h2 class="text-center mb-3">Your information</h2>
    <div class="list-group w-50 container-fluid">

      <li class="list-group-item" aria-current="true">
        <small>Name</small>
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{authService.user.name}}</h5>
        </div>
      </li>
      <li class="list-group-item" aria-current="true">
        <small>Username</small>
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{authService.user.username}}</h5>
        </div>
      </li>
      <li class="list-group-item" aria-current="true">
        <small>Email</small>
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{authService.user.email}}</h5>
        </div>
      </li>
    </div>


    <div>
      <h2 class="text-center mt-5 mb-3">Your subscriptions</h2>
      <div class="list-group w-50 container-fluid">
        <div *ngIf="authService.user.subscription === 'None'">
          <ul class="list-group text-center">
                Nothing. Nada.
          </ul>
        </div>
        <div *ngIf="authService.user.subscription !== 'None'">
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              {{authService.user.subscription}}
              <button class="badge bg-primary rounded-pill" (click)="authService.updateSubscription('None')">Cancel</button>
            </li>
          </ul>
        </div>
      </div>
    </div>


    <div class="row justify-content-center mt-5">
      <button class="btn btn-danger mt-2 w-50" type="button" (click)="authService.deleteUser()">Delete user</button>
    </div>

  `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // user = {
  //     name: "",
  //     username: "",
  //     email: "",
  //     subscription: ""
  //   };

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile: any) => {
      this.authService.user.name = profile.name;
      this.authService.user.email = profile.email;
      this.authService.user.username = profile.username;
      this.authService.user.subscription = profile.subscription;
    }, err => {
      return false;
    });

  }
}
