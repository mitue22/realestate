import { Component, OnInit } from '@angular/core';
import { CommonService } from '@sa-services/common.service';
import { LoginService } from '@sa-services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isUserLoggedIn: Boolean = false;
  menuList:any[]=[];
  constructor(private loginService:LoginService,
    private commonService:CommonService
  ) { 
    this.isUserLoggedIn = loginService.isLoggedIn();
}

  // toggleMenuItems = false;

  ngOnInit() {
    this.getMenuList();
  }
  getMenuList(){
    this.commonService.getMenu1List()
    .subscribe(result =>{
      this.menuList=result;
   });
  }
}
