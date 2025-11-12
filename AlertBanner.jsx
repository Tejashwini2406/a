import React from 'react';
import { Box } from '@mui/material';
import { COLORS } from '../utils/constants';

export default function AlertBanner({ alerts }) {
  if (!alerts || alerts.length === 0) return null;
  const alert = alerts.find(a => a.severity === 'CRITICAL') || alerts[0];

  return (
    <Box sx={{
      backgroundColor: COLORS.critical,
      color: COLORS.text,
      padding: '16px',
      marginBottom: '16px',
      borderRadius: '8px',
      borderLeft: `4px solid ${COLORS.warning}`
    }}>
      <strong>🚨 {alert.type} - {alert.severity}</strong>
      <p>{alert.message}</p>
      <p style={{ fontSize: '0.9rem' }}>Probability: {(alert.probability * 100).toFixed(1)}%</p>
    </Box>
  );
}