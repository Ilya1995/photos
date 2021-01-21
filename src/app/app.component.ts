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
  style = {color: 'red'}
  photos = []

  constructor(private photosService: PhotosService) {}

  ngOnInit() {
    this.fetchPhotos()
  }

  fetchPhotos() {
    this.photosService.fetchPhotos()
      .subscribe(photos => {
        console.log(photos)
        this.photos = photos
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
