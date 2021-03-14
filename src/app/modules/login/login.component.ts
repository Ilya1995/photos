import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {FirebaseService, User} from '../../services/firebase.service'
import {Router} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {UserState} from '../../reducers/user/user.reducer'
import {ToasterService} from 'angular2-toaster'
import {selectIsAuth, selectUser} from '../../reducers/user/user.selectors'
import {LoginAction} from '../../reducers/user/user.actions'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {

  public user$: Observable<User> = this.store$.pipe(select(selectUser))
  public isAuth$: Observable<boolean> = this.store$.pipe(select(selectIsAuth))
  isSubmit = false

  form: FormGroup

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private store$: Store<UserState>,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  submit() {
    this.isSubmit = true

    if (this.form.valid) {

      this.firebaseService.getUser(this.form.value.login)
        .subscribe((result: any) => {
          if (!result[0]) return this.toasterService.pop('error', 'Ошибка', 'Неверный логин')

          const user = {key: result[0].key, ...result[0].payload.val()}
          if (user.password === this.form.value.password) {
            this.store$.dispatch(new LoginAction({user}))
            sessionStorage.setItem('user', JSON.stringify({login: user.login, password: user.password}))
            this.router.navigate(['/'])
          } else {
            this.toasterService.pop('error', 'Ошибка', 'Неверный пароль')
          }
        })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
