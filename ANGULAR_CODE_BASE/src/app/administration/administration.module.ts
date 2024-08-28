import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";

import { TranslateModule } from "@ngx-translate/core";
import { FileUploadModule } from "ng2-file-upload";


import { AdministrationRoutingModule } from "./administration-routing.module";
import { UsersComponent } from "./users/users.component";
import { RolesComponent } from "./roles/roles.component";
import { PermissionsComponent } from "./permissions/permissions.component";
import { RoleModalComponent } from "./roles/role-modal/role-modal.component";
import { UserModalComponent } from "./users/user-modal/user-modal.component";
import { MenuComponent } from "./menu/menu.component";
import { MenuModalComponent } from "./menu/menu-modal/menu-modal.component";
import { PermissionModalComponent } from "./menu/permission-modal/permission-modal.component";
import { PermissionFormComponent } from "./menu/permission-modal/permission-form/permission-form.component";



@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    PermissionsComponent,
    RoleModalComponent,
    UserModalComponent,
    MenuComponent,
    MenuModalComponent,
    PermissionModalComponent,
    PermissionFormComponent,
  ],
  imports: [
     AdministrationRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    // SharedModule,
    NgbPaginationModule,
    NgxSpinnerModule,
    TranslateModule,
    FileUploadModule,
    ToastrModule,

  ],
})
export class AdministrationModule { }
