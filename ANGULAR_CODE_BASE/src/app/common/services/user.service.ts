import { Injectable } from '@angular/core';
import { JwtHelper } from "angular2-jwt";
import { HttpClient } from '@angular/common/http';
import { environment } from '@sa-environments/environment';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  togglePageLoader = new Subject<boolean>();
  togglePageLoader$ = this.togglePageLoader.asObservable();
  togglePageLoaderFn(data: boolean = false) {
    this.togglePageLoader.next(data);
  }
  get currentUser() {
    var token = localStorage.getItem('token');
    if (!token) return null;

    let jwtHelper = new JwtHelper();
    // console.log('decoded ', jwtHelper.decodeToken(token));

    return jwtHelper.decodeToken(token);
  }

  getcurrentUserDetails(userId):Observable<any> {
    console.log(userId)
    return this.http.get(environment.BASE_URL + '/user/' + userId);
  }
 
}
