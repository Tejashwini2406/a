export const COASTAL_REGIONS = [
  { id: 'MUM', name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
  { id: 'CHE', name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
  { id: 'KOC', name: 'Kochi', state: 'Kerala', lat: 9.9312, lon: 76.2673 },
  { id: 'VIS', name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6869, lon: 83.2185 },
  { id: 'MAN', name: 'Mangalore', state: 'Karnataka', lat: 12.9141, lon: 74.8560 },
  { id: 'GOA', name: 'Goa', state: 'Goa', lat: 15.2993, lon: 73.8278 },
  { id: 'PUR', name: 'Puri', state: 'Odisha', lat: 19.8135, lon: 85.8312 },
  { id: 'SUR', name: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311 }
];

export const AI_THRESHOLDS = {
  cyclone: { windSpeed: 60, pressure: 990 },
  flood: { rainfall24h: 150, rainfallHourly: 25 },
  heatwave: { temperature: 40, durationDays: 3 },
  drought: { noRainfallDays: 15 }
};

export const COLORS = {
  primary: '#0F1419',
  secondary: '#1A2A3A',
  accent: '#2E9FA3',
  accentLight: '#A8D8D8',
  text: '#F5F5F0',
  critical: '#E63946',
  warning: '#F77F00',
  medium: '#FFD60A',
  success: '#90EE90'
};

export const EMERGENCY_CONTACTS = {
  MUM: { ndrf: '9711077372', disaster: '1916', hospital: '108' },
  CHE: { ndrf: '9711077372', disaster: '1078', hospital: '108' },
  KOC: { ndrf: '9711077372', disaster: '1070', hospital: '108' },
  VIS: { ndrf: '9711077372', disaster: '1077', hospital: '108' },
  MAN: { ndrf: '9711077372', disaster: '1070', hospital: '108' },
  GOA: { ndrf: '9711077372', disaster: '1078', hospital: '108' },
  PUR: { ndrf: '9711077372', disaster: '1078', hospital: '108' },
  SUR: { ndrf: '9711077372', disaster: '1077', hospital: '108' }
};
