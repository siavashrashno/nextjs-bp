declare global {
  interface Document {
    selection: any;
    webkitFullscreenElement: Element | null;
    mozFullScreenElement: Element | null;
    msFullscreenElement: Element | null;
    mozCancelFullScreen: () => Promise<void>;
    webkitExitFullscreen: () => Promise<void>;
    msExitFullscreen: () => Promise<void>;
  }

  interface HTMLElement {
    mozRequestFullScreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
  interface Window {
    clipboardData: DataTransfer;
  }
}
export {};
