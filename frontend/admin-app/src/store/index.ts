import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {applicationReducer, applicationInitialState} from './application';
import {userReducer, userInitialState} from './user'
import {templatesReducer, templatesInitialState} from './templates'
import {productsReducer, productsInitialState} from './products'


export type IState = ReturnType<typeof rootReducer>

const initialState: IState = {
    products: productsInitialState,
    templates: templatesInitialState,
    application: applicationInitialState,
    user: userInitialState
};

const middleware = [thunk];

const rootReducer = combineReducers({
  products: productsReducer,
  templates: templatesReducer,
  application: applicationReducer,
  user: userReducer
});

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});
  
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer, initialState, enhancer);

export default store;

