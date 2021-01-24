import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import checkPasswords from 'src/validators/checkPasswords.directive'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../app.component.scss', './registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup

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
      console.log('Form: ', this.form)
      const formData = {...this.form.value}
      console.log('Form Data:', formData)
      this.form.reset()
    } else {
      this.form.markAllAsTouched()
    }
  }

}
