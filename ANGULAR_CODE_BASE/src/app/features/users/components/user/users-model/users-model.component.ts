import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@sa-services/common.service';
import { User } from 'app/administration/models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-model',
  templateUrl: './users-model.component.html',
  styleUrls: ['./users-model.component.scss']
})
export class UsersModelComponent implements OnInit {
  @Input() id: any;
  @Output() onUser_Emit: EventEmitter<boolean> = new EventEmitter();
  submitted = false;
  roleList: any[] = [];
  showPassword = false;

  form: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private spinner: NgxSpinnerService, 
  ) {

  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      roleName: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      password: ['', Validators.required],
      status: [null, Validators.required]
    });
    this.getRoleList()
  }
  
  getRoleList() {
    const filters=[]
    this.spinner.show();
    this.commonService.getRoleList(filters).subscribe(
      (result) => {
        this.spinner.hide();
        this.roleList = result.map(role => ({ label: role.name, value: role.roleId }));
      },
      (error) => {
        this.spinner.hide();
        this.roleList = [];
        alert("Fail to get role list");
      }
    );
  }

    onClick_TogglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  get f() {
    return this.form.controls;
  }

  onSubmit_Form() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = {
          id:this.id,
          roleName:this.form.get('roleName').value,
          fname:this.form.get('fname').value,
          lname:this.form.get('lname').value,
          userName:this.form.get('userName').value,
          email:this.form.get('email').value,
          phoneNo:this.form.get('phoneNo').value,
          password:this.form.get('password').value,
          status:this.form.get('status').value,
        };
        console.log("data",this.form.value)

    if (this.id) {
      // Update user
      this.commonService.addEditUser(formData).subscribe((result) => {
        console.log("ID", result);
        this.onUser_Emit.emit(true);
        this.activeModal.close();
      });
    } else {
      // Create new user
      this.commonService.addEditUser(formData).subscribe((result) => {
        console.log("ID123", result);
        this.onUser_Emit.emit(true);
        this.activeModal.close();
      });
    }
  }

}