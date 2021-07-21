import { UserService } from './../../services/userService';
import { User } from '../../models/user';

export const registerUser = (user: User) => {
    console.log(user);
    return (dispatch: any) => {
        dispatch({
            type: 'users/register',
            payload: {
                email: user.email
            }
        })
    }
}


