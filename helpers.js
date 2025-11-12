import { COASTAL_REGIONS } from './constants';

export const findNearestRegion = (userLat, userLon) => {
  let nearest = COASTAL_REGIONS[0];
  let minDistance = Infinity;
  COASTAL_REGIONS.forEach(region => {
    const distance = Math.sqrt(Math.pow(region.lat - userLat, 2) + Math.pow(region.lon - userLon, 2));
    if (distance < minDistance) {
      minDistance = distance;
      nearest = region;
    }
  });
  return nearest;
};

export const formatTime = (date) => new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
export const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
export const getAlertColor = (severity) => {
  const colors = { CRITICAL: '#E63946', HIGH: '#F77F00', MEDIUM: '#FFD60A', LOW: '#90EE90' };
  return colors[severity] || '#2E9FA3';
};

export const cacheData = (key, data, expiryMinutes = 10) => {
  const cacheEntry = { data, timestamp: Date.now(), expiry: expiryMinutes * 60 * 1000 };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
};

export const getCachedData = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  const cacheEntry = JSON.parse(cached);
  if (Date.now() - cacheEntry.timestamp > cacheEntry.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return cacheEntry.data;
};

export const generateAlertId = () => `ALT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;