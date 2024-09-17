import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  isRequired = true;
  emailPhoneRequired = true;
  constructor(
    public activeModal: NgbActiveModal,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
  ) { }
  ngAfterViewInit() {
    this.emailPhoneRequired = this.isRequired;
  }
  alertMessage: any = {
    // status: false,
    type: '',
    message: ''
  };
  urltoRedirect = '';
  loginCheck = false;

  login(loginForm) {
    this.loginCheck = true;
    let returnData = this.loginService.checkUserLogin(loginForm.value)
    .subscribe(response => {
      console.log('== response - ', response, ' type of ', response['token']);
      console.log(response);
      // if (response['token'] === '') {
        this.alertMessage = {
          type: 'success',
          status: true,
          message: 'Logged In successfully'
        }
        this.loginCheck = false;
        this.alertMessage.message = '';
        const token = response['token'];
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    const role = payload.user.role;
        this.loginSuccess(response['token'],role);
        this.router.navigate(['/users/dashboard']);
      //  }
    },
    (error: Response) => {
      this.alertMessage.type = 'danger';
      this.loginCheck = false;
      console.log('Unexpected error occured ', error);
      if (error.status === 401) {
        this.alertMessage.message = "Either of you details is incorrect";
      }
      else {
        this.alertMessage.message = "An Unexpected error occured";
      }
      // this.loginError.status = true;
    });
  }

  // login(loginForm: NgForm): void {
  //   if (loginForm.valid) {
  //     this.loginCheck = true; // Show spinner while logging in

  //     const { emailPhone, loginPassword } = loginForm.value;
  //     const password=loginPassword;
  //     // Call authentication service to generate token
  //     this.loginService.checkUserLogin(emailPhone,password).subscribe(
  //       (response) => {
  //         // Handle successful login response (e.g., store token)
  //         this.loginCheck = false; // Hide spinner on success
  //         this.activeModal.close('Login successful'); // Close modal or handle redirect
  //       },
  //       (error) => {
  //         this.loginCheck = false; // Hide spinner on error
  //         this.alertMessage = { message: 'Invalid credentials. Please try again.', type: 'danger' };
  //       }
  //     );
  //   }
  // }


  loginSuccess(token,role) {
    this.commonService.changeHeaderMessage({ type: 'success', message: 'You have logged in successfully'});
    this.activeModal.dismiss('Cross click');
    this.router.navigate([this.urltoRedirect || '/users/dashboard']);
    
    // if (this.urltoRedirect)
    //   this.router.navigate([this.urltoRedirect]);
    // else
    //   this.router.navigate(['/users/dashboard']);

    // Adding to local storage
    localStorage.setItem('token', token);
    localStorage.setItem('role',role);
  }


  ngOnInit() {
    this.route.queryParamMap.subscribe((data) => {
      // console.log('--- ', data);
      if (data.get('action') === 'signUpsuccess') 
        this.alertMessage = { status: true, type: 'success', message: 'Please login to continue' }
      else if (data.get('action') === 'login') 
        this.alertMessage = { status: true, type: 'success', message: 'Please login to continue' }

      if (data.get('urltoRedirect') != '')
        this.urltoRedirect = data.get('urltoRedirect');      
    });      
  }

}
