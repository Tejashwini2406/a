import React from 'react';
import { Box, Card, Grid } from '@mui/material';
import { COLORS } from '../utils/constants';
import { formatDate } from '../utils/helpers';

export default function DailyForecast({ weatherData }) {
  if (!weatherData || !weatherData.daily) return null;

  return (
    <Card sx={{ backgroundColor: COLORS.secondary, color: COLORS.text, padding: '16px', marginBottom: '16px' }}>
      <h3>7-Day Forecast</h3>
      <Grid container spacing={2}>
        {weatherData.daily.time.slice(0, 7).map((date, idx) => (
          <Grid item xs={6} sm={4} md={2} key={idx}>
            <Box sx={{
              backgroundColor: COLORS.primary,
              padding: '12px',
              borderRadius: '8px',
              textAlign: 'center',
              border: `1px solid ${COLORS.accent}`
            }}>
              <p style={{ margin: '0', fontSize: '0.8rem', fontWeight: 'bold' }}>{formatDate(date)}</p>
              <p style={{ margin: '4px 0' }}>{weatherData.daily.maxTemperature[idx].toFixed(1)}°</p>
              <p style={{ margin: '0', fontSize: '0.8rem', color: COLORS.accentLight }}>{weatherData.daily.minTemperature[idx].toFixed(1)}°</p>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}