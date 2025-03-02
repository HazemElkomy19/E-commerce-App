import { HttpClient } from '@angular/common/http';
import { Injectable, afterNextRender, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser, LoginUser } from '../../interfaces/auth-user';
import { API_BASE_URL } from '../../../token/api-token';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:BehaviorSubject<any>=new BehaviorSubject(null);
_httpClient=inject(HttpClient);
_baseURL=inject(API_BASE_URL);

_router=inject(Router);



  constructor() {
    afterNextRender(()=>{
      this.isLoggedInUser();
    })
  }
  registerUser(userInfo:AuthUser):Observable<any>{
    return this._httpClient.post(`${this._baseURL}/auth/signup`,userInfo);
  }

  loginUser(userInfo:LoginUser):Observable<any>{
    console.log('API Base URL:', this._baseURL);
    return this._httpClient.post(`${this._baseURL}/auth/signin`,userInfo);

  }
  saveUser(){
    if(localStorage.getItem("userToken")){
      this.userData.next(jwtDecode(localStorage.getItem("userToken")!));
      console.log(this.userData);
    }
  }

  isLoggedInUser():boolean{
    if(localStorage.getItem("userToken")){
      this.userData.next(jwtDecode(localStorage.getItem("userToken")!));
      return true;
    }
    else{
      return false;
    }
  }
  logOut(){
    localStorage.removeItem("userToken");
    this.userData.next(null);
    this._router.navigate(['/auth/login']);

  }
  forgetPassword(email:string):Observable<any>{
   return this._httpClient.post(`${this._baseURL}/auth/forgotPasswords`,{email})
  }
  verifyCode(resetCode:string):Observable<any>{
    return this._httpClient.post(`${this._baseURL}/auth/verifyResetCode`,{resetCode})
  }

  resetPassword(email:string,newPassword:string):Observable<any>{
    return this._httpClient.put(`${this._baseURL}/auth/resetPassword`,{email,newPassword})
   }

}


