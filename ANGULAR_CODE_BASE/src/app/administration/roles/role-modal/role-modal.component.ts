import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AdministrationService } from 'app/administration/service/administration.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {
  @Input() roleId: number;
  @Output() onRole_Emit: EventEmitter<boolean> = new EventEmitter();

  submitted = false;
  form: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private administrationService: AdministrationService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
    });
    if (this.roleId > 0) {
    //   this.getRoleById();
    }
  }

  get f() {
    return this.form.controls;
  }

//   getRoleById() {
//     this.administrationService.getRoleById(this.roleId).subscribe(
//       (result) => {
//         if (result) {
//           this.form.controls["name"].setValue(result.name);
//         }
//       },
//       (error) => {
//         this.toastr.error(error);
//       }
//     );
//   }

//   onSubmit_Form() {
//     this.submitted = true;
//     if (this.form.invalid) {
//       this.toastr.warning(this.translate.instant('Page.Msg.Entervalidformdetails'));
//       return;
//     } else {
//       const roleData = this.form.value as Role;
//       roleData.id = this.roleId;
//       this.spinner.show('modalspin');
//       if (this.roleId > 0) {
//         this.administrationService.editRole(roleData).subscribe(
//           (result) => {
//             this.spinner.hide('modalspin');
//             if (result) {
//               this.toastr.success(this.translate.instant('Page.Msg.Roleeditedsuccessfully'));
//               this.onRole_Emit.emit(result);
//               this.activeModal.close();
//             } else {
//               this.toastr.error(this.translate.instant('Page.Msg.Somethingwentwrong'));
//             }
//           },
//           (error) => {
//             this.spinner.hide('modalspin');
//             this.toastr.error(error);
//           }
//         );
//       } else {
//         this.administrationService.addRole(roleData).subscribe(
//           (result) => {
//             this.spinner.hide('modalspin');
//             if (result) {
//               this.toastr.success(this.translate.instant('Page.Msg.Newrolecreatedsuccessfully'));
//               this.onRole_Emit.emit(result);
//               this.activeModal.close();
//             } else {
//               this.toastr.error(this.translate.instant('Page.Msg.Somethingwentwrong'));
//             }
//           },
//           (error) => {
//             this.spinner.hide('modalspin');
//             this.toastr.error(error);
//           }
//         );
//       }
//     }
//   }
}

