import {FirebaseService} from '../services/firebase.service'
import {FormControl, AbstractControl, ValidationErrors} from '@angular/forms'
import {Observable} from 'rxjs'
import {Injectable} from '@angular/core'
import {map, first} from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class MyValidators {
  constructor(private firebaseService: FirebaseService) {}

  uniqLogin = (control: FormControl): Observable<any> => {
    return this.firebaseService.getUser(control.value).pipe(map((users) => {
      if (users.length) return {uniqLogin: true}
      return null
    }), first())
  }

  checkPasswords(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')
    const repeatPassword = control.get('repeatPassword')
    if (password.value !== repeatPassword.value) return {repeatPassword: true}
    return null
  }
}



