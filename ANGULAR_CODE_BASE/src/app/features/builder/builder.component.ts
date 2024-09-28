import { Component, OnInit } from '@angular/core';
import { BuilderModalComponent } from './builder-modal/builder-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@sa-services/common.service';
import { FormGroup } from '@angular/forms';
declare const Swal:any;
@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  builderList: any[] = [];
  form: FormGroup;


 constructor(
    private modalService: NgbModal,
    private commonService:CommonService
  ) { }

  ngOnInit() {
    this.getBuilderList();
  }


  getBuilderList() {
    this.commonService.getBuilderList()
      .subscribe(result => {
        this.builderList = result;
      }, error => {
        console.error(error);
      });
  }

  onAddEdit(id: Number) {
    const modalRef = this.modalService.open(BuilderModalComponent, {
      centered: true,
      backdrop: "static",
    });
    modalRef.componentInstance.builderId = id;
    modalRef.componentInstance.onBuilder_Emit.subscribe((data) => {
      if (data != null) {
        this.getBuilderList();
      }
    });
  }

  onDelete(BuilderId:any){
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
        console.log(BuilderId)
        this.commonService.deleteBuilder(BuilderId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.getBuilderList();  // Refresh the list after deletion
          },
          error: (err) => {
            Swal.fire('Error!', 'There was an error deleting the user.', 'error');
          }
        });
      }
    });
  }

}
