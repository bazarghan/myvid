import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import reducer from "./rootReducer";
import rootSaga from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
