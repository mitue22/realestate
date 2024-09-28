import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { environment } from '@sa-environments/environment';
import { Menu } from 'app/features/menu1/model/menu';
import { Role } from 'app/features/role/model/role';
import { Builder } from 'app/features/builder/builder';
import { User } from 'app/features/users/components/user/user';


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
getMenuDDList(){
  return this.http.get(environment.BASE_URL + '/common/menu');
}
getRoleDDList(){
  return this.http.get(environment.BASE_URL + '/common/role');
}
  //Property Service
  getPropertyTypeList(): Observable<any> {
    return this.http.get(environment.BASE_URL + '/common/type');
  }

   getPropertyList(data:any):Observable<any>{
  return this.http.post(environment.BASE_URL + '/property/list',data);
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
  editProperty(dataToSend: any,id: number,): Observable<any> {
    const url = `${environment.BASE_URL}/property/edit/${id}`;
    const requestBody = { id, dataToSend };
    return this.http.put(url, requestBody);
  }
  deleteProperty(id:any):Observable<any>{
    return this.http.delete(environment.BASE_URL + "/property/deleteProperty/" + id);
  }
  //End Property
  //Start Menu
  getMenu1List(filters: any): Observable<any> {
    return this.http.post(environment.BASE_URL + "/common/menu1List", filters);
  }

  addEditMenu(menudata: any): Observable<any> {
    if (menudata.id) {
      // If `roledata` has an `id`, use `updateRole` API
      return this.http.put(environment.BASE_URL + "/common/menu/" + menudata.id, menudata);
    } else {
      // Otherwise, use `addRole` API
      return this.http.post(environment.BASE_URL + "/common/addEditMenu", menudata);
    }
  }

  getMenuById(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${environment.BASE_URL}/common/menu/${id}`);
  }

  deleteMenu(menuId: string): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}/common/deleteMenu/${menuId}`);
  }
  //End Menu service
//Start role
 getRoleList(filters:any): Observable<any> {
    return this.http.post(environment.BASE_URL + "/common/roleList",filters);
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
//End Role

//start User
getUserList():Observable<any>{
  return this.http.get(environment.BASE_URL + '/common/userDetailList');
}

addEditUser(userdata: any): Observable<any> {
  return this.http.post(environment.BASE_URL + "/common/addEditUser", userdata);
}

getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${environment.BASE_URL}/common/user/${id}`);
}

deleteUser(userId: any): Observable<any> {
  return this.http.delete(`${environment.BASE_URL}/common/deleteUser/${userId}`);
}

//End User

//Start Permission
getPermissions(roleId: number) {
  return this.http.get(`${environment.BASE_URL}/common/permissions/${roleId}`);
}
postPermissions(permissionData: any) {
  return this.http.post(`${environment.BASE_URL}/common/permissions`, permissionData);
}
deletePermissions(permissionData: any) {
  return this.http.post(`${environment.BASE_URL}/common/permissions/delete`, permissionData);
}
getMenuListByPermission(role:string){
  return this.http.get(`${environment.BASE_URL}/common/permissions/menuList/${role}`);
}
//End Permission

//Start builder

getBuilderList(): Observable<any> {
  return this.http.get(environment.BASE_URL + '/common/builderList');
}

// addBuilder(builderData: any): Observable<any> {
//   return this.http.post(environment.BASE_URL + '/common/addBuilder', builderData);
// }

// getBuilderById(id: number): Observable<Builder> {
//   return this.http.get<Builder>(`${environment.BASE_URL}/common/builder/${id}`);
// }
getBuilderById(id: number): Observable<Builder> {
  return this.http.get<Builder>(`${environment.BASE_URL}/common/builder/${id}`);
}

addEditBuilder(builderdata: any): Observable<any> {
  return this.http.post(environment.BASE_URL + "/common/addEditBuilder", builderdata);
}


deleteBuilder(BuilderId: any): Observable<any> {
  return this.http.delete(`${environment.BASE_URL}/common/deleteBuilder/${BuilderId}`);
}

//End builder

}
