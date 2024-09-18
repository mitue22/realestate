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
    this.commonService.getUserList()
      .subscribe(result => {
        this.userList = result;
        console.log("called");
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

}