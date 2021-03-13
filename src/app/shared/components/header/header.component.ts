import {Component, AfterViewInit, OnDestroy, ViewChild} from '@angular/core'
import {selectUser} from '../../../reducers/user/user.selectors'
import {UserState} from '../../../reducers/user/user.reducer'
import {User} from '../../../firebase.service'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {

  @ViewChild('sticky') sticky
  public user$: Observable<User> = this.store$.pipe(select(selectUser))

  fixed = false
  emptyHeight = 0
  neededScroll = 0

  constructor(private store$: Store<UserState>) {}

  ngAfterViewInit() {
    this.emptyHeight = this.sticky.nativeElement.offsetHeight
    this.neededScroll = this.sticky.nativeElement.offsetTop - (100 - this.sticky.nativeElement.offsetHeight) / 2
    window.addEventListener('scroll', this.handleScroll)
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.fixed = window.scrollY > this.neededScroll
  }
}
