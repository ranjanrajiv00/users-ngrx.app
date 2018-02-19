import { UserModel } from "../../user.model";

export interface UserState {
    users: UserModel[],
    user: UserModel
}