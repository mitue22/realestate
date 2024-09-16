import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionComponent } from './permission.component';
import { DashboardComponent } from '@sa-core/dashboard-main/dashboard.component';
import { CommonModule } from '@angular/common';

const ChildRoutes: Routes = [
 
  {
    path: '',
    component: DashboardComponent,
    children: [
  {
    path: 'create',
    component: PermissionComponent
  }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChildRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class PermissionRoutingModule { }
