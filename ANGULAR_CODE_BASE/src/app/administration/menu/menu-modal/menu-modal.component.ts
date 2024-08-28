// import { AdministrationService } from './../../../_services/administration.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AdministrationService } from 'app/administration/service/administration.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss']
})
export class MenuModalComponent implements OnInit {
  @Input() menuId: number;
  @Input() parentId: number = null;
  @Output() onMenu_Emit: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup;
  submitted = false;
  parentMenuList: any[] = [];
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
      title: [null, Validators.compose([Validators.required])],
      titleAr: [null, Validators.compose([Validators.required])],
      path: [null, Validators.compose([Validators.required])],
      icon: [null],
      parentId: [this.parentId > 0 ? this.parentId : null],
      class: [false],
    });
    if (this.menuId > 0) {
      // this.getMenuById();
    }
    this.form.get('class').valueChanges.subscribe(val => {
      if (val) {
        this.form.get('path').setValidators(null);
      } else {
        this.form.get('path').setValidators(Validators.compose([Validators.required]));
      }
      this.form.get('path').setValue(null);
      this.form.get('path').updateValueAndValidity();
    });
    // this.getParentMenus();
  }

  get f() {
    return this.form.controls;
  }

//   getMenuById() {
//     this.administrationService.getMenuByMenuId(this.menuId).subscribe(
//       (result) => {
//         if (result) {
//           this.form.patchValue({
//             name: result.name,
//             title: result.title,
//             titleAr: result.titleAr,
//             parentId: result.parentId > 0 ? result.parentId : null,
//             class: result.class && result.class.includes('has-sub') ? true : false,
//             path: result.path,
//             icon: result.icon,
//           });
//         }
//       },
//       (error) => {
//         this.toastr.error(error, "Failed to get data");
//       }
//     );
//   }

//   getParentMenus() {
//     this.administrationService.getParentMenus().subscribe(
//       (result) => {
//         if (result) {
//           this.parentMenuList = result;
//         }
//       },
//       (error) => {
//         this.toastr.error(error);
//       }
//     );
//   }

//   onSubmit_Menu() {
//     this.submitted = true;
//     if (this.form.invalid) {
//       this.toastr.warning(this.translate.instant('Page.Msg.Entervalidformdetails'));
//       return;
//     }
//     const menuData = {
//       id: this.menuId,
//       name: this.form.get('name').value,
//       title: this.form.get('title').value,
//       titleAr: this.form.get('titleAr').value,
//       path: this.form.get('path').value,
//       icon: this.form.get('icon').value,
//       parentId: this.form.get('parentId').value || 0,
//       class: this.form.get('class').value === true ? 'has-sub' : '',
//     };
//     this.spinner.show('modalspin');
//     this.administrationService.addEditMenu(menuData).subscribe(
//       (result) => {
//         this.spinner.hide('modalspin');
//         if (result) {
//           if (this.menuId > 0) {
//             this.toastr.success(this.translate.instant('Page.Msg.MenuUpdatedSuccessfully'));
//           } else {
//             this.toastr.success(this.translate.instant('Page.Msg.MenuSavedSuccessfully'));
//           }
//           this.resetForm();
//           this.onMenu_Emit.emit(result);
//           this.activeModal.close();
//         } else {
//           this.toastr.error(this.translate.instant('Page.Msg.FailedToSaveData'));
//         }
//       },
//       (error) => {
//         this.spinner.hide('modalspin');
//         this.toastr.error(error);
//       }
//     );
//   }

//   resetForm() {
//     this.submitted = false;
//     this.form.reset();
//   }
 }
