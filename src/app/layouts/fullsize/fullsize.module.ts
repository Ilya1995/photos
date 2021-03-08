import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FullsizeComponent } from './fullsize.component'
import { RouterModule } from '@angular/router'
import { LoginComponent } from '../../modules/login/login.component'
import { RegistrationComponent } from '../../modules/registration/registration.component'
import { SharedModule } from '../../shared/shared.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    FullsizeComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FullsizeModule { }
