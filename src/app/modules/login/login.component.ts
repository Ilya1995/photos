import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {FirebaseService, User} from '../../firebase.service'
import {Router} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {UserState} from '../../reducers/user/user.reducer'
import {Observable} from 'rxjs'
import {selectIsAuth, selectUser} from '../../reducers/user/user.selectors'
import {LoginAction} from '../../reducers/user/user.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {

  public user$: Observable<User> = this.store$.pipe(select(selectUser))
  public isAuth$: Observable<boolean> = this.store$.pipe(select(selectIsAuth))

  form: FormGroup

  constructor(private router: Router, private firebaseService: FirebaseService, private store$: Store<UserState>) {}

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    })
  }

  submit() {
    if (this.form.valid) {
      this.firebaseService.getUser(this.form.value.login)
        .subscribe((result: any) => {
          const user = {key: result.key, ...result.payload.val()}
          if (user.password === this.form.value.password) {
            this.store$.dispatch(new LoginAction({user}))
            sessionStorage.setItem('user', JSON.stringify({login: user.login, password: user.password}))
            this.router.navigate(['/'])
          } else {
            console.log('неверный логин или пароль')
          }
        })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
