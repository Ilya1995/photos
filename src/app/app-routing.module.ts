import {RegistrationComponent} from './modules/registration/registration.component'
import {LoginComponent} from './modules/login/login.component'
import {DefaultComponent} from './layouts/default/default.component'
import {FullsizeComponent} from './layouts/fullsize/fullsize.component'
import {LikesComponent} from './modules/likes/likes.component'
import {HomeComponent} from './modules/home/home.component'
import {ErrorPageComponent} from './modules/error-page/error-page.component'
import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {AuthGuard} from './shared/guards/aurh.guard'

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'likes', component: LikesComponent},
    ],
  },
  {
    path: '',
    component: FullsizeComponent,
    children: [{path: 'login', component: LoginComponent}, {path: 'registration', component: RegistrationComponent}],
  },
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: '/error'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
