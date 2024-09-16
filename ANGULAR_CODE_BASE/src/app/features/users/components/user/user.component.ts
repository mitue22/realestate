import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@sa-services/common.service';
import { UserService } from '@sa-services/user.service';
import { UsersModelComponent } from './users-model/users-model.component';
declare const Swal:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList: any[] = [];
  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
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
    this.commonService.getUserList()
      .subscribe(result => {
        this.userList = result;
        console.log("called");
      });
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
        console.log(userId)
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

  onSubmit_Filter() {
    this.getUserList();
  }
}