import {Component} from '@angular/core'
import {FirebaseService, User} from '../../services/firebase.service'
import {select, Store} from '@ngrx/store'
import {selectUser} from '../../reducers/user/user.selectors'
import {UserState} from '../../reducers/user/user.reducer'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss', '../../app.component.scss']
})
export class LikesComponent {
  public user$: Observable<User> = this.store$.pipe(select(selectUser))

  constructor(private store$: Store<UserState>, private firebaseService: FirebaseService) {}

  onClick(url: string) {
    const subscription = this.user$.subscribe(({key, photoUrls = []}) => {
      if (!key) return

      const urls = photoUrls.filter((photoUrl) => photoUrl !== url)
      this.firebaseService.updatePhotoUrls(key, urls)
    })

    subscription.unsubscribe()
  }

}
