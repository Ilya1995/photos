import {User} from './../../firebase.service'
import {UserActions, userActionsType} from './user.actions'

export const userNode = 'user'

export interface UserState {
  user: User
  isAuth: boolean
}

const initialState: UserState = {
  user: null,
  isAuth: false,
}

export const userReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case userActionsType.setUser:
      return {...state, user: action.payload.user}
    case userActionsType.updateIsAuth:
      return {...state, isAuth: action.payload.isAuth}

    default:
      return state
  }
}
