import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@sa-services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../user';

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
  userId: any;

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
      roleName:  ["", Validators.compose([Validators.required])],
      fname:  ["", Validators.compose([Validators.required])],
      lname:  ["", Validators.compose([Validators.required])],
      userName:  ["", Validators.compose([Validators.required])],
      email: ["", [Validators.required, Validators.email]],
      phoneNo: ["", Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      password:  ["", Validators.compose([Validators.required])],
      status:  [null, Validators.compose([Validators.required])],
    });
    if (this.id) { // Ensure to use `this.id`
      this.userId = this.id; // Set `roleId` for editing
      this.getUserById()
    } else {
      this.userId = null; // Clear `roleId` if creating a new role
    }

    this.getRoleList()
  }

  getUserById(): void {
    this.commonService.getUserById(this.id).subscribe((user: User) => {
      if (user) {
        this.form.patchValue({
        role: user.role,
        fname: user.fname,
        lname: user.lname,
        userName: user.userName,
        email: user.email,
        phoneNo: user.phoneNo,
        password: user.password,
        status: user.status
        });
      }
      console.log("called get List")
    });
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
          id:this.userId,
          roleName:this.form.get("roleName").value,
          fname:this.form.get("fname").value,
          lname:this.form.get("lname").value,
          userName:this.form.get("userName").value,
          email:this.form.get("email").value,
          phoneNo:this.form.get("phoneNo").value,
          password:this.form.get("password").value,
          status:this.form.get("status").value,
        };
        console.log("data",this.form.value)

    if (this.userId) {
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