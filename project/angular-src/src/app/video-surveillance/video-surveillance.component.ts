import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-surveillance',
  templateUrl: './video-surveillance.component.html',
  styleUrls: ['./video-surveillance.component.css']
})
export class VideoSurveillanceComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

}
