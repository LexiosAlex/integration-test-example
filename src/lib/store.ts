import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { todoReducer } from "@/lib/reducers/todoReducer";

export const rootReducer =  combineReducers({
  todos: todoReducer
})
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
