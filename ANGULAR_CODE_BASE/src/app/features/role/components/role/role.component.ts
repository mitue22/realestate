import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { AdministrationModule } from 'app/administration/administration.module';
import { AdministrationService } from 'app/administration/service/administration.service';
import { CommonService } from '@sa-services/common.service';

declare const Swal:any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roleList: any;

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getRoleList();
  }
  onAddEdit(id: any) {
    const modalRef = this.modalService.open(RoleModalComponent, {
      centered: true,
      backdrop: "static",
    });
    modalRef.componentInstance.id = id; // Ensure the correct `id` is passed
    modalRef.componentInstance.onRole_Emit.subscribe((data) => {
      if (data != null) {
        this.getRoleList();
      }
    });
  }
  
  getRoleList() {
    this.commonService.getRoleList()
      .subscribe(result => {
        this.roleList = result;
        console.log("called");
      });
  }
  
  onDelete(roleId:string){
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
        console.log(roleId)
        this.commonService.deleterole(roleId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            this.getRoleList();  // Refresh the list after deletion
          },
          error: (err) => {
            Swal.fire('Error!', 'There was an error deleting the item.', 'error');
          }
        });
      }
    });
  }
}


