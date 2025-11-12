import React from 'react';
import { Box, Card, Grid } from '@mui/material';
import { COLORS } from '../utils/constants';
import { getAlertColor } from '../utils/helpers';

export default function AIPredictions({ risks }) {
  const cards = [
    { type: 'CYCLONE', icon: '🌀', data: risks.cyclone },
    { type: 'FLOOD', icon: '🌊', data: risks.flood },
    { type: 'HEATWAVE', icon: '🔥', data: risks.heatwave },
    { type: 'DROUGHT', icon: '🏜️', data: risks.drought }
  ];

  return (
    <Card sx={{ backgroundColor: COLORS.secondary, color: COLORS.text, padding: '16px', marginBottom: '16px' }}>
      <h3>AI Risk Predictions</h3>
      <Grid container spacing={2}>
        {cards.map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Box sx={{
              backgroundColor: COLORS.primary,
              padding: '16px',
              borderRadius: '8px',
              border: `2px solid ${getAlertColor(card.data.riskLevel)}`
            }}>
              <Box sx={{ fontSize: '2rem', marginBottom: '8px' }}>{card.icon}</Box>
              <h4 style={{ margin: '0 0 8px 0' }}>{card.type}</h4>
              <p style={{ margin: '4px 0' }}><strong>Risk:</strong> {card.data.riskLevel}</p>
              <p style={{ margin: '4px 0' }}><strong>Prob:</strong> {(card.data.probability * 100).toFixed(1)}%</p>
              <p style={{ margin: '4px 0', fontSize: '0.85rem', color: COLORS.accentLight }}>{card.data.forecast}</p>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}