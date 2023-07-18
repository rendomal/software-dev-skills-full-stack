import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {provideRouter, Router} from "@angular/router";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  }

  protected readonly provideRouter = provideRouter;
}
