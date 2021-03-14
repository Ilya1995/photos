import {CanActivate, Router} from '@angular/router'
import {selectIsAuth} from '../../reducers/user/user.selectors'
import {UserState} from '../../reducers/user/user.reducer'
import {Injectable} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private store$: Store<UserState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store$.pipe(
      select(selectIsAuth),
      map((isAuth) => {
        const user = sessionStorage.getItem('user')
        if (user || isAuth) return true
        this.router.navigate(['/login'])
      }))
  }
}
