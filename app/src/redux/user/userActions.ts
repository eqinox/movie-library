// Constants

//export const REGISTER_USER = 'users/register';

export const registerUser = (amount: number) => {
    return (dispatch: any) => {
        dispatch({
            type: 'users/register',
            payload: amount
        })
    }
}


