import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonService } from '../../../common/services/common.service';
import { UserService } from '@sa-services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {
  isSubmittingForm:boolean;
  imgsToUpload = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private location: Location,
    private userService:UserService,
    public toastr: ToastrService,
  ) { }

  propertyDetail: any = {
    type: {},
    state: {},
    city: {}
  };
  stateList;
  cityList = [];
  FetchingCityList = false;
  propertyTypeList;
  newPropertyData: any = {};

  getProperty(propertySlug) {
    this.commonService.getSingleProperty(propertySlug)
      .subscribe(result => {
        this.propertyDetail = result;
        console.log(result);
      });
  }

  getCityList(stateId) {
    this.cityList = [];
    this.FetchingCityList = true;

    if (stateId != 0) {
      this.commonService.getCitylistByState(stateId)
        .subscribe(response => {
          if (response.length > 0) {
            this.cityList = response;
            this.FetchingCityList = false;
          }
        });
    }
    else {
      this.cityList = [];
    }
  }

  // submitForm() {
  //   console.log("submitForm: ", );
  // }
  submitForm(data) {
    this.isSubmittingForm = true;
    // data.value.userId = this.userService.currentUser.user._id;
    this.userService.currentUser.user._id;


    const imageData = new FormData();
    this.imgsToUpload.forEach((ele, index) => {
      imageData.append("propImages", ele, ele['name']);
    })
    imageData.append("userID", this.userService.currentUser.user._id);

    for (let key in data) {
      // iterate and set other form data
      imageData.append(key, data[key]);
    }
    this.commonService.togglePageLoaderFn(true);
    this.commonService.editProperty(imageData).subscribe(
      (result) => {
        this.commonService.togglePageLoaderFn(false);
        this.toastr.success("Property edited successfully.");
        // this.getProperty(propertySlug);
      },(err) =>{
        this.commonService.togglePageLoaderFn(false);
        this.toastr.error("Failed to edit property list");
      }
    )
  }

  locationBack() {
    this.location.back();
  }

  ngOnInit() {
    let propertySlug = this.activatedRoute.snapshot.paramMap.get('propertySlug');
    if (propertySlug){
      this.getProperty(propertySlug);
      }
    this.commonService.getStatelist().subscribe(response => {
        if (response.length > 0) {
          this.stateList = response;
          console.log(this.stateList,"state");
        }
      });

    this.commonService.getPropertyTypeList()
      .subscribe(result => this.propertyTypeList = result);

  }
}
