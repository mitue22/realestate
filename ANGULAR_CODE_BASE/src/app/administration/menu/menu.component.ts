// import { AdministrationService } from './../../_services/administration.service';
// import { Component, OnInit } from '@angular/core';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { MenuModalComponent } from './menu-modal/menu-modal.component';
// import swal from "sweetalert2";
// import { PermissionModalComponent } from './permission-modal/permission-modal.component';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//   selector: 'app-menu',
//   templateUrl: './menu.component.html',
//   styleUrls: ['./menu.component.scss']
// })
// export class MenuComponent implements OnInit {
//   dataList: any[] = [];
//   parentMenuList: any[] = [];
//   addPermission = true;
//   editPermission = true;
//   deletePermission = true;

//   form: FormGroup;
//   constructor(
//     private administrationService: AdministrationService,
//     private formBuilder: FormBuilder,
//     private spinner: NgxSpinnerService,
//     public toastr: ToastrService,
//     private modalService: NgbModal,
//     public translate: TranslateService,
//   ) { }

//   ngOnInit(): void {
//     this.form = this.formBuilder.group({
//       parentId: [null],
//     });
//     this.form.get('parentId').valueChanges.subscribe(val => {
//       this.getDataList();
//     })
//     this.getDataList();
//     this.getParentMenus();
//   }

//   getDataList() {
//     this.spinner.show()
//     this.administrationService.getFilteredMenuList(this.form.get('parentId').value || 0).subscribe(
//       (result) => {
//         this.spinner.hide();
//         this.dataList = result;
//       },
//       (error) => {
//         this.spinner.hide();
//         this.dataList = [];
//         this.toastr.error(error);
//       }
//     );
//   }

//   getParentMenus() {
//     this.administrationService.getParentMenus().subscribe(
//       (result) => {
//         this.parentMenuList = result;
//       },
//       (error) => {
//         this.toastr.error(error);
//         this.dataList = [];
//       }
//     );
//   }

//   onClick_AddEdit(menuId: number) {
//     const modalRef = this.modalService.open(MenuModalComponent, {
//       centered: true,
//       backdrop: "static",
//     });
//     modalRef.componentInstance.menuId = menuId;
//     modalRef.componentInstance.parentId = this.form.get('parentId').value;
//     modalRef.componentInstance.onMenu_Emit.subscribe((data) => {
//       if (data != null) {
//         this.getDataList();
//         this.getParentMenus();
//       }
//     });
//   }

//   onClick_Permission(menuId: number, menuTitle: string) {
//     const modalRef = this.modalService.open(PermissionModalComponent, {
//       centered: false,
//       backdrop: "static",
//       size: 'lg'
//     });
//     modalRef.componentInstance.menuId = menuId;
//     modalRef.componentInstance.menuTitle = menuTitle;
//   }

//   onClick_Delete(menuId: any) {
//     swal
//       .fire({
//         title: this.translate.instant('Page.Msg.Are You Sure Delete'),
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
//           this.administrationService.deleteMenu(menuId).subscribe(
//             (result) => {
//               this.spinner.hide();
//               if (result) {
//                 this.getDataList();
//                 this.getParentMenus();
//                 this.toastr.success(this.translate.instant('Page.Msg.Menudeletedsuccessfully'));
//               }
//             },
//             (error) => {
//               this.spinner.hide();
//               this.toastr.error(error, this.translate.instant('Page.Msg.Menudeletedsuccessfully'));
//             }
//           );
//         }
//       });
//   }

//   moveUp(menuData, index) {
//     if (index > 0) {
//       const formData = {
//         menuId: menuData.id,
//         parentId: menuData.parentId,
//         newOrder: menuData.orderNo - 1,
//         prevOrder: menuData.orderNo,
//       };
//       this.administrationService.changeOrder(formData).subscribe(
//         (result) => {
//           if (result) {
//             this.getDataList();
//           }
//         },
//         (error) => {
//           this.toastr.error(error);
//         }
//       );
//     }
//   }

//   moveDown(menuData, index) {
//     if (index + 1 < this.dataList.length) {
//       const formData = {
//         menuId: menuData.id,
//         parentId: menuData.parentId,
//         newOrder: menuData.orderNo + 1,
//         prevOrder: menuData.orderNo,
//       };

//       this.administrationService.changeOrder(formData).subscribe(
//         (result) => {
//           if (result) {
//             this.getDataList();
//           }
//         },
//         (error) => {
//           this.toastr.error(error);
//         }
//       );
//     }
//   }
// }
