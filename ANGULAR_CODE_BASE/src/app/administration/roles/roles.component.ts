import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../models/user';
import { AdministrationService } from '../service/administration.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roleList: Role[] = [];
  page = 1;
  pageSize = 20;
  // addPermission = true;
  // editPermission = true;
  // deletePermission = true;
  constructor(
    private administrationService: AdministrationService,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    // this.getRoleList();
  }

//   getRoleList() {
//     this.spinner.show();
//     this.administrationService.getRoleList().subscribe(
//       (result) => {
//         this.spinner.hide();
//         if (result) {
//           this.roleList = result;
//         }
//       },
//       (error) => {
//         this.spinner.hide();
//         this.toastr.error(error);
//       }
//     );
//   }

  onClick_Add() {
    const modalRef = this.modalService.open(RoleModalComponent, {
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.onRole_Emit.subscribe((data) => {
      if (data != null) {
        // this.getRoleList();
      }
    });
  }

  onClick_Edit(roleId: any) {
    const modalRef = this.modalService.open(RoleModalComponent, {
      centered: true,
      backdrop: "static",
    });
    modalRef.componentInstance.roleId = roleId;
    modalRef.componentInstance.onRole_Emit.subscribe((data) => {
      if (data != null) {
        // this.getRoleList();
      }
    });
  }

//   onClick_Delete(roleId: any) {
//     swal
//       .fire({
//         title: this.translate.instant('Page.Msg.AreYouSure'),
//         text: this.translate.instant('Page.Msg.Youwillnotbeabletorevertthis'),
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: this.translate.instant('Page.Msg.Yesdeleteit'),
//         cancelButtonText: this.translate.instant('Page.Cancel'),
//         customClass: {
//           confirmButton: "btn btn-danger m-1",
//           cancelButton: "btn btn-secondary m-1",
//         },
//         buttonsStyling: false,
//       })
//       .then((res) => {
//         if (res.value) {
//           this.spinner.show();
//           this.administrationService.deleteRole(roleId).subscribe(
//             (result) => {
//               this.spinner.hide();
//               if (result) {
//                 this.getRoleList();
//                 this.toastr.success(this.translate.instant('Page.Msg.Roledeletedsuccessfully'));
//               }
//             },
//             (error) => {
//               this.spinner.hide();
//               this.toastr.error(error);
//             }
//           );
//         }
//       });
//   }
}