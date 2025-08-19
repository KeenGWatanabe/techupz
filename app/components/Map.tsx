'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet';

import "leaflet/dist/leaflet.css";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';

// @ts-ignore
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// Fix for marker icons
const DefaultIcon = L.icon({
  iconUrl: '/images/location.svg',
  iconRetinaUrl: '/images/location.svg',
  //shadowUrl: '/images/location.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


interface MapProps {
  center?: number[];
  className?: string;
}

// const Map: React.FC<MapProps> = ({ 
//   center, className = 'h-[35vh] rounded-lg' 
// }) => {


//   return (
//     <MapContainer
//       center={center as L.LatLngExpression || [51.505, -0.09]} // Default center 
//       zoom={center ? 4 : 2}
//       scrollWheelZoom={false}
//       className={className}
//     >
//       <TileLayer
//       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />
//     {center && (
//       <Marker position={center as L.LatLngExpression}>
//         <Popup>
//           You are here
//         </Popup>
//       </Marker>
//     )}  
//     </MapContainer>
//   );
// };
const Map = ({ center, className = 'h-[35vh] rounded-lg' }: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!mapRef.current) return;

    // Initialize map only on client side
    const map = L.map(mapRef.current).setView(
      (center && center.length === 2 ? center as L.LatLngTuple : [51.505, -0.09] as L.LatLngTuple),
      center && center.length === 2 ? 4 : 2
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    if (center && center.length === 2) {
      markerRef.current = L.marker(center as L.LatLngTuple, { icon: DefaultIcon }).addTo(map);
      markerRef.current.bindPopup('You are here').openPopup();
    }

    // Store the map instance if needed
    // mapRef.current = map; // Remove this line, as mapRef is for the DOM node

    return () => {
      map.remove();
    };
  }, [center]);

  return <div id="map" className={className} ref={mapRef} />;
};
export default Map;