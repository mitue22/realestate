// import { Component, OnInit } from '@angular/core';
// import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { RoleModalComponent } from './role-modal/role-modal.component';
// import { AdministrationModule } from 'app/administration/administration.module';
// import { AdministrationService } from 'app/administration/service/administration.service';
// import { CommonService } from '@sa-services/common.service';
// import { FormBuilder, FormGroup } from '@angular/forms';

// declare const Swal:any;

// @Component({
//   selector: 'app-role',
//   templateUrl: './role.component.html',
//   styleUrls: ['./role.component.scss']
// })
// export class RoleComponent implements OnInit {
//   roleList: any;
//   form:FormGroup;
//   constructor(
//     private modalService: NgbModal,
//     private commonService: CommonService,
//     private formBuilder:FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.form=this.formBuilder.group({
//       searchText:[null],
//     })
//     this.getRoleList();
//   }
//   onAddEdit(id: any) {
//     const modalRef = this.modalService.open(RoleModalComponent, {
//       centered: true,
//       backdrop: "static",
//     });
//     modalRef.componentInstance.id = id; // Ensure the correct `id` is passed
//     modalRef.componentInstance.onRole_Emit.subscribe((data) => {
//       if (data != null) {
//         this.getRoleList();
//       }
//     });
//   }
//   onClick_fiter(){
//     this.getRoleList();
//   }
//   onClear_Filter(){
//     this.form.reset();
//     this.getRoleList(); 
//    }
  
//   getRoleList() {
//     const filters = {
//       searchText: this.form.get('searchText').value
//     };
//     this.commonService.getRoleList(filters)
//       .subscribe(result => {
//         this.roleList = result;
//       });
//   }
  
//   onDelete(roleId:string){
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//     })
//     .then((result) => {
//       if (result.isConfirmed) {
//         console.log(roleId)
//         this.commonService.deleterole(roleId).subscribe({
//           next: () => {
//             Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
//             this.getRoleList();  // Refresh the list after deletion
//           },
//           error: (err) => {
//             Swal.fire('Error!', 'There was an error deleting the item.', 'error');
//           }
//         });
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { CommonService } from '@sa-services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
declare const Swal: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roleList: any[] = [];
  totalRecord = 0;
  page = 1;
  pageSize = 20;
  pageSizeList = [
    { pageSize: 10, name: '10 items per page' },
    { pageSize: 20, name: '20 items per page' },
    { pageSize: 50, name: '50 items per page' },
    { pageSize: 100, name: '100 items per page' },
    { pageSize: 500, name: '500 items per page' },
    { pageSize: 1000, name: '1000 items per page' },
    { pageSize: 100000, name: 'All items' },
  ];
  
  form: FormGroup;

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      searchText: [null],
    });
    this.getRoleList();
  }

  onAddEdit(id: any) {
    const modalRef = this.modalService.open(RoleModalComponent, {
      centered: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.onRole_Emit.subscribe((data) => {
      if (data != null) {
        this.getRoleList();
      }
    });
  }

  onClick_filter(){
        this.getRoleList();
      }

  onClear_Filter() {
    this.form.reset();
    this.getRoleList();
  }

  getRoleList() {
    const filters = {
      searchText: this.form.get('searchText').value,
      page: this.page || 1,  // Default to 1 if undefined
      pageSize: this.pageSize || 10,  // Default to 10 if undefined
    };
  
    // Call the backend service
    this.commonService.getRoleList(filters).subscribe({
      next: (result: any) => {
        this.roleList = result.data;
        this.totalRecord = result.totalCount;
      },
      error: (err) => {
        console.error('Error fetching roles', err);
      }
    });
  }
  

  onDelete(roleId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.commonService.deleterole(roleId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            this.getRoleList();
          },
          error: (err) => {
            Swal.fire('Error!', 'There was an error deleting the item.', 'error');
          }
        });
      }
    });
  }

  onClick_PageChange(e: any) {
    // this.page = e;
    this.getRoleList();
  }

  onChange_PageSize() {
    this.pageSize = this.pageSize;
    this.getRoleList();
  }
}


