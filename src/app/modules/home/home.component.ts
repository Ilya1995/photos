import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {FirebaseService, User} from '../../firebase.service'
import {select, Store} from '@ngrx/store'
import {PhotosService} from '../../photos.service'
import {selectUser} from '../../reducers/user/user.selectors'
import {UserState} from '../../reducers/user/user.reducer'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../app.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('ref') ref: ElementRef
  public user$: Observable<User> = this.store$.pipe(select(selectUser))

  title = 'photos'
  page = 0
  style = {color: 'red'}
  photos = []

  constructor(
    private photosService: PhotosService,
    private firebaseService: FirebaseService,
    private store$: Store<UserState>
  ) {}

  ngOnInit() {
    this.getPhotos()
  }

  getPhotos() {
    this.page = this.page + 1
    console.log(111, this.page)
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

  onClick(url: string) {
    const subscription = this.user$.subscribe(({key, photoUrls = []}) => {
      if (!key) return

      let urls = []
      console.log(photoUrls)

      if (photoUrls?.includes(url)) {
        urls = photoUrls.filter((photoUrl) => photoUrl !== url)
      } else {
        urls = [...photoUrls, url]
      }
      this.firebaseService.addPhotoUrl(key, urls)
    })

    subscription.unsubscribe()
  }
}
