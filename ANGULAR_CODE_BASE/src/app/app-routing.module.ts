import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/features/home/home.module#HomeModule'
      }
    ]
  },

  {
    path: 'menu1',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/features/menu1/menu1.module#Menu1Module'
      }
    ]
  },  
  {
    path: 'property',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/features/property/property.module#PropertyModule'
      }
    ]
  },
  {
    path: 'role',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/features/role/role.module#RoleModule'
      }
    ]
  },
  {
    path: 'users',
    component: MainComponent,
    children: [
      {
        path: '',
        // loadChildren: 'app/features/users/user/user.module#UserModule'
         loadChildren: 'app/features/features.module#FeaturesModule'
      }
    ]
  },
  {
    path: 'permission',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/features/permission/permission.module#PermissionModule'
      }
    ]
  },
  {
    path: 'builder',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/features/builder/builder.module#BuilderModule'
      }
    ]
  },
  {
    path: 'admin',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/features/admin/admin.module#AdminModule'
      }
    ],
    data: { isAdmin: true }
  },
  {
    path:'administrator',
    component:MainComponent,
    children:[
      {
        path: '',
        loadChildren: 'app/administration/administration.module#AdministrationModule'
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,

  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes //, {enableTracing: true} 
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
