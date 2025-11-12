import React from 'react';
import { Box, Card } from '@mui/material';
import { COLORS } from '../utils/constants';

export default function About() {
  return (
    <Card sx={{ backgroundColor: COLORS.secondary, color: COLORS.text, padding: '16px' }}>
      <h3>About CREWS</h3>
      <Box sx={{ backgroundColor: COLORS.primary, padding: '16px', borderRadius: '8px' }}>
        <h4>Climate Resilience Early Warning System</h4>
        <p>CREWS provides real-time weather data and AI-powered disaster predictions for coastal India.</p>

        <h4>Features:</h4>
        <ul>
          <li>🌤️ Real-time weather from Open-Meteo API</li>
          <li>🤖 AI predictions for Cyclone, Flood, Heatwave, Drought</li>
          <li>🚨 Smart alert system (max 1 per 2-3 minutes)</li>
          <li>📱 Fully responsive (mobile, tablet, desktop)</li>
          <li>💾 Data caching for offline access</li>
          <li>🗺️ Interactive map with Leaflet.js</li>
          <li>📊 Community incident reporting</li>
        </ul>

        <h4>8 Coastal Regions Supported:</h4>
        <p>Mumbai, Chennai, Kochi, Visakhapatnam, Mangalore, Goa, Puri, Surat</p>

        <h4>Version:</h4>
        <p>2.0.0 - REBOOT 2025 Hackathon Edition</p>

        <h4>Technology:</h4>
        <p>React 18 • Material-UI • Open-Meteo API • Leaflet • Recharts</p>
      </Box>
    </Card>
  );
}