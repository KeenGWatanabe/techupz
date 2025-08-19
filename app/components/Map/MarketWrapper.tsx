// components/Map/MarkerWrapper.tsx
'use client';

import { Marker as LeafletMarker } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

interface MarkerWrapperProps {
  position: L.LatLngExpression;
  children?: React.ReactNode;
}

const MarkerWrapper = ({ position, children }: MarkerWrapperProps) => {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position);
    }
  }, [position]);

  return (
    <LeafletMarker ref={markerRef} position={position}>
      {children}
    </LeafletMarker>
  );
};

export default MarkerWrapper;