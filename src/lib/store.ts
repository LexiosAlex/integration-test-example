import {combineReducers, configureStore, PreloadedState} from "@reduxjs/toolkit";
import { todoReducer, todoAPI } from "@/lib/reducers/todoReducer";

export const rootReducer = combineReducers({
  todos: todoReducer,
  [todoAPI.reducerPath]: todoAPI.reducer
});

export const makeStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todoAPI.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = typeof rootReducer;
export type AppDispatch = AppStore["dispatch"];
