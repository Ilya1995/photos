import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DefaultComponent} from './default.component'
import {HomeComponent} from '../../modules/home/home.component'
import {LikesComponent} from '../../modules/likes/likes.component'
import {RouterModule} from '@angular/router'
import {SharedModule} from '../../shared/shared.module'
import {NgxMasonryModule} from 'ngx-masonry'

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    LikesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgxMasonryModule,
  ]
})
export class DefaultModule {}
