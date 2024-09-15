import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditProfileComponent } from './users/components/profile/edit-profile/edit-profile.component';
import { DashboardHomeComponent } from './users/components/dashboard/dashboard-home/dashboard-home.component';
import { ReUsableModule } from '../common/re-usable.module';
import { RegistrationComponent } from './users/registration/registration.component';
import { FeaturesRoutingModule } from './users/features-routing.module';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PropertyModule } from './property/property.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
// import { RoleModule } from './role/role.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReUsableModule,
    FeaturesRoutingModule,
    PropertyModule,
    NgSelectModule,
  ],
  declarations: [
    RegistrationComponent,
    EditProfileComponent, 
    DashboardHomeComponent    
  ],
  providers: [
  ]
})
export class FeaturesModule { }
