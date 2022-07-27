import type {
  UIContextType,
  UIAction,
  UIState,
  MODAL_VIEWS,
  SIDEBAR_VIEWS,
} from "@types";

import React, { FC, ReactNode, useCallback, useMemo } from "react";

const initialState: UIContextType = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: { name: "LOGIN_VIEW", cancelable: true, args: [] },
  sidebarView: "MOBILE_MENU",
  closeDropdown: () => {},
  openDropdown: () => {},
  closeModal: () => {},
  openModal: () => {},
  closeSidebar: () => {},
  openSidebar: () => {},
  toggleSidebar: () => {},
  closeSidebarIfPresent: () => {},
  setModalView: () => {},
  setSidebarView: () => {},
};

export const UIContext = React.createContext<UIContextType>(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state: UIState, action: UIAction) {
  switch (action.type) {
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case "OPEN_DROPDOWN": {
      return {
        ...state,
        displayDropdown: true,
      };
    }
    case "CLOSE_DROPDOWN": {
      return {
        ...state,
        displayDropdown: false,
      };
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalView: {
          name: action.view,
          cancelable: action.cancelable,
          args: action.args,
        },
      };
    }
    case "SET_SIDEBAR_VIEW": {
      return {
        ...state,
        sidebarView: action.view,
      };
    }
  }
}

interface Props {
  children?: ReactNode;
}
export const UIProvider: FC<Props> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openSidebar = useCallback(() => dispatch({ type: "OPEN_SIDEBAR" }), []);
  const closeSidebar = useCallback(
    () => dispatch({ type: "CLOSE_SIDEBAR" }),
    []
  );
  const toggleSidebar = useCallback(
    () =>
      state.displaySidebar
        ? dispatch({ type: "CLOSE_SIDEBAR" })
        : dispatch({ type: "OPEN_SIDEBAR" }),
    [state.displaySidebar]
  );
  const closeSidebarIfPresent = useCallback(
    () => state.displaySidebar && dispatch({ type: "CLOSE_SIDEBAR" }),
    [state.displaySidebar]
  );

  const openDropdown = useCallback(
    () => dispatch({ type: "OPEN_DROPDOWN" }),
    []
  );
  const closeDropdown = useCallback(
    () => dispatch({ type: "CLOSE_DROPDOWN" }),
    []
  );

  const openModal = useCallback(() => dispatch({ type: "OPEN_MODAL" }), []);
  const closeModal = useCallback(() => dispatch({ type: "CLOSE_MODAL" }), []);

  const setModalView = useCallback(
    (view: MODAL_VIEWS, cancelable: boolean = true, ...args: any[]) =>
      dispatch({ type: "SET_MODAL_VIEW", view, cancelable, args }),
    []
  );

  const setSidebarView = useCallback(
    (view: SIDEBAR_VIEWS) => dispatch({ type: "SET_SIDEBAR_VIEW", view }),
    []
  );

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      setSidebarView,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, closeSidebarIfPresent, toggleSidebar]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};
export const ManagedUIContext: FC<Props> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
