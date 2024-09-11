import { Component, OnInit } from '@angular/core';
import { LoginService } from '@sa-services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isUserLoggedIn: Boolean = false;

  constructor(private loginService:LoginService) { 
    this.isUserLoggedIn = loginService.isLoggedIn();
}

  // toggleMenuItems = false;

  ngOnInit() {
    
  }

}
