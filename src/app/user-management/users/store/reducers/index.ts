import { ActionReducerMap } from '@ngrx/store';
import usersReducers from './users.reducers';
import userReducers from './user.reducers';
import { UserState } from '../state/user-state';

export const reducers: ActionReducerMap<UserState> = {
  users: usersReducers,
  user:userReducers
};