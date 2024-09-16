import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { environment } from '@sa-environments/environment';
import { Menu1Component } from 'app/features/menu1/component/menu1/menu1.component';
import { Role, User } from 'app/administration/models/user';

@Injectable()
export class CommonService {

  constructor(
    private http: HttpClient,
    private titleService: Title
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Header alert text
  HeaderMessage = new Subject<string>();
  HeaderMessage$ = this.HeaderMessage.asObservable();

  changeHeaderMessage(data) {
    this.HeaderMessage.next(data);
  }
  // Header alert text

  togglePageLoader = new Subject<boolean>();
  togglePageLoader$ = this.togglePageLoader.asObservable();
  togglePageLoaderFn(data: boolean = false) {
    this.togglePageLoader.next(data);
  }

  // showLoader() { this.togglePageLoader.next(true); }
  // hideLoader() { this.togglePageLoader.next(false); }

  getStatelist(): Observable<any> {
    return this.http.get(environment.BASE_URL + '/common/state');
  }

  getCitylist(): Observable<any> {
    return this.http.get(environment.BASE_URL + '/common/cities');
  }

  getCitylistByState(stateId): Observable<any> {
    return this.http.get(environment.BASE_URL + '/common/cities/' + stateId);
  }

  getPropertyTypeList(): Observable<any> {
    return this.http.get(environment.BASE_URL + '/common/type');
  }
  getPropertyList(): Observable<any> {
    return this.http.get(environment.BASE_URL + '/property/list');
  }
  propertyList(param = '') {
    return this.http.get(environment.BASE_URL + '/property/list/' + param);
  }

  getSingleProperty(propertySlug) {
    return this.http.get(environment.BASE_URL + '/property/single/' + propertySlug);
  }

  filterProperties(param = '') {
    return this.http.get(environment.BASE_URL + '/property/filter' + param);
  }
  // editProperty(imageData: any): Observable<any> {
  //   return this.http.put(environment.BASE_URL + '/property/edit', imageData);
  // }
  getMenu1List(): Observable<any> {
    return this.http.get(environment.BASE_URL + "/common/menu1List");
  }

  addEditMenu(data: any): Observable<any> {
    return this.http.post(environment.BASE_URL + "/common/addEditMenu", data);
  }


  deleteMenu(menuId: string): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}/common/deleteMenu/${menuId}`);
  }
  
  // getRoleList(): Observable<any> {
  //   return this.http.get(environment.BASE_URL + "/common/roleList");
  // }

  // addEditRole(roledata: any): Observable<any> {
  //   return this.http.post(environment.BASE_URL + "/common/addEditRole", roledata);
  // }

  // getRoleById(id: number) {
  //   return this.http.get(`${environment.BASE_URL}/role/${id}`);
  // }

  // updateRole(id: number, roleData: any) {
  //   return this.http.put(`${environment.BASE_URL}/role/${id}`, roleData);
  // }
  
  // deleterole(roleId: string): Observable<any> {
  //   return this.http.delete(`${environment.BASE_URL}/common/deleteRole/${roleId}`);
  // }

  
  getRoleList(): Observable<any> {
    return this.http.get(environment.BASE_URL + "/common/roleList");
  }

  addEditRole(roledata: any): Observable<any> {
    if (roledata.id) {
      // If `roledata` has an `id`, use `updateRole` API
      return this.http.put(environment.BASE_URL + "/common/role/" + roledata.id, roledata);
    } else {
      // Otherwise, use `addRole` API
      return this.http.post(environment.BASE_URL + "/common/addEditRole", roledata);
    }
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${environment.BASE_URL}/common/role/${id}`);
  }
  
  deleterole(roleId: string): Observable<any> {
    return this.http.delete(environment.BASE_URL + "/common/deleteRole/" + roleId);
  }
editProperty(imageData:any):Observable<any>{
  return this.http.put(environment.BASE_URL + '/property/edit', imageData);
}

getUserList():Observable<any>{
  return this.http.get(environment.BASE_URL + '/common/userDetailList');
}

// addUser(formData: any): Observable<any> {
//   console.log(formData)
//   return this.http.post(environment.BASE_URL + '/common/user', formData);
// }

// addEditUser(data: any): Observable<any> {
//   return this.http.post(environment.BASE_URL + "/common/addEditUser", data);
// }

deleteUser(userId: any): Observable<any> {
  return this.http.delete(`${environment.BASE_URL}/common/deleteUser/${userId}`);
}


getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${environment.BASE_URL}/common/user/${id}`);
}

addEditUser(userdata: any): Observable<any> {
  if (userdata.id) {
    // If `roledata` has an `id`, use `updateRole` API
    return this.http.put(environment.BASE_URL + "/common/user/" + userdata.id, userdata);
  } else {
    // Otherwise, use `addRole` API
    return this.http.post(environment.BASE_URL + "/common/addEditUser", userdata);
  }
}



}
