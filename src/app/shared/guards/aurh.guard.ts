import {CanActivate, Router} from '@angular/router'
import {selectIsAuth} from '../../reducers/user/user.selectors'
import {UserState} from '../../reducers/user/user.reducer'
import {Injectable} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {tap} from 'rxjs/operators'
import {Observable} from 'rxjs'

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private store$: Store<UserState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store$.pipe(
      select(selectIsAuth),
      tap((isAuth) => {
        if (!isAuth) this.router.navigate(['/login'])
      }))
  }
}
