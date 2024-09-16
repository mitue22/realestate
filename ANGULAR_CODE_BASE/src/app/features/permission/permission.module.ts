import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionComponent } from './permission.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReUsableModule } from 'app/common/re-usable.module';
import { MatComponentsModule } from 'app/mat-components.module';

@NgModule({
  declarations: [PermissionComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ReUsableModule,
    PermissionRoutingModule,
    MatComponentsModule
  ],
  entryComponents:[
  ]
})
export class PermissionModule { }
