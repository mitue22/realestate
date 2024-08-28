// import { AdministrationService } from './../../../../_services/administration.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AdministrationService } from 'app/administration/service/administration.service';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit {
  @Input() menuId: number;
  @Input() permissionId: number;
  @Output() onPermission_Emit: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup;
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private administrationService: AdministrationService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      descriptionAr: [null, Validators.compose([Validators.required])],
    });
    if (this.permissionId > 0) {
    //   this.getPermissionById();
    }
  }

  get f() {
    return this.form.controls;
  }

//   getPermissionById() {
//     this.administrationService.getPermissionById(this.permissionId).subscribe(
//       (result) => {
//         if (result) {
//           this.form.patchValue({
//             name: result.name,
//             description: result.description,
//             descriptionAr: result.descriptionAr,
//           });
//         }
//       },
//       (error) => {
//         this.toastr.error(error);
//       }
//     );
//   }

//   onSubmit_Permission() {
//     this.submitted = true;
//     if (this.form.invalid) {
//       this.toastr.warning(this.translate.instant('Page.Msg.Entervalidformdetails'));
//       return;
//     }
//     const menuData = {
//       id: this.permissionId,
//       menuId: this.menuId,
//       name: this.form.get('name').value,
//       description: this.form.get('description').value,
//       descriptionAr: this.form.get('descriptionAr').value,
//     };
//     this.spinner.show('modalspin');
//     this.administrationService.addEditPermission(menuData).subscribe(
//       (result) => {
//         this.spinner.hide('modalspin');
//         if (result) {
//           if (this.permissionId > 0) {
//             this.toastr.success(this.translate.instant('Page.Msg.permission updated successfully'));
//           } else {
//             this.toastr.success(this.translate.instant('Page.Msg.permission saved successfully'));
//           }
//           this.resetForm();
//           this.onPermission_Emit.emit(result);
//           this.activeModal.close();
//         } else {
//           this.toastr.error(this.translate.instant('Page.Msg.Failed to save data'));
//         }
//       },
//       (error) => {
//         this.spinner.hide('modalspin');
//         this.toastr.error(error, this.translate.instant('Page.Msg.Failed to save data'));
//       }
//     );
//   }

  resetForm() {
    this.submitted = false;
    this.form.reset();
  }
}
