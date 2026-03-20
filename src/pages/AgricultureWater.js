import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Leaf, Tractor, Zap, Calculator, TrendingDown, Sprout } from 'lucide-react';
import { useCarbonData } from '../context/CarbonDataContext';

const AgricultureWater = () => {
  const { state, dispatch } = useCarbonData();
  const [agricultureData, setAgricultureData] = useState({
    irrigationPumps: { hours: 0, power: 0 },
    fertilizer: { kg: 0, type: 'nitrogen' },
    waterTreatment: { liters: 0, energy: 0 },
    cropArea: { hectares: 0, cropType: 'wheat' }
  });

  const fertilizerTypes = [
    { type: 'nitrogen', factor: 2.1, name: 'Nitrogen Fertilizer' },
    { type: 'phosphorus', factor: 1.8, name: 'Phosphorus Fertilizer' },
    { type: 'potassium', factor: 1.5, name: 'Potassium Fertilizer' },
    { type: 'organic', factor: 0.8, name: 'Organic Fertilizer' }
  ];

  const cropTypes = [
    { type: 'wheat', waterNeeds: 500, name: 'Wheat' },
    { type: 'rice', waterNeeds: 1200, name: 'Rice' },
    { type: 'corn', waterNeeds: 600, name: 'Corn' },
    { type: 'soybeans', waterNeeds: 400, name: 'Soybeans' },
    { type: 'cotton', waterNeeds: 800, name: 'Cotton' }
  ];

  const handleInputChange = (category, field, value) => {
    setAgricultureData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: parseFloat(value) || 0
      }
    }));
  };

  const calculateIrrigationEmissions = () => {
    const { hours, power } = agricultureData.irrigationPumps;
    return hours * power * 0.5; // 0.5 kg CO2 per kWh
  };

  const calculateFertilizerEmissions = () => {
    const { kg, type } = agricultureData.fertilizer;
    const fertilizer = fertilizerTypes.find(f => f.type === type);
    return kg * (fertilizer?.factor || 2.1);
  };

  const calculateWaterTreatmentEmissions = () => {
    const { liters, energy } = agricultureData.waterTreatment;
    return (liters / 1000) * energy * 0.5; // Energy per 1000L * CO2 factor
  };

  const calculateWaterEfficiency = () => {
    const { hectares, cropType } = agricultureData.cropArea;
    const crop = cropTypes.find(c => c.type === cropType);
    const totalWaterNeeded = hectares * (crop?.waterNeeds || 500);
    const actualWaterUsed = agricultureData.irrigationPumps.hours * agricultureData.irrigationPumps.power * 100; // Simplified calculation
    
    if (totalWaterNeeded === 0) return 0;
    return Math.min(100, (totalWaterNeeded / actualWaterUsed) * 100);
  };

  const totalAgricultureEmissions = calculateIrrigationEmissions() + calculateFertilizerEmissions() + calculateWaterTreatmentEmissions();
  const waterEfficiency = calculateWaterEfficiency();

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
            Agriculture & Water Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track emissions from agricultural activities and water resource management.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Forms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Irrigation Pumps */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Droplets className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Irrigation Pumps
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Operating Hours (per month)
                  </label>
                  <input
                    type="number"
                    value={agricultureData.irrigationPumps.hours}
                    onChange={(e) => handleInputChange('irrigationPumps', 'hours', e.target.value)}
                    className="input-field"
                    placeholder="Enter operating hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Power Consumption (kW)
                  </label>
                  <input
                    type="number"
                    value={agricultureData.irrigationPumps.power}
                    onChange={(e) => handleInputChange('irrigationPumps', 'power', e.target.value)}
                    className="input-field"
                    placeholder="Enter power consumption"
                  />
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Estimated Emissions:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {formatEmissions(calculateIrrigationEmissions())} CO₂e
                  </span>
                </div>
              </div>
            </div>

            {/* Fertilizer Usage */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Fertilizer Usage
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fertilizer Type
                  </label>
                  <select
                    value={agricultureData.fertilizer.type}
                    onChange={(e) => handleInputChange('fertilizer', 'type', e.target.value)}
                    className="input-field"
                  >
                    {fertilizerTypes.map(fertilizer => (
                      <option key={fertilizer.type} value={fertilizer.type}>
                        {fertilizer.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount Used (kg)
                  </label>
                  <input
                    type="number"
                    value={agricultureData.fertilizer.kg}
                    onChange={(e) => handleInputChange('fertilizer', 'kg', e.target.value)}
                    className="input-field"
                    placeholder="Enter amount in kg"
                  />
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Estimated Emissions:</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {formatEmissions(calculateFertilizerEmissions())} CO₂e
                  </span>
                </div>
              </div>
            </div>

            {/* Water Treatment */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Droplets className="w-6 h-6 text-cyan-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Water Treatment
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Water Treated (liters)
                  </label>
                  <input
                    type="number"
                    value={agricultureData.waterTreatment.liters}
                    onChange={(e) => handleInputChange('waterTreatment', 'liters', e.target.value)}
                    className="input-field"
                    placeholder="Enter volume in liters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Energy per 1000L (kWh)
                  </label>
                  <input
                    type="number"
                    value={agricultureData.waterTreatment.energy}
                    onChange={(e) => handleInputChange('waterTreatment', 'energy', e.target.value)}
                    className="input-field"
                    placeholder="Enter energy consumption"
                  />
                </div>
              </div>
              <div className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Estimated Emissions:</span>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                    {formatEmissions(calculateWaterTreatmentEmissions())} CO₂e
                  </span>
                </div>
              </div>
            </div>

            {/* Crop Information */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sprout className="w-6 h-6 text-emerald-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Crop Information
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Crop Type
                  </label>
                  <select
                    value={agricultureData.cropArea.cropType}
                    onChange={(e) => handleInputChange('cropArea', 'cropType', e.target.value)}
                    className="input-field"
                  >
                    {cropTypes.map(crop => (
                      <option key={crop.type} value={crop.type}>
                        {crop.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Area (hectares)
                  </label>
                  <input
                    type="number"
                    value={agricultureData.cropArea.hectares}
                    onChange={(e) => handleInputChange('cropArea', 'hectares', e.target.value)}
                    className="input-field"
                    placeholder="Enter area in hectares"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Analytics Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Total Emissions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Total Agriculture Emissions
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-eco-600 dark:text-eco-400 mb-2">
                  {formatEmissions(totalAgricultureEmissions)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  CO₂e this month
                </div>
              </div>
            </div>

            {/* Emissions Breakdown */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Emissions Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Irrigation</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {formatEmissions(calculateIrrigationEmissions())}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Fertilizer</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {formatEmissions(calculateFertilizerEmissions())}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Water Treatment</span>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                    {formatEmissions(calculateWaterTreatmentEmissions())}
                  </span>
                </div>
                <hr className="border-gray-200 dark:border-gray-600" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="font-bold text-eco-600 dark:text-eco-400">
                    {formatEmissions(totalAgricultureEmissions)}
                  </span>
                </div>
              </div>
            </div>

            {/* Water Efficiency */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Water Efficiency
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {waterEfficiency.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Water Use Efficiency
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, waterEfficiency)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Smart Agriculture Tips */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Smart Agriculture Tips
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use drip irrigation to reduce water waste by 30-50%
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Implement precision farming to optimize fertilizer use
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Consider renewable energy for irrigation pumps
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

export default AgricultureWater;
