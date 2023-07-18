import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from "@angular/router";

import { AuthService } from "../auth.service";
import {ValidateService} from "../validate.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `

    <div class="p-5 mb-4 bg-body-tertiary rounded-3">
      <div class="container-fluid py-5 justify-content-center align-content-center text-center bg-dark">
        <h1 class="display-5 fw-bold text-light">Keep your house thieve free with <span style="color: greenyellow">SECURED.</span>&trade;</h1>
        <div class="d-inline">
          <h3 class="display-8 fw-bold text-light">the wors..world leading home security company*</h3>
        </div>
      </div>
    </div>

    <div class="card text-center mb-5">
      <div class="card-header">
        Featured
      </div>
      <div class="card-body">
        <h5 class="card-title">Basic package</h5>
        <p class="card-text">since you poor students cannot afford anything else</p>
        <a href="/shop" class="btn btn-primary">View all packages</a>
      </div>
      <div class="card-footer text-body-secondary">
        2 days ago
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        Quote
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>Worth every penny</p>
          <footer class="blockquote-footer"><cite title="Source Title">site owner</cite></footer>
        </blockquote>
      </div>
    </div>

    <div class="fixed-bottom modal-footer bg-dark justify-content-center">
      <p class="text-white text-center">*startup</p>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    public authService: AuthService,
  ) {
  }

}
