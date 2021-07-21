import { User } from '../../models/user';
import { IUserState } from "./iUserState";


export type Action = {
    type: string,
    payload: {
        email: ''
    }
}

const initialUserState: IUserState = {
    email: ''
};

function addUser(state: IUserState, action: Action): IUserState {
    let email = action.payload.email;
    console.log('state');
    console.log(state);
    console.log('action');
    console.log(action);
    return Object.assign({}, state, { email: email });
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