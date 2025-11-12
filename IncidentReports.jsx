import React, { useState } from 'react';
import { Box, Card, TextField, Button, Rating } from '@mui/material';
import { COLORS } from '../utils/constants';

export default function IncidentReports({ onSubmit }) {
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState(3);

  const handleSubmit = () => {
    if (description.trim()) {
      onSubmit({ description, severity, timestamp: new Date() });
      setDescription('');
      setSeverity(3);
    }
  };

  return (
    <Card sx={{ backgroundColor: COLORS.secondary, color: COLORS.text, padding: '16px', marginBottom: '16px' }}>
      <h3>Submit Incident Report</h3>
      <Box sx={{ backgroundColor: COLORS.primary, padding: '16px', borderRadius: '8px' }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Describe the incident..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginBottom: '12px' }}
        />
        <Box sx={{ marginBottom: '12px' }}>
          <label>Severity: </label>
          <Rating value={severity} onChange={(_, val) => setSeverity(val)} />
        </Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: COLORS.accent, color: '#000', fontWeight: 'bold' }}
          onClick={handleSubmit}
        >
          Submit Report
        </Button>
      </Box>
    </Card>
  );
}