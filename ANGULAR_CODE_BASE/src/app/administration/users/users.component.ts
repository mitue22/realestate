// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
// import { AdministrationService } from '../../_services/administration.service';
// import { UserModalComponent } from './user-modal/user-modal.component';
// import swal from "sweetalert2";
// import { Role, User } from '../../_models/user';
// import { TranslateService } from '@ngx-translate/core';
// import * as GlobalEnum from 'app/shared/data/global-constant';

// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.scss']
// })
// export class UsersComponent implements OnInit {
//   userList: User[] = [];
//   page = 1;
//   pageSize = GlobalEnum.PageSize;
//   pageSizeList = GlobalEnum.PageSizeList;
//   totalRecords: number = 0;
//   form: FormGroup;
//   roleList: Role[] = [];


//   constructor(
//     private administrationService: AdministrationService,
//     private modalService: NgbModal,
//     public toastr: ToastrService,
//     private formBuilder: FormBuilder,
//     private spinner: NgxSpinnerService,
//     public translate: TranslateService,
//   ) { }

//   ngOnInit(): void {
//     this.form = this.formBuilder.group({
//       roleId: [null],
//       searchText: [null],
//     });
//     this.getUserList();
//     this.getRoleList();
//   }

//   getUserList() {
//     const filterData = {
//       page: this.page,
//       pageSize: this.pageSize,
//       searchText: this.form.get('searchText').value || '',
//       roleId: this.form.get('roleId').value || 0,
//     };
//     this.spinner.show();
//     this.administrationService.getUserList(filterData).subscribe(
//       (result) => {
//         this.spinner.hide();
//         if (result) {
//           this.userList = result.dataList as User[];
//           this.totalRecords = result.totalRecord;
//         } else {
//           this.userList = [];
//           this.totalRecords = 0;
//         }
//       },
//       (error) => {
//         this.spinner.hide();
//         this.userList = [];
//         this.totalRecords = 0;
//         this.toastr.error(error, this.translate.instant('Page.Msg.FailToGetUserDetails'));
//       }
//     );
//   }

//   getRoleList() {
//     this.spinner.show();
//     this.administrationService.getRoleList().subscribe(
//       (result) => {
//         this.spinner.hide();
//         this.roleList = result;
//       },
//       (error) => {
//         this.spinner.hide();
//         this.roleList = [];
//         this.toastr.error(error, this.translate.instant('Page.Msg.Fail to get role list'));
//       }
//     );
//   }

//   onClick_Add() {
//     const modalRef = this.modalService.open(UserModalComponent, {
//       centered: true,
//       backdrop: "static",
//       size: "lg"
//     });
//     modalRef.componentInstance.onUser_Emit.subscribe((data) => {
//       if (data != null) {
//         this.getUserList();
//       }
//     });
//   }

//   onClick_Edit(id: any) {
//     const modalRef = this.modalService.open(UserModalComponent, {
//       centered: true,
//       backdrop: "static",
//       size: "lg"
//     });
//     modalRef.componentInstance.id = id;
//     modalRef.componentInstance.onUser_Emit.subscribe((data) => {
//       if (data != null) {
//         this.getUserList();
//       }
//     });
//   }

//   onClick_Delete(userId: any) {
//     swal
//       .fire({
//         title: this.translate.instant('Page.Msg.AreYouSureDelete'),
//         text: this.translate.instant('Page.Msg.Youwillnotbeabletorevertthis'),
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: this.translate.instant('Page.Msg.Yes delete it'),
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
//           this.administrationService.deleteUser(userId).subscribe(
//             (result) => {
//               this.spinner.hide();
//               if (result) {
//                 this.getUserList();
//                 this.toastr.success(this.translate.instant('Page.Msg.UserDeletedSuccessfully'));
//               }
//             },
//             (error) => {
//               this.spinner.hide();
//               this.toastr.error(error, this.translate.instant('Page.Msg.Failed to delete a record'));
//             }
//           );
//         }
//       });
//   }

//   onSubmit_Filter() {
//     this.getUserList();
//   }

//   onPageChange(e) {
//     this.page = e;
//     this.getUserList();
//   }

//   onClearFilter() {
//     this.form.reset();
//     this.page = 0;
//     this.getUserList();
//   }
// }
