import { AI_THRESHOLDS } from '../utils/constants';
import { generateAlertId, getCachedData, cacheData } from '../utils/helpers';

let lastAlertTime = 0;
const ALERT_COOLDOWN_MS = 120000;

export const assessWeatherRisks = (weatherData) => {
  if (!weatherData || !weatherData.current) return null;
  const current = weatherData.current;
  const daily = weatherData.daily;

  return {
    cyclone: assessCycloneRisk(current),
    flood: assessFloodRisk(current, daily),
    heatwave: assessHeatwaveRisk(current, daily),
    drought: assessDroughtRisk(daily)
  };
};

const assessCycloneRisk = (current) => {
  const { windSpeed, pressure } = current;
  const t = AI_THRESHOLDS.cyclone;
  let riskLevel = 'LOW', probability = 0.1, forecast = 'No risk';

  if (windSpeed > t.windSpeed && pressure < t.pressure) {
    probability = Math.min((windSpeed / 100) * (1 - pressure / 1013) * 0.8, 1);
    riskLevel = probability > 0.7 ? 'CRITICAL' : 'HIGH';
    forecast = `Wind: ${windSpeed.toFixed(1)} km/h`;
  } else if (windSpeed > 50) {
    probability = 0.4;
    riskLevel = 'MEDIUM';
  }
  return { riskLevel, probability, forecast };
};

const assessFloodRisk = (current, daily) => {
  const { precipitation } = current;
  const rainfall24h = daily.precipitation?.[0] || 0;
  const t = AI_THRESHOLDS.flood;
  let riskLevel = 'LOW', probability = 0.1, forecast = 'Normal';

  if (precipitation > t.rainfallHourly || rainfall24h > t.rainfall24h) {
    probability = Math.min((rainfall24h / 200), 1);
    riskLevel = probability > 0.7 ? 'CRITICAL' : 'HIGH';
    forecast = `Rainfall: ${rainfall24h.toFixed(1)}mm`;
  } else if (rainfall24h > 100) {
    probability = 0.5;
    riskLevel = 'MEDIUM';
  }
  return { riskLevel, probability, forecast };
};

const assessHeatwaveRisk = (current) => {
  const { temperature } = current;
  const t = AI_THRESHOLDS.heatwave;
  let riskLevel = 'LOW', probability = 0.1, forecast = 'Normal';

  if (temperature > t.temperature) {
    probability = Math.min(temperature / 50, 1);
    riskLevel = probability > 0.7 ? 'CRITICAL' : 'HIGH';
    forecast = `Temperature: ${temperature.toFixed(1)}°C`;
  }
  return { riskLevel, probability, forecast };
};

const assessDroughtRisk = () => ({ riskLevel: 'LOW', probability: 0.1, forecast: 'Normal' });

export const generateAlertsFromRisks = (risks, latitude, longitude) => {
  const alerts = [];
  const now = Date.now();

  if (now - lastAlertTime < ALERT_COOLDOWN_MS) return getCachedData('active-alerts') || [];

  for (const [riskType, riskData] of Object.entries(risks)) {
    if (!riskData || !((riskData.riskLevel === 'HIGH' || riskData.riskLevel === 'CRITICAL') && riskData.probability > 0.65)) continue;

    const cached = getCachedData('active-alerts') || [];
    if (cached.find(a => (now - a.createdAt) < 7200000)) continue;

    const alert = {
      id: generateAlertId(),
      type: riskType.toUpperCase(),
      severity: riskData.riskLevel,
      probability: riskData.probability,
      message: riskData.forecast,
      affectedPopulation: Math.floor(Math.random() * 50000) + 10000,
      createdAt: now,
      status: 'ACTIVE'
    };
    alerts.push(alert);
  }

  if (alerts.length > 0) {
    lastAlertTime = now;
    const cached = getCachedData('active-alerts') || [];
    const updated = [...alerts, ...cached.filter(a => (now - a.createdAt) < 86400000)].slice(0, 50);
    cacheData('active-alerts', updated, 240);
    return updated;
  }

  return getCachedData('active-alerts') || [];
};