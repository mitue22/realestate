import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdministrationService {
  // ApiURL = environment.ApiURL;
  public headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // this.headers = new HttpHeaders({
    //   "Content-Type": "application/json",
    //   Authorization: "Bearer " + this.authService.getAccessToken(),
    //   // Lang: this.authService.getLanguage(),
    // });
  }



  // <-- User Services ---> //

  // getUserList(filterData: any): Observable<any> {
  //   return this.http.post(this.ApiURL + "User/GetList", filterData, {
  //     headers: this.headers,
  //   });
  // }

  // getUserById(id: number): Observable<any> {
  //   return this.http.get(this.ApiURL + "User/" + id, {
  //     headers: this.headers,
  //   });
  // }

  // addUser(userData: User): Observable<any> {
  //   return this.http.post(this.ApiURL + "User", userData, {
  //     headers: this.headers,
  //   });
  // }

  // editUser(userData: User): Observable<any> {
  //   return this.http.put(this.ApiURL + "User", userData, {
  //     headers: this.headers,
  //   });
  // }

  // deleteUser(id: number): Observable<any> {
  //   return this.http.delete(this.ApiURL + "User/" + id, {
  //     headers: this.headers,
  //   });
  // }

  // changePassword(data: any): Observable<any> {
  //   const body = JSON.stringify(data);
  //   return this.http.post(this.ApiURL + "User/ChangePassword", body, {
  //     headers: this.headers,
  //   });
  // }

  // getUserBalance(): Observable<any> {
  //   this.headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + this.authService.getAccessToken(),
  //     // Lang: this.authService.getLanguage(),
  //   });
  //   return this.http.get(this.ApiURL + "User/GetUserBalance", {
  //     headers: this.headers,
  //   });
  // }
  // <-- End User Services ---> //

  // getCostCenterList(): Observable<any> {
  //   return this.http.get(this.ApiURL + "CostCenter/CostCenterByUser", {
  //     headers: this.headers,
  //   });
  // }

  // getGLCompanyList(): Observable<any> {
  //   return this.http.get(this.ApiURL + "GPCompany/GetGPCompanyList", {
  //     headers: this.headers,
  //   });
  // }

  // //* Get Account List
  // getGLAccountList(gpCompany: string = ''): Observable<any> {
  //   return this.http.get(this.ApiURL + "GPCompany/GetAccountList?gpCompany=" + gpCompany, {
  //     headers: this.headers,
  //   });
  // }

  // getGLAccountListUser(gpCompany: string): Observable<any> {
  //   return this.http.get(this.ApiURL + "GPCompany/GetBankList?gpCompany=" + gpCompany, {
  //     headers: this.headers,
  //   });
  // }
  // <-- Role Services ---> //
  // getRoleList(): Observable<any> {
  //   return this.http.get(this.ApiURL + "Role", { headers: this.headers });
  // }

  // getRoleById(roleId: number): Observable<any> {
  //   return this.http.get(this.ApiURL + "Role/" + roleId, {
  //     headers: this.headers,
  //   });
  // }

  // addRole(roleData: Role): Observable<any> {
  //   const body = JSON.stringify(roleData);
  //   return this.http.post(this.ApiURL + "Role", body, {
  //     headers: this.headers,
  //   });
  // }

  // editRole(roleData: any): Observable<any> {
  //   const body = JSON.stringify(roleData);
  //   return this.http.put(this.ApiURL + "Role", body, {
  //     headers: this.headers,
  //   });
  // }

  // deleteRole(roleId: number): Observable<any> {
  //   return this.http.delete(this.ApiURL + "Role/" + roleId, {
  //     headers: this.headers,
  //   });
  // }
  // <-- End Role Services ---> //

  // <-- Menu Services ---> //
  // getFilteredMenuList(parentId: number): Observable<any> {
  //   return this.http.get(this.ApiURL + "Menu/GetList?parentId=" + parentId, { headers: this.headers });
  // }

  // getMenuByMenuId(menuId: number): Observable<any> {
  //   return this.http.get(this.ApiURL + "Menu/" + menuId, { headers: this.headers });
  // }

  // getParentMenus(): Observable<any> {
  //   return this.http.get(this.ApiURL + "Menu/Name", { headers: this.headers });
  // }

  // addEditMenu(menuData: Role): Observable<any> {
  //   const body = JSON.stringify(menuData);
  //   return this.http.post(this.ApiURL + "Menu", body, {
  //     headers: this.headers,
  //   });
  // }

  // deleteMenu(menuId: number): Observable<any> {
  //   return this.http.delete(this.ApiURL + "Menu/" + menuId, {
  //     headers: this.headers,
  //   });
  // }

  // getPermissionByMenuId(menuId: number): Observable<any> {
  //   return this.http.get(this.ApiURL + "Menu/PermissionByMenu/" + menuId, { headers: this.headers });
  // }

  // getPermissionById(permissionId: number): Observable<any> {
  //   return this.http.get(this.ApiURL + "Menu/Permission/" + permissionId, { headers: this.headers });
  // }

  // addEditPermission(permissionData: Role): Observable<any> {
  //   const body = JSON.stringify(permissionData);
  //   return this.http.post(this.ApiURL + "Menu/Permission", body, {
  //     headers: this.headers,
  //   });
  // }

  // deletePermission(permissionId: number): Observable<any> {
  //   return this.http.delete(this.ApiURL + "Menu/Permission/" + permissionId, {
  //     headers: this.headers,
  //   });
  // }

  // changeOrder(formData: any): Observable<any> {
  //   return this.http.post(this.ApiURL + "Menu/ChangeOrder", formData, {
  //     headers: this.headers,
  //   });
  // }
  // <-- End Menu Services ---> //

  // <-- Permission Services ---> //
  // getMenuPermissionList(): Observable<Menu[]> {
  //   return this.http
  //     .get<any>(this.ApiURL + "Permission/Menu", {
  //       headers: this.headers,
  //     })
  //     .pipe(
  //       map((result) => {
  //         if (result.data) {
  //           return result.data.map((p) => {
  //             return <Menu>{
  //               id: p.id,
  //               name: p.name,
  //               title: p.title,
  //               routes: p.routes,
  //               icon: p.icon,
  //               path: p.path,
  //               class: p.class,
  //               badge: p.badge,
  //               badgeClass: p.badgeClass,
  //               isExternalLink: p.isExternalLink,
  //               parentId: p.parentId,
  //               selected: p.selected,
  //             };
  //           });
  //         } else {
  //           return [];
  //         }
  //       })
  //     );
  // }

  // getMenuList(roleId = 0): Observable<Menu[]> {
  //   return this.http
  //     .get<any>(this.ApiURL + "Permission/MenuList/" + roleId, {
  //       headers: this.headers,
  //     })
  //     .pipe(
  //       map((result) => {
  //         if (result.data) {
  //           return result.data.map((p) => {
  //             return <Menu>{
  //               id: p.id,
  //               name: p.name,
  //               title: p.title,
  //               routes: p.routes,
  //               icon: p.icon,
  //               parentId: p.parentId,
  //               selected: p.selected,
  //             };
  //           });
  //         } else {
  //           return [];
  //         }
  //       })
  //     );
  // }

  // postPermissions(permissionData): Observable<any> {
  //   const body = JSON.stringify(permissionData);
  //   return this.http.post(this.ApiURL + "Permission", body, {
  //     headers: this.headers,
  //   });
  // }


  // getPermissions(roleId: number): Observable<any> {
  //   return this.http.get(this.ApiURL + "Permission/MenuList/" + roleId, {
  //     headers: this.headers,
  //   });
  // }
  // <-- End Permission Services ---> //

  // getDashboardDetails(status: boolean = null): Observable<any> {
  //   return this.http.get(this.ApiURL + `Dashboard`, {
  //     headers: this.headers,
  //   });
  // }
}
