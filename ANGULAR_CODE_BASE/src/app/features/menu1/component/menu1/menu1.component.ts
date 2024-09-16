  import { Component, OnInit } from '@angular/core';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { Menu1ModalComponent } from './menu1-modal/menu1-modal.component';
  import { CommonService } from '@sa-services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';

// import { Menu1ModalComponent } from "./menu1-modal/menu1-modal.component";

  
  declare const Swal:any;

  @Component({
    selector: 'app-menu1',
    templateUrl: './menu1.component.html',
    styleUrls: ['./menu1.component.scss']
  })
  export class Menu1Component implements OnInit {

    form:FormGroup
    menuList:any;
    constructor(
      private modalService: NgbModal,
      private commonService:CommonService,
      private formBuilder:FormBuilder
    ) { }

    ngOnInit() {
      this.form=this.formBuilder.group({
        searchText:[null],
      })
      this.getMenuList()
    }
    onClick_fiter(){
      this.getMenuList();
    }
    onClear_Filter(){
      this.form.reset();
      this.getMenuList(); 
     }

    onAddEdit(id: number) {
      const modalRef = this.modalService.open(Menu1ModalComponent, {
        centered: true,
        backdrop: "static",
      });
      modalRef.componentInstance.id = id;
      modalRef.componentInstance.menuSaved.subscribe(() => {
        this.getMenuList();  // Reload menu list when the modal emits the event
      });
    }
    getMenuList() {
      const filters = {
        searchText: this.form.get('searchText').value // Assuming `searchText` is bound to an input in your component
      };
    
      this.commonService.getMenu1List(filters)  // Pass the filters to the service
        .subscribe(result => {
          this.menuList = result;
        });
    }
    onDelete(menuId:string){
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
          console.log(menuId)
          this.commonService.deleteMenu(menuId).subscribe({
            next: () => {
              Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
              this.getMenuList();  // Refresh the list after deletion
            },
            error: (err) => {
              Swal.fire('Error!', 'There was an error deleting the item.', 'error');
            }
          });
        }
      });
    }
  }