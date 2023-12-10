import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer, RootState } from "@/lib/store";

type ExtendedRenderOptions = Omit<RenderOptions, "queries"> & {
  preloadedState?: PreloadedState<RootState>;
};

export const renderWithProviders = (
  ui: React.ReactElement,
  { preloadedState, ...renderOptions }: ExtendedRenderOptions = {},
) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });

  const Wrapper = ({
    children,
  }: React.PropsWithChildren<{}>): React.ReactElement => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};