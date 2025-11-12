import React from 'react';
import { Box, Card } from '@mui/material';
import { COLORS } from '../utils/constants';
import { formatTime } from '../utils/helpers';

export default function HourlyForecast({ weatherData }) {
  if (!weatherData || !weatherData.hourly) return null;

  const hourly = weatherData.hourly.time.slice(0, 12).map((time, idx) => ({
    time: formatTime(time),
    temp: weatherData.hourly.temperature[idx],
    rain: weatherData.hourly.precipitationProbability[idx]
  }));

  return (
    <Card sx={{ backgroundColor: COLORS.secondary, color: COLORS.text, padding: '16px', marginBottom: '16px' }}>
      <h3>Hourly (12h)</h3>
      <Box sx={{ display: 'flex', overflowX: 'auto', gap: '12px', paddingBottom: '8px' }}>
        {hourly.map((item, idx) => (
          <Box key={idx} sx={{
            flex: '0 0 auto',
            width: '100px',
            padding: '12px',
            backgroundColor: COLORS.primary,
            borderRadius: '8px',
            textAlign: 'center',
            border: `1px solid ${COLORS.accent}`
          }}>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>{item.time}</p>
            <h4 style={{ margin: '8px 0' }}>{item.temp.toFixed(1)}°C</h4>
            <p style={{ margin: '0', fontSize: '0.75rem' }}>{item.rain}%</p>
          </Box>
        ))}
      </Box>
    </Card>
  );
}