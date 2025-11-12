import React, { useState } from 'react';
import { Box, Card, FormControlLabel, Switch, MenuItem, Select } from '@mui/material';
import { COLORS } from '../utils/constants';

export default function Settings() {
  const [settings, setSettings] = useState({
    tempUnit: 'C',
    windUnit: 'kmh',
    notifications: true,
    theme: 'dark',
    language: 'en'
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
    localStorage.setItem('crews-settings', JSON.stringify({ ...settings, [key]: value }));
  };

  return (
    <Card sx={{ backgroundColor: COLORS.secondary, color: COLORS.text, padding: '16px', marginBottom: '16px' }}>
      <h3>Settings</h3>
      <Box sx={{ backgroundColor: COLORS.primary, padding: '16px', borderRadius: '8px' }}>
        <Box sx={{ marginBottom: '16px' }}>
          <label>Temperature Unit:</label>
          <Select value={settings.tempUnit} onChange={(e) => handleChange('tempUnit', e.target.value)} fullWidth>
            <MenuItem value="C">Celsius (°C)</MenuItem>
            <MenuItem value="F">Fahrenheit (°F)</MenuItem>
          </Select>
        </Box>
        <Box sx={{ marginBottom: '16px' }}>
          <label>Wind Unit:</label>
          <Select value={settings.windUnit} onChange={(e) => handleChange('windUnit', e.target.value)} fullWidth>
            <MenuItem value="kmh">km/h</MenuItem>
            <MenuItem value="mph">mph</MenuItem>
            <MenuItem value="knots">knots</MenuItem>
          </Select>
        </Box>
        <FormControlLabel
          control={<Switch checked={settings.notifications} onChange={(e) => handleChange('notifications', e.target.checked)} />}
          label="Enable Notifications"
        />
      </Box>
    </Card>
  );
}