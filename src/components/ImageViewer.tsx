'use client';

import { useEffect, useRef } from 'react';

interface ImageViewerProps {
  src: string;
  className?: string;
}

export default function ImageViewer({ src, className = '' }: ImageViewerProps) {
  const viewerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    
    const initializeViewer = async () => {
      if (!containerRef.current) return;

      try {
        const OpenSeadragon = (await import('openseadragon')).default;
        if (!isMounted) return;

        viewerRef.current = OpenSeadragon({
          element: containerRef.current,
          tileSources: {
            type: 'image',
            url: src,
          },
          showNavigationControl: true,
          navigationControlAnchor: OpenSeadragon.ControlAnchor.TOP_RIGHT,
          showNavigator: true,
          navigatorPosition: 'BOTTOM_RIGHT',
          navigatorHeight: '100px',
          navigatorWidth: '150px',
          defaultZoomLevel: 1,
          minZoomLevel: 0.5,
          maxZoomLevel: 10,
          showRotationControl: true,
          gestureSettingsMouse: {
            clickToZoom: false,
            dblClickToZoom: true,
          },
          gestureSettingsTouch: {
            pinchToZoom: true,
            flickEnabled: true,
            flickMinSpeed: 120,
          },
          controlsFadeDelay: 1000,
          controlsFadeLength: 500,
          navigatorBackground: '#fff',
          navigatorBorderColor: '#E31837',
          zoomInButton: 'zoom-in',
          zoomOutButton: 'zoom-out',
          homeButton: 'home',
          fullPageButton: 'full-page',
          rotateLeftButton: 'rotate-left',
          rotateRightButton: 'rotate-right',
        });
      } catch (error) {
        console.error('Failed to initialize OpenSeadragon:', error);
      }
    };

    initializeViewer();

    return () => {
      isMounted = false;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Control buttons */}
      <div className="absolute top-2 right-2 z-10 flex gap-1 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-lg border border-gray-200">
        <button id="zoom-in" className="p-1.5 text-[#E31837] hover:text-gray-700 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button id="zoom-out" className="p-1.5 text-[#E31837] hover:text-gray-700 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button id="home" className="p-1.5 text-[#E31837] hover:text-gray-700 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        </button>
        <button id="full-page" className="p-1.5 text-[#E31837] hover:text-gray-700 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
        <button id="rotate-left" className="p-1.5 text-[#E31837] hover:text-gray-700 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          </svg>
        </button>
        <button id="rotate-right" className="p-1.5 text-[#E31837] hover:text-gray-700 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 15a4.5 4.5 0 01-4.5 4.5H6a3.75 3.75 0 01-1.332-7.257 3 3 0 013.758-3.848 5.25 5.25 0 0110.233 2.33A4.502 4.502 0 0121.75 15z" />
          </svg>
        </button>
      </div>
    </div>
  );
} 