// import { AdministrationService } from './../../../_services/administration.service';
// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
// import { PermissionFormComponent } from './permission-form/permission-form.component';
// import swal from "sweetalert2";
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//   selector: 'app-permission-modal',
//   templateUrl: './permission-modal.component.html',
//   styleUrls: ['./permission-modal.component.scss']
// })
// export class PermissionModalComponent implements OnInit {
//   @Input() menuId: number;
//   @Input() menuTitle: string;

//   dataList: any[] = [];

//   constructor(
//     private administrationService: AdministrationService,
//     private spinner: NgxSpinnerService,
//     public toastr: ToastrService,
//     private modalService: NgbModal,
//     public activeModal: NgbActiveModal,
//     public translate: TranslateService,
//   ) { }

//   ngOnInit(): void {
//     this.getDataList();
//   }

//   getDataList() {
//     this.spinner.show()
//     this.administrationService.getPermissionByMenuId(this.menuId).subscribe(
//       (result) => {
//         this.spinner.hide();
//         if (result) {
//           this.dataList = result;
//         }
//       },
//       (error) => {
//         this.spinner.hide();
//         this.toastr.error(error);
//       }
//     );
//   }

//   onClick_AddEdit(permissionId: number) {
//     const modalRef = this.modalService.open(PermissionFormComponent, {
//       centered: true,
//       backdrop: "static",
//     });
//     modalRef.componentInstance.menuId = this.menuId;
//     modalRef.componentInstance.permissionId = permissionId;
//     modalRef.componentInstance.onPermission_Emit.subscribe((data) => {
//       if (data != null) {
//         this.getDataList();
//       }
//     });
//   }

//   onClick_Delete(permissionId: any) {
//     swal
//       .fire({
//         title: this.translate.instant('Page.Msg.Are You Sure Delete'),
//         text: this.translate.instant('Page.Msg.Youwillnotbeabletorevertthis'),//Are you sure you want to delete?
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: this.translate.instant('Page.Msg.Yes delete it'),
//         customClass: {
//           confirmButton: "btn btn-danger mr-2",
//           cancelButton: "btn btn-secondary",
//         },
//         buttonsStyling: false,
//       })
//       .then((res) => {
//         if (res.value) {
//           this.spinner.show();
//           this.administrationService.deletePermission(permissionId).subscribe(
//             (result) => {
//               this.spinner.hide();
//               if (result) {
//                 this.getDataList();
//                 this.toastr.success(this.translate.instant('Page.Msg.Permission deleted successfully'));
//               }
//             },
//             (error) => {
//               this.spinner.hide();
//               this.toastr.error(error, this.translate.instant('Page.Msg.Failed to delete a record.'));
//             }
//           );
//         }
//       });
//   }
// }
