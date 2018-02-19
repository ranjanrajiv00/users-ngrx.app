import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserModel } from './../user.model';
import { UserState } from './../store/state/user-state';
import * as userActions from './../store/actions/user.actions';

@Component({
    selector: 'user-list',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
    users: Observable<UserModel[]>;
    deleteSubscriber = null;

    constructor(private store: Store<UserState>,
        private actionSubject: ActionsSubject) {
        this.users = this.store.select(state => state.users);
    }

    ngOnInit() {
        this.get();
        this.subscribeDispathers();
    }

    ngOnDestroy() {
        this.unSubscribeDispathers();
    }

    get() {
        this.store.dispatch(new userActions.LoadUsersAction());
        this.subscribeDispathers();
    }

    subscribeDispathers() {
        this.unSubscribeDispathers();
        this.deleteSubscriber = this.actionSubject.subscribe(data => {
            if (data.type === userActions.DELETE_USERS_SUCCESS) {
                alert('User has been deleted.');
            }
        });
    }

    unSubscribeDispathers() {
        this.deleteSubscriber && this.deleteSubscriber.unsubscribe();
    }

    delete(user: UserModel) {
        this.store.dispatch(new userActions.DeleteUserAction(user));
    }
}