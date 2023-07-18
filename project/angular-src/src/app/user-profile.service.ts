import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  user = {
    name: "",
    email: "",
    username: "",
    subscription: ""
  }

  constructor() { }
}
