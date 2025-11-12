import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import leaflet CSS
import { COASTAL_REGIONS } from '../utils/constants';

export default function MapView() {
  return (
    <MapContainer
      center={[19.076, 72.8777]} // Mumbai as center
      zoom={5}
      style={{ height: '400px', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {COASTAL_REGIONS.map((region) => (
        <Marker key={region.id} position={[region.lat, region.lon]}>
          <Popup>
            <strong>{region.name}</strong><br />
            {region.state}
          </Popup>
          <Circle
            center={[region.lat, region.lon]}
            radius={20000} // 20km radius circle for visualization
            color='blue'
          />
        </Marker>
      ))}
    </MapContainer>
  );
}
