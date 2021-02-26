import {RegistrationComponent} from './registration/registration.component'
import {LoginComponent} from './login/login.component'
import {PhotosComponent} from './photos/photos.component'
import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [
  {path: '', component: PhotosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
