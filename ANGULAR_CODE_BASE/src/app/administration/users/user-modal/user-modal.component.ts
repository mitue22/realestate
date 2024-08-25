// import { GPCompany } from './../../../_models/masters';
// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { TranslateService } from '@ngx-translate/core';
// import { User } from 'app/pages/admin/_models/user';
// import { AdministrationService } from 'app/pages/admin/_services/administration.service';
// import { MaskService } from 'app/shared/services/input-mask.service';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
// import * as GlobalEnum from 'app/shared/data/global-constant';

// @Component({
//   selector: 'app-user-modal',
//   templateUrl: './user-modal.component.html',
//   styleUrls: ['./user-modal.component.scss']
// })
// export class UserModalComponent implements OnInit {
//   @Input() id: number;
//   @Output() onUser_Emit: EventEmitter<boolean> = new EventEmitter();

//   submitted = false;
//   form: FormGroup;
//   costCenterList: any[] = [];
//   glCompanyList: any[] = [];
//   glAccountList: any[] = [];
//   showPassword = false;
//   roleList: any[] = [];

//   role = GlobalEnum.eRole;

//   //changePassword = false;
//   mobileMask;
//   currencyMask;
//   constructor(
//     public activeModal: NgbActiveModal,
//     private formBuilder: FormBuilder,
//     private administrationService: AdministrationService,
//     public toastr: ToastrService,
//     private spinner: NgxSpinnerService,
//     public translate: TranslateService,
//     private maskService: MaskService,
//   ) {
//     this.mobileMask = this.maskService.getMobileMask();
//     this.currencyMask = this.maskService.getCurrencyMask();

//     // getCurrencyMask[inputMask]="mobileMask"
//   }

//   ngOnInit(): void {
//     this.form = this.formBuilder.group({
//       roleName: [null, Validators.compose([Validators.required])],
//       fullName: [null, Validators.compose([Validators.required])],
//       fullNameAr: [null],
//       userName: [null, Validators.compose([Validators.required])],
//       email: [null, Validators.compose([Validators.required, Validators.email])],
//       phoneNumber: [null, Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(15),])],
//       password: [null],
//       costCenterIds: [null],
//       company: [null, Validators.compose([Validators.required])],
//       // bank: [null, Validators.compose([Validators.required])],
//       glAccountCode: [null, Validators.compose([Validators.required])],
//       glAccountIndex: [null],
//       // balance: [0, Validators.compose([Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])],
//       prettyCashAmount: [0, Validators.compose([Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])],
//       limitPerItem: [0, Validators.compose([Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])],
//       allowOverrideLimit: [false],
//       transactionLimit: [0, Validators.compose([Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])],
//       status: [true],
//       changePasswordRequired: [true],
//     });

//     // If id > 0 then get user details by id
//     if (this.id > 0) {
//       this.getUserById();
//     } else {
//       //this.changePassword = true;
//       this.form.get("password").setValidators([
//         Validators.compose([
//           Validators.required,
//           Validators.pattern(
//             "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#%*?&])[A-Za-zd$@$!%*?&].{7,}"
//           ),
//         ]),
//       ]);
//     }
//     this.getRoleList();
//     this.getCostCenterDDL();
//     this.getGLCompanyDDL();
//   }

//   // Form control instance used for form control validations
//   get f() {
//     return this.form.controls;
//   }

//   //* Bind Data
//   getUserById() {
//     this.spinner.show('modalspin');
//     this.administrationService.getUserById(this.id).subscribe(
//       (result) => {
//         this.spinner.hide('modalspin');
//         if (result) {
//           const user = result as User;
//           this.form.patchValue({
//             roleName: user.roleName,
//             fullName: user.fullName,
//             fullNameAr: user.fullNameAr,
//             userName: user.userName,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             //password: user.password,
//             costCenterIds: user.costCenterIds,
//             company: user.company,
//             // bank: user.bank,
//             glAccountCode: user.glAccountCode,
//             glAccountIndex: user.glAccountIndex,
//             // balance: user.balance,
//             prettyCashAmount: user.prettyCashAmount,
//             limitPerItem: user.limitPerItem,
//             allowOverrideLimit: user.allowOverrideLimit,
//             transactionLimit: user.transactionLimit,
//             status: user.status,
//             changePasswordRequired: false,
//           });

