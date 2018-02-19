import { Route } from '@angular/router';
import { UserComponent } from './users/user-list/user.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
export const userRoute: Route[] = [
    {
        path: '',
        component: UserComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'details/:id',
        component: UserDetailsComponent
    }
];

