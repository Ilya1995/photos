import {AbstractControl, ValidationErrors} from '@angular/forms'

export default function(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')
  const repeatPassword = control.get('repeatPassword')
  if (password.value !== repeatPassword.value) {
    return {repeatPassword: true}
  }
  return null
}
