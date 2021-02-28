import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {FirebaseService, User} from '../firebase.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(private router: Router, private firebaseService: FirebaseService) {}

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
        .subscribe((result: [User]) => {
          if (result[0]?.password === this.form.value.password) {
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
