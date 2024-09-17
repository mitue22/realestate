  import { Injectable } from '@angular/core';
  import { Http } from "@angular/http";
  import { HttpHeaders, HttpClient } from '@angular/common/http'
  import { JwtHelper } from "angular2-jwt";
  import { Router } from '@angular/router';
  import { environment } from '@sa-environments/environment';
  import { map } from 'rxjs/operators';
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'xsrfCookieName':  'csrftoken',
      // 'xsrfHeaderName': 'X-CSRFToken'
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };

  @Injectable()
  export class LoginService {

    constructor(private http: HttpClient,
      private router: Router) { }

    checkUserLogin(data) {
      let postData = { 'emailPhone': data.emailPhone, 'password': data.loginPassword }
      return this.http.post(environment.BASE_URL + '/auth/user/login', postData, httpOptions)
    }
    // checkUserLogin(data) {
    //   let postData = { 'emailPhone': data.emailPhone, 'password': data.loginPassword }
    //   return this.http.post<LoginResponse>(environment.BASE_URL + '/auth/user/login', postData, httpOptions)
    //     .pipe(
    //       map(response => {
    //         console.log(response, "response");
    //         if (response && response.token) {
    //           localStorage.setItem('token', response.token);
    //           localStorage.setItem('role', response.role); 
    //           return response.role; 
    //         }
    //       })
    //     );
    // }
    // checkUserLogin(emailPhone: string, loginPassword: string) {
    //   password:loginPassword;
    //   return this.http.post<any>(`${environment.BASE_URL}/auth/user/login`, { emailPhone,password })
    //     .pipe(
    //       tap(response => {
    //         console.log(response,"response");
    //         if (response && response.token) {
    //         localStorage.setItem('token', response.token);
    //         }
    //       })
    //     );
    // }
  
    isLoggedIn() {
      let jwtHelper = new JwtHelper();
      var token = localStorage.getItem('token');
      if (token) {
        var status = jwtHelper.isTokenExpired(token);
        if (status == false)
          return true;
        else
          return false;
        // console.log('TokenExpirationDate', jwtHelper.getTokenExpirationDate(token));
        // console.log('TokenExpired ', jwtHelper.isTokenExpired(token));
      }
      else
        return false;
    }

    logOut() {
      localStorage.removeItem('token');
      this.router.navigate([''], {
        queryParams: { success: 'logOut' }
      });
    }

  }
