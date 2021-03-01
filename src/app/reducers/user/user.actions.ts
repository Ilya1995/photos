import {User} from './../../firebase.service'
import {Action} from '@ngrx/store'

export enum userActionsType {
  setUser = '[USER] set user',
  updateIsAuth = '[USER] update isAuth',
}

export class SetUserAction implements Action {
  readonly type = userActionsType.setUser
  constructor(public payload: {user: User}) {}
}

export class UpdateIsAuthAction implements Action {
  readonly type = userActionsType.updateIsAuth
  constructor(public payload: {isAuth: boolean}) {}
}

export type UserActions = SetUserAction | UpdateIsAuthAction
