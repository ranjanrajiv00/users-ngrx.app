import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";
import { UserDetailsComponent } from './user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, ActionsSubject, StateObservable, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { reducers } from './../store/reducers';
import { UserState } from './../store/state/user-state'
import * as userActions from './../store/actions/user.actions';
import { UserService } from '../user.service';
import { UserModel } from './../user.model';
import { Subject } from 'rxjs/Subject';
import { UserEffects } from '../../users/store/effects/user.effect';
import { EffectsModule } from '@ngrx/effects';

const mockUser: UserModel = {
    "id": "1",
    "name": "name2",
    "surname": "surname2",
    "birthDate": "01-6-1983",
    "phone": "987654412",
    "city": "Wroclaw",
    "street": "Mydlana",
    "number": "3"
};

class MockUserService {
    getById(id: string): Observable<UserModel> {
        let subject = new Subject<UserModel>();
        setTimeout(() => {
            subject.next(mockUser);
            subject.complete();
        }, 100);
        return subject;
    }
}

describe('UserDetailsComponent', () => {
    let component: UserDetailsComponent;
    let fixture: ComponentFixture<UserDetailsComponent>;
    let store: Store<UserState>;
    let user: any;
    let submit: DebugElement;
    let name: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                RouterTestingModule,
                StoreModule.forRoot(reducers),
                EffectsModule.forRoot([UserEffects])
            ],
            declarations: [UserDetailsComponent],
            providers: [
                { provide: UserService, useClass: MockUserService }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;

        store = fixture.debugElement.injector.get(Store);
        user = store.select(response => response.user);

        store.dispatch(new userActions.LoadUserByIdAction("1"));
        submit = fixture.debugElement.query(By.css("button"));
        name = fixture.debugElement.query(By.css("[formControlName='name']"));
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.userForm.valid).toBeFalsy();
    });

    it('name field validity', () => {
        let name = component.userForm.controls['name'];
        let errors = {};

        expect(name.valid).toBeFalsy();

        errors = name.errors || {};
        expect(errors['required']).toBeTruthy();
    });

    it('user form should be populated', () => {
        user.subscribe(response => {
            if (response && response.id) {
                component.userForm.setValue(response);
                fixture.detectChanges();
                expect(component.userForm.controls["name"].value).toEqual("name2");
            }
        })
    });

    it('should save user', () => {
        component.userForm.setValue({
            "id": "2",
            "name": "name3",
            "surname": "surname3",
            "birthDate": "01-6-1983",
            "phone": "987654412",
            "city": "Wroclaw",
            "street": "Mydlana",
            "number": "3"
        });

        fixture.detectChanges();
        if (component.userForm.valid) {
            if (component.userForm.value["id"]) {
                store.dispatch(new userActions.UpdateUserAction(component.userForm.value));
            }
            else {
                store.dispatch(new userActions.CreateUserAction(component.userForm.value));
            }
        }
    });

    it('should have submit button', () => {
        expect(submit.nativeElement.innerText).toEqual("Save");
    });
});