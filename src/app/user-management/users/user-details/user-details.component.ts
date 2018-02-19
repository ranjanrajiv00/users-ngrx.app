import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject } from '@ngrx/store';

import { Store } from '@ngrx/store';
import { UserState } from './../store/state/user-state';
import * as userActions from './../store/actions/user.actions';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './../user.model';

@Component({
    selector: '',
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    userForm: FormGroup;
    userId: string;
    user: Observable<any>;
    createSubscriber = null;
    updateSubscriber = null;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<UserState>,
        private actionSubject: ActionsSubject) {
        this.userId = this.route.snapshot.params['id'];
        this.user = this.store.select(response => response.user);
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            id: '',
            name: ['', Validators.required],
            surname: ['', Validators.required],
            birthDate: ['', Validators.required],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            street: ['', Validators.required],
            number: ['', Validators.required]
        });

        if (this.userId != 'new') {
            this.store.dispatch(new userActions.LoadUserByIdAction(this.userId));
            this.user.subscribe(response => {
                if (response) {
                    this.userForm.setValue(response);
                }
            })
        }

        this.subscribeDispathers();
    }

    ngOnDestroy(): void {
        this.createSubscriber.unsubscribe();
        this.updateSubscriber.unsubscribe();
    }

    save() {
        if (this.userForm.valid) {
            if (this.userId != 'new') {
                this.store.dispatch(new userActions.UpdateUserAction(this.userForm.value));
            }
            else {
                this.store.dispatch(new userActions.CreateUserAction(this.userForm.value));
            }
        }
    }

    subscribeDispathers() {
        this.createSubscriber = this.actionSubject.subscribe(data => {
            if (data.type === userActions.CREATE_USER_SUCCESS) {
                alert('User has been created.');
                this.router.navigate(['/user']);
            }
        });

        this.updateSubscriber = this.actionSubject.subscribe(data => {
            if (data.type === userActions.UPDATE_USER_SUCCESS) {
                alert('User has been updated.');
                this.router.navigate(['/user']);
            }
        });
    }
}