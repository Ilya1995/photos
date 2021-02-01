import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {PhotosService} from './photos.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('ref') ref: ElementRef
  title = 'photos'
  page = 0
  style = {color: 'red'}
  photos = []

  constructor(private photosService: PhotosService) {}

  ngOnInit() {
    this.getPhotos()
  }

  getPhotos() {
    this.page = this.page + 1
    console.log(this.page)
    this.photosService.fetchPhotos(this.page)
      .subscribe(photos => {
        console.log(photos)
        // setTimeout(() => {
        this.photos = [...this.photos, ...photos]
        // }, 2000)
      }, error => {
        console.log(error)
      })
  }

  onInput(event: HTMLInputElement) {
    // console.log(event.target.value)
    // this.title = event.target.value
  }

  onClick() {
    this.style.color = 'green'
    this.ref.nativeElement.focus()
    console.log('onClick')
  }
}
