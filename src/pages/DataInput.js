import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Car, Bus, Train, Plane, Trash2, Save, Calculator, TrendingUp, CheckCircle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarbonData, getCurrentMonthKey, getMonthName } from '../context/CarbonDataContext';

const DataInput = () => {
  const { state, dispatch } = useCarbonData();
  const [activeTab, setActiveTab] = useState('electricity');
  const [showNotification, setShowNotification] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(state.currentMonth);
  const [formData, setFormData] = useState({
    electricity: { kwh: 0 },
    transport: {
      car: { km: 0 },
      bus: { km: 0 },
      train: { km: 0 },
      flight: { km: 0 }
    },
    waste: { kg: 0 }
  });

  // Update form data when month changes
  useEffect(() => {
    const monthData = state.monthlyData[selectedMonth];
    if (monthData) {
      setFormData({
        electricity: { kwh: monthData.electricity.kwh },
        transport: {
          car: { km: monthData.transport.car.km },
          bus: { km: monthData.transport.bus.km },
          train: { km: monthData.transport.train.km },
          flight: { km: monthData.transport.flight.km }
        },
        waste: { kg: monthData.waste.kg }
      });
    } else {
      setFormData({
        electricity: { kwh: 0 },
        transport: {
          car: { km: 0 },
          bus: { km: 0 },
          train: { km: 0 },
          flight: { km: 0 }
        },
        waste: { kg: 0 }
      });
    }
  }, [selectedMonth, state.monthlyData]);

  const tabs = [
    { id: 'electricity', label: 'Electricity', icon: <Zap className="w-5 h-5" /> },
    { id: 'transport', label: 'Transport', icon: <Car className="w-5 h-5" /> },
    { id: 'waste', label: 'Waste', icon: <Trash2 className="w-5 h-5" /> }
  ];

  const transportModes = [
    { 
      key: 'car', 
      label: 'Car', 
      icon: <Car className="w-5 h-5" />, 
      color: 'text-red-500',
      description: 'Personal vehicle travel (gasoline/diesel)',
      emissionFactor: '0.2 kg CO2/km',
      placeholder: 'Enter monthly car travel distance'
    },
    { 
      key: 'bus', 
      label: 'Bus', 
      icon: <Bus className="w-5 h-5" />, 
      color: 'text-purple-500',
      description: 'Public bus transportation',
      emissionFactor: '0.1 kg CO2/km',
      placeholder: 'Enter monthly bus travel distance'
    },
    { 
      key: 'train', 
      label: 'Train', 
      icon: <Train className="w-5 h-5" />, 
      color: 'text-cyan-500',
      description: 'Railway transportation',
      emissionFactor: '0.04 kg CO2/km',
      placeholder: 'Enter monthly train travel distance'
    },
    { 
      key: 'flight', 
      label: 'Flight', 
      icon: <Plane className="w-5 h-5" />, 
      color: 'text-orange-500',
      description: 'Air travel (domestic/international)',
      emissionFactor: '0.25 kg CO2/km',
      placeholder: 'Enter monthly flight distance'
    }
  ];

  // Month navigation functions
  const navigateMonth = (direction) => {
    const [year, month] = selectedMonth.split('-').map(Number);
    let newYear = year;
    let newMonth = month + direction;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    
    const newMonthKey = `${newYear}-${String(newMonth).padStart(2, '0')}`;
    setSelectedMonth(newMonthKey);
  };

  const handleInputChange = (category, field, value) => {
    const newValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: newValue
      }
    }));
    
    // Immediately update context for real-time updates
    if (category === 'electricity') {
      dispatch({
        type: 'UPDATE_ELECTRICITY',
        payload: { kwh: newValue, month: selectedMonth }
      });
    } else if (category === 'waste') {
      dispatch({
        type: 'UPDATE_WASTE',
        payload: { kg: newValue, month: selectedMonth }
      });
    }
  };

  const handleTransportChange = (mode, value) => {
    const newValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      transport: {
        ...prev.transport,
        [mode]: { km: newValue }
      }
    }));
    
    // Immediately update context for real-time updates
    dispatch({
      type: 'UPDATE_TRANSPORT',
      payload: {
        [mode]: { km: newValue, type: mode },
        month: selectedMonth
      }
    });
  };

  const clearForm = () => {
    setFormData({
      electricity: { kwh: 0 },
      transport: {
        car: { km: 0 },
        bus: { km: 0 },
        train: { km: 0 },
        flight: { km: 0 }
      },
      waste: { kg: 0 }
    });
  };

  const handleSave = () => {
    // Save electricity data
    dispatch({
      type: 'UPDATE_ELECTRICITY',
      payload: { kwh: formData.electricity.kwh, month: selectedMonth }
    });

    // Save transport data
    Object.keys(formData.transport).forEach(mode => {
      dispatch({
        type: 'UPDATE_TRANSPORT',
        payload: {
          [mode]: { km: formData.transport[mode].km, type: mode },
          month: selectedMonth
        }
      });
    });

    // Save waste data
    dispatch({
      type: 'UPDATE_WASTE',
      payload: { kg: formData.waste.kg, month: selectedMonth }
    });

    // Show success notification
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const calculateEmissions = (category, data) => {
    switch (category) {
      case 'electricity':
        return data.kwh * 0.5; // 0.5 kg CO2 per kWh
      case 'transport':
        const factors = { car: 0.2, bus: 0.1, train: 0.04, flight: 0.25 };
        return Object.keys(data).reduce((total, mode) => {
          return total + (data[mode].km * factors[mode]);
        }, 0);
      case 'waste':
        return data.kg * 2.53; // 2.53 kg CO2 per kg waste
      default:
        return 0;
    }
  };

  const formatEmissions = (value) => {
    // Handle undefined, null, or non-numeric values
    if (value === undefined || value === null || isNaN(value)) {
      return '0.0 kg';
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} tons`;
    }
    return `${value.toFixed(1)} kg`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Data saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Data Input
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your consumption data to calculate your carbon footprint.
          </p>
        </motion.div>

        {/* Month Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-eco-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Select Month
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="text-center min-w-[200px]">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {getMonthName(selectedMonth)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedMonth === getCurrentMonthKey() ? 'Current Month' : 'Historical Data'}
                </div>
              </div>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-600 text-eco-600 dark:text-eco-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card p-6"
        >
          {activeTab === 'electricity' && (
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="w-6 h-6 text-eco-500" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Electricity Consumption
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Electricity Usage (kWh)
                  </label>
                  <input
                    type="number"
                    value={formData.electricity.kwh}
                    onChange={(e) => handleInputChange('electricity', 'kwh', e.target.value)}
                    className="input-field"
                    placeholder="Enter your monthly electricity consumption"
                  />
                </div>
                <div className="bg-eco-50 dark:bg-eco-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Estimated Emissions:</span>
                    <span className="text-lg font-semibold text-eco-600 dark:text-eco-400">
                      {formatEmissions(calculateEmissions('electricity', formData.electricity))} CO₂e
                    </span>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Total Monthly Emissions:</span>
                    <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {formatEmissions(state.totalEmissions)} CO₂e
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transport' && (
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Car className="w-6 h-6 text-eco-500" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Transport Usage
                </h2>
              </div>
              <div className="space-y-6">
                {transportModes.map((mode) => (
                  <div key={mode.key} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={mode.color}>{mode.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {mode.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {mode.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Monthly Distance (km)
                        </label>
                        <input
                          type="number"
                          value={formData.transport[mode.key].km}
                          onChange={(e) => handleTransportChange(mode.key, e.target.value)}
                          className="input-field"
                          placeholder={mode.placeholder}
                        />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Emission Factor: {mode.emissionFactor}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-eco-50 dark:bg-eco-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Total Transport Emissions:</span>
                    <span className="text-lg font-semibold text-eco-600 dark:text-eco-400">
                      {formatEmissions(calculateEmissions('transport', formData.transport))} CO₂e
                    </span>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Total Monthly Emissions:</span>
                    <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {formatEmissions(state.totalEmissions)} CO₂e
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'waste' && (
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Trash2 className="w-6 h-6 text-eco-500" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Waste Generation
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Waste Generation (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.waste.kg}
                    onChange={(e) => handleInputChange('waste', 'kg', e.target.value)}
                    className="input-field"
                    placeholder="Enter your monthly waste generation"
                  />
                </div>
                <div className="bg-eco-50 dark:bg-eco-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Estimated Emissions:</span>
                    <span className="text-lg font-semibold text-eco-600 dark:text-eco-400">
                      {formatEmissions(calculateEmissions('waste', formData.waste))} CO₂e
                    </span>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Total Monthly Emissions:</span>
                    <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {formatEmissions(state.totalEmissions)} CO₂e
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600"
          >
            <button
              onClick={handleSave}
              className="btn-primary flex items-center space-x-2 w-full justify-center"
            >
              <Save className="w-5 h-5" />
              <span>Save Data</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="card p-6 mt-8"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Calculator className="w-6 h-6 text-eco-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Total Estimated Emissions
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-eco-600 dark:text-eco-400">
                {formatEmissions(calculateEmissions('electricity', formData.electricity))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Electricity</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-eco-600 dark:text-eco-400">
                {formatEmissions(calculateEmissions('transport', formData.transport))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Transport</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-eco-600 dark:text-eco-400">
                {formatEmissions(calculateEmissions('waste', formData.waste))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Waste</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-eco-100 dark:bg-eco-900/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
              <span className="text-2xl font-bold text-eco-600 dark:text-eco-400">
                {formatEmissions(
                  calculateEmissions('electricity', formData.electricity) +
                  calculateEmissions('transport', formData.transport) +
                  calculateEmissions('waste', formData.waste)
                )} CO₂e
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataInput;