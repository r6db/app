import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRoutes } from 'redux-first-router';
import thunkMiddleware from 'redux-thunk';
import * as queryString from 'querystring';

import routes from './routeMap';
import * as reducers from './reducers';

export default (history, initialState) => {
    const { reducer, middleware, enhancer, thunk } = connectRoutes(history, routes, {
        querySerializer: queryString,
    });

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const rootReducer = combineReducers({ ...reducers, location: reducer });
    const middlewares = applyMiddleware(thunkMiddleware, middleware);
    const enhancers = composeEnhancers(enhancer, middlewares);

    const store = createStore(rootReducer, initialState, enhancers);

    if ((module as any).hot && process.env.NODE_ENV === 'development') {
        (module as any).hot.accept(() => {
            const newRootReducer = combineReducers({ ...reducers, location: reducer });
            store.replaceReducer(newRootReducer);
        });
    }
    return store;
};
