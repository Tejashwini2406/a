import React from 'react';
import { Box, Grid, Card } from '@mui/material';
import { COLORS } from '../utils/constants';

export default function QuickInfo({ weather }) {
  const items = [
    { label: 'Humidity', value: `${weather.humidity}%`, icon: '💧' },
    { label: 'Wind', value: `${weather.windSpeed.toFixed(1)} km/h`, icon: '💨' },
    { label: 'Pressure', value: `${weather.precipitation} mm`, icon: '🎯' }
  ];

  return (
    <Grid container spacing={2} sx={{ marginBottom: '16px' }}>
      {items.map((item, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx}>
          <Card sx={{ backgroundColor: COLORS.secondary, color: COLORS.text, padding: '16px', textAlign: 'center' }}>
            <Box sx={{ fontSize: '2rem', marginBottom: '8px' }}>{item.icon}</Box>
            <p style={{ fontSize: '0.9rem', margin: '0' }}>{item.label}</p>
            <h4 style={{ margin: '8px 0 0 0' }}>{item.value}</h4>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}