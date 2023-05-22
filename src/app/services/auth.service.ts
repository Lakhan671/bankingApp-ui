import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Router } from '@angular/router';
import { User } from '../model/Users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + '/api';
    private userData:any|User;

constructor(private http: HttpClient,private router:Router) {

  
 }

login(loginData: any) {
  return this.http.post(this.baseUrl+'/login/v1',loginData).
  pipe(map((response: any) => {
    if (response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', loginData['username']);
      localStorage.setItem('login','TRUE');
      this.router.navigate(['/home']);
    }
  }));
      
}
register(signupData: any) {
  return this.http.post(this.baseUrl + '/signup/v1', signupData);
}

getUser() {
  let email={'email':localStorage.getItem('email')};
  return this.http.post(this.baseUrl + '/user/get/v1', email);
}

setUserData(user:User):void{
  this.userData=user;
}
getUserData():User{
  return this.userData;
}
loggedIn():boolean {
  try {
    const token = localStorage.getItem('token');
    return localStorage.getItem('login')=='TRUE'
  } catch {
    return false;
  }
}
logout(){
  localStorage.clear();
  this.router.navigate(['/']);

}
}
