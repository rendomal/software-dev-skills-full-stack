import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ValidateService } from "../validate.service";
import { AuthService } from "../auth.service";
import { Router} from "@angular/router";
import {request} from "express";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid w-75">
      <h2 class="page-header text-center">Register</h2>
      <form (submit)="onRegisterSubmit()" >
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" [(ngModel)]="name" name="name" class="form-control" id="name" placeholder="Enter Name" required
                 #refName="ngModel">
          <div class="alert alert-danger" *ngIf="nameMissing">
            This field is required.
          </div>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" [(ngModel)]="username" name="username" class="form-control" id="username" placeholder="Enter Username" required
                 #refUsername="ngModel">
          <div class="alert alert-danger" *ngIf="usernameMissing">
            This field is required.
          </div>
        </div>


        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" [(ngModel)]="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" required
                 #refEmail="ngModel">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          <div class="alert alert-danger" *ngIf="emailMissing">
            This field is required.
          </div>
          <div class="alert alert-danger" *ngIf="!emailMissing && !emailValid">
            Invalid email.
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" [(ngModel)]="password" name="password" class="form-control" id="password" placeholder=" Enter Password" required
                 #refPassword="ngModel">
          <div class="alert alert-danger" *ngIf="passwordMissing">
            This field is required.
          </div>
        </div>

        <div class="row justify-content-center mt-4">
            <input type="submit" class="btn btn-primary w-50" value="Submit">
        </div>

        <div class="row justify-content-center mt-5">
          <h5 class="page-header text-center" >Already have an account?</h5>
          <button class="btn btn-secondary mt-2 w-50" type="button" (click)="router.navigate(['login'])">Login</button>
        </div>

      </form>
    </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: String = "";
  username: String = "";
  email: String = "";
  password: String = "";

  nameMissing = false;
  emailMissing = false;
  emailValid = true;
  usernameMissing = false;
  passwordMissing = false;

  constructor(
    private validateService: ValidateService,
    public authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit() {

  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      subscription: "None"
    }

    let validateResult = this.validateService.validateRegister(user);

    if (validateResult.success)
    {
      this.authService.registerUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user)
          this.router.navigate(['']);
        } else {
          this.router.navigate(['register']);
        }
      })
    } else {
      this.nameMissing = validateResult.nameMissing;
      this.emailMissing = validateResult.emailMissing;
      this.emailValid = validateResult.emailValid;
      this.usernameMissing = validateResult.usernameMissing;
      this.passwordMissing = validateResult.passwordMissing;
    }
  }
}
