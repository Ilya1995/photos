import {userNode, userReducer, UserState} from './user/user.reducer'
import {ActionReducerMap, MetaReducer} from '@ngrx/store'
import {environment} from 'src/environments/environment'

export interface State {
  [userNode]: UserState
}

export const reducers: ActionReducerMap<State> = {
  [userNode]: userReducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : []
