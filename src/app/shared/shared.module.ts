import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import {InfiniteScrollComponent} from './components/infinite-scroll/infinite-scroll.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    HeaderComponent,
    InfiniteScrollComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    InfiniteScrollComponent,
  ]
})
export class SharedModule { }
