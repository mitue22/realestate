import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@sa-services/common.service';
import { UserService } from '@sa-services/user.service';
import { UsersModelComponent } from './users-model/users-model.component';
import { FormBuilder, FormGroup } from '@angular/forms';
declare const Swal:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList: any[] = [];
  form:FormGroup;
  totalRecord = 0;
  page = 1;
  pageSize = 20;
  pageSizeList = [
    {pageSize:5,name:'5 items per page'},
    { pageSize: 10, name: '10 items per page' },
    { pageSize: 20, name: '20 items per page' },
    { pageSize: 50, name: '50 items per page' },
    { pageSize: 100, name: '100 items per page' },
    { pageSize: 500, name: '500 items per page' },
    { pageSize: 1000, name: '1000 items per page' },
    { pageSize: 100000, name: 'All items' }
  ];

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private commonService: CommonService,
    private formBuilder:FormBuilder

  ) { }

  ngOnInit() {
    this.form=this.formBuilder.group({
      searchText:[null],
    })
    this.getUserList();
  }

  onClick_AddEdit(id: number) {
    const modalRef = this.modalService.open(UsersModelComponent, {
      centered: true,
      backdrop: "static",
    });
    modalRef.componentInstance.userId = id;
    modalRef.componentInstance.onUser_Emit.subscribe((data) => {
      if (data != null) {
        this.getUserList();
      }
    });
  }

  getUserList() {
    const filters = {
      searchText: this.form.get('searchText').value,
      page: this.page || 1,  // Default to 1 if undefined
      pageSize: this.pageSize || 10,  // Default to 10 if undefined
    };
    
    this.commonService.getUserList(filters)  // Pass the filters to the service
      .subscribe({
        next: (result: any) => {
          this.userList = result.data;
          this.totalRecord = result.totalCount;
        },
        error: (err) => {
          console.error('Error fetching menus', err);
        }
      });
  }

  onClick_fiter(){
    this.getUserList();
  }

  onClear_Filter(){
    this.form.reset();
    this.getUserList(); 
   }

  onDelete(userId:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.commonService.deleteUser(userId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.getUserList();  // Refresh the list after deletion
          },
          error: (err) => {
            Swal.fire('Error!', 'There was an error deleting the user.', 'error');
          }
        });
      }
    });
  }
  onClick_PageChange(e: any) {
    this.page = e;  // Update the page number
    this.getUserList();  // Fetch the updated list
  }

  onChange_PageSize() {
    this.pageSize = this.pageSize;  // Update the page size
    this.getUserList();  // Fetch the updated list with new page size
  }
}