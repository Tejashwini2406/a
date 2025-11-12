import React from 'react';
import { Box, Card } from '@mui/material';
import { COLORS } from '../utils/constants';

export default function WeatherCard({ weather, region }) {
  return (
    <Card sx={{ backgroundColor: COLORS.secondary, color: COLORS.text, padding: '24px', marginBottom: '16px' }}>
      <h2 style={{ fontSize: '3rem', margin: '0' }}>{weather.temperature.toFixed(1)}°C</h2>
      <p style={{ fontSize: '1.2rem', margin: '8px 0' }}>Feels: {weather.apparentTemperature.toFixed(1)}°C</p>
      <h3>{region.name}, {region.state}</h3>
      <Box sx={{ marginTop: '16px' }}>
        <p><strong>Humidity:</strong> {weather.humidity}%</p>
        <p><strong>Wind:</strong> {weather.windSpeed.toFixed(1)} km/h</p>
        <p><strong>Direction:</strong> {weather.windDirection}°</p>
        <p><strong>Precipitation:</strong> {weather.precipitation} mm</p>
      </Box>
    </Card>
  );
}