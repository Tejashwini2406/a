import React from 'react';
import { Box, Card } from '@mui/material';
import { EMERGENCY_CONTACTS, COLORS } from '../utils/constants';

export default function EmergencyContacts({ region }) {
  const contacts = EMERGENCY_CONTACTS[region.id] || EMERGENCY_CONTACTS['MUM'];

  return (
    <Card sx={{ backgroundColor: COLORS.secondary, color: COLORS.text, padding: '16px', marginBottom: '16px' }}>
      <h3>📞 Emergency Contacts - {region.name}</h3>
      <Box sx={{ backgroundColor: COLORS.primary, padding: '16px', borderRadius: '8px' }}>
        <Box sx={{ marginBottom: '12px' }}>
          <strong>NDRF (National Disaster Response):</strong>
          <p style={{ margin: '4px 0', fontSize: '1.2rem', color: COLORS.critical }}>{contacts.ndrf}</p>
        </Box>
        <Box sx={{ marginBottom: '12px' }}>
          <strong>Disaster Management:</strong>
          <p style={{ margin: '4px 0', fontSize: '1.2rem', color: COLORS.warning }}>{contacts.disaster}</p>
        </Box>
        <Box>
          <strong>Emergency (Ambulance/Medical):</strong>
          <p style={{ margin: '4px 0', fontSize: '1.2rem', color: COLORS.success }}>{contacts.hospital}</p>
        </Box>
      </Box>
    </Card>
  );
}