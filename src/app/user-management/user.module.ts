import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { UserService } from './users/user.service';
import { userRoute } from './user.route';
import { UserComponent } from './users/user-list/user.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../user-management/users/store/effects/user.effect';
import { reducers } from './users/store/reducers';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoute),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([UserEffects])
    ],
    declarations: [
        UserComponent,
        UserDetailsComponent
    ],
    providers: [
        UserService
    ]
})
export class UserModule {

}