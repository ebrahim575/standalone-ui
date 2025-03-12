declare module 'openseadragon' {
  interface Options {
    element: HTMLElement;
    tileSources: {
      type: string;
      url: string;
    };
    showNavigationControl?: boolean;
    navigationControlAnchor?: number;
    showNavigator?: boolean;
    navigatorPosition?: string;
    navigatorHeight?: string;
    navigatorWidth?: string;
    defaultZoomLevel?: number;
    minZoomLevel?: number;
    maxZoomLevel?: number;
    showRotationControl?: boolean;
    gestureSettingsMouse?: {
      clickToZoom?: boolean;
      dblClickToZoom?: boolean;
    };
    gestureSettingsTouch?: {
      pinchToZoom?: boolean;
      flickEnabled?: boolean;
      flickMinSpeed?: number;
    };
    controlsFadeDelay?: number;
    controlsFadeLength?: number;
    navigatorBackground?: string;
    navigatorBorderColor?: string;
    zoomInButton?: string;
    zoomOutButton?: string;
    homeButton?: string;
    fullPageButton?: string;
    rotateLeftButton?: string;
    rotateRightButton?: string;
  }

  interface Viewer {
    destroy(): void;
  }

  interface OpenSeadragonStatic {
    (options: Options): Viewer;
    ControlAnchor: {
      TOP_RIGHT: number;
      TOP_LEFT: number;
      BOTTOM_LEFT: number;
      BOTTOM_RIGHT: number;
    };
  }

  const OpenSeadragon: OpenSeadragonStatic;
  export default OpenSeadragon;
} 