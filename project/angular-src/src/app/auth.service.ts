import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import {Observable} from "rxjs";
import { JwtHelperService  } from '@auth0/angular-jwt';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: any;
  authToken: any;
  @Input() user = {
    name: "",
    email: "",
    username: "",
    subscription: ""
  }

  @Output() userChange = new EventEmitter<{
    name: string,
    email: string,
    username: string,
    subscription: string
  }>();

  defaultUser = {
    name: "",
    email: "",
    username: "",
    subscription: ""
  }

  constructor(private httpClient:HttpClient, public router: Router) {
    this.jwtHelper = new JwtHelperService({
      config: {
        tokenGetter: this.getToken,
      },
    });
  }

  registerUser(user: any): Observable<any> {
    let headers = new Headers();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<any>('http://localhost:5000/users/register', user, httpOptions);
  }

  authenticateUser(user: any): Observable<any> {
    let headers = new Headers();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<any>('http://localhost:5000/users/authenticate', user, httpOptions);
  }

  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.httpClient.get('http://localhost:5000/users/profile', {headers: headers})
  }

  updateSubscription(value: any) {
    let headers = new Headers();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let body = {
      "username":this.user.username,
      "value":value
    }
    this.httpClient.patch<any>('http://localhost:5000/users/updateSubscription', body, httpOptions).subscribe(() => {
      // console.log("success");
      this.userChange.emit(this.user);
    }, err => {
      // console.log("error");
    });
    this.user.subscription = value;
  }

  deleteUser() {
    let headers = new Headers();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let body = {
      "username":this.user.username,
    }
    this.httpClient.delete<any>('http://localhost:5000/users/deleteUser', { body }).subscribe(() => {
      this.logout();
      this.router.navigate(['register']);
    }, err => {
    });
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user.name = user.name;
    this.user.email = user.email;
    this.user.username = user.username;
    this.user.subscription = user.subscription;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isLoggedIn() {
      return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  getToken() {
    const token = localStorage.getItem('id_token');
    return token;
  }


  logout() {
    this.authToken = null;
    this.user = this.defaultUser;
    localStorage.clear();
  }
}
