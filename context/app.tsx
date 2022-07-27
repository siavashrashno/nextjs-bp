import { COOKIE_REFRESH_TOKEN_KEY } from "@utils/constants";
import { getCookie } from "@utils/Cookies";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { setClientAuthInterceptorCallbak } from "@https/secure-api";

export interface IAppState {
  user: {
    isLoggedIn: boolean;
  };
}

type Functions = {
  setUserLoggedIn: (isLoggedIn: boolean) => void;
};
type AppContextType = IAppState & Functions;

type Action = {
  type: "SET_USER_IS_LOGGED_IN";
  isLoggedIn: boolean;
};

const initialState: AppContextType = {
  user: { isLoggedIn: !!getCookie().get(COOKIE_REFRESH_TOKEN_KEY) },
  setUserLoggedIn: () => {},
};

const AppContext = createContext(initialState);

function appReducer(state: AppContextType, action: Action) {
  switch (action.type) {
    case "SET_USER_IS_LOGGED_IN": {
      return {
        ...state,
        user: {
          isLoggedIn: action.isLoggedIn,
        },
      };
    }
  }
}

AppContext.displayName = "AppContext";

interface Props {
  children?: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setUserLoggedIn = useCallback(
    (isLoggedIn: boolean) =>
      dispatch({ type: "SET_USER_IS_LOGGED_IN", isLoggedIn }),
    []
  );
  const value = useMemo(
    () => ({
      ...state,
      setUserLoggedIn,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );
  useEffect(() => {
    setClientAuthInterceptorCallbak(() => {
      if (!getCookie().get(COOKIE_REFRESH_TOKEN_KEY)) {
        setUserLoggedIn(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(`useAppContext must be used within a AppProvider`);
  }
  return context;
}

export default AppProvider;
