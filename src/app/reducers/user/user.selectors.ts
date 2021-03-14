import {createFeatureSelector, createSelector} from '@ngrx/store'
import {User} from 'src/app/services/firebase.service'
import {userNode, UserState} from './user.reducer'

const selectUserFeature = createFeatureSelector<UserState>(userNode)

export const selectUser = createSelector(
  selectUserFeature,
  (state: UserState): User => state.user
)

export const selectIsAuth = createSelector(
  selectUserFeature,
  (state: UserState): boolean => state.isAuth
)