//           // if role is Administrator then remove required validation from company, bank & cost center
//           if (user.roleName === this.role.Administrator) {
//             this.form.get("company").setValidators(null);
//             // this.form.get("bank").setValidators(null);
//             this.form.get("glAccountCode").setValidators(null);
//             // this.form.get("costCenterIds").setValidators(null);

//             this.form.get("company").updateValueAndValidity();
//             // this.form.get("bank").updateValueAndValidity();
//             this.form.get("glAccountCode").updateValueAndValidity();
//             // this.form.get("costCenterIds").updateValueAndValidity();
//           } else {
//             this.getGLAccountDDL(user.company);
//           }

//         } else {
//           this.toastr.error(this.translate.instant('Page.Msg.FailToGetUserDetails'));
//         }
//       },
//       (error) => {
//         this.spinner.hide('modalspin');
//         this.toastr.error(error, this.translate.instant('Page.Msg.FailToGetUserDetails'));
//       }
//     );
//   }
//   getRoleList() {
//     this.spinner.show('modalspin');
//     this.administrationService.getRoleList().subscribe(
//       (result) => {
//         this.spinner.hide('modalspin');
//         this.roleList = result;
//       },
//       (error) => {
//         this.spinner.hide('modalspin');
//         this.roleList = [];
//         this.toastr.error(error, this.translate.instant('Page.Msg.Fail to get role list'));
//       }
//     );
//   }
//   getCostCenterDDL() {
//     this.spinner.show('modalspin');
//     this.administrationService.getCostCenterList().subscribe(
//       (result) => {
//         this.spinner.hide('modalspin');
//         this.costCenterList = result;
//       },
//       (error) => {
//         this.spinner.hide('modalspin');
//         this.toastr.error(error, this.translate.instant('Page.Msg.Fail to get cost center list'));
//       }
//     );
//   }
//   getGLCompanyDDL() {
//     this.spinner.show('modalspin');
//     this.administrationService.getGLCompanyList().subscribe(
//       (result) => {
//         this.spinner.hide('modalspin');
//         this.glCompanyList = result;
//       },
//       (error) => {
//         this.spinner.hide('modalspin');
//         this.toastr.error(error, this.translate.instant('Page.Msg.Fail to get GL company list'));
//         this.glCompanyList = [];
//       }
//     );
//   }
//   getGLAccountDDL(gpCompany: string) {
//     this.spinner.show("modalspin");
//     this.administrationService.getGLAccountList(gpCompany).subscribe(
//       (result) => {
//         this.spinner.hide("modalspin");
//         this.glAccountList = result;
//         console.log('getGLAccountDDL', result);

//       },
//       (error) => {
//         this.spinner.hide("modalspin");
//         this.glAccountList = [];
//         this.toastr.error(error, this.translate.instant('Page.Msg.Fail to get GL account list'));
//       }
//     );
//   }
//   //* Ends: Bind Data

//   //* Events & Methods
//   onChange_Role(e) {
//     // if role is Administrator then remove required validation from company, bank & cost center
//     if (e && e.name === this.role.Administrator) {
//       this.form.get("company").setValidators(null);
//       // this.form.get("bank").setValidators(null);
//       this.form.get("glAccountCode").setValidators(null);
//       // this.form.get("costCenterIds").setValidators(null);
//     } else {
//       this.form.get("company").setValidators(Validators.required);
//       // this.form.get("bank").setValidators(Validators.required);
//       this.form.get("glAccountCode").setValidators(Validators.required);
//       // this.form.get("costCenterIds").setValidators(Validators.required);
//     }
//     this.form.get("company").setValue(null);
//     this.form.get("company").updateValueAndValidity();
//     // this.form.get("bank").setValue(null);
//     // this.form.get("bank").updateValueAndValidity();
//     this.form.get("glAccountCode").setValue(null);
//     this.form.get("glAccountCode").updateValueAndValidity();
//     this.glAccountList = [];

//     // this.form.get("costCenterIds").setValue(null);
//     // this.form.get("costCenterIds").updateValueAndValidity();

//     // if (e) {
//     //   if (e.name == 'Submitter' || e.name == 'Preparer') {
//     //     this.form.controls.company.setValidators([Validators.compose([Validators.required])]);
//     //     this.form.controls.bank.setValidators([Validators.compose([Validators.required])]);
//     //     this.form.controls.costCenterIds.setValidators([Validators.compose([Validators.required])]);
//     //   }
//     //   else {
//     //     this.form.controls.company.setValidators(null);
//     //     this.form.controls.bank.setValidators(null);
//     //     this.form.controls.costCenterIds.setValidators(null);
//     //   }
//     //   this.form.controls.company.updateValueAndValidity();
//     //   this.form.controls.bank.updateValueAndValidity();
//     //   this.form.controls.costCenterIds.updateValueAndValidity();
//     // }
//   }
//   onChange_GLCompany(e) {
//     this.glAccountList = [];
//     // this.form.get("bank").setValue(null);
//     this.form.get("glAccountCode").setValue(null);

//     if (e && e.code) {
//       this.getGLAccountDDL(e.code);
//     }
//   }

//   onChange_GLAccountCode(e) {
//     //  this.glAccountList = [];
//     // this.form.get("bank").setValue(null);
//     console.log('onChange_GLAccountCode', e);
//     if (e && e.actindx) {
//       this.form.get("glAccountIndex").setValue(e.actindx);
//     } else {
//       this.form.get("glAccountIndex").setValue(null);
//     }
//   }

//   onClick_TogglePassword(): void {
//     this.showPassword = !this.showPassword;
//   }

//   onChange_ChangePasswordRequired(e) {
//     if (e.target.checked) {
//       this.form.controls.password.setValidators([
//         Validators.compose([
//           Validators.required,
//           Validators.pattern(
//             "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#%*?&])[A-Za-zd$@$!%*?&].{7,}"
//           ),
//         ]),
//       ]);
//     } else {
//       this.form.controls.password.setValidators(null);
//       this.form.controls.password.updateValueAndValidity();
//     }
//   }
//   //* Ends: Events & Methods

//   //* Submit form
//   onSubmit_Form() {
//     this.submitted = true;
//     if (this.form.invalid) {
//       this.toastr.warning(this.translate.instant('Page.Msg.Entervalidformdetails'));
//       return;
//     }
//     const formData = this.form.value as User;
//     console.log('formData', formData);
//     formData.id = this.id ? this.id : 0;

//     this.spinner.show('modalspin');
//     if (this.id > 0) {
//       // Edit
//       this.administrationService.editUser(formData).subscribe(
//         (result) => {
//           this.spinner.hide('modalspin');
//           if (result && result > 0) {
//             this.toastr.success(this.translate.instant('Page.Msg.UserUpdatedSuccessfully'));
//             this.onUser_Emit.emit(result);
//             this.activeModal.close();
//           } else {
//             this.toastr.error(this.translate.instant('Page.Msg.FailedToUpdateData'));
//           }
//         },
//         (error) => {
//           this.spinner.hide('modalspin');
//           this.toastr.error(error, this.translate.instant('Page.Msg.FailedToUpdateData'));
//         }
//       );
//     } else {
//       // Add
//       this.administrationService.addUser(formData).subscribe(
//         (result) => {
//           this.spinner.hide('modalspin');
//           if (result && result > 0) {
//             this.toastr.success(this.translate.instant('Page.Msg.UserSavedSuccessfully'));
//             this.onUser_Emit.emit(result);
//             this.activeModal.close();
//           } else {
//             this.spinner.hide('modalspin');
//             this.toastr.error(this.translate.instant('Page.Msg.FailedToSaveData'));
//           }
//         },
//         (error) => {
//           this.spinner.hide('modalspin');
//           this.toastr.error(error, this.translate.instant('Page.Msg.FailedToSaveData'));
//         }
//       );
//     }

//   }
// }
