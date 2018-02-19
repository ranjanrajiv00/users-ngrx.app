import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserModel } from './user.model';
@Injectable()
export class UserService {
    apiUrl: string = 'http://localhost:5050/users';
    constructor(private http: HttpClient) { }

    getAll(): Observable<UserModel[]> {
        return this.http.get(this.apiUrl).map(res => {
            return res as UserModel[];
        });
    }

    getById(user: any): Observable<UserModel> {
        return this.http.get(`${this.apiUrl}/${user.payload}`).map(res => {
            return res as UserModel;
        });
    }

    post(user: any): Observable<any> {
        return this.http.post(this.apiUrl, user.payload).map(res => {
            return user.payload;
        });
    }

    put(user: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${user.payload.id}`, user.payload).map(res => {
            return user.payload;
        });
    }

    delete(user: any): any {
        return this.http.delete(`${this.apiUrl}/${user.payload.id}`)
            .map(res => {
                return user.payload;
            })
    }
}