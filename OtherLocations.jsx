import React, { useState } from 'react';
import { Box, Card, Grid, TextField } from '@mui/material';
import { COASTAL_REGIONS, COLORS } from '../utils/constants';

export default function OtherLocations({ onSelectRegion }) {
  const [search, setSearch] = useState('');
  const filtered = COASTAL_REGIONS.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ padding: '16px' }}>
      <h3>Select Region</h3>
      <TextField
        fullWidth
        placeholder="Search regions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: '16px', backgroundColor: COLORS.secondary, borderRadius: '8px' }}
      />
      <Grid container spacing={2}>
        {filtered.map((region) => (
          <Grid item xs={12} sm={6} md={4} key={region.id}>
            <Card
              onClick={() => onSelectRegion(region)}
              sx={{
                backgroundColor: COLORS.secondary,
                color: COLORS.text,
                padding: '16px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: COLORS.accent, color: '#000' }
              }}
            >
              <h4 style={{ margin: '0' }}>{region.name}</h4>
              <p style={{ margin: '0', fontSize: '0.9rem', opacity: 0.8 }}>{region.state}</p>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}