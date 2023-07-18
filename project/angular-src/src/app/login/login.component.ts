import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import {Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid w-50">
    <h2 class="page-header text-center" >Login</h2>
    <form class="form-signin" (submit)="onLoginSubmit()">
            <div class="form-group">
              <label for="Username">Username</label>
              <input type="text" class="form-control" placeholder="Enter Username" [(ngModel)]="username" name="username">
            </div>
            <div class="form-group">
            <label for="Password">Password</label>
            <input type="password" class="form-control" placeholder=" Enter Password" [(ngModel)]="password" name="password">
            </div>
<!--            <div class="checkbox">-->
<!--              <label>-->
<!--                <input type="checkbox" value="remember-me"> Remember me-->
<!--              </label>-->
<!--            </div>-->
      <div class="row justify-content-center mt-3">
        <input class="btn btn-primary w-50" type="submit" value="Login">
      </div>

      <div class="row justify-content-center mt-5">
        <h5 class="page-header text-center" >No account?</h5>
        <button class="btn btn-secondary mt-2 w-50" type="button" (click)="router.navigate(['register'])">Register</button>
      </div>

    </form>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: String = "";
  password: String = "";

  constructor(
    private authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit() {

  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
