import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateEmail(email : string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/
      );
  };

  validateRegister(user : any) {

    let result = {
      success: true,
      nameMissing: false,
      emailMissing: false,
      emailValid: true,
      usernameMissing: false,
      passwordMissing: false
    }

    if (user.name === "") {
      result.nameMissing = true;
      result.success = false;
    }

    if (user.username === "") {
      result.usernameMissing = true;
      result.success = false;
    }

    if (user.email === "") {
      result.emailMissing = true;
      result.success = false;
    }

    if (!this.validateEmail(user.email)) {
      result.emailValid = false;
      result.success = false;
    }

    if (user.password === "") {
      result.passwordMissing = true;
      result.success = false;
    }

    return result;
  }
}
