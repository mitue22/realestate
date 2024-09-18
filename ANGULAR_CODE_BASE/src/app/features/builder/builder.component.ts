import { Component, OnInit } from '@angular/core';
import { BuilderModalComponent } from './builder-modal/builder-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@sa-services/common.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  builderList: any[]=[];

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

  onAddEdit(id: any) {
    const modalRef = this.modalService.open(BuilderModalComponent, {
      centered: true,
      backdrop: "static",
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.onBuilder_Emit.subscribe((data) => {
      if (data != null) {
        this.getBuilderList();
      }
    });
  }
}
