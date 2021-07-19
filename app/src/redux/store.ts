import { createStore, applyMiddleware} from "redux";
import { reducers } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension)
//   ? window.devToolsExtension() : (f) => f;

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

