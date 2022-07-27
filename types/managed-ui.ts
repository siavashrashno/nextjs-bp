export interface UIState {
  displaySidebar: boolean;
  displayDropdown: boolean;
  displayModal: boolean;
  sidebarView: SIDEBAR_VIEWS;
  modalView: { name: MODAL_VIEWS; cancelable: boolean; args: any[] };
}

type UIFunctions = {
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  closeSidebarIfPresent: () => void;
  openDropdown: () => void;
  closeDropdown: () => void;
  openModal: () => void;
  closeModal: () => void;
  setModalView: (
    view: MODAL_VIEWS,
    cancelable?: boolean,
    ...args: any[]
  ) => void;
  setSidebarView: (view: SIDEBAR_VIEWS) => void;
};

export type UIContextType = UIState & UIFunctions;

export type UIAction =
  | {
      type: "OPEN_SIDEBAR";
    }
  | {
      type: "CLOSE_SIDEBAR";
    }
  | {
      type: "OPEN_DROPDOWN";
    }
  | {
      type: "CLOSE_DROPDOWN";
    }
  | {
      type: "OPEN_MODAL";
    }
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "SET_MODAL_VIEW";
      view: MODAL_VIEWS;
      cancelable: boolean;
      args: any[];
    }
  | {
      type: "SET_SIDEBAR_VIEW";
      view: SIDEBAR_VIEWS;
    };

export type AUTH_MODAL_VIEWS =
  | "SIGNUP_VIEW"
  | "LOGIN_VIEW"
  | "FORGOT_VIEW"
  | "CHANGE_PASSWORD_VIEW";

export type MODAL_VIEWS = AUTH_MODAL_VIEWS;

export type SIDEBAR_VIEWS = "MOBILE_MENU";
