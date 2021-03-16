import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {MyValidators} from './../../services/validators.service'
import {FirebaseService} from '../../services/firebase.service'
import {Router} from '@angular/router'
import {UserState} from 'src/app/reducers/user/user.reducer'
import {Store} from '@ngrx/store'
import {LoginAction} from 'src/app/reducers/user/user.actions'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../../app.component.scss', './registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private validators: MyValidators,
    private store$: Store<UserState>
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ], this.validators.uniqLogin),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      repeatPassword: new FormControl(null, []),
    }, {validators: this.validators.checkPasswords})
  }

  submit() {
    if (!this.form.invalid) {

      const {repeatPassword, ...rest} = this.form.value
      const data = {...rest, photoUrls: []}

      this.firebaseService.createUser(data)
        .then(() => {
          this.firebaseService.getUser(data.login)
            .subscribe((result: any) => {
              const user = {key: result[0].key, ...result[0].payload.val()}
              this.store$.dispatch(new LoginAction({user}))
              sessionStorage.setItem('user', JSON.stringify({login: user.login, password: user.password}))
              this.router.navigate(['/'])
            })
        })
        .catch(console.log)
    } else {
      this.form.markAllAsTouched()
    }
  }

}
