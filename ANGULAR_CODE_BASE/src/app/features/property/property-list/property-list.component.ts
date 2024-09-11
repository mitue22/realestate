import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@sa-services/common.service';
import { UserService } from '@sa-services/user.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  form:FormGroup;
  propertyList = [];
  @Input('blockView') blockView = false;
  @Input('blockSize') blockSize = 12;
  @Input('queryParams') queryParams = '';
  @Input('hideOwnProperty') hideOwnProperty = false;
  constructor( private commonService: CommonService,
    private modalService:NgbModal,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.form=this.formBuilder.group({
searchText:[null],
    });
    this.getPropertyList();
  }
  getPropertyList(){
  this.commonService.togglePageLoaderFn(true);
  this.commonService.getPropertyList().subscribe((result:any) =>{
    if(result) this.propertyList=result;
  },
    (err) => console.log({ err }),
      () => this.commonService.togglePageLoaderFn(false));
}
onAddEdit(slug:any){
  this.router.navigate(['/property/edit/'+ slug]);
}
onDelete(id:any){
  // this.router.navigate(['/edit/' + slug]);
}
}

