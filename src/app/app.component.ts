import {Component, OnInit} from '@angular/core'
import {FirebaseService} from './firebase.service'
import {LoginAction} from './reducers/user/user.actions'
import {Store} from '@ngrx/store'
import {UserState} from './reducers/user/user.reducer'

export interface Auth {
  login: string
  password: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private firebaseService: FirebaseService, private store$: Store<UserState>) {}

  ngOnInit() {
    try {
      const data = sessionStorage.getItem('user')
      const parseData = JSON.parse(data)
      parseData && this.login(parseData)
    } catch (error) {
      console.log(error)
    }

  }

  login(data: Auth) {
    this.firebaseService.getUser(data.login)
      .subscribe((result: any) => {
        const user = {key: result.key, ...result.payload.val()}
        if (user.password === data.password) {
          this.store$.dispatch(new LoginAction({user}))
        }
      })
  }

}
