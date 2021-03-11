import {Component, AfterViewInit, OnDestroy, ViewChild} from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {

  @ViewChild('sticky') sticky

  fixed = false
  emptyHeight = 0
  neededScroll = 0
  constructor() {}

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
