import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import checkPasswords from 'src/validators/checkPasswords.directive'
import {FirebaseService} from '../../services/firebase.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../../app.component.scss', './registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      repeatPassword: new FormControl(null, []),
    }, {validators: checkPasswords})
  }

  submit() {
    if (this.form.valid) {
      const {repeatPassword, ...rest} = this.form.value
      const user = {...rest, photoUrls: []}
      this.firebaseService.createUser(user)
        .then(() => this.router.navigate(['/']))
        .catch(console.log)
    } else {
      this.form.markAllAsTouched()
    }
  }

}
