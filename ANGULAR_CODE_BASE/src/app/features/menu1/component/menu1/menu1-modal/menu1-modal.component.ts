// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { CommonService } from '@sa-services/common.service';
// import { AdministrationService } from 'app/administration/service/administration.service';
// import { NgxSpinnerService } from 'ngx-spinner';

// @Component({
//   selector: 'app-menu1-modal',
//   templateUrl: './menu1-modal.component.html',
//   styleUrls: ['./menu1-modal.component.scss']
// })
// export class Menu1ModalComponent implements OnInit {

//   @Input() id: number;
//   @Output() menuSaved = new EventEmitter<void>();

//   form: FormGroup;
//   submitted = false;
   
//   constructor(
//     private commonService:CommonService,
//     public activeModal: NgbActiveModal,
//     private formBuilder: FormBuilder,
//     private spinner: NgxSpinnerService,
//   ) { }

//   ngOnInit() {
//     this.form = this.formBuilder.group({
//       name: [null, Validators.compose([Validators.required])],
//       title: [null, Validators.compose([Validators.required])],
//       path: [null, Validators.compose([Validators.required])],
//       icon: [null],
//     })
//   }
//   get f() {
//     return this.form.controls;
//   }

//   onSubmit_Menu() {
//     this.submitted = true;
//     if (this.form.invalid) {
//       return;
//     }

//     this.spinner.show();  // Show spinner while the request is in progress

//     const formData = {
//       id:this.id,
//       name:this.form.get('name').value,
//       title:this.form.get('title').value,
//       path:this.form.get('path').value,
//       icon:this.form.get('icon').value
//     };
//     console.log("data",this.form.value)

//     this.commonService.addEditMenu(formData).subscribe(
//       (result) =>{
//         if(result){
//           if(this.id>0){
//             alert("update successfully")
//           }
//           else{
//             alert("insert succsessfully")
//           }
//           this.resetForm();
//           this.menuSaved.emit(result);
//           this.activeModal.close();
//         }
//       }
//     )
//   }
//   resetForm(){
//     this.submitted=false;
//     this.form.reset();
//   }
// }
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@sa-services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-menu1-modal',
  templateUrl: './menu1-modal.component.html',
  styleUrls: ['./menu1-modal.component.scss']
})
export class Menu1ModalComponent implements OnInit {
  @Input() id: number;
  @Output() menuSaved = new EventEmitter<void>();

  form: FormGroup;
  submitted = false;
  
  constructor(
    private commonService: CommonService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      path: ['', Validators.required],
      icon: ['']
    });

    if (this.id) {
      this.getMenuById();
    }
  }

  get f() {
    return this.form.controls;
  }

  getMenuById(): void {
    this.commonService.getMenuById(this.id).subscribe(menu => {
      if (menu) {
        this.form.patchValue(menu);
      }
    });
  }

  onSubmit_Menu() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.spinner.show();  // Show spinner while the request is in progress

    const formData = {
      id: this.id,
      name: this.form.get('name').value,
      title: this.form.get('title').value,
      path: this.form.get('path').value,
      icon: this.form.get('icon').value
    };

    if (this.id) {
      // Update menu
      this.commonService.addEditMenu(formData).subscribe(result => {
        if (result) {
          alert('Updated successfully');
          this.resetForm();
          this.menuSaved.emit();
          this.activeModal.close();
        }
      });
    } else {
      // Add new menu
      this.commonService.addEditMenu(formData).subscribe(result => {
        if (result) {
          alert('Inserted successfully');
          this.resetForm();
          this.menuSaved.emit();
          this.activeModal.close();
        }
      });
    }
  }

  resetForm() {
    this.submitted = false;
    this.form.reset();
  }
}

