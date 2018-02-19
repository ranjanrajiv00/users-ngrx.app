import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";

import { Store, ActionsSubject, StateObservable, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';

import { UserComponent } from './user.component';
import { UserService } from '../user.service';
import { UserModel } from './../user.model';
import { reducers } from './../store/reducers';
import { UserState } from './../store/state/user-state'
import * as userActions from './../store/actions/user.actions';

import { UserEffects } from '../../users/store/effects/user.effect';

const mockUsers: UserModel[] = [{
        "id": "1",
        "name": "name2",
        "surname": "surname2",
        "birthDate": "01-6-1983",
        "phone": "987654412",
        "city": "Wroclaw",
        "street": "Mydlana",
        "number": "3"
    }, 
    {
        "id": "2",
        "name": "rajiv",
        "surname": "ranjan",
        "birthDate": "01-6-1983",
        "phone": "987654412",
        "city": "Wroclaw",
        "street": "Mydlana",
        "number": "3"
    }];

class MockUserService {
    getAll(): Observable<UserModel[]> {
        return Observable.of(mockUsers);
    }
}

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let store: Store<UserState>;

    let users: Observable<UserModel[]>;
    let table: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                RouterTestingModule,
                StoreModule.forRoot(reducers),
                EffectsModule.forRoot([UserEffects])
            ],
            declarations: [UserComponent],
            providers: [
                { provide: UserService, useClass: MockUserService }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;

        store = fixture.debugElement.injector.get(Store);
        users = store.select(response => response.users);

        store.dispatch(new userActions.LoadUsersAction());
        table = fixture.debugElement.query(By.css("table"));
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('table should have headers', () => {
        let headers = table.nativeElement.querySelectorAll('thead>tr>th');

        expect(headers.length).toBe(7);
        expect(headers[0].innerText).toBe('Name');
    });

    it('table should have users', () => {
        let body = table.nativeElement.querySelectorAll('tbody>tr');

        expect(body.length).toBe(2);
    });
});