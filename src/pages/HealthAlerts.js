import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Heart, Thermometer, Wind, Droplets, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { useCarbonData } from '../context/CarbonDataContext';

const HealthAlerts = () => {
  const { state } = useCarbonData();
  const [airQualityIndex, setAirQualityIndex] = useState(45);
  const [temperature, setTemperature] = useState(28);
  const [humidity, setHumidity] = useState(65);
  const [manualInput, setManualInput] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    if (!manualInput) {
      const interval = setInterval(() => {
        setAirQualityIndex(prev => Math.max(0, Math.min(500, prev + (Math.random() - 0.5) * 10)));
        setTemperature(prev => Math.max(15, Math.min(40, prev + (Math.random() - 0.5) * 2)));
        setHumidity(prev => Math.max(30, Math.min(90, prev + (Math.random() - 0.5) * 5)));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [manualInput]);

  const getAirQualityStatus = (aqi) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-green-500', bg: 'bg-green-100', risk: 'Low' };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-100', risk: 'Low' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive Groups', color: 'text-orange-500', bg: 'bg-orange-100', risk: 'Medium' };
    if (aqi <= 200) return { status: 'Unhealthy', color: 'text-red-500', bg: 'bg-red-100', risk: 'High' };
    if (aqi <= 300) return { status: 'Very Unhealthy', color: 'text-purple-500', bg: 'bg-purple-100', risk: 'Very High' };
    return { status: 'Hazardous', color: 'text-red-800', bg: 'bg-red-200', risk: 'Extreme' };
  };

  const getHeatStressLevel = (temp, humidity) => {
    const heatIndex = temp + (humidity * 0.1);
    if (heatIndex < 27) return { level: 'No Stress', color: 'text-green-500', bg: 'bg-green-100' };
    if (heatIndex < 32) return { level: 'Caution', color: 'text-yellow-500', bg: 'bg-yellow-100' };
    if (heatIndex < 41) return { level: 'Extreme Caution', color: 'text-orange-500', bg: 'bg-orange-100' };
    if (heatIndex < 54) return { level: 'Danger', color: 'text-red-500', bg: 'bg-red-100' };
    return { level: 'Extreme Danger', color: 'text-red-800', bg: 'bg-red-200' };
  };

  const getHealthRisks = (emissions, aqi, temp, humidity) => {
    const risks = [];
    
    if (emissions > 2000) {
      risks.push({
        type: 'Respiratory Issues',
        severity: 'High',
        description: 'High emissions may exacerbate asthma and respiratory conditions',
        icon: <Activity className="w-5 h-5" />
      });
    }
    
    if (aqi > 100) {
      risks.push({
        type: 'Air Quality Impact',
        severity: aqi > 150 ? 'High' : 'Medium',
        description: 'Poor air quality can affect lung function and cardiovascular health',
        icon: <Wind className="w-5 h-5" />
      });
    }
    
    if (temp > 30) {
      risks.push({
        type: 'Heat Stress',
        severity: temp > 35 ? 'High' : 'Medium',
        description: 'High temperatures can cause heat exhaustion and dehydration',
        icon: <Thermometer className="w-5 h-5" />
      });
    }
    
    return risks;
  };

  const airQualityStatus = getAirQualityStatus(airQualityIndex);
  const heatStressLevel = getHeatStressLevel(temperature, humidity);
  const healthRisks = getHealthRisks(state.totalEmissions, airQualityIndex, temperature, humidity);

  const formatEmissions = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} tons`;
    }
    return `${value.toFixed(1)} kg`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Health & Environment Alerts
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor the correlation between emissions and health risks in real-time.
          </p>
        </motion.div>

        {/* Manual Input Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Environment Parameters
            </h3>
            <button
              onClick={() => setManualInput(!manualInput)}
              className="px-4 py-2 bg-eco-600 hover:bg-eco-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {manualInput ? 'Auto Mode' : 'Manual Mode'}
            </button>
          </div>
          
          {manualInput && (
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                  min="15"
                  max="40"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Humidity (%)
                </label>
                <input
                  type="number"
                  value={humidity}
                  onChange={(e) => setHumidity(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                  min="30"
                  max="90"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Air Quality Index
                </label>
                <input
                  type="number"
                  value={airQualityIndex}
                  onChange={(e) => setAirQualityIndex(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-eco-500 focus:border-transparent"
                  min="0"
                  max="500"
                  step="1"
                />
              </div>
            </div>
          )}
          
          {!manualInput && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Environment data is being simulated in real-time. Click "Manual Mode" to enter custom values.
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Emissions Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Emissions Health Correlation */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Emissions Health Impact
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Emissions</span>
                    <span className="text-lg font-bold text-red-600 dark:text-red-400">
                      {formatEmissions(state.totalEmissions)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    CO₂e this month
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Health Risk Level</span>
                    <span className={`text-lg font-bold ${state.totalEmissions > 2000 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {state.totalEmissions > 2000 ? 'High' : 'Low'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Based on emissions
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Environmental Data */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Real-time Environmental Data
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wind className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Air Quality</span>
                  </div>
                  <div className={`text-2xl font-bold ${airQualityStatus.color}`}>
                    {Math.round(airQualityIndex)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {airQualityStatus.status}
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <Thermometer className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Temperature</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {temperature}°C
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Current
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Humidity</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round(humidity)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Relative
                  </div>
                </div>
              </div>
            </div>

            {/* Health Risk Alerts */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Health Risk Alerts
                </h2>
              </div>
              {healthRisks.length > 0 ? (
                <div className="space-y-4">
                  {healthRisks.map((risk, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${
                        risk.severity === 'High' 
                          ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
                          : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`${risk.severity === 'High' ? 'text-red-500' : 'text-yellow-500'}`}>
                          {risk.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {risk.type}
                            </h4>
                            <span className={`text-sm font-medium px-2 py-1 rounded ${
                              risk.severity === 'High' 
                                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' 
                                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                            }`}>
                              {risk.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {risk.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No health risks detected</p>
                  <p className="text-sm">Your current emissions and environmental conditions are within safe limits</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Health Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Air Quality Status */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Air Quality Status
              </h3>
              <div className={`p-4 rounded-lg ${airQualityStatus.bg} border ${airQualityStatus.color.replace('text-', 'border-')}`}>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${airQualityStatus.color} mb-2`}>
                    {Math.round(airQualityIndex)}
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Air Quality Index
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Risk Level: {airQualityStatus.risk}
                  </div>
                </div>
              </div>
            </div>

            {/* Heat Stress Monitor */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Heat Stress Monitor
              </h3>
              <div className={`p-4 rounded-lg ${heatStressLevel.bg} border ${heatStressLevel.color.replace('text-', 'border-')}`}>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${heatStressLevel.color} mb-2`}>
                    {heatStressLevel.level}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Temperature: {temperature}°C | Humidity: {Math.round(humidity)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Health Recommendations
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Stay hydrated and avoid outdoor activities during peak heat hours
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use air purifiers indoors if air quality is poor
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Consider reducing emissions to improve local air quality
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HealthAlerts;
