import * as userAction from '../actions/user.actions';
import { UserModel } from '../../user.model';
const initialState: UserModel[] = [];

export default function usersReducers(state = initialState, action: userAction.Action): UserModel[] {
    switch (action.type) {
        case userAction.LOAD_USERS_SUCCESS:
            return action.payload;

        case userAction.CREATE_USER:
            return state.concat(action.payload);

        case userAction.UPDATE_USER:
            return state.filter(user => {
                if (user.id = action.payload.id)
                    Object.assign(user, action.payload);
            });

        case userAction.DELETE_USERS:
            return state.filter(user => user.id != action.payload.id);

        default:
            return state;
    }
}