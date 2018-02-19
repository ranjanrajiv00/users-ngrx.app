import { UserModel } from "../../user.model";

export const LOAD_USERS = '[USERS] LOAD_USERS;';
export const LOAD_USERS_SUCCESS = '[USERS] LOAD_USERS_SUCCESS;';

export const LOAD_USER_BY_ID = '[USERS] LOAD_USER_BY_ID;';
export const LOAD_USER_BY_ID_SUCCESS = '[USERS] LOAD_USER_BY_ID_SUCCESS;';

export const CREATE_USER = '[USERS] CREATE_USER;';
export const CREATE_USER_SUCCESS = '[USERS] CREATE_USER_SUCCESS;';

export const UPDATE_USER = '[USERS] UPDATE_USER;';
export const UPDATE_USER_SUCCESS = '[USERS] UPDATE_USER_SUCCESS;';

export const DELETE_USERS = '[USERS] DELETE_USERS;';
export const DELETE_USERS_SUCCESS = '[USERS] DELETE_USERS_SUCCESS;';

export class LoadUsersAction {
    readonly type = LOAD_USERS;
    constructor() { }
}

export class LoadUsersSucessAction {
    readonly type = LOAD_USERS_SUCCESS;
    constructor(public payload: UserModel[]) { }
}

export class LoadUserByIdAction {
    readonly type = LOAD_USER_BY_ID;

    constructor(public payload: string) { }
}

export class LoadUserByIdSuccessAction {
    readonly type = LOAD_USER_BY_ID_SUCCESS

    constructor(public payload: UserModel) { }
}

export class CreateUserAction {
    readonly type = CREATE_USER;
    constructor(public payload: UserModel) { }
}

export class CreateUserSuccessAction {
    readonly type = CREATE_USER_SUCCESS;
    constructor(public payload: UserModel) { }
}

export class UpdateUserAction {
    readonly type = UPDATE_USER;
    constructor(public payload: UserModel) { }
}

export class UpdateUserSuccessAction {
    readonly type = UPDATE_USER_SUCCESS;
    constructor(public payload: UserModel) { }
}

export class DeleteUserAction {
    readonly type = DELETE_USERS;
    constructor(public payload: UserModel) { }
}

export class DeleteUserSuccessAction {
    readonly type = DELETE_USERS_SUCCESS;
    constructor(public payload: UserModel) { }
}

export type Action =
    LoadUsersAction | LoadUsersSucessAction |
    LoadUserByIdAction | LoadUserByIdSuccessAction |
    CreateUserAction | CreateUserSuccessAction |
    UpdateUserAction | UpdateUserSuccessAction |
    DeleteUserAction | DeleteUserSuccessAction;
