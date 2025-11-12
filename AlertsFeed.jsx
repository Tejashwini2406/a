import React from 'react';
import { Box, Card } from '@mui/material';
import { COLORS } from '../utils/constants';
import { getAlertColor } from '../utils/helpers';

export default function AlertsFeed({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <Card sx={{ backgroundColor: COLORS.secondary, color: COLORS.text, padding: '16px', marginBottom: '16px' }}>
      <h3>Active Alerts ({alerts.length})</h3>
      <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        {alerts.map((alert) => (
          <Box key={alert.id} sx={{
            backgroundColor: COLORS.primary,
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '8px',
            borderLeft: `4px solid ${getAlertColor(alert.severity)}`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong>{alert.type}</strong>
              <Box sx={{
                backgroundColor: getAlertColor(alert.severity),
                color: '#000',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {alert.severity}
              </Box>
            </Box>
            <p style={{ margin: '4px 0' }}>{alert.message}</p>
            <p style={{ margin: '4px 0', fontSize: '0.85rem', color: COLORS.accentLight }}>
              Pop: {alert.affectedPopulation.toLocaleString()} | Prob: {(alert.probability * 100).toFixed(1)}%
            </p>
            <p style={{ margin: '4px 0', fontSize: '0.75rem' }}>SMS ✓ WhatsApp ✓ Push ✓</p>
          </Box>
        ))}
      </Box>
    </Card>
  );
}