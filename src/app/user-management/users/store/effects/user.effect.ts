import { Injectable } from '@angular/core';
import { UserService } from '../../user.service';
import { Effect, Actions } from '@ngrx/effects';
import * as userActions from '../actions/user.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserEffects {
    constructor(private userService: UserService,
        private action: Actions) {
    }

    @Effect() loadUsers = this.action
        .ofType(userActions.LOAD_USERS)
        .switchMap(() =>
            this.userService.getAll()
                .map((users) => {
                    return new userActions.LoadUsersSucessAction(users)
                }));

    @Effect() loadUserById = this.action
        .ofType(userActions.LOAD_USER_BY_ID)
        .switchMap(id =>
            this.userService.getById(id)
                .map((users) => {
                    return new userActions.LoadUserByIdSuccessAction(users)
                }));

    @Effect() createUser = this.action
        .ofType(userActions.CREATE_USER)
        .switchMap(user =>
            this.userService.post(user)
                .map((user) => {
                    return new userActions.CreateUserSuccessAction(user)
                })).share();

    @Effect() updateUser = this.action
        .ofType(userActions.UPDATE_USER)
        .switchMap(user =>
            this.userService.put(user)
                .map((user) => {
                    return new userActions.UpdateUserSuccessAction(user)
                })).share();

    @Effect() deleteUser = this.action
        .ofType(userActions.DELETE_USERS)
        .switchMap(user =>
            this.userService.delete(user)
                .map((user) => {
                    return new userActions.DeleteUserSuccessAction(user)
                })).share();
}