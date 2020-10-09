import { createStore,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';


const middleware = applyMiddleware(promise , thunk, logger);
const persistConfig = {
    key: 'root',
    storage,
  }


const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, compose(middleware));
export const persistor = persistStore(store);




//const store = createStore(rootReducer, composeWithDevTools (applyMiddleware(logger,thunk)))





