import { User } from '../../models/user';
import { IUserState } from "./iUserState";

export type Action = {
    type: string,
    user: User
}

const initialUserState: IUserState = {
    currentUser: new User()
};

function addUser(state: IUserState, action: Action): IUserState {
    return Object.assign({}, state, { currentUser: action.user });
}

const userReducer = (state: IUserState = initialUserState, action: Action): IUserState => {
    switch (action.type) {
        case 'users/register':
            return addUser(state, action);
        default:
            return initialUserState;
    }
};

export default userReducer;