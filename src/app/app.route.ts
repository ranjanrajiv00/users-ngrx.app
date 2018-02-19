import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoute: Route[] = [{
    path: '',
    component: AppComponent,
    loadChildren: './user-management/user.module#UserModule'
}]