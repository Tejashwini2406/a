import React, { useState, useEffect } from 'react';
import { Box, Container, CircularProgress, Alert, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { COLORS, COASTAL_REGIONS } from './utils/constants';
import { fetchWeatherData } from './services/weatherService';
import { assessWeatherRisks, generateAlertsFromRisks } from './services/aiService';
import { requestUserLocation } from './services/geolocationService';
import { findNearestRegion } from './utils/helpers';
import WeatherCard from './components/WeatherCard';
import QuickInfo from './components/QuickInfo';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import AIPredictions from './components/AIPredictions';
import AlertsFeed from './components/AlertsFeed';
import AlertBanner from './components/AlertBanner';
import MapView from './components/MapView';
import IncidentReports from './components/IncidentReports';
import EmergencyContacts from './components/EmergencyContacts';
import OtherLocations from './components/OtherLocations';
import Settings from './components/Settings';
import About from './components/About';
import './App.css';

function App() {
  const [currentRegion, setCurrentRegion] = useState(COASTAL_REGIONS[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [risks, setRisks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const location = await requestUserLocation();
        const nearest = findNearestRegion(location.latitude, location.longitude);
        setCurrentRegion(nearest);
      } catch (err) {
        console.log('Using default region');
      }
    };
    initializeLocation();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherData(currentRegion.lat, currentRegion.lon);
        setWeatherData(data);
        const weatherRisks = assessWeatherRisks(data);
        setRisks(weatherRisks);
        const generatedAlerts = generateAlertsFromRisks(weatherRisks, currentRegion.lat, currentRegion.lon);
        setAlerts(generatedAlerts);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, [currentRegion]);

  const handleNavigation = (view) => {
    setCurrentView(view);
    setDrawerOpen(false);
  };

  const handleRegionSelect = (region) => {
    setCurrentRegion(region);
    setCurrentView('home');
    setDrawerOpen(false);
  };

  const menuItems = [
    { label: '🏠 Home', view: 'home' },
    { label: '🗺️ Map', view: 'map' },
    { label: '📍 Other Locations', view: 'locations' },
    { label: '📢 Incident Reports', view: 'reports' },
    { label: '☎️ Emergency Contacts', view: 'contacts' },
    { label: '⚙️ Settings', view: 'settings' },
    { label: 'ℹ️ About', view: 'about' }
  ];

  return (
    <Box sx={{ backgroundColor: COLORS.primary, minHeight: '100vh', color: COLORS.text }}>
      <AppBar sx={{ backgroundColor: COLORS.secondary }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flex: 1 }}>
            <h2 style={{ margin: '0' }}>CREWS</h2>
            <p style={{ margin: '0', fontSize: '0.85rem', color: COLORS.accentLight }}>
              Climate Resilience Early Warning System
            </p>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <p style={{ margin: '0', fontWeight: 'bold' }}>{currentRegion.name}</p>
            <p style={{ margin: '0', fontSize: '0.85rem', color: COLORS.accentLight }}>
              {alerts.length > 0 ? `${alerts.length} Alert${alerts.length !== 1 ? 's' : ''}` : 'No alerts'}
            </p>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, backgroundColor: COLORS.secondary, color: COLORS.text, height: '100%', padding: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: '0' }}>Menu</h3>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: COLORS.text }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.view}
                onClick={() => handleNavigation(item.view)}
                sx={{
                  backgroundColor: currentView === item.view ? COLORS.accent : 'transparent',
                  color: currentView === item.view ? '#000' : COLORS.text,
                  marginBottom: '8px',
                  borderRadius: '4px'
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="md" sx={{ pt: 12, pb: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {currentView === 'home' && (
          <>
            {alerts.length > 0 && <AlertBanner alerts={alerts} />}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <CircularProgress />
              </Box>
            ) : weatherData ? (
              <>
                <WeatherCard weather={weatherData.current} region={currentRegion} />
                <QuickInfo weather={weatherData.current} />
                <HourlyForecast weatherData={weatherData} />
                <DailyForecast weatherData={weatherData} />
                {risks && <AIPredictions risks={risks} />}
                {alerts.length > 0 && <AlertsFeed alerts={alerts} />}
              </>
            ) : (
              <Alert severity="info">Unable to load weather data</Alert>
            )}
          </>
        )}

        {currentView === 'map' && <MapView />}
        {currentView === 'locations' && <OtherLocations onSelectRegion={handleRegionSelect} />}
        {currentView === 'reports' && (
          <>
            <IncidentReports onSubmit={(report) => {
              setReports([report, ...reports]);
              alert('Report submitted!');
            }} />
            {reports.length > 0 && (
              <Box sx={{ marginTop: '16px' }}>
                <h3>Recent Reports ({reports.length})</h3>
                {reports.slice(0, 3).map((report, idx) => (
                  <Box key={idx} sx={{
                    backgroundColor: COLORS.secondary,
                    padding: '12px',
                    marginBottom: '8px',
                    borderRadius: '8px'
                  }}>
                    <p>{report.description}</p>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Severity: {report.severity}/5</p>
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}

        {currentView === 'contacts' && <EmergencyContacts region={currentRegion} />}
        {currentView === 'settings' && <Settings />}
        {currentView === 'about' && <About />}
      </Container>
    </Box>
  );
}

export default App;