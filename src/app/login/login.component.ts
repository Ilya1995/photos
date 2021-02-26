import { Component, OnInit } from '@angular/core'
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      address: new FormGroup({
        country: new FormControl('by'),
        city: new FormControl('Минск', Validators.required)
      }),
      skills: new FormArray([])
    })
  }

  submit() {
    if (this.form.valid) {
      console.log('Form: ', this.form)
      const formData = {...this.form.value}

      console.log('Form Data:', formData)

      this.form.reset()
    }

    this.router.navigate(['/'])
  }

  setCapital() {
    const cityMap = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск'
    }

    const cityKey = this.form.get('address').get('country').value
    const city = cityMap[cityKey]

    this.form.patchValue({address: {city}})
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    // (<FormArray>this.form.get('skills'))
    (this.form.get('skills') as FormArray).push(control)
  }

}
