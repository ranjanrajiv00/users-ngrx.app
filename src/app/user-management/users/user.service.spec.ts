import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { UserModel } from './user.model';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
        service = TestBed.get(UserService);
        httpMock = TestBed.get(HttpTestingController);
    });

    describe('getAll', () => {
        it('should return users from mock http', () => {
            const dummyUsers: UserModel[] = [
                {
                    "id": "2",
                    "name": "name2",
                    "surname": "surname2",
                    "birthDate": "01-6-1983",
                    "phone": "987654412",
                    "city": "Wroclaw",
                    "street": "Mydlana",
                    "number": "3"
                }
            ];

            service.getAll().subscribe(users => {
                expect(users.length).toBe(1);
                expect(users[0].id).toEqual("2");
            });

            const req = httpMock.expectOne(`${service.apiUrl}`);
            expect(req.request.method).toBe("GET");
            req.flush(dummyUsers);
        });
    });

    afterEach(() => {
        httpMock.verify();
    });
});