import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '@sa-services/common.service';
import { UserService } from '@sa-services/user.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  propertyList = [];
  @Input('blockView') blockView = false;
  @Input('blockSize') blockSize = 12;
  @Input('queryParams') queryParams = '';
  @Input('hideOwnProperty') hideOwnProperty = false;
  constructor( private commonService: CommonService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.getPropertyList();
  }
  // getPropertyList(params: any = '') {
  //   this.commonService.togglePageLoaderFn(true);
  //    if (this.hideOwnProperty && this.userService.currentUser && this.userService.currentUser.user._id) params = this.queryParams ? `${params}&notUserId=${this.userService.currentUser.user._id}` : `?notUserId=${this.userService.currentUser.user._id}`;
  //   console.log('final query ', params);
  //   this.commonService.filterProperties(params)
  //     .subscribe((result: any) => {
  //       if (result) this.propertyList = result;
  //       console.log('propertyList: ', this.propertyList);
  //     }, (err) => console.log({ err }),
  //       () => this.commonService.togglePageLoaderFn(false));

  // }
getPropertyList(){
  this.commonService.togglePageLoaderFn(true);
  this.commonService.getPropertyList().subscribe((result:any) =>{
    if(result) this.propertyList=result;
  },
    (err) => console.log({ err }),
      () => this.commonService.togglePageLoaderFn(false));


  }
}

