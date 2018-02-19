import * as userAction from '../actions/user.actions';
import { UserModel } from '../../user.model';
const initialState: UserModel = {
    id: '',
    name: '',
    surname: '',
    birthDate: '',
    phone: '',
    city: '',
    street: '',
    number: ''
}

export default function userReducers(state = initialState, action: userAction.Action): UserModel {
    switch (action.type) {
        case userAction.LOAD_USER_BY_ID_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}