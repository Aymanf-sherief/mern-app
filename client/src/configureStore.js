import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";
import Reducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  reduxThunk
)(createStore);

const persistedReducer = persistReducer(persistConfig, Reducer);

export default () => {
  let store = createStoreWithMiddleware(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
