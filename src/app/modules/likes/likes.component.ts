import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {FirebaseService, User} from '../../firebase.service'
import {select, Store} from '@ngrx/store'
import {PhotosService} from '../../photos.service'
import {selectUser} from '../../reducers/user/user.selectors'
import {UserState} from '../../reducers/user/user.reducer'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {
  public user$: Observable<User> = this.store$.pipe(select(selectUser))

  page = 0
  photos = []

  constructor(
    private photosService: PhotosService,
    private firebaseService: FirebaseService,
    private store$: Store<UserState>
  ) {}

  ngOnInit() {
    // this.getPhotos()
  }

  getPhoto(id) {
    if (!id) return

    const subscription = this.photosService.getPhoto(id)
      .subscribe(photo => {
        console.log(photo)
      }, error => {
        console.log(error)
      })

    subscription.unsubscribe()
  }

  onClick(id: string) {
    console.log(888, id)
    // const subscription = this.user$.subscribe((user) => {
    //   if (!user?.key) return

    //   let photoIds = []

    //   if (user.photoIds?.includes(id)) {
    //     photoIds = user.photoIds.filter((photoId) => photoId !== id)
    //   } else {
    //     photoIds = [...user.photoIds, id]
    //   }
    //   this.firebaseService.addPhotoId(user.key, photoIds)
    // })

    // subscription.unsubscribe()
  }

}
