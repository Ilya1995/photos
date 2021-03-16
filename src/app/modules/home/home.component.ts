import {Component, OnInit} from '@angular/core'
import {FirebaseService, User} from '../../services/firebase.service'
import {select, Store} from '@ngrx/store'
import {PhotosService} from '../../services/photos.service'
import {selectUser} from '../../reducers/user/user.selectors'
import {UserState} from '../../reducers/user/user.reducer'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../app.component.scss'],
})
export class HomeComponent implements OnInit {
  public user$: Observable<User> = this.store$.pipe(select(selectUser))

  page = 0
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
    if (this.page === 1 && !this.photos.length) return
    this.page = this.page + 1
    this.photosService.fetchPhotos(this.page)
      .subscribe(photos => {
        this.photos = [...this.photos, ...photos]
      }, console.log)
  }

  onClick(url: string) {
    const subscription = this.user$.subscribe(({key, photoUrls = []}) => {
      if (!key) return

      let urls = []

      if (photoUrls?.includes(url)) {
        urls = photoUrls.filter((photoUrl) => photoUrl !== url)
      } else {
        urls = [...photoUrls, url]
      }
      this.firebaseService.updatePhotoUrls(key, urls)
    })

    subscription.unsubscribe()
  }
}
