import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import { IAppState } from './IAppState';


export const reducers = combineReducers<IAppState>({
    user: userReducer
});

// export default reducers;